
The plan is to manage everything via containers so that everything can be easily migrated when the server is changed:

![[Pasted image 20240920125541.png]]

### Prerequisites

*Info: for testing purposes I did not use a Pi but a DebianVM and connected to the machine via ssh!* 

### Installation of IOTstack and Portainer setup

1. First make OS updates and then install “curl” (if not already present):

```Bash
sudo apt update 
sudo apt upgrade
sudo apt install curl
```

2. Then install IOTstack via curl and restart (if not automatically by install script):

```bash
sudo curl -fsSL https://raw.githubusercontent.com/SensorsIot/IOTstack/master/install.sh | bash 
sudo shutdown -r now
```

3. After restarting, a new folder “IOTstack” should appear. Execute the “menu.sh” once there:

```bash
cd IOTstack
sudo ./menu.sh
```

![[Pasted image 20240920130638.png]]

4. Execute “Build Stack” in the IOTstack menu and select ("Spacebar") all services (Grafana, InfluxDB, mosquitto, nodered, portainer-ce (*optional*):
	1. **When selecting the option “nodered” an error occurs. Only then “arrow key to the right” must be pressed and then the addons list.yml must be overwritten!**

5. When everything is selected, press “Enter” to install and start stack. If you then go out of the menu (via CTRL-C) and then enter (see below) all containers should run:

```bash
docker ps
```

![[Pasted image 20240920131738.png]]

6. *Optional!* If you use Portainer, you can use the port “9000” via web browser.
	1. default is “admin” for user and pw. **Then change PW!**
	2. you can then log everything via GUI & ssh etc:
	3. ![[Pasted image 20240920132913.png]]
	4. if portainer pw is forgotten:

```bash
docker run --rm -v /home/*User*/IOTstack/volumes/portainer-ce/data:/data portainer/helper-reset-password
```

### InfluxDB, Nodered & Grafana configuration

1. now the database must be created, which stores all data that is published to the Brocker to the specific topic “Temp”:

```bash
docker exec -it influxdb influx
|Connected to http://localhost:8086 version 1.8.10|
|InfluxDB shell version: 1.8.10|
> CREATE DATABASE *Name der Datenbank*
> show databases
> quit
```

2. Then start Node-Red via port “1880” in the web and connect two nodes (MQTT OUT & InfluxDB IN):

![[Pasted image 20240920135926.png]]

Enter the IP of the MQTT container there, as well as for the InfluxDB. For the InfluxDB node, it is also important that the “Measurement” is also entered (all data is stored in the database under this value):

![[Pasted image 20240920140218.png]]

3. Now you can test if data is saved in the database, I have a bash script for this:

```bash
#!/bin/bash

# Function for checking whether a number is between 15 and 35
function is_valid_number() {
  local number="$1"
  if [[ "$number" =~ ^[1-3][5-9]$|^[2-3][0-5]$ ]]; then
    return 0
  else
    return 1
  fi
}

# Preset-Funktion
function use_preset() {
  # You can define your desired preset here
  local preset_numbers=(15 19 21 25 28 31 31 29 25 20)
  # Copy preset_numbers into the numbers_array
  numbers_array=("${preset_numbers[@]}")
}

# Prompt for preset or manual input
while true; do
  read -p "Would you like to use the preset? (y/n): " use_preset_choice
  if [[ "$use_preset_choice" == "y" || "$use_preset_choice" == "n" ]]; then
    break
  else
    echo "Please enter only 'y' or 'n'."
  fi
done

if [[ "$use_preset_choice" == "y" ]]; then
  use_preset
else
  # Prompt for 10 numbers
  read -p "Enter 10 numbers between 15 and 35 (separated by spaces): " numbers
  # Save numbers in an array
  numbers_array=($numbers)
fi

# Checking the numbers (performed for both cases)
for number in "${numbers_array[@]}"; do
  if ! is_valid_number "$number"; then
    echo "Invalid number: $number. Please only enter numbers between 15 and 35."
    exit 1
  fi
done

# MQTT-Topic
topic="Temp"

# Publish each number as a separate message and output it
for number in "${numbers_array[@]}"; do
  mosquitto_pub -d -t "$topic" -m "$number"
  echo "sent: $number"
  sleep 5
done
```

since everything now runs via docker, there is no need to run a broker natively on the vm. To continue using the script or mosquitto in general as a client (for sub or pub), the minimal install of mosquitto without broker is sufficient:

```bash
sudo apt install mosquitto-clients
```


then execute script:

```bash
sudo ./*name of the scripts.sh*
> Would you like to use the preset? (y/n): y
Client (null) sending CONNECT
Client (null) received CONNACK (0)
Client (null) sending PUBLISH (d0, q0, r0, m1, 'Temp', ... (2 bytes))
Client (null) sending DISCONNECT
sent: 15
```

and check the database:

```bash
docker exec -it influxdb influx
Connected to http://localhost:8086 version 1.8.10
InfluxDB shell version: 1.8.10
> use temp_data
Using database temp_data
> show measurements
name: measurements
name
----
sensor_data
> select * from sensor_data
name: sensor_data
time                value
----                -----
1726142261472151995 15
1726142266516634318 19
1726142271607565314 21
1726142276669001790 25
1726142281757281851 28
1726142286883078815 31
1726142291943353686 31
1726142297015629617 29
1726142302080929271 25
1726142307171691848 20
```



4. Now that everything is running on the database, the data only needs to be visualized via Grafana (Port 3000):

	1. **Set PW again!**
	2. then set the data source to InfluxDB:![[Pasted image 20240920142613.png]]
	3. And then configure it:![[172.16.10.29_3000_connections_datasources_edit_adxo9r375fz0gd.png]]
	4. **Important** that this message appears when you press “Save & test”:![[Pasted image 20240920143235.png]]
	5. Now set the dashboard to user-defined, it could look like this, for example:![[Pasted image 20240920143520.png]]

If you want to mount the container to customize something:
```bash
docker exec -it <container> bash
```
If pw forgotten in grafana via portainer bash!:
```bash
grafana cli --homepath "/usr/share/grafana" admin reset-admin-password <new password>
```
To edit files that are in a Docker container simply:
```bash
docker cp <container>:/path/to/file.ext .
```
to create a copy on the local computer (in the current directory). Then edit the file locally with your preferred editor and then run
```bash
docker cp file.ext <container>:/path/to/file.ext
```
to replace the old file.

### TMP35 temperature measurement incl. ADS1115 analog-digital converter

#### Summary of the connections

| Component     | Function     | Connected to                            |
| ------------- | ------------ | --------------------------------------- |
| TMP35 (pin 1) | VCC          | 3.3V rail of the breadboard             |
| TMP35 (pin 2) | Vout         | A0 (channel 0) of the ADS1115           |
| TMP35 (pin 3) | GND          | GND rail of the breadboard              |
| ADS1115 VDD   | power supply | 3.3V rail of the breadboard             |
| ADS1115 GND   | Ground       | GND rail of the breadboard              |
| ADS1115 SCL   | clock line   | GPIO 3 (SCL, pin 5) of the Raspberry Pi |
| ADS1115 SDA   | data line    | GPIO 2 (SDA, pin 3) of the Raspberry Pi |
| ADS1115 ADDR  | address      | GND (sets I²C address to 0x48)          |
As soon as everything on the breadboard is connected to the GPIO of the PI, I²C must be activated.

```bash
sudo raspi-config
```

Then select “Interface Options” in the “raspi-config” menu + Enter

![[Pasted image 20241116091759.png]]

Select “I2C” in the “Interface Options” + Enter and activate I2C with “yes”

![[Pasted image 20241116091947.png]]

![[Pasted image 20241116092029.png]]

Then restart the Pi once:

```bash
sudo shutdown -r now
```

You can now use the “i2cdetect tool” to check whether the I²C connection of the ADS1115 is correct:

```bash
sudo i2cdetect -y 1
```

In the output table you should see the address of the ADS1115, which is **0x48** by default (if the ADDR pin is connected to GND):

The output should look something like this:

```lua
    0  1  2  3  4  5  6  7  8  9  A  B  C  D  E  F
00:          -- -- -- -- -- -- -- -- -- -- -- -- --
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
40: 48 -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
70: -- -- -- -- -- -- -- --
```

Depending on how you have placed the 3.3V rail & the GND rail on the breadboard, the table may look slightly different:

```lua
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:                         -- -- -- -- -- -- -- --
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
40: -- -- -- -- -- -- -- -- 48 -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
70: -- -- -- -- -- -- -- --
```

**It is only important that the value “48” is displayed!**

Now update the system & install Python:

```bash
sudo apt update
sudo apt install -y python3-pip
```

After Python has been installed, you can create a virtual environment for the Python script:

```python
python3 -m venv ~/ads1115_env # the name of the environment is an example
```

to activate the environment:

```bash
source ~/ads1115_env/bin/activate
```

to leave the environment:

```bash
deactivate
```

The required libraries for the environment are then installed:

```python
pip install adafruit-blinka
pip install adafruit-circuitpython-ads1x15
```

Now you can create the Python script for temperature measurement:

```bash
nano test_ads1115.py # Of course you can also use another editor aswell :)
```

This is the Python code:

```Python
import time
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn

# Establish I2C connection
i2c = busio.I2C(board.SCL, board.SDA)

# Initialize ADS1115
ads = ADS.ADS1115(i2c)
chan = AnalogIn(ads, ADS.P0)  # A0 für TMP35

def convert_to_temperature(voltage):
    # TMP35 outputs 10 mV per °C, offset 0.5V for 0°C
    temperature = (voltage - 0.5) * 100
    return temperature

try:
    while True:
        voltage = chan.voltage
        temperature = convert_to_temperature(voltage)
        print(f"voltage: {voltage:.2f} V, temperature: {temperature:.2f} °C")
        time.sleep(1)
except KeyboardInterrupt:
    print("Measurement ended")
```

Then save and execute with this command (**check that you are in the environment!**):

```Python
python test_ads1115.py
```

The output should then look like this:

```Python
(ads1115_env) pimqtt@pimqtt:~/scripts $ python test_ads1115.py
voltage: 0.63 V, temperature: 12.52 °C
voltage: 0.62 V, temperature: 12.50 °C
voltage: 0.62 V, temperature: 12.46 °C
voltage: 0.62 V, temperature: 12.44 °C
voltage: 0.63 V, temperature: 12.58 °C
voltage: 0.63 V, temperature: 12.90 °C
voltage: 0.63 V, temperature: 12.55 °C
voltage: 0.63 V, temperature: 12.58 °C
voltage: 0.62 V, temperature: 12.45 °C
voltage: 0.62 V, temperature: 12.45 °C
voltage: 0.63 V, temperature: 13.06 °C
voltage: 0.62 V, temperature: 12.44 °C
voltage: 0.63 V, temperature: 12.56 °C
voltage: 0.65 V, temperature: 14.64 °C
voltage: 0.62 V, temperature: 12.49 °C
voltage: 0.63 V, temperature: 12.64 °C
voltage: 0.63 V, temperature: 13.34 °C
```

Now you can test whether the data is also sent to the database via MQTT, for this we have to adapt the script (in this case simply I wrote a new script):

```Python
import time
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
import subprocess

# Establish I2C connection
i2c = busio.I2C(board.SCL, board.SDA)

# Initialize ADS1115
ads = ADS.ADS1115(i2c)
chan = AnalogIn(ads, ADS.P0)  # A0 für TMP35

# MQTT-configuration
mqtt_broker = "x.x.x.x"  # IP address of the MQTT broker
mqtt_port = "1883" # Port of the MQTT broker
mqtt_topic = "Temp" # Topic of the message

# Function for converting voltage to temperature
def convert_to_temperature(voltage):
    # TMP35 outputs 10 mV per °C, offset 0.5V for 0°C
    temperature = (voltage - 0.5) * 100
    return temperature

# Function for sending a message with Mosquitto Client
def publish_mqtt_message(topic, payload):
    try:
        subprocess.run(
            ["mosquitto_pub", "-h", mqtt_broker, "-p", mqtt_port, "-t", mqtt_topic, "-m", payload],
            check=True
        )
        print(f"MQTT Message sent: {payload}°C")
    except subprocess.CalledProcessError as e:
        print(f"Error sending the MQTT message: {e}")

try:
    count = 0  # Counter for the measurements
    while True:
        voltage = chan.voltage
        temperature = convert_to_temperature(voltage)
        print(f"voltage: {voltage:.2f} V, temperature: {temperature:.2f} °C")

        # Send the temperature to the MQTT broker every 5 measurements
        count += 1
        if count % 5 == 0:
            payload = f"{temperature:.2f}"
            publish_mqtt_message(mqtt_topic, payload)

        time.sleep(1)

except KeyboardInterrupt:
    print("Measurement ended")
```

Before you run the script now, check if your NodeRED connection from the broker to the database is adjusted, if either the MQTT topic does not match and or the measurement of your InfluxDB database does not match (*in my context I created a new measurement because I still had the simulated temp data in the old measurement*)

If everything fits, you can run the script as a test:

```Python
(ads1115_env) pimqtt@pimqtt:~/scripts $ python test_ads1115_mosquitto.py
voltage: 0.66 V, temperature: 16.11 °C
voltage: 0.67 V, temperature: 16.80 °C
voltage: 0.67 V, temperature: 16.79 °C
voltage: 0.67 V, temperature: 16.65 °C
voltage: 0.67 V, temperature: 16.86 °C
MQTT Message sent: 16.86°C
voltage: 0.66 V, temperature: 16.26 °C
voltage: 0.66 V, temperature: 16.00 °C
voltage: 0.66 V, temperature: 16.28 °C
voltage: 0.66 V, temperature: 16.01 °C
voltage: 0.66 V, temperature: 16.19 °C
MQTT Message sent: 16.19°C
voltage: 0.67 V, temperature: 16.80 °C
voltage: 0.67 V, temperature: 16.79 °C
voltage: 0.67 V, temperature: 16.76 °C
voltage: 0.67 V, temperature: 16.81 °C
voltage: 0.67 V, temperature: 16.83 °C
MQTT Message sent: 16.83°C
```

As soon as the first data has been sent to the database, the new measurement should also be selectable in Grafana:

![[Pasted image 20241117102822.png]]

If you use a “Gauge” chart in Grafana, it is also important to select the correct fields (in my case “tempdata_real.mean”) in the “Value Options”:

![[Pasted image 20241117103225.png]]


### Functional explanation of the TMP35 sensor & ADS1115 analog-digital-converter
#### Conversion formula from voltage to temperature **TMP35**

##### 1. **Basis of the formula**

The **TMP35 output voltage** is linear to the measured temperature:
$$
V_{\text{out}} = m \cdot T + b
$$
- $Vout$ ​: Output voltage (volts)
- $T$ : Temperature (°C)
- $m$ : Gradient, i.e. how much the voltage increases per degree of temperature (for TMP35: **10 mV/°C**).
- $b$ : Offset, i.e. the output voltage at 0°C (for TMP35: **0.5 V**).

The formula for calculating the temperature then only needs to be rearranged:
$$ T = \frac{V_{\text{out}} - b}{m} $$ <br>
This formula describes the conversion from the output voltage (in volts) to the temperature (in degrees Celsius, °C).

---

##### 2. **Breakdown of the formula**

###### a. **Offset of 0.5 V**:

- According to the sensor documentation, the output voltage of the TMP35 at **0 °C** is exactly **0.5 V**.
- To calculate the temperature, the measured voltage is therefore reduced by this value: 
$$ V_{\text{out}} - 0,5 $$
###### b. **Scaling factor of 100**:

- The TMP35 has a sensitivity of **10 mV/°C** (millivolts per degree Celsius).
- This means that a change in voltage of **1 V** corresponds to a temperature change of **100 °C**.
- The differentiated voltage is therefore multiplied by the factor **100**:
$$ (V_{\text{out}} - 0,5) \cdot 100 $$
  
- In the formula, the scaling factor ($m$) was then changed to $T = \frac{}{0,01}$
  
---
##### 3. **Example formula**

Assume that the TMP35 supplies an output voltage of **0.75 V**:

1. Deduction of the offset: <br> $$0,75−0,5=0,25$$
2. Multiplication by the scaling factor:  <br>
$$0,25×100=25°C$$
3. Formula summary: <br> $$ T = \frac{0,75 - 0,5}{0,01} = 25°C $$

The measured temperature is therefore **25 °C**.

---
##### 4. **Additional information**

- The TMP35 is designed for a supply voltage of **3 to 5.5 V**. The conversion formula remains valid within this range.
- Temperature range: The TMP35 can measure temperatures from **-10 °C to +125 °C**. The linearity of the output voltage is maintained.

#### Functional explanation of the ADS1115 analog-to-digital converter

##### 1. **Basic principle of the ADS1115**

The ADS1115 operates as follows:

1. The ADC (analog-digital-converter) measures the **analog input voltage** at one or more inputs. (in my case at input **A0**)
2. This voltage is converted into a **digital value** (a 16-bit number).
3. The digital value is transmitted to the host (Raspberry Pi) via the I²C interface.

---
##### 2. **Voltage reference (V_REF)**

The ADS1115 uses an internal reference voltage (V_REF), which is **2.048 V**. This reference is used to convert the measured signal into a digital value.

###### **Gain Amplifier (PGA)**

- The ADS1115 has a programmable gain amplifier (PGA) that adjusts the measuring range.
- The gain influences the **Full-Scale Range (FSR)**, i.e. the maximum voltage range that the ADC can measure.
- Examples of FSR for different PGA settings:
-  ±6.144 V (PGA = 2/3)
-  ±4.096 V (PGA = 1)
-  ±2.048 V (PGA = 2) → Standard
-  ±1.024 V (PGA = 4)
-  ±0.512 V (PGA = 8)
-  ±0.256 V (PGA = 16)

---

##### 3. **Formula for voltage calculation**

The digital value supplied by the ADS1115 depends on the measured voltage and the FSR. The formula is as follows:
<br><br>
- $$ voltage (V) = \frac{{digital~value}~×~FSR}{2^{15}} $$
<br><br>
- $2^{15}=32768$: The ADC works with 16 bits, but the measuring range is bipolar (±FSR), so the maximum resolution is $2^{15}$.
- **Digital value**: The value reported by the ADC is between $-~32768$ (minimum) and $+~32767$ (maximum).
- **FSR**: The full-scale range, depending on the PGA setting.

**Example**:

- Assumed PGA setting: ±2.048 V (standard, FSR = 4.096 V)
- If the digital value is $16384$:
<br><br>
- $$ voltage (V) = \frac{{16384}~ × ~ 4,096}{32768} = 2,048~V $$
<br><br>
##### 4. **Interaction with the TMP35 sensor**:

Set **FSR**:

- Use ±2.048 V (standard), as the TMP35 operates between 0.5 V and 1.75 V.

**Measure voltage**:

- Read the digital value from the ADS1115 and calculate the voltage:
$$ voltage(V) = \frac{{digital~value}~×~ 4,096}{32768} $$

**Convert voltage to temperature**:

- Use the TMP35 formula:
$$T = \frac{voltage(V) - 0,5}{0,01}$$
