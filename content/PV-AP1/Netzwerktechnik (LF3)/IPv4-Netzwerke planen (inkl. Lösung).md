

# **Aufgabe 1**

Welche (historischen) Netzklassen sind in IPv4 definiert? Welche Adressbereiche bzw. Subnetzmasken sind hier standardmäßig eingeplant? Führen Sie die Informationen tabellarisch auf.


In IPv4 sind fünf Netzklassen definiert, die den IP-Adressraum in verschiedene Größen von Subnetzen unterteilen. Jede Netzklasse hat einen bestimmten Präfix (die ersten Bits der IP-Adresse) und eine zugehörige Standard-Subnetzmaske.

| Netzklasse | Präfix (Dezimal) | Präfix (Binär)      | Standard-Subnetzmaske (Dezimal) | Standard-Subnetzmaske (Binär)                                                               | Anzahl der Subnetze | Anzahl der Hosts pro Subnetz |
| ---------- | ---------------- | ------------------- | ------------------------------- | ------------------------------------------------------------------------------------------- | ------------------- | ---------------------------- |
| **A**      | 0-127            | 00000000 - 01111111 | 255.0.0.0                       | 11111111.00000000.00000000.00000000                                                         | 128                 | 16.777.214                   |
| **B**      | 128-191          | 10000000 - 10111111 | 255.255.0.0                     | 11111111.11111111.00000000.00000000                                                         | 16.384              | 65.534                       |
| **C**      | 192-223          | 11000000 - 11111111 | 255.255.255.0                   | 11111111.11111111.11111111.00000000                                                         | 2.097.152           | 254                          |
| **D**      | 224-239          | 11100000 - 11111111 | 255.255.255.255                 | Verwendung für [Multicast](https://de.wikipedia.org/wiki/Multicast "Multicast")-Anwendungen | -                   | -                            |
| **E**      | 240-255          | 11110000 - 11111111 | 255.255.255.255                 | reserviert (für zukünftige Zwecke)                                                          | -                   | -                            |
# **Aufgabe 2**

Welche IPv4-Bereiche sind für private Netze definiert?

**1. 10.0.0.0 bis 10.255.255.255**

- Dieser Bereich umfasst 256 Subnetze der Klasse A mit jeweils 16.777.216 möglichen Hosts.
- Er wird häufig für große private Netzwerke wie Unternehmensnetzwerke oder Heimnetzwerke mit mehreren Routern verwendet.

**2. 172.16.0.0 bis 172.31.255.255**

- Dieser Bereich umfasst 16 Subnetze der Klasse B mit jeweils 65.536 möglichen Hosts pro Subnetz.
- Er wird häufig für mittlere bis große private Netzwerke wie Unternehmensnetzwerke oder Heimnetzwerke mit mehreren Subnetzen verwendet.

**3. 192.168.0.0 bis 192.168.255.255**

- Dieser Bereich umfasst 256 Subnetze der Klasse C mit jeweils 256 möglichen Hosts pro Subnetz.
- Er wird häufig für kleine private Netzwerke wie Heimnetzwerke oder einzelne Abteilungen in einem Unternehmen verwendet.

# **Aufgabe 3**

Eine mögliche Angabe zur Definition eines Netzes wäre bspw. 192.168.178.0 mit einer Subnetzmaske 255.255.255.0. Beschreiben Sie dieses Netz mittels CIDR-Schreibweise und erläutern Sie im Allgemeinen, wie die CIDR-Schreibweise funktioniert.

**192.168.178.0** mit der Subnetzmaske **255.255.255.0** wird in CIDR-Schreibweise als **192.168.178.0/24** abgekürzt.

**CIDR-Schreibweise im Detail:**

- **192.168.178.0:** Dies ist die Netzwerkadresse, also die erste Adresse im Subnetz.
- **24:** Die Zahl 24 nach dem Schrägstrich (/24) steht für die Anzahl der gesetzten Bits in der Subnetzmaske. In diesem Fall sind die ersten 24 Bits der Subnetzmaske (255.255.255.0) gesetzt, d.h. die restlichen 8 Bits (0.0.0.255) stehen für die Host-Adressierung im Subnetz zur Verfügung.

# **Aufgabe 4**

Erläutern Sie, was genau unter dem Konzept des "Subnetting" zu verstehen ist.

**Subnetting** wird verwendet, um ein großen IP-Adressraum in kleinere logische Subnetze aufzuteilen.

## Beispiel:

Subnetz **192.168.1.0** mit der Subnetzmaske **255.255.255.0**.

- **Netzwerkbits:** Die Netzwerkbits sind 11111111.11111111.11111111.00000000 (255.255.255.0).
- **Hostbits:** Die Hostbits sind 00000000.00000000.00000000.11111111 (0.0.0.255).

Die Netzwerkadresse des Subnetzes ist **192.168.1.0**. Innerhalb dieses Subnetzes sind 255 mögliche Host-Adressen verfügbar, da die letzten 8 Bits der IP-Adresse für die Host-Adressierung verwendet werden können (0-255).

# **Aufgabe 5**

Die Dokumentation eines Netzwerks beim Kunden ist unvollständig. Ermitteln Sie die fehlenden Informationen mithilfe der Abbildung. Orientieren Sie sich dabei an den Vorgaben des Routers:


![[Pasted image 20240425094851.png]]


| Geräte/  <br>Angaben | NAS-System   | Desktop PC Client 1 | Netzwerk-Drucker |
| -------------------- | ------------ | ------------------- | ---------------- |
| IP-Adresse           | 192.168.1.98 | 192.168.1.99        | 192.168.1.100    |
| Subnetzmaske         | 255.255.240  | 255.255.240         | 255.255.240      |
| Standardgateway      | 192.168.1.97 | 192.168.1.97        | 192.168.1.97     |

# **Aufgabe 6**

In einem Großhandel soll die Netzwerkanbindung der Arbeitsplätze und verschiedener Netzwerkkomponenten erneuert werden. Hierfür sollen Subnetze gebildet werden. Wie lautet die Subnetmaske bei der Netzadresse 15.0.0.0 mit 10 verwendbaren Subnetzen, sowie mit mindestens 12 Hosts je Subnetz?

255.240.0.0
# **Aufgabe 7**

Sie werden zur Dokumentation eines Netzwerks herangezogen, um die Ist-Analyse durchzuführen. Ihnen liegen folgende Informationen vor:

- Netzadresse: 192.52.190.0
- Subnetze: 6
- Mindestanzahl von Hosts je Subnetz: 10

Ermitteln Sie die Subnetzmaske.

![[20240425_133010.jpg]]

# **Aufgabe 8**

Ein neuer Server soll in ein vorhandenes Netzwerk integriert werden. Dazu muss dieser manuell hinsichtlich der IP-Adresse konfiguriert werden. Beurteilen Sie jeweils, ob die vorgeschlagenen IP-Adressen geeignet sind und begründen Sie Ihre Entscheidung:

1. Vorschlag: 192.168.10.0 /24
2. Vorschlag: 192.168.10.200 /24
3. Vorschlag: 127.0.0.1 /8

Die beiden ersten Vorschläge sind private IP-Adressen mit einer IP Range von 254 Adressen pro Subnetz.

Bei dem letzten IP Vorschlag handelt es sich um eine Loopback Adresse die nicht benutzt werden sollte, wenn Geräte miteinander im Netzwerk kommunizieren sollen.  


---

Lösung:

In IPv4 wurden historisch gesehen drei Netzklassen definiert: A, B und C. Jede Klasse hat einen festgelegten Bereich von IP-Adressen. Hier sind die Informationen tabellarisch aufgeführt:

|Netzklassen|Bereich der ersten Oktett|Standard Subnetzmaske|Anzahl der Netzwerke|Anzahl der Hosts pro Netzwerk|
|---|---|---|---|---|
|Klasse A|1-126|255.0.0.0 (8 Bit)|128|~16 Millionen|
|Klasse B|128-191|255.255.0.0 (16 Bit)|16.384|65.534|
|Klasse C|192-223|255.255.255.0 (24 Bit)|2.097.152|254|

**Aufgabe 2**

Für private Netze wurden die folgenden IPv4-Bereiche definiert:

- Klasse A: 10.0.0.0 bis 10.255.255.255
- Klasse B: 172.16.0.0 bis 172.31.255.255
- Klasse C: 192.168.0.0 bis 192.168.255.255

**Aufgabe 3**

Das Netz 192.168.178.0 mit einer Subnetzmaske von 255.255.255.0 kann in CIDR-Schreibweise als "192.168.178.0/24" dargestellt werden. Die CIDR-Schreibweise kombiniert die IP-Adresse und die Anzahl der gesetzten Bits (Anzahl der 1 in der binären Schreibweise der Subnetzmaske) für das Netzwerkpräfix.

Im Allgemeinen funktioniert die CIDR-Schreibweise so, dass die IP-Adresse und die Anzahl der gesetzten Bits für das Netzwerkpräfix durch einen Schrägstrich getrennt werden. Zum Beispiel repräsentiert "/24" eine Subnetzmaske mit den ersten 24 Bits, was der üblichen Subnetzmaske 255.255.255.0 entspricht.

**Aufgabe 4**

Subnetting ist ein Konzept in Computernetzwerken, bei dem ein großes IP-Netzwerk in kleinere, logische Subnetze aufgeteilt wird. Dies ermöglicht eine effizientere Nutzung von IP-Adressen und verbessert die Netzwerkleistung und Sicherheit. Durch Subnetting können Organisationen ihre IP-Adressen besser organisieren und den Datenverkehr innerhalb ihres Netzwerks effektiver steuern.

Bei Subnetting wird die Subnetzmaske eines Netzwerks verfeinert, indem Bits aus dem Host-Teil der Adresse in den Netzwerk-Teil verschoben werden. Dies führt zu kleineren, logischen Subnetzen mit jeweils einer begrenzten Anzahl von Hosts. Subnetting ist besonders nützlich in großen Netzwerken, in denen die Aufteilung in Subnetze die Verwaltung und den Datenverkehr optimiert.

**Aufgabe 5**

|Geräte/  <br>Angaben|NAS-System|Desktop PC Client 1|Netzwerk-Drucker|
|---|---|---|---|
|IP-Adresse|192.168.1.98-110|192.168.1.98-110|192.168.1.98-110|
|Subnetzmaske|255.255.255.240|255.255.255.240|255.255.255.240|
|Standardgateway|192.168.1.97|192.168.1.97|192.168.1.97|

- IP-Adresse vom NAS-System und Client 1 und dem Netzwerkdrucker dürfen nicht gleich sein.
- IP-Adressbereich 192.168.1.98 bis 192.168.1.110
- Subnetzmaske /28 oder 255.255.255.240

**Aufgabe 6**

- Klasse A ist bis 127.0.0.0 definiert, 15.0.0.0 passt damit in Klasse A
- Subnetzmaske muss zu Klasse A gehören, Standard-Subnetmaske 255.0.0.0
- Anzahl der benötigten Subnetze: 10. Anzahl Bit, die hierfür notwendig sind betragen 2^4 = 16 Bit (bei 2^3 wären es lediglich 8, also 2 zu wenig).
- Umrechnung des Teils der Subnetzmaske von BIN zu DEZ: 11110000 -> 240
- Zusammensetzen der Standard-Subnetzmaske und der Anpassung nach Subnetzbildung: 255.240.0.0 bzw. bei klassenlosem Routing (CIDR) 255.255.255.240.

Lösung: 255.240.0.0

**Aufgabe 7**

- Netzadresse steht für ein Klasse C Netzwerk, Standard-Subnetzmaske 255.255.255.0
- Anzahl der benötigten Subnetze: 6. Anzahl Bit, die hierfür notwendig sind betragen 2^3 = 8 Bit (bei 2^2 wären es lediglich 4, also 2 zu wenig).
- Umrechnung des Teils der Subnetzmaske von BIN zu DEZ: 1110000 -> 224
- Zusammensetzen der Standard-Subnetzmaske und der Anpassung nach Subnetzbildung: 255.255.255.224

**Aufgabe 8**

- 192.168.10.0: Netzadresse darf/sollte nicht vergeben werden
- 192.168.10.200: Kann für den Server genutzt werden, ist gültig
- 127.0.0.1: Loop-Back-IP für Loop-Back und Diagnosefunktion reserviert