
# Aufgabe 1

**Unicast vs. Broadcast vs. Multicast**

Unicast-Übertragung bezieht sich auf die Übertragung von Daten von einem Absender an einen einzelnen Empfänger in einem one-to-one Kommunikationsszenario. Ein Unicast-Paket hat eine Ziel-IP-Adresse, die auf einen einzelnen Empfänger verweist.

Broadcast-Übertragung erfolgt, wenn ein Gerät Nachrichten an alle Geräte im Netzwerk sendet (one-to-all). Ein Broadcast-Paket hat eine Ziel-IP-Adresse, bei der alle Host-Bits auf 1 gesetzt sind (32 Einsen), was auf alle Geräte im Netzwerk hinweist.

Multicast-Übertragung ermöglicht es einem Absender, Daten an ausgewählte Gruppen von Hosts (many-to-many) zu senden. Ein Multicast-Paket hat eine Ziel-IP-Adresse, die auf eine Multicast-Gruppe verweist.

# Aufgabe 2

**Adressklassen und -bereiche**

Es gibt fünf Hauptadressklassen (A, B, C, D, E) in IPv4, wobei A, B und C für die Zuweisung von Host-Adressen verwendet werden, während D und E für spezielle Zwecke reserviert sind.

Private Adressen, wie z.B. 192.168.0.0 bis 192.168.255.255, werden häufig in internen Netzwerken verwendet und sind nicht global routbar.

Loopback-Adressen, insbesondere 127.0.0.1, werden für die Kommunikation eines Hosts mit sich selbst verwendet.

Link-Local-Adressen (APIPA) wie 169.254.0.0 bis 169.254.255.254 sind selbst zugewiesene Adressen, die verwendet werden, wenn keine DHCP-Konfiguration verfügbar ist.

# Aufgabe 3

**IP-Adressierung und NAT**

Network Address Translation (NAT) ist eine Technik, die private IPv4-Adressen in öffentliche IPv4-Adressen übersetzt, um den Datenverkehr zwischen internen Netzwerken und dem Internet zu ermöglichen.

NAT stellt sicher, dass private Adressen nicht im globalen Internet einzigartig sein müssen.

NAT kann dazu beitragen, IPv4-Adressknappheit zu bewältigen und gleichzeitig die Sicherheit erhöhen.

# Aufgabe 4

**Adressvergabe**

Die Adressvergabe erfolgt in IPv4-Netzwerken in der Regel über den Dynamic Host Configuration Protocol (DHCP), der IP-Adressen, Subnetzmasken, Gateway-Adressen und DNS-Server-Adressen an Clients zuweist.

DHCP-Server stellen sicher, dass IP-Adressen effizient und ohne Konflikte verteilt werden.

# Aufgabe 5

**Broadcast-Domains und Subnetting**

Eine Broadcast-Domain ist ein Netzwerksegment, in dem Broadcast-Nachrichten an alle Geräte im Netzwerk gesendet werden. Eine große Broadcast-Domain kann durch exzessiven Broadcast-Datenverkehr negativ beeinflusst werden.

Subnetting beinhaltet die Aufteilung eines großen Netzwerks in kleinere Subnetze, wodurch die Anzahl der Geräte in einer Broadcast-Domain reduziert wird.

Subnetting verbessert die Netzwerkleistung und ermöglicht es, den Datenverkehr auf effiziente Weise zu steuern.