
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

### InfluxDB, NedRed & Grafana Konfiguration

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