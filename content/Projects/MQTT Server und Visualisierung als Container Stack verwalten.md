
Plan ist alles über Container zu verwalten, sodass es beim Wechsel des Servers alles einfach migrierbar ist:

![[Pasted image 20240920125541.png]]

### Voraussetzungen

*Info: auch hier habe ich aus Testzwecken keinen Pi sondern eine DebianVM verwedet und bin per ssh auf der Maschine!*

### Installation von IOTstack und Portainer Einrichtung

1. als erstes OS Updates machen und dann (wenn noch nicht vorhanden) "curl" installieren:

```Bash
sudo apt update 
sudo apt upgrade
sudo apt install curl
```

2. Dann IOTstack via curl installieren und (wenn nicht automatisch von install script) neustarten:

```bash
sudo curl -fsSL https://raw.githubusercontent.com/SensorsIot/IOTstack/master/install.sh | bash 
sudo shutdown -r now
```

3. nach neustart sollte ein neuer ordner "IOTstack" da sein. Dort einmal das "menu.sh" ausführen:

```bash
cd IOTstack
sudo ./menu.sh
```

![[Pasted image 20240920130638.png]]

4. Im IOTstack Menu "Build Stack" ausführen und alle Service (Grafana, InfluxDB, mosquitto, nodered, portainer-ce (*optional*)) auswählen "Leertaste":
	1. **Bei der Option "nodered" kommt beim auswählen ein Fehler dort muss nur dann "Pfeiltaste nach rechts" gedrückt werden und dann die addons list.yml überschrieben werden!**

5. Wenn alles ausgewählt ist "Enter" drücken um stack zu installieren und zu starten. Wenn man dann aus dem Menu geht (via STRG-C) und dann eingibt (sehe unten) sollen alle Container laufen:

```bash
docker ps
```

![[Pasted image 20240920131738.png]]

6. *Optional!* Wenn man Portainer mit benutzt kann man über den Port "9000" via Webbrowser
	1. Default ist "admin"  für user und pw. **Danach PW ändern!** 
	2. Man kann sich dann per GUI alles loggen & ssh usw:
	3. ![[Pasted image 20240920132913.png]]
	4. wenn portainer pw vergessen wird:

```bash
docker run --rm -v /home/*User*/IOTstack/volumes/portainer-ce/data:/data portainer/helper-reset-password
```

### InfluxDB, Nodered & Grafana Konfiguration

1. Nun muss die Datenbank erstellt werden, die alle Daten speichert, welche an den Brocker an das bestimmte Topic "Temp" veröffentlich werden:

```bash
docker exec -it influxdb influx
|Connected to http://localhost:8086 version 1.8.10|
|InfluxDB shell version: 1.8.10|
> CREATE DATABASE *Name der Datenbank*
> show databases
> quit
```

2. Dann über den Port "1880" im Web Node-Red starten und zwei Nodes (MQTT OUT & InfluxDB IN) verbinden:

![[Pasted image 20240920135926.png]]

Dort die IP von dem MQTT Container eintragen, sowie bei der InfluxDB. Bei der InfluxDB Node ist außerdem wichtig das auch das "Measurement" eingetragen wird (unter dem Wert werden alle Daten gespeichert auf der Datenbank):

![[Pasted image 20240920140218.png]]

3. Nun kann man testen ob Daten in der Datenbank gespeichert werden habe dafür ein bash-script:

```bash
#!/bin/bash

# Funktion zum Überprüfen, ob eine Zahl zwischen 15 und 35 liegt
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
  # Hier kannst du dein gewünschtes Preset definieren
  local preset_numbers=(15 19 21 25 28 31 31 29 25 20)
  # Preset-Zahlen in das numbers_array kopieren
  numbers_array=("${preset_numbers[@]}")
}

# Eingabeaufforderung für Preset oder manuelle Eingabe
while true; do
  read -p "Möchtes du das Preset verwenden? (y/n): " use_preset_choice
  if [[ "$use_preset_choice" == "y" || "$use_preset_choice" == "n" ]]; then
    break
  else
    echo "Bitte gebe nur 'y' oder 'n' ein."
  fi
done

if [[ "$use_preset_choice" == "y" ]]; then
  use_preset
else
  # Eingabeaufforderung für 10 Zahlen
  read -p "Gib 10 Zahlen zwischen 15 und 35 ein (durch Leerzeichen getrennt): " numbers
  # Zahlen in ein Array speichern
  numbers_array=($numbers)
fi

# Überprüfung der Zahlen (wird für beide Fälle ausgeführt)
for number in "${numbers_array[@]}"; do
  if ! is_valid_number "$number"; then
    echo "Ungültige Zahl: $number. Bitte nur Zahlen zwischen 15 und 35 eingeben."
    exit 1
  fi
done

# MQTT-Topic
topic="Temp"

# Veröffentliche jede Zahl als separate Nachricht und gib sie aus
for number in "${numbers_array[@]}"; do
  mosquitto_pub -d -t "$topic" -m "$number"
  echo "Gesendet: $number"
  sleep 5
done
```

da nun alles über docker läuft muss kein broker mehr nativ auf der vm laufen. Um weiterhin das script oder generell mosquitto als client (für sub oder pub) zu nutzen reicht die minimale install von mosquitto ohne broker:

```bash
sudo apt install mosquitto-clients
```


dann script ausführen: 

```bash
sudo ./*Name des scripts.sh*
> Möchtes du das Preset verwenden? (y/n): y
Client (null) sending CONNECT
Client (null) received CONNACK (0)
Client (null) sending PUBLISH (d0, q0, r0, m1, 'Temp', ... (2 bytes))
Client (null) sending DISCONNECT
Gesendet: 15
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



4. Nun da alles auf der Datenbank läuft müssen die Daten nur noch visualisiert werden via Grafana (Port 3000):

	1. **Wieder PW setzen!**
	2. dann die Data Source auf InfluxDB setzen: ![[Pasted image 20240920142613.png]]
	3. Und dann konfigurieren:![[172.16.10.29_3000_connections_datasources_edit_adxo9r375fz0gd.png]]
	4. **Wichtig** dass wenn man auf "Save & test" drückt diese Meldung kommt:![[Pasted image 20240920143235.png]]
	5. Nun Dashboard benutzerdefiniert einstellen, so könnte es z.B. aussehen:![[Pasted image 20240920143520.png]]






Wenn man den Container mounten möchte um etwas anzupassen
```bash
docker exec -it <container> bash
```

Wenn pw in grafana vergessen via portainer bash!:

```bash
grafana cli --homepath "/usr/share/grafana" admin reset-admin-password <new password>
```


Um Files die in einem Docker Container befinden zu bearbeiten einfach:

```bash
docker cp <container>:/path/to/file.ext .
```

um eine Kopie auf dem lokalen Rechner (im aktuellem Verzeichnis). Bearbeite die Datei dann lokal mit dem bevorzugten Editor und führe anschließend einen

```bash
docker cp file.ext <container>:/path/to/file.ext
```

um die alte Datei zu ersetzen.

### TMP35 Temperaturmessung inkl. ADS1115 Analog-Digital-Wandler

#### Zusammenfassung der Anschlüsse

| Bauteil       | Funktion        | Verbunden mit                        |
| ------------- | --------------- | ------------------------------------ |
| TMP35 (Pin 1) | VCC             | 3.3V-Schiene des Breadboards         |
| TMP35 (Pin 2) | Vout            | A0 (Kanal 0) des ADS1115             |
| TMP35 (Pin 3) | GND             | GND-Schiene des Breadboards          |
| ADS1115 VDD   | Stromversorgung | 3.3V-Schiene des Breadboards         |
| ADS1115 GND   | Masse           | GND-Schiene des Breadboards          |
| ADS1115 SCL   | Taktleitung     | GPIO 3 (SCL, Pin 5) des Raspberry Pi |
| ADS1115 SDA   | Datenleitung    | GPIO 2 (SDA, Pin 3) des Raspberry Pi |
| ADS1115 ADDR  | Adresse         | GND (setzt I²C-Adresse auf 0x48)     |
Sobald alles beim Breadboard mit der GPIO des PIs verbunden ist, muss I²C aktiviert werden.

```bash
sudo raspi-config
```

Dann in dem "raspi-config" Menu "Interface Options" auswählen + Enter

![[Pasted image 20241116091759.png]]

In den "Interface Options" "I2C" auswählen + Enter und I2C mit "yes" aktivieren

![[Pasted image 20241116091947.png]]

![[Pasted image 20241116092029.png]]

Danach den Pi einmal Neustarten:

```bash
sudo shutdown -r now
```

Nun kann man mit dem "i2cdetect-Tool" überprüfen, ob die I²C-Verbindung des ADS1115 richtig ist:

```bash
sudo i2cdetect -y 1
```

In der ausgegebenen Tabelle solltest du die Adresse des ADS1115 sehen, die standardmäßig **0x48** ist (falls der ADDR-Pin mit GND verbunden wurde):

Die Ausgabe sollte ungefähr so aussehen:
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
Je nachdem wie du die 3.3V-Schiene & die GND-Schiene auf dem Breadboard gelegt hast kann die Tabelle ein wenig abweichend aussehen:

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

**Wichtig ist nur das der Wert "48" angezeigt wird!**

Nun wird das System geupdatet & Python installiert:

```bash
sudo apt update
sudo apt install -y python3-pip
```

Nachdem Python installiert wurde, kann man eine virtuelle Umgebung für das Python Skript erstellt werden:

```python
python3 -m venv ~/ads1115_env # der Name der Umgebung ist ein Beispiel
```
zum aktivieren der Umgebung:

```bash
source ~/ads1115_env/bin/activate
```
um die Umgebung zu verlassen:

```bash
deactivate
```
Dann werden die benötigten Bibliotheken für die Umgebung installiert:

```python
pip install adafruit-blinka
pip install adafruit-circuitpython-ads1x15
```

Nun wird das Python-Skript zur Temperaturmessung erstellt:

```bash
nano test_ads1115.py *Man kann natürlich auch einen anderen Editor benutzen :)*
```

Das ist der Python Code:

```Python
import time
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn

# I2C-Verbindung herstellen
i2c = busio.I2C(board.SCL, board.SDA)

# ADS1115 initialisieren
ads = ADS.ADS1115(i2c)
chan = AnalogIn(ads, ADS.P0)  # A0 für TMP35

def convert_to_temperature(voltage):
    # TMP35 gibt 10 mV pro °C aus, Offset 0.5V für 0°C
    temperature = (voltage - 0.5) * 100
    return temperature

try:
    while True:
        voltage = chan.voltage
        temperature = convert_to_temperature(voltage)
        print(f"Spannung: {voltage:.2f} V, Temperatur: {temperature:.2f} °C")
        time.sleep(1)
except KeyboardInterrupt:
    print("Messung beendet")
```
Dann speichern und mit diesem Befehl ausführen (**überprüfe das du in der Umgebung bist!**):

```Python
python test_ads1115.py
```

So sollte die Ausgabe dann aussehen:

```Python
(ads1115_env) pimqtt@pimqtt:~/scripts $ python test_ads1115.py
Spannung: 0.63 V, Temperatur: 12.52 °C
Spannung: 0.62 V, Temperatur: 12.50 °C
Spannung: 0.62 V, Temperatur: 12.46 °C
Spannung: 0.62 V, Temperatur: 12.44 °C
Spannung: 0.63 V, Temperatur: 12.58 °C
Spannung: 0.63 V, Temperatur: 12.90 °C
Spannung: 0.63 V, Temperatur: 12.55 °C
Spannung: 0.63 V, Temperatur: 12.58 °C
Spannung: 0.62 V, Temperatur: 12.45 °C
Spannung: 0.62 V, Temperatur: 12.45 °C
Spannung: 0.63 V, Temperatur: 13.06 °C
Spannung: 0.62 V, Temperatur: 12.44 °C
Spannung: 0.63 V, Temperatur: 12.56 °C
Spannung: 0.65 V, Temperatur: 14.64 °C
Spannung: 0.62 V, Temperatur: 12.49 °C
Spannung: 0.63 V, Temperatur: 12.64 °C
Spannung: 0.63 V, Temperatur: 13.34 °C
```

Nun kann man testen, ob die Daten zur Datenbank via MQTT auch gesendet werden, dafür müssen wir das Skript ein wenig anpassen (in diesem Fall schreibe einfach ein neues Skript):

```Python
import time
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
import subprocess

# I2C-Verbindung herstellen
i2c = busio.I2C(board.SCL, board.SDA)

# ADS1115 initialisieren
ads = ADS.ADS1115(i2c)
chan = AnalogIn(ads, ADS.P0)  # A0 für TMP35

# MQTT-Konfiguration
mqtt_broker = "x.x.x.x"  # IP-Adresse des MQTT-Brokers
mqtt_port = "1883" # Port des MQTT-Brokers
mqtt_topic = "Temp" # Thema der Nachricht

# Funktion zur Umrechnung der Spannung in Temperatur
def convert_to_temperature(voltage):
    # TMP35 gibt 10 mV pro °C aus, Offset 0.5V für 0°C
    temperature = (voltage - 0.5) * 100
    return temperature

# Funktion zum Senden einer Nachricht mit Mosquitto Client
def publish_mqtt_message(topic, payload):
    try:
        subprocess.run(
            ["mosquitto_pub", "-h", mqtt_broker, "-p", mqtt_port, "-t", mqtt_topic, "-m", payload],
            check=True
        )
        print(f"MQTT Nachricht gesendet: {payload}°C")
    except subprocess.CalledProcessError as e:
        print(f"Fehler beim Senden der MQTT-Nachricht: {e}")

try:
    count = 0  # Zähler für die Messungen
    while True:
        voltage = chan.voltage
        temperature = convert_to_temperature(voltage)
        print(f"Spannung: {voltage:.2f} V, Temperatur: {temperature:.2f} °C")

        # Alle 5 Messungen die Temperatur an den MQTT-Broker senden
        count += 1
        if count % 5 == 0:
            payload = f"{temperature:.2f}"
            publish_mqtt_message(mqtt_topic, payload)

        time.sleep(1)

except KeyboardInterrupt:
    print("Messung beendet")
```

Bevor du das Skript nun ausführst, überprüfe ob deine NodeRED-Verbindung vom Broker zur Datenbank angepasst werden, sollte entweder das MQTT-Topic nicht übereinstimmen und oder das Measurement deiner InfluxDB Datenbank nicht passen (*im meinem Kontext habe ich eine neues Measurement erstellt, da ich noch die simulierten Tempdaten im alten Measurement hatte*)

Sollte dann alles passen kannst du testweise das Skript ausführen:

```Python
(ads1115_env) pimqtt@pimqtt:~/scripts $ python test_ads1115_mosquitto.py
Spannung: 0.66 V, Temperatur: 16.11 °C
Spannung: 0.67 V, Temperatur: 16.80 °C
Spannung: 0.67 V, Temperatur: 16.79 °C
Spannung: 0.67 V, Temperatur: 16.65 °C
Spannung: 0.67 V, Temperatur: 16.86 °C
MQTT Nachricht gesendet: 16.86°C
Spannung: 0.66 V, Temperatur: 16.26 °C
Spannung: 0.66 V, Temperatur: 16.00 °C
Spannung: 0.66 V, Temperatur: 16.28 °C
Spannung: 0.66 V, Temperatur: 16.01 °C
Spannung: 0.66 V, Temperatur: 16.19 °C
MQTT Nachricht gesendet: 16.19°C
Spannung: 0.67 V, Temperatur: 16.80 °C
Spannung: 0.67 V, Temperatur: 16.79 °C
Spannung: 0.67 V, Temperatur: 16.76 °C
Spannung: 0.67 V, Temperatur: 16.81 °C
Spannung: 0.67 V, Temperatur: 16.83 °C
MQTT Nachricht gesendet: 16.83°C
```


sobald die ersten Daten zur Datenbank gesendet wurden, sollte in Grafana auch das neue Measurement auswählbar sein:

![[Pasted image 20241117102822.png]]

Wenn man ein "Gauge" Chart in Grafana verwendet ist es auch wichtig in den "Value Options" das richtige Fields (in meinem Fall "tempdata_real.mean") auswählt:

![[Pasted image 20241117103225.png]]


### Funktionserklärung Sensor TMP35 & Analog-Digital-Wandler ADS1115
#### Umrechnungsformel von Spannung zu Temperatur **TMP35**

#### 1. **Grundlage der Formel**

Die **TMP35-Ausgangsspannung** ist linear zur gemessenen Temperatur:
$$
V_{\text{out}} = m \cdot T + b
$$
- $Vout$ ​: Ausgangsspannung (Volt)
- $T$ : Temperatur (°C)
- $m$ : Steigung, d. h. wie stark die Spannung pro Temperaturgrad zunimmt (beim TMP35: **10 mV/°C**).
- $b$ : Offset, d. h. die Ausgangsspannung bei 0°C (beim TMP35: **0,5 V**).

Die Formel zur Berechnung der Temperatur muss dann nur noch umgestellt werden:
$$ T = \frac{V_{\text{out}} - b}{m} $$
Diese Formel beschreibt die Umrechnung von der Ausgangsspannung (in Volt) zur Temperatur (in Grad Celsius, °C).

---

### 2. **Aufschlüsselung der Formel**

#### a. **Offset von 0,5 V**:

- Laut der Doku des Sensors beträgt die Ausgangsspannung des TMP35 bei **0 °C** genau **0,5 V**.
- Um die Temperatur zu berechnen, wird daher die gemessene Spannung um diesen Wert reduziert: 
  $$ V_{\text{out}} - 0,5 $$
#### b. **Skalierungsfaktor von 100**:

- Der TMP35 hat eine Empfindlichkeit von **10 mV/°C** (Millivolt pro Grad Celsius).
- Das bedeutet, dass eine Änderung der Spannung um **1 V** einer Temperaturänderung von **100 °C** entspricht.
- Daher wird die differenzierte Spannung mit dem Faktor **100** multipliziert: 
  $$ (V_{\text{out}} - 0,5) \cdot 100 $$
  
  - In der Formel wurde der Skalierungsfaktor ($m$) dann umgestellt werden auf $T = \frac{}{0,01}$
  
---
### 3. **Formelbeispiel**

Angenommen, der TMP35 liefert eine Ausgangsspannung von **0.75 V**:

1. Abzug des Offsets: $$0,75−0,5=0,25$$
2. Multiplikation mit dem Skalierungsfaktor:  <br>
$$0,25×100=25°C$$
3. Formelzusammenfassung: <br> $$ T = \frac{0,75 - 0,5}{0,01} = 25°C $$

Die gemessene Temperatur beträgt somit **25 °C**.

---
### 4. **Zusätzliche Hinweise**

- Der TMP35 ist auf eine Versorgungsspannung von **3 bis 5,5 V** ausgelegt. Die Umrechnungsformel bleibt innerhalb dieses Bereichs gültig.
- Temperaturbereich: Der TMP35 kann Temperaturen von **-10 °C bis +125 °C** messen. Dabei bleibt die Linearität der Ausgangsspannung erhalten.

#### Funktionserklärung des ADS1115 Analog-Digital-Wandler

### 1. **Grundprinzip des ADS1115**

Der ADS1115 arbeitet wie folgt:

1. Der ADC (Analog-Digital-Converter) misst die **analoge Eingangsspannung** an einem oder mehreren Eingängen. (in meinem Fall im Eingang **A0**)
2. Diese Spannung wird in einen **digitalen Wert** (ein 16-Bit-Zahl) umgewandelt.
3. Der digitale Wert wird über die I²C-Schnittstelle an den Host (Raspberry Pi) übertragen.

---
### 2. **Spannungsreferenz (V_REF)**

Der ADS1115 verwendet eine interne Referenzspannung (V_REF), die bei **2,048 V** liegt. Diese Referenz wird für die Umrechnung des gemessenen Signals in einen digitalen Wert genutzt.

#### **Gain Amplifier (PGA)**

- Der ADS1115 hat einen programmierbaren Verstärker (PGA), der den Messbereich anpasst.
- Die Verstärkung beeinflusst den **Full-Scale Range (FSR)**, also den maximalen Spannungsbereich, den der ADC messen kann.
- Beispiele für FSR bei verschiedenen PGA-Einstellungen:
-  ±6,144 V (PGA = 2/3)
-  ±4,096 V (PGA = 1)
-  ±2,048 V (PGA = 2) → Standard
-  ±1,024 V (PGA = 4)
-  ±0,512 V (PGA = 8)
-  ±0,256 V (PGA = 16)

---

### 3. **Formel zur Spannungsberechnung**

Der digitale Wert, den der ADS1115 liefert, hängt von der gemessenen Spannung und dem FSR ab. Die Formel lautet:

$$ Spannung (V) = \frac{{Digitalwert}~×~FSR}{2^{15}} $$

- $2^{15}=32768$: Der ADC arbeitet mit 16 Bit, aber der Messbereich ist bipolar (±FSR), daher ist die maximale Auflösung $2^{15}$.
- **Digitalwert**: Der vom ADC gemeldete Wert liegt zwischen $−~32768$ (Minimum) und $+~32767$ (Maximum).
- **FSR**: Der Full-Scale Range, abhängig von der PGA-Einstellung.

**Beispiel**:

- Angenommene PGA-Einstellung: ±2.048 V (Standard, FSR = 4.096 V)
- Wenn der digitale Wert $16384$ beträgt:
  $$ Spannung (V) = \frac{{16384}~ × ~ 4,096}{32768} = 2,048~V $$

#### Zusammenspiel mit dem TMP35 Sensor:

**FSR einstellen**:

- Verwende ±2.048 V (Standard), da der TMP35 zwischen 0.5 V und 1.75 V arbeitet.

**Spannung messen**:

- Lies den digitalen Wert aus dem ADS1115 und berechne die Spannung mit:
 $$ Spannung (V) = \frac{{Digitalwert}~×~ 4,096}{32768} $$
 **Spannung in Temperatur umrechnen**:

- Nutze die TMP35-Formel:
$$T = \frac{Spannung(V) - 0,5}{0,01}$$
