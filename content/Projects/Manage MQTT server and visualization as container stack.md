
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

und bei der Datenbank überprüfen:

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
