# **Aufgabe 1**

Für die WLAN-Technik gibt es IEEE-Standards. Führen Sie die aktuell üblichen Standards tabellarisch auf und fügen Sie die maximalen Übertragungsraten sowie das Frequenz-Band hinzu.

| Wi-Fi Name         | IEEE Standard     | Maximale Datenrate (Mbit/s) | Frequenzband                      | Erscheinungsjahr |
| ------------------ | ----------------- | --------------------------- | --------------------------------- | ---------------- |
| Wi-Fi 0            | IEEE 802.11       | 2 Mbits/s                   | 2,4 GHz                           | 1997             |
| Wi-Fi 1            | IEEE 802.11b      | 11 Mbit/s                   | 2,4 GHz                           | 1999             |
| Wi-Fi 2            | IEEE 802.11a      | 54 Mbit/s                   | 5 GHz                             | 1999             |
| Wi-Fi 3            | IEEE 802.11g      | 54 Mbit/s                   | 2,4 GHz                           | 2003             |
| Wi-Fi 4            | IEEE 802.11n      | 600 Mbit/s                  | 2,4 GHz und 5 GHz                 | 2008             |
| Wi-Fi 5            | IEEE 802.11ac     | 6.933 Mbit/s                | 5 GHz                             | 2014             |
| Wi-Fi 6 & 6E       | IEEE 802.11ax     | 9.608 Mbit/s                | 2,4 GHz, 5 GHz und (6 GHz bei 6E) | 2019             |
| Wi-Fi 7            | IEEE 802.11be     | 46.120 Mbit/s               | 2,4 Ghz, 5 GHz und 6 GHz          | 2024             |
| Wi-Fi 8 (Zukunft)* | IEEE 802.11bn UHR | 100.000 Mbit/s              | 2.4, 5, 6, 7, 42.5, 71 GHz*       | 2028 (erwartet)  |
*Quellen: [What is Wi-Fi 8?](https://www.everythingrf.com/community/what-is-wi-fi-8)  & [What Will Wi-Fi 8 Be? A Primer on IEEE 802.11bn Ultra High Reliability](https://arxiv.org/pdf/2303.10442)*
# **Aufgabe 2**

Welche Vorteile hat die Nutzung von WLAN?

Durch die Nutzung von WLAN hat man die Möglichkeit kabellose Verbindungen zwischen Geräten aufzubauen. Die Kosten und Einfachheit einer Installation von WLAN begünstigen die Nutzung umso mehr. Außerdem wir an dem Wi-Fi Standard kontinuierlich weiterentwickelt (siehe Tabelle oben).  
# **Aufgabe 3**

Welche Nachteile gehen mit der Nutzung von WLAN einher?

Dadurch das WLAN Kommunikation über Radio Frequenzen läuft, ist es anfälliger für Hacker Angriffen (abhören der Frequenz) & Störungen.
Dadurch das kontinuierlich WLAN weiterentwickelt wird, kommt es oft bei älteren Geräten zu Kompatibilitätsproblemen. 

# **Aufgabe 4**

Definieren Sie, was eine SSID ist.

Mit der SSID identifiziert man verfügbare WLAN-Netzwerke in der Nähe.

# **Aufgabe 5**

Welche aktuellen WLAN-Verschlüsselungsmethoden werden genutzt? Wie unterscheiden sich diese?

- **WPA2-PSK (Wi-Fi Protected Access II - Pre-Shared Key):** Die am weitesten verbreitete Methode für die Heim- und Büronutzung. Bietet gute Sicherheit durch eine Kombination aus AES(Advanced Encryption Standard)-Verschlüsselung und Authentifizierung mit einem gemeinsam genutzten Schlüssel.
- **WPA2-Enterprise:** Bietet stärkere Sicherheit als WPA2-PSK, indem es für die Authentifizierung einen RADIUS-Server verwendet. Geeignet für Unternehmen und Organisationen mit hohen Sicherheitsanforderungen.
- **WPA3-Personal:** Nachfolger von WPA2-PSK mit verbesserter Sicherheit durch neue Authentifizierungsverfahren und Schutz vor Offline-Angriffen.
- **WPA3-Enterprise:** Entspricht WPA2-Enterprise, jedoch mit zusätzlichen Funktionen für erhöhte Sicherheit in Unternehmensumgebungen.
# **Aufgabe 6**

Unterscheiden Sie die Funktionsweise eines Repeaters von der eines Access-Points.

Ein Repeater (kabellos) verstärkt das WLAN Signal im Netzwerk. Ein Access-Points (Kabelgebunden) erweitert das Netzwerk mit einem eigenen WLAN Knotenpunkt. Access-Point haben durch ihre kabelgebundene Verbindung immer eine bessere Bandbreite als Repeater.


---

Lösung:

**Aufgabe 1**

|IEEE-Standard|Maximale Übertragungsrate|Frequenz-Band|
|---|---|---|
|802.11b|11 Mbps|2.4 GHz|
|802.11a|54 Mbps|5 GHz|
|802.11g|54 Mbps|2.4 GHz|
|802.11n|Bis zu 600 Mbps|2.4 GHz / 5 GHz|
|802.11ac|Bis zu 3.5 Gbps|5 GHz|
|802.11ax|Bis zu 9.6 Gbps|2.4 GHz / 5 GHz|

  

**Aufgabe 2**

- **Drahtlose Verbindung:** WLAN ermöglicht die drahtlose Verbindung von Geräten, was Kabelsalat vermeidet und die Flexibilität erhöht.
- **Einfache Einrichtung:** WLAN-Netzwerke lassen sich einfach einrichten und erweitern, ohne physische Kabel verlegen zu müssen.
- **Mobilität:** Nutzer können sich innerhalb der Reichweite des WLAN-Netzwerks frei bewegen, ohne die Verbindung zu verlieren.
- **Breite Verfügbarkeit:** WLAN ist weit verbreitet und in vielen öffentlichen Orten, Unternehmen und Privathaushalten verfügbar.

**Aufgabe 3**

- **Begrenzte Reichweite:** WLAN hat eine begrenzte Reichweite im Vergleich zu kabelgebundenen Netzwerken.
- **Störanfälligkeit:** Drahtlose Signale können durch Interferenzen, Wände und andere Hindernisse gestört werden.
- **Sicherheitsrisiken:** WLAN-Netzwerke können anfällig für Sicherheitsrisiken wie unautorisierten Zugriff sein, wenn sie nicht ordnungsgemäß geschützt sind.
- **Geschwindigkeitsverlust:** Die tatsächliche Übertragungsgeschwindigkeit kann aufgrund von Störungen und Entfernungen von Access Points variieren.

**Aufgabe 4**

SSID steht für "Service Set Identifier" und ist der Name, der einem drahtlosen Netzwerk zugeordnet ist. Er dient dazu, Netzwerke voneinander zu unterscheiden. Beim Verbinden mit einem WLAN wird die SSID verwendet, um das gewünschte Netzwerk auszuwählen.

**Aufgabe 5**

- **WEP (Wired Equivalent Privacy):** Eine veraltete und unsichere Methode, die leicht geknackt werden kann.
- **WPA (Wi-Fi Protected Access):** Eine verbesserte Version von WEP, aber dennoch anfällig für Angriffe.
- **WPA2:** Eine weiterentwickelte Version von WPA mit stärkeren Sicherheitsmechanismen.
- **WPA3:** Der aktuellste Standard mit verbesserter Verschlüsselung und Sicherheit gegen Brute-Force-Angriffe.

**Aufgabe 6**

- **Repeater:** Ein Repeater empfängt das WLAN-Signal, verstärkt es und sendet es erneut aus, um die Reichweite des WLAN-Netzwerks zu vergrößern. Er fungiert als Verstärker, um das Signal über größere Entfernungen zu tragen.
- **Access Point:** Ein Access Point (AP) ist ein Gerät, das in ein kabelgebundenes Netzwerk integriert ist und drahtlose Verbindungen zu WLAN-Geräten ermöglicht. Im Gegensatz zum Repeater erstellt ein Access Point ein neues WLAN-Netzwerk und ermöglicht es Geräten, sich direkt mit diesem Netzwerk zu verbinden.