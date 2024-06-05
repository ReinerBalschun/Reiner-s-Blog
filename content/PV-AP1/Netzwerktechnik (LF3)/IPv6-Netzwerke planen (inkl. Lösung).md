# **Aufgabe 1**

Erklären Sie den Unterschied zwischen einer IPv4-Adresse und einer IPv6-Adresse.

**Adressgröße:**

- **IPv4:** Verwendet 32-Bit-Adressen, die aus vier Dezimalzahlen bestehen, die durch Punkte getrennt sind (z. B. 192.168.1.100). Dies ermöglicht bis zu 4,3 Milliarden eindeutige Adressen.
- **IPv6:** Verwendet 128-Bit-Adressen, die aus acht Gruppen von vier hexadezimalen Ziffern bestehen, die durch Doppelpunkte getrennt sind (z. B. 2001:0db8:85a3:0000:0000:8a2e:0370:7334). Dies ermöglicht eine riesige Anzahl von bis zu 340 Sextillionen eindeutigen Adressen.

**Adressierungsstruktur:**

- **IPv4:** Verwendet eine hierarchische Adressierungsstruktur, die in Klassen unterteilt ist (z. B. Klasse A, B, C), um große Netze zu effizienter zu adressieren.
- **IPv6:** Verwendet eine flache, hierarchielose Adressierungsstruktur, die keine Klassen benötigt und eine effizientere Routingtabellenverwaltung ermöglicht.

**Notationsformen:**

- **IPv4:** Kann in Dezimalpunkt- oder CIDR-Notation dargestellt werden.
- **IPv6:** Kann in verkürzter Notation oder vollständiger Notation dargestellt werden.


# **Aufgabe 2**

Kürzen Sie die folgende IPv6-Adresse gemäß den Kürzungsregeln:

2001:0db8:0000:0042:0000:8a2e:0370:7334

2001:db8:0:42:0:8a2e:370:7334

# **Aufgabe 3**

Erläutern Sie den Zweck von Link-Local-Adressen in IPv6.

In IPv6 dienen Link-Local-Adressen einem wichtigen Zweck: Sie ermöglichen die Kommunikation zwischen Geräten auf einem lokalen Netzwerk, ohne dass eine vorkonfigurierte oder zugewiesene IP-Adresse von einem DHCP-Server erforderlich ist. Sie sind besonders nützlich in Szenarien, in denen ein Gerät einem neuen Netzwerk beitritt oder ein Netzwerk noch nicht mit einem DHCP-Server konfiguriert ist.

Die Präfixlänge für Link Local Ipv6 Adressen ist: **fe80::/10**
# **Aufgabe 4**

Nehmen Sie die IPv6-Adresse 2001:0db8:abcd:0023::/64 und erstellen Sie vier Subnetze. Geben Sie die Subnetz-IDs und Range für jedes Subnetz an.

Subnetz-ID: 2001:db8:abcd:23::/66  

Range: 2001:db8:abcd:23:0:0:0:0 - 2001:db8:abcd:23:3fff:ffff:ffff:ffff

Subnetz-ID: 2001:db8:abcd:23:4000::/66 

Range: 2001:db8:abcd:23:4000:0:0:0 - 2001:db8:abcd:23:7fff:ffff:ffff:ffff

Subnetz-ID:2001:db8:abcd:23:8000::/66

Range: 2001:db8:abcd:23:8000:0:0:0 - 2001:db8:abcd:23:bfff:ffff:ffff:ffff

Subnetz-ID: 2001:db8:abcd:23:c000::/66

Range: 2001:db8:abcd:23:c000:0:0:0 - 2001:db8:abcd:23:ffff:ffff:ffff:ffff

# **Aufgabe 5**

Was ist eine "Loopback-Adresse" in IPv6 und welche Adresse wird dafür verwendet?


In IPv6, wie auch in IPv4, dient eine Loopback-Adresse, auch als Localhost-Adresse bezeichnet, einem ähnlichen Zweck: Sie identifiziert den lokalen Computer für Kommunikationszwecke. Es handelt sich um eine spezielle Art von IP-Adresse, die es einem Gerät ermöglicht, mit sich selbst oder anderen Prozessen zu kommunizieren, die auf demselben Gerät ausgeführt werden.


In IPv6 ist die festgelegte Loopback-Adresse **::1**. Diese Adresse ist eindeutig für IPv6 und kann nicht als Unicast-Adresse im öffentlichen Internet verwendet werden.


---

Lösung:

**Aufgabe 1**

- **Adresslänge:**
    - IPv4 verwendet 32-Bit-Adressen, was zu einer begrenzten Anzahl von etwa 4,3 Milliarden eindeutigen Adressen führt.
    - IPv6 verwendet 128-Bit-Adressen, was eine nahezu unbegrenzte Anzahl von Adressen ermöglicht. Die Anzahl der IPv6-Adressen ist so groß, dass sie praktisch unerschöpflich ist.
- **Schreibweise:**
    - IPv4-Adressen werden in vier Oktetten mit dezimalen Zahlen dargestellt, getrennt durch Punkte. Zum Beispiel: 192.168.0.1.
    - IPv6-Adressen werden in acht Gruppen von je vier Hexadezimalziffern dargestellt, getrennt durch Doppelpunkte. Zum Beispiel: 2001:0db8:85a3:0000:0000:8a2e:0370:7334.
- **Notation und Kürzung:**
    - IPv6-Adressen erlauben die Kürzung von aufeinanderfolgenden Nullblöcken und die Verwendung der Doppelpunktnotation für eine kompaktere Darstellung. Dies ermöglicht eine leichtere Lesbarkeit und Handhabung.
- **Adressarten:**
    - IPv4-Adressen können in öffentliche (im Internet routbare) und private (für den internen Gebrauch in lokalen Netzwerken reservierte) Adressen unterteilt werden.
    - IPv6-Adressen haben verschiedene Typen, darunter Unicast (für die Einzel-zu-Einzel-Kommunikation), Multicast (für die Ein-zu-Viele-Kommunikation) und Anycast (für die Kommunikation mit einem beliebigen Knoten einer Gruppe).
- **Automatische Konfiguration:**
    - IPv6 unterstützt die automatische Konfiguration durch Stateless Address Autoconfiguration (SLAAC), was es Geräten ermöglicht, Adressen ohne die Notwendigkeit eines zentralen DHCP-Servers zu erhalten.
    - In IPv4 ist dies durch DHCP (Dynamic Host Configuration Protocol) üblicherweise umgesetzt.

**Aufgabe 2**

2001:db8::42:0:8a2e:370:7334

**Aufgabe 3**

Link-Local-Adressen sind auf das lokale Netzwerksegment (auch als Link oder Subnetz bezeichnet) beschränkt, in dem das IPv6-Gerät aktiv ist. Sie sind nicht routenfähig und können daher nur für die Kommunikation auf dem lokalen Netzwerk verwendet werden.

Link-Local-Adressen können automatisch von den Geräten auf einem Netzwerksegment generiert werden, ohne dass dazu ein zentraler DHCP-Server erforderlich ist. Dies wird durch das Stateless Address Autoconfiguration (SLAAC) ermöglicht.

Bspw.: **fe80**::abcd:1234:5678:9abc

**Aufgabe 4**

Nehmen Sie die IPv6-Adresse 2001:0db8:abcd:0023::/64 und erstellen Sie vier Subnetze. Geben Sie die Subnetz-IDs und Range für jedes Subnetz an.

- Subnetz 1: 2001:db8:abcd:23::/66
    - Expanded IPv6: 2001:0db8:abcd:0023:0000:0000:0000:0000/66
    - First Address: 2001:0db8:abcd:0023:0000:0000:0000:0000
    - Last Address: 2001:0db8:abcd:0023:3fff:ffff:ffff:ffff
- Subnetz 2: 2001:db8:abcd:23:4000::/66
    - Expanded IPv6: 2001:0db8:abcd:0023:4000:0000:0000:0000/66
    - First Address: 2001:0db8:abcd:0023:4000:0000:0000:0000
    - Last Address: 2001:0db8:abcd:0023:7fff:ffff:ffff:ffff
- Subnetz 3: 2001:db8:abcd:23:8000::/66
    - Expanded IPv6: 2001:0db8:abcd:0023:8000:0000:0000:0000/66
    - First Address: 2001:0db8:abcd:0023:8000:0000:0000:0000
    - Last Address: 2001:0db8:abcd:0023:bfff:ffff:ffff:ffff
- Subnetz 4: 2001:db8:abcd:23:c000::/66
    - Expanded IPv6: 2001:0db8:abcd:0023:c000:0000:0000:0000/66
    - First Address: 2001:0db8:abcd:0023:c000:0000:0000:0000
    - Last Address: 2001:0db8:abcd:0023:ffff:ffff:ffff:ffff

**Aufgabe 5**

Die "Loopback-Adresse" in IPv6 hat den gleichen Zweck wie in IPv4. Sie dient dazu, dass ein Netzwerkgerät mit sich selbst kommunizieren kann, ohne den gesamten Netzwerkstack und die Netzwerkschnittstelle zu belasten. In IPv6 wird die Loopback-Adresse durch ::1 repräsentiert.

Die Loopback-Adresse ::1 ist die IPv6-Äquivalente zur IPv4-Loopback-Adresse 127.0.0.1. Wenn ein Gerät versucht, mit der Loopback-Adresse zu kommunizieren (zum Beispiel durch Pingen von ::1), wird der Datenverkehr nicht über das physische Netzwerk übertragen. Stattdessen bleibt er innerhalb des lokalen Geräts und wird auf der Loopback-Schnittstelle verarbeitet.

Zweck der Loopback-Schnittstelle:

- **Lokale Netzwerktests:** Entwickler können die Loopback-Adresse verwenden, um Netzwerkanwendungen lokal zu testen, ohne eine tatsächliche Netzwerkverbindung herstellen zu müssen.
- **Selbsttests von Netzwerkschnittstellen:** Netzwerkschnittstellen und -protokolle können auf ihre Funktionstüchtigkeit überprüft werden, indem Datenverkehr zur Loopback-Adresse gesendet wird.
- **Interne Kommunikation zwischen Prozessen auf demselben Gerät:** Anwendungen können die Loopback-Adresse nutzen, um intern miteinander zu kommunizieren, insbesondere wenn mehrere Prozesse auf demselben Gerät laufen.