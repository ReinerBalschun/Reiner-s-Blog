
### Einleitung

Dieses Projekt dreht sich um ein IoT-gestütztes Temperaturmesssystem, das auf einem Raspberry Pi 4 läuft. Ziel ist es, Temperatur- und Feuchtigkeitsdaten mithilfe eines DHT11-Sensors zu erfassen, diese per MQTT zu übertragen, in einer Datenbank zu speichern, in einer grafischen Oberfläche auszuwerten. Neben der reinen Messwerterfassung ermöglicht das System auch eine automatisierte Steuerung eines Ventilators, falls eine bestimmte Temperatur überschritten wird oder auch manuell steuerbar per App.

---
### Aufbau des Systems

Das Projekt gliedert sich in drei zentrale Bereiche: **Hardware, Backend und Frontend**.

Hardware:

![[Pasted image 20250204150207.png]]


Services:

![[Pasted image 20250204160807.png]]

Mosquitto MQTT Broker    |   Noder-RED  |   InfluxDB  |  Grafana   (allle Services jeweils als eigener Docker Container!)


#### 1. Hardware

- **Raspberry Pi 4** als zentrale Steuereinheit
- **DHT11-Sensor** zur Temperatur- und Feuchtigkeitsmessung
- **Zwei SSD1306-OLED-Displays** (eines für lokale Anzeige von Messwerten, das andere für Systemstatus)
- **5V-Relais-Modul inkl. externe Stromquelle** zur Ansteuerung des Ventilators
- **Ventilator als aktiver Akteur**, der automatisch bei Temperaturüberschreitung durch den DHT11 aktiviert wird
- **Breadboard**, um alle Komponenten zu verbinden und flexibel zu testen

#### 2. Software und Backend-System

- **Python-Skript**, um Messwerte auszulesen und per **MQTT** zu veröffentlichen
- **Mosquitto MQTT-Broker**, um die Kommunikation zwischen Sensoren und Steuerungseinheiten zu ermöglichen
- **InfluxDB**, eine Zeitseriendatenbank zur Speicherung und effizienten Analyse der erfassten Messwerte
- **Node-RED**, eine visuelle Entwicklungsumgebung zur Verarbeitung und Weiterleitung der Sensordaten
- **Docker & IOTstack**, um alle Dienste in separaten Containern zu betreiben und die Wartung sowie Skalierbarkeit zu optimieren

#### Warum Docker statt einer nativen Installation?

Anstatt die Software direkt auf dem Raspberry Pi zu installieren, wird ein **Container-Stack mit Docker und IOTstack** genutzt. Dies hat mehrere Vorteile:

- **Modularität**: Jeder Dienst läuft isoliert in seinem eigenen Container und kann unabhängig aktualisiert oder neugestartet werden.
- **Einfache Reproduzierbarkeit**: Das gesamte Setup kann über eine **Docker-Compose-Datei** wiederhergestellt werden.
- **Geringerer Wartungsaufwand**: Software-Abhängigkeiten und Updates werden innerhalb der Container verwaltet, ohne dass sie sich gegenseitig beeinflussen.
- **Bessere Performance auf dem Raspberry Pi**: Durch die Trennung der Services bleibt das System stabil und zuverlässig.

#### 3. Frontend und Visualisierung

- **Grafana Dashboard** zur grafischen Darstellung der Temperatur- und Feuchtigkeitsdaten aus **InfluxDB**
- **React Native App**, die folgende Funktionen bietet:
    - **Anzeige der Echtzeit-Messwerte über einen eingebetteten Share-Link aus Grafana** (mittels eines **WebView-Components** innerhalb der App)
    - **Steuerung des Ventilators über MQTT over WebSockets**, da React Native in einer isolierten JavaScript-Sandbox läuft und keine direkten TCP-Verbindungen nutzen kann, jedoch über WebSockets vollständig MQTT-Nachrichten senden und empfangen kann
    - Übersicht über historische Messwerte und Alarme


---
### Installation von IOTstack und Portainer Einrichtung

*Hinweis getestet auf einem Pi 4 Model B*

1. Als erstes OS Updates machen und dann (wenn noch nicht vorhanden) "curl" installieren:

```Bash
sudo apt update 
sudo apt upgrade
sudo apt install curl
```

2. Dann IOTstack via curl installieren und (wenn nicht automatisch von install script) Pi neustarten:

```bash
curl -fsSL https://raw.githubusercontent.com/SensorsIot/IOTstack/master/install.sh | bash 
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

### InfluxDB, NedRed & Grafana Konfiguration inkl. Funktionstest

7. Nun muss die Datenbank erstellt werden, die alle Daten speichert, welche an den Brocker an das bestimmte Topic "Temp" veröffentlich werden:

```bash
docker exec -it influxdb influx
|Connected to http://localhost:8086 version 1.8.10|
|InfluxDB shell version: 1.8.10|
> CREATE DATABASE *Name der Datenbank*
> show databases
> quit
```

8. Dann über den Port "1880" im Web Node-Red starten und zwei Nodes (MQTT OUT & InfluxDB IN) verbinden:

![[Pasted image 20240920135926.png]]

Dort die IP von dem MQTT Container eintragen, sowie bei der InfluxDB. Bei der InfluxDB Node ist außerdem wichtig das auch das "Measurement" eingetragen wird (unter dem Wert werden alle Daten gespeichert auf der Datenbank):

![[Pasted image 20240920140218.png]]

9. Nun kann man testen ob Daten in der Datenbank gespeichert werden habe dafür ein bash-script:

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



10. Nun da alles auf der Datenbank läuft müssen die Daten nur noch visualisiert werden via Grafana (Port 3000):

	1. **Wieder PW setzen!**
	2. dann die Data Source auf InfluxDB setzen: ![[Pasted image 20240920142613.png]]
	3. Und dann konfigurieren:![[172.16.10.29_3000_connections_datasources_edit_adxo9r375fz0gd.png]]
	4. **Wichtig** dass wenn man auf "Save & test" drückt diese Meldung kommt:![[Pasted image 20240920143235.png]]
	5. Nun Dashboard benutzerdefiniert einstellen, so könnte es z.B. aussehen:![[Pasted image 20240920143520.png]]



#### Extra Befehle:


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


---
### Hardware-Zusammenbau des Temperaturmesssystems

Nachdem die Software-Grundlagen und die Docker-Container auf dem Raspberry Pi 4 eingerichtet wurden, folgt nun der Aufbau der **Hardware-Komponenten**. Dieser Abschnitt beschreibt, wie die verschiedenen Sensoren und Aktoren angeschlossen, miteinander verbunden und getestet werden.

#### 1. Übersicht über die verwendete Hardware

Das System besteht aus folgenden Komponenten:

- **Raspberry Pi 4** als zentrale Steuereinheit
- **DHT11-Sensor** zur Messung von Temperatur und Luftfeuchtigkeit
- **Zwei SSD1306-OLED-Displays** (jeweils für die lokale Anzeige von Messwerten und den Systemstatus)
- **5V-Relais-Modul**, um den Ventilator zu steuern
- **Ventilator**, der bei Überschreitung eines Temperaturschwellenwerts aktiviert wird
- **Externes 5V-Netzteil (Handyladegerät mit modifiziertem Kabel)** zur Stromversorgung des Relais und des Ventilators
- **Breadboard**, um alle Komponenten miteinander zu verbinden und flexibel zu verdrahten
- **Jumper-Kabel (Male-to-Female & Male-to-Male)** für die Signal- und Stromverbindungen


#### 2. Schaltplan und Verkabelung

Die Verbindung der Komponenten erfolgt über ein **Breadboard**, damit Änderungen leicht vorgenommen werden können. Die einzelnen Komponenten werden über **GPIO-Pins** des Raspberry Pi angeschlossen, mit Ausnahme des Ventilators und des Relais, die **eine separate 5V-Stromversorgung benötigen**.

##### DHT11-Sensor (Temperatur & Luftfeuchtigkeit)

|DHT11-Pin|Verbindung|
|---|---|
|VCC|3.3V (Pin 1 am Pi)|
|GND|GND (Pin 9 am Pi)|
|DATA|GPIO 17 (Pin 11 am Pi)|

Der DHT11 benötigt keinen externen Widerstand, da er bereits einen internen Pull-Up-Widerstand besitzt.

##### SSD1306-OLED-Displays (64x48 und 128x64)

Die beiden Displays werden über das **I²C-Protokoll** mit dem Raspberry Pi verbunden. Beide SSD1306-Displays nutzen die gleichen Anschlüsse.

|SSD1306-Pin|Verbindung|
|---|---|
|VCC|3.3V (Pin 1 am Pi)|
|GND|GND (Pin 9 am Pi)|
|SDA|GPIO 2 (I2C1 SDA, Pin 3 am Pi)|
|SCL|GPIO 3 (I2C1 SCL, Pin 5 am Pi)|

Da beide Displays über I²C kommunizieren, ist es wichtig, dass sie unterschiedliche **I²C-Adressen** haben. Falls nötig, kann eine Adresse über einen Jumper am Display geändert werden.

##### 5V-Relais-Modul (zur Steuerung des Ventilators)

Das **Relais-Modul** dient als Schalter für den Ventilator, da dieser nicht direkt über den Raspberry Pi gesteuert werden kann (zu hohe Stromaufnahme). **Das Relais wird über eine externe 5V-Stromquelle gespeist, um den Raspberry Pi nicht zu überlasten.**

|Relais-Pin|Verbindung|
|---|---|
|VCC|**5V vom externen Netzteil**|
|GND|**GND vom externen Netzteil**|
|IN1|GPIO 27 (Pin 13 am Pi)|

Das **Steuersignal (IN1)** kommt weiterhin vom Raspberry Pi, jedoch wird die tatsächliche Last über die externe 5V-Stromquelle geschaltet.

##### Ventilator (5V-Lüfter)

Der **Ventilator** wird über das **Relais-Modul** geschaltet und erhält seinen Strom aus der **externen 5V-Stromquelle**.

|Ventilator-Kabel|Verbindung|
|---|---|
|Rotes Kabel (+)|Relais-Ausgang (NO – Normally Open)|
|Schwarzes Kabel (-)|**GND vom externen Netzteil**|

Der Ventilator wird nur eingeschaltet, wenn das Relais durch das Python-Skript oder die **React Native App über MQTT** aktiviert wird.

##### Externe Stromquelle (Handyladegerät)

Da der **Ventilator und das Relais-Modul** nicht direkt über den Raspberry Pi mit Strom versorgt werden, wird eine separate **5V-Stromquelle** verwendet. Dafür wurde ein **Handyladegerät modifiziert**, indem das USB-Kabel aufgeschnitten wurde, um an die **roten (+5V) und schwarzen (GND) Kabel** zu gelangen.

|Kabel vom Netzteil|Verbindung|
|---|---|
|**Rotes Kabel (+5V)**|VCC des Relais-Moduls und des Ventilators|
|**Schwarzes Kabel (GND)**|GND des Relais-Moduls und des Ventilators|

⚠ **Wichtig:**

- Die **GND-Leitung der externen Stromquelle und des Raspberry Pi müssen verbunden werden**, damit beide Systeme eine gemeinsame Masse haben.
- **Die 5V des Netzteils dürfen nicht direkt mit dem Raspberry Pi verbunden werden!**

#### I²C-Aktivierung für die OLED-Displays

Bevor die **SSD1306- und SH1106-OLED-Displays** genutzt werden können, muss das **I²C-Protokoll** auf dem Raspberry Pi aktiviert werden:


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

Nun kann man mit dem "i2cdetect-Tool" überprüfen, ob die I²C-Verbindung der beiden Monitore richtig ist:

```bash
sudo i2cdetect -y 1
```

Die Ausgabe sollte ungefähr so aussehen:

```lua
    0  1  2  3  4  5  6  7  8  9  A  B  C  D  E  F
00:          -- -- -- -- -- -- -- -- -- -- -- -- --
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- 3c 3d -- --
40: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
70: -- -- -- -- -- -- -- --
```

- Falls beide Displays **die gleiche Adresse haben**, gibt es zwei Lösungen:
    
    - **Hardware-Umlöten der I²C-Adresse**: Manche Displays haben Lötpads oder Jumper, um die Adresse zu ändern (z. B. von `0x3C` auf `0x3D`).
    - **Verwendung eines I²C-Multiplexers**: Falls keine Adresse umgestellt werden kann, kann ein **I²C-Multiplexer** verwendet werden, um beide Displays über unterschiedliche I²C-Kanäle anzusprechen.
- Falls beide Displays nun **unterschiedliche Adressen** haben, kann mit dem eigentlichen Display-Test begonnen werden.

#### Einrichtung der Python-Umgebung für die Display-Tests

Um die OLED-Displays zu testen, sollte eine **virtuelle Python-Umgebung** eingerichtet werden:

```bash
sudo apt install python3-venv -y
```

Erstelle und aktiviere eine virtuelle Umgebung:

```bash
python3 -m venv oled_env
source oled_env/bin/activate
```

Installiere die benötigten Bibliotheken für beide Displays:

```bash
pip install adafruit-circuitpython-ssd1306 luma.oled
```

#### Testskript für die OLED-Displays

Das folgende Python-Skript testet beide Displays und zeigt einen einfachen Text an:

```python
import time
import board
import busio
from PIL import Image, ImageDraw, ImageFont

# Bibliotheken für die verschiedenen Displays importieren
from adafruit_ssd1306 import SSD1306_I2C
from luma.core.interface.serial import i2c
from luma.oled.device import sh1106

# I²C-Initialisierung
i2c_bus = busio.I2C(board.SCL, board.SDA)

# SSD1306 Display (klein, 64x48)
oled_ssd1306 = SSD1306_I2C(64, 48, i2c_bus, addr=0x3C)

# SH1106 Display (groß, 128x64)
serial = i2c(port=1, address=0x3D)
oled_sh1106 = sh1106(serial, width=128, height=64)

# Testanzeige für SSD1306 (kleines Display)
oled_ssd1306.fill(0)
oled_ssd1306.text("SSD1306 OK", 0, 10, 1)
oled_ssd1306.show()

# Testanzeige für SH1106 (großes Display)
image = Image.new("1", (128, 64), "black")
draw = ImageDraw.Draw(image)
font = ImageFont.load_default()
draw.text((10, 25), "SH1106 OK", font=font, fill="white")
oled_sh1106.display(image)

time.sleep(5)

# Displays löschen
oled_ssd1306.fill(0)
oled_ssd1306.show()
oled_sh1106.clear()
```

Nach dem Ausführen dieses Skripts sollten die beiden Displays für 5 Sekunden die Meldungen **"SSD1306 OK"** und **"SH1106 OK"** anzeigen.

Falls eines der Displays **keine Anzeige** hat:

- Überprüfe mit `i2cdetect -y 1`, ob die Adresse korrekt erkannt wurde.
- Stelle sicher, dass die **richtige Bibliothek für das jeweilige Display** verwendet wird.

#### Test des DHT11-Sensors

Nach der Überprüfung der Displays kann der **DHT11-Sensor getestet werden**, um sicherzustellen, dass Temperatur- und Feuchtigkeitsdaten korrekt ausgelesen werden.

Falls noch nicht installiert, müssen die Adafruit-DHT-Bibliotheken installiert werden:

```bash
pip install adafruit-circuitpython-dht
```

Testskript für den DHT11-Sensor:

```python
import adafruit_dht
import board
import time

# DHT11 an GPIO 17 angeschlossen
dhtDevice = adafruit_dht.DHT11(board.D17)

try:
    while True:
        try:
            # Temperatur und Luftfeuchtigkeit auslesen
            temperature = dhtDevice.temperature
            humidity = dhtDevice.humidity

            if humidity is not None and temperature is not None:
                print(f"Temperatur: {temperature:.1f}°C, Luftfeuchtigkeit: {humidity:.1f}%")
            else:
                print("Fehler beim Lesen des DHT11-Sensors!")

        except RuntimeError as error:
            print(f"Lesefehler: {error}")

        time.sleep(2)

except KeyboardInterrupt:
    print("Test beendet")
finally:
    dhtDevice.exit()

```
Falls die Ausgabe **keine Werte** liefert:

- Überprüfe die **GPIO-Verbindung** des Sensors.
- Stelle sicher, dass der Sensor an **3.3V und GND** angeschlossen ist.

---
### Komplettes Zusammenspiel der Hardware mit dem Python-Skript

Nachdem alle **Hardwarekomponenten einzeln getestet** wurden, erfolgt nun die **Integration aller Komponenten** in ein gemeinsames Python-Skript. Das Ziel dieses Abschnitts ist es zu beschreiben, wie die Sensorwerte **regelmäßig erfasst, verarbeitet und über MQTT versendet** werden, während der **Ventilator gesteuert** und die Messwerte auf den **OLED-Displays dargestellt** werden.

#### Übersicht über die Funktionen des Skripts

Das Python-Skript erfüllt folgende Aufgaben:

1. **DHT11-Sensor auslesen** → Temperatur- und Luftfeuchtigkeitswerte erfassen
2. **MQTT-Kommunikation** → Alle 5 Messungen Temperatur- und Feuchtigkeitswerte an den Broker senden
3. **Ventilatorsteuerung** → Bei jeder 5. Messung den Ventilator für 2 Sekunden aktivieren
4. **Messwerte auf zwei OLED-Displays anzeigen**
    - **Großes SH1106-Display (128x64)** → Zeigt aktuelle Temperatur, Luftfeuchtigkeit und Uhrzeit
    - **Kleines SSD1306-Display (64x48)** → Zeigt Anzahl der erfassten Datenpunkte aus InfluxDB
5. **Messwerte an einen Apache2-Webserver senden** (Optional, ist nur bei uns extra hinzugefügt worden für eine MQTT Alternative über HTTP)
6. **Fehlermanagement** → Falls ein Sensor nicht ausgelesen werden kann, wird dies erkannt und behandelt
7. **Saubere Beendigung des Programms** → Aufräumen der GPIO-Pins und Löschen der Displays

####  Aufbau des Python-Skripts

Das folgende **Python-Skript integriert alle Komponenten**:

```python
import time
import board
import adafruit_dht
from datetime import datetime
from luma.core.interface.serial import i2c
from luma.oled.device import sh1106
from adafruit_ssd1306 import SSD1306_I2C
from PIL import Image, ImageDraw, ImageFont
import subprocess
import RPi.GPIO as GPIO
import requests

# DHT11-Sensor initialisieren
dhtDevice = adafruit_dht.DHT11(board.D17)

# I2C-Setup für das SH1106-Display (groß)
serial_large = i2c(port=1, address=0x3D)
oled_large = sh1106(serial_large, width=128, height=64)

# I2C-Setup für das SSD1306-Display (klein)
i2c_small = board.I2C()
oled_small = SSD1306_I2C(64, 48, i2c_small, addr=0x3C)

# Bild für Pillow erstellen
width_large, height_large = oled_large.width, oled_large.height
image_large = Image.new("1", (width_large, height_large))
draw_large = ImageDraw.Draw(image_large)

width_small, height_small = oled_small.width, oled_small.height
image_small = Image.new("1", (width_small, height_small))
draw_small = ImageDraw.Draw(image_small)

# Schriftart definieren
font = ImageFont.load_default()

# MQTT-Konfiguration
mqtt_broker = "192.168.182.45"
mqtt_port = "1883"
mqtt_topic_temp = "DHT11/Temperatur"
mqtt_topic_humidity = "DHT11/Luftfeuchtigkeit"

# GPIO-Setup für das Relais
RELAY_PIN = 18
GPIO.setmode(GPIO.BCM)
GPIO.setup(RELAY_PIN, GPIO.OUT, initial=GPIO.HIGH)  # Relais auf HIGH (aus)

# Funktion, um MQTT-Nachrichten zu senden
def publish_mqtt_message(topic, payload):
    try:
        subprocess.run(
            ["mosquitto_pub", "-h", mqtt_broker, "-p", mqtt_port, "-t", topic, "-m", payload],
            check=True
        )
        print(f"MQTT Nachricht gesendet: Topic={topic}, Payload={payload}")
    except subprocess.CalledProcessError as e:
        print(f"Fehler beim Senden der MQTT-Nachricht: {e}")

# Funktion zum Aktualisieren des großen Displays
def update_large_display(temp, hum):
    draw_large.rectangle((0, 0, width_large, height_large), outline=0, fill=0)
    current_time = datetime.now().strftime("%H:%M:%S")
    draw_large.text((0, 0), f"Zeit: {current_time}", font=font, fill=255)
    draw_large.text((0, 20), f"Temp: {temp:.1f}°C", font=font, fill=255)
    draw_large.text((0, 40), f"Luftfeucht: {hum:.1f}%", font=font, fill=255)
    oled_large.display(image_large)

# Funktion zum Abrufen der Anzahl der Messwerte aus InfluxDB
def get_influxdb_count():
    INFLUXDB_HOST = "IP-Adresse"
    INFLUXDB_PORT = "8086"
    INFLUXDB_DATABASE = "tempdb"
    INFLUXDB_MEASUREMENT = "DHT11_T"

    INFLUX_QUERY = f"select count(*) from {INFLUXDB_MEASUREMENT}"
    url = f"http://{INFLUXDB_HOST}:{INFLUXDB_PORT}/query"
    params = {"db": INFLUXDB_DATABASE, "q": INFLUX_QUERY}

    try:
        response = requests.post(url, data=params)
        response_json = response.json()
        count = response_json["results"][0]["series"][0]["values"][0][1]
        return count
    except Exception as e:
        print(f"Fehler beim Abrufen der InfluxDB-Daten: {e}")
        return "N/A"

# Funktion zum Aktualisieren des kleinen Displays
def update_small_display():
    count = get_influxdb_count()
    draw_small.rectangle((0, 0, width_small, height_small), outline=0, fill=0)
    draw_small.text((5, 15), "Anzahl:", font=font, fill=255)
    draw_small.text((5, 25), str(count), font=font, fill=255)
    oled_small.image(image_small)
    oled_small.show()
    time.sleep(0.5)

# Funktion zum Steuern des Ventilators
def stop_fan_for_2_seconds():
    print("Ventilator wird gestartet...")
    GPIO.output(RELAY_PIN, GPIO.LOW)
    time.sleep(2)
    GPIO.output(RELAY_PIN, GPIO.HIGH)
    print("Ventilator wird gestoppt.")

# Funktion zum Senden der Temperatur an den Webserver
def send_temperature_to_webserver(temp):
    url = f"http://"IP-Adresse"/temperatur/include/temp_api.php?temp={temp}"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            print(f"Temperatur erfolgreich an Webserver gesendet: {temp}°C")
        else:
            print(f"Fehler beim Senden der Temperatur. Statuscode: {response.status_code}")
    except Exception as e:
        print(f"Fehler bei der Verbindung zum Webserver: {e}")

# Hauptschleife
try:
    count = 0
    while True:
        try:
            temperature = dhtDevice.temperature
            humidity = dhtDevice.humidity

            if humidity is not None and temperature is not None:
                print(f"Temperatur: {temperature:.1f} °C, Luftfeuchtigkeit: {humidity:.1f} %")
                count += 1

                if count % 5 == 0:
                    publish_mqtt_message(mqtt_topic_temp, f"{temperature:.1f}")
                    publish_mqtt_message(mqtt_topic_humidity, f"{humidity:.1f}")
                    stop_fan_for_2_seconds()
                    update_large_display(temperature, humidity)
                    update_small_display()
                    send_temperature_to_webserver(temperature)
            else:
                print("Fehler beim Lesen des DHT11-Sensors!")

        except RuntimeError as error:
            print(f"Lesefehler: {error}")

        time.sleep(1)

except KeyboardInterrupt:
    print("Messung beendet.")
    GPIO.cleanup()
    oled_large.clear()
    oled_large.show()
    oled_small.fill(0)
    oled_small.show()

```

#### Erklärung des Python-Skripts für das Temperaturmesssystem mit MQTT und Ventilatorsteuerung

Das Skript kombiniert alle wichtigen Funktionen des Temperaturmesssystems:

- **Erfassung von Temperatur- und Feuchtigkeitswerten** mit dem **DHT11-Sensor**
- **Anzeigen der Daten auf zwei OLED-Displays** (SSD1306 und SH1106)
- **Versenden der Messwerte über MQTT** an einen Broker
- **Steuerung eines Ventilators über ein Relais**
- **Speicherung der Daten in einer InfluxDB-Datenbank**
- **Senden der Temperaturwerte an einen Apache2-Webserver**

Jede Funktion des Skripts wird hier Schritt für Schritt erklärt:

##### Import der benötigten Bibliotheken:

```python
import time
import board
import adafruit_dht
from datetime import datetime
from luma.core.interface.serial import i2c
from luma.oled.device import sh1106
from adafruit_ssd1306 import SSD1306_I2C
from PIL import Image, ImageDraw, ImageFont
import subprocess
import RPi.GPIO as GPIO
import requests
```

Diese Bibliotheken werden für folgende Funktionen genutzt:

- `adafruit_dht` → Kommunikation mit dem DHT11-Temperatursensor
- `luma.oled` und `adafruit_ssd1306` → Steuerung der OLED-Displays
- `PIL` (Pillow) → Zeichnen von Text und Grafiken für die Displays
- `RPi.GPIO` → Steuerung des **Ventilators über ein Relais**
- `requests` → Kommunikation mit einer InfluxDB und einem Apache2-Webserver
- `subprocess` → Senden von **MQTT-Nachrichten** mit `mosquitto_pub`

##### DHT11-Sensor einrichten:

```python
dhtDevice = adafruit_dht.DHT11(board.D17)
```
- Der **DHT11-Sensor** ist mit **GPIO 17 (Pin 11)** des Raspberry Pi verbunden.
- Das Objekt `dhtDevice` wird erstellt, um Messwerte auszulesen.

##### Einrichten der OLED-Displays:

```python
# SH1106-Display (128x64, großes Display)
serial_large = i2c(port=1, address=0x3D)
oled_large = sh1106(serial_large, width=128, height=64)

# SSD1306-Display (64x48, kleines Display)
i2c_small = board.I2C()
oled_small = SSD1306_I2C(64, 48, i2c_small, addr=0x3C)
```

- Das große **SH1106-OLED-Display (128x64, Adresse 0x3D)** wird mit **Luma.OLED** gesteuert.
- Das kleine **SSD1306-OLED-Display (64x48, Adresse 0x3C)** wird mit der **Adafruit-Bibliothek** gesteuert.

##### Vorbereitung für die Bildschirmausgabe mit Pillow:

```python
# Erstellen von Bildobjekten für beide Displays
width_large, height_large = oled_large.width, oled_large.height
image_large = Image.new("1", (width_large, height_large))
draw_large = ImageDraw.Draw(image_large)

width_small, height_small = oled_small.width, oled_small.height
image_small = Image.new("1", (width_small, height_small))
draw_small = ImageDraw.Draw(image_small)

# Schriftart definieren
font = ImageFont.load_default()
```

- Es werden **schwarz-weiße Bilder (1-Bit-Modus)** für beide Displays erstellt.
- `ImageDraw.Draw(image_large)` erlaubt das **Zeichnen von Text und Grafiken** auf dem Bild.

##### MQTT-Konfiguration:

```python
mqtt_broker = "IP-Adresse"
mqtt_port = "1883"
mqtt_topic_temp = "DHT11/Temperatur"
mqtt_topic_humidity = "DHT11/Luftfeuchtigkeit"
```

Der **MQTT-Broker läuft unter der angegeben IP und dem Port 1883** und empfängt die Sensordaten auf den Topics:

- `DHT11/Temperatur`
- `DHT11/Luftfeuchtigkeit`

##### Einrichtung der GPIOs für das Relais:

```python
RELAY_PIN = 18
GPIO.setmode(GPIO.BCM)
GPIO.setup(RELAY_PIN, GPIO.OUT, initial=GPIO.HIGH)
```

- Das **Relais wird an GPIO 18 gesteuert**.
- **Standardzustand: Relais ist AUS (GPIO HIGH)**, der Ventilator ist inaktiv.

##### MQTT-Nachrichten senden:

```python
def publish_mqtt_message(topic, payload):
    try:
        subprocess.run(
            ["mosquitto_pub", "-h", mqtt_broker, "-p", mqtt_port, "-t", topic, "-m", payload],
            check=True
        )
        print(f"MQTT Nachricht gesendet: Topic={topic}, Payload={payload}")
    except subprocess.CalledProcessError as e:
        print(f"Fehler beim Senden der MQTT-Nachricht: {e}")
```

- Verwendet **mosquitto_pub**, um Messwerte an den MQTT-Broker zu senden.

##### Funktion zur Aktualisierung des großen OLED-Displays:

```python
def update_large_display(temp, hum):
    draw_large.rectangle((0, 0, width_large, height_large), outline=0, fill=0)
    current_time = datetime.now().strftime("%H:%M:%S")
    draw_large.text((0, 0), f"Zeit: {current_time}", font=font, fill=255)
    draw_large.text((0, 20), f"Temp: {temp:.1f}°C", font=font, fill=255)
    draw_large.text((0, 40), f"Luftfeucht: {hum:.1f}%", font=font, fill=255)
    oled_large.display(image_large)
```

- Zeigt **aktuelle Uhrzeit, Temperatur und Luftfeuchtigkeit** auf dem großen OLED an.

##### Funktion zum Abrufen der Anzahl der Messwerte aus InfluxDB:

```python
def get_influxdb_count():
    INFLUXDB_HOST = "IP-Adresse"
    INFLUXDB_PORT = "8086"
    INFLUXDB_DATABASE = "tempdb"
    INFLUXDB_MEASUREMENT = "DHT11_T"

    INFLUX_QUERY = f"select count(*) from {INFLUXDB_MEASUREMENT}"
    url = f"http://{INFLUXDB_HOST}:{INFLUXDB_PORT}/query"
    params = {"db": INFLUXDB_DATABASE, "q": INFLUX_QUERY}

    try:
        response = requests.post(url, data=params)
        response_json = response.json()
        count = response_json["results"][0]["series"][0]["values"][0][1]
        return count
    except Exception as e:
        print(f"Fehler beim Abrufen der InfluxDB-Daten: {e}")
        return "N/A"
```

- Stellt eine Verbindung zur **InfluxDB-Datenbank** her, die auf **IP-Adresse:8086** läuft.
- Sendet eine **SQL-ähnliche Abfrage** (`SELECT COUNT(*) FROM DHT11_T`), um die **Anzahl der gespeicherten Messwerte** zu ermitteln.
- Falls die Verbindung klappt:
    - Antwort wird als **JSON-Objekt** analysiert.
    - Der **Wert der Zählung wird extrahiert** und zurückgegeben.
- Falls ein **Fehler** auftritt:
    - Wird eine Fehlermeldung ausgegeben.
    - Rückgabewert ist `"N/A"`.

##### Funktion zum Aktualisieren des kleinen Displays:

```python
def update_small_display():
    count = get_influxdb_count()
    draw_small.rectangle((0, 0, width_small, height_small), outline=0, fill=0)
    draw_small.text((5, 15), "Anzahl:", font=font, fill=255)
    draw_small.text((5, 25), str(count), font=font, fill=255)
    oled_small.image(image_small)
    oled_small.show()
    time.sleep(0.5)
```
- Ruft zuerst die Anzahl der Messwerte aus **InfluxDB** mit `get_influxdb_count()` ab.
- Löscht die vorherige Anzeige mit `draw_small.rectangle(...)`.
- Zeigt den Text **"Anzahl:"** auf dem kleinen **SSD1306-Display** an.
- Gibt die Anzahl der Messwerte direkt darunter aus.
- **Aktualisiert das Display mit `oled_small.show()`**.
- **Wartet 0,5 Sekunden**, um das Flackern zu reduzieren.

##### Funktion zur Ventilatorsteuerung:

```python
def stop_fan_for_2_seconds():
    print("Ventilator wird gestartet...")
    GPIO.output(RELAY_PIN, GPIO.LOW)
    time.sleep(2)
    GPIO.output(RELAY_PIN, GPIO.HIGH)
    print("Ventilator wird gestoppt.")
```

- Der **Ventilator wird für 2 Sekunden eingeschaltet** und dann **wieder ausgeschaltet**

##### Funktion zum Senden der Temperatur an den Webserver (Optional):

```python
def send_temperature_to_webserver(temp):
    url = f"http://IP-Adresse/temperatur/include/temp_api.php?temp={temp}"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            print(f"Temperatur erfolgreich an Webserver gesendet: {temp}°C")
        else:
            print(f"Fehler beim Senden der Temperatur. Statuscode: {response.status_code}")
    except Exception as e:
        print(f"Fehler bei der Verbindung zum Webserver: {e}")
```

- Erstellt eine **HTTP-GET-Anfrage** an den Apache2-Webserver unter `http://IP-Adresse/temperatur/include/temp_api.php`
- Hängt die gemessene **Temperatur als Parameter (`temp`)** an die URL an.
- **Fehlerbehandlung**:
    - Falls die Antwort `200 OK` ist, wurde die Temperatur erfolgreich übertragen.
    - Falls ein **Fehlercode** zurückkommt (z. B. 404 oder 500), wird eine Meldung ausgegeben.
    - Falls die **Verbindung fehlschlägt** (z. B. weil der Server nicht läuft), wird eine **Exception abgefangen**.

*Hinweis*: Dies ist Optional hatte den Webserver hinzugefügt, sodass man auch eine Alternative zum MQTT Protokoll hat im Skript. 
##### Hauptschleife zur Sensordatenerfassung:

```python
try:
    count = 0
    while True:
        try:
            temperature = dhtDevice.temperature
            humidity = dhtDevice.humidity

            if humidity is not None and temperature is not None:
                print(f"Temperatur: {temperature:.1f} °C, Luftfeuchtigkeit: {humidity:.1f} %")
                count += 1

                if count % 5 == 0:
                    publish_mqtt_message(mqtt_topic_temp, f"{temperature:.1f}")
                    publish_mqtt_message(mqtt_topic_humidity, f"{humidity:.1f}")
                    stop_fan_for_2_seconds()
                    update_large_display(temperature, humidity)

            else:
                print("Fehler beim Lesen des DHT11-Sensors!")

        except RuntimeError as error:
            print(f"Lesefehler: {error}")

        time.sleep(1)
```


**Ablauf:**
1. **Liest jede Sekunde Temperatur & Luftfeuchtigkeit aus**.
2. **Jede 5. Messung**:
    - **MQTT-Nachricht senden**
    - **Ventilator aktivieren**
    - **Display aktualisieren**

##### Beenden des Programms:

```python
except KeyboardInterrupt:
    print("Messung beendet.")
    GPIO.cleanup()
    oled_large.clear()
    oled_large.show()
    oled_small.fill(0)
    oled_small.show()
```

- **Schaltet das Relais aus**
- **Löscht die OLED-Anzeige**
- **Setzt die GPIO-Pins zurück**

---

### React-Native App

*Hinweis*: Dokumentation ist nicht 100% fertig, da viele Veränderungen immer wieder dazu kommen: Aktueller Stand kann man [hier](https://github.com/ReinerBalschun/WebViewApp)  inkl. Quellcode sehen.

Die App startet, man gibt die IP des Servers ein und startet das Kernprogramm. Sobald das Menu geladen hat versucht die APP selber sich mit dem MQTT Broker zu verbinden um ein Thema namens "Ventilator" zu abonnieren. Das Thema ist mit Quality of Service 2 (höchste Stufe) deklariert, bedeutet das die Letzte Nachricht, die an dieses Thema geschickt wird, genau 1 Mal an ein Gerät gesendet wird, welches abonniert ist, um sicherzustellen das der letzte Status des Ventilators in der App Up to date bleibt.

Sobald ich dann den letzten Status des Ventilators habe, zeigt mir die APP den Button "Ventilator AN" oder "Ventilator AUS" an. Wenn mir der Button "Ventilator AN" angezeigt wird, heißt, dass der Ventilator gerade aus ist und anders herum, wenn "Ventilator AUS" angezeigt wird, dass der Ventilator gerade an ist.

Wenn ich dann auf den jeweiligen Button drücke sendet der eine Publish Nachricht an das Thema "Ventilator" über MQTT over Websocket. Das normale MQTT Protokoll funktioniert nicht über TCP in meiner APP, da es über Javascript läuft (React Native). Der zusätzliche Port 8083 von Websocket stellt sicher das die APP dauerhaft eine Verbindung zum Broker hat, aber auch alle MQTT Funktionen unterstützen kann.

Die Nachricht geht an den Broker mit dem Payload, dass der Ventilator entweder eingeschaltet werden soll oder ausgeschaltet. Der Broker ist dann automatisch auf mit meiner InfluxDB Datenbank verbunden via NodeRED, um die Einträge für die Zurücksendung zu speichern.

![[Pasted image 20250204215125.png | 300]]