---
"type:": Modul
---
**Aufgabe 1: Verständnis der Netzwerkaufteilung**

Begreift die verschiedenen Kriterien zur Aufteilung von Netzwerken, einschließlich Broadcast-Eindämmung, Sicherheitsanforderungen, physischer Standorte und logischer Gruppierung. Untersucht, wie diese Aufteilung den Handel und die Kommunikation in EtherNetica beeinflusst.

A: Durch hohen Traffic (Verkehr) im Netzwerk kann der zuständige Router das jeweilige lokale Netzwerk entlasten in dem es in kleinere Broadcast-Domains unterteilt. Dies kann man auch Broadcast-Eindämmung nennen. Vlan wird Beispielsweise für das Trennen der Netze benutzt. Sicherheitsanforderung spielen bei der Trennung von großen Netzwerken auch eine wichtige Rolle. In manchen Situationen soll nicht jedes Gerät in der Lage sein mit jedem Gerät im Netzwerk zu kommunizieren. Der Physische Standort ist ein weiterer Punkt weswegen, das Aufteilen in kleinere Netze wichtig wäre wenn sich z. B. der physische Standort einer Abteilung der Firma ändert und somit nicht die komplette Netzwerkinfrastruktur neu aufgebaut werden muss. Der letzte Punkt logische Gruppierungen bedeutet nichts anderes als die Netze so zu formen, dass alle Geräte die viel mit einander Kommunizieren müssen in ein gemeinsames Netzwerk.    


**Aufgabe 2: Die Rolle des Routers**

Erforscht die zentrale Rolle des Routers in der Verteilungsebene des Netzwerks. Versteht, wie Router im Gegensatz zu Switches auf der Layer-3-Ebene arbeiten und Entscheidungen auf Basis der IP-Adresse treffen. Lernt, wie Router den Datenverkehr lenken und für einen effizienten Netzwerkbetrieb unerlässlich sind.

A: Router sind dafür da, damit Geräte mit anderen Geräten aus unterschiedlichen Netzwerken miteinander kommunizieren können. Der Unterschied zu Switches ist das sich die Entscheidung wie weitergeleitet wird bei Router über die IP-Adresse passiert und bei Switches eben mit der MAC. Wenn ein Gerät mit einem anderem Gerät aus einem anderem Netzwerk kommunizieren will, wird anhand der Ziel IP das Datenpacket vom Router weitergeleitet.

---

**Aufgabe 3: Das Routing-Prinzip**

Versteht den Prozess des Routings in den Netzwerken von EtherNetica. Untersucht, wie Router Frames dekodieren, um an die Pakete mit den Ziel-IP-Adressen zu gelangen, und wie sie den besten Weg für die Weiterleitung der Pakete bestimmen.

A: Wenn ein Router ein IP Packet bekommt entkapselt er diesen in einen Ethernet-Frame. Aus dem Ethernet Frame heraus kann der Router dann die layer 3 IP adresse Infos zu Quelle und Ziel aus lesen und dann dementsprechend entscheiden wohin das Packet gesendet werden soll.

---

**Aufgabe 4: Das Default Gateway**

Lernt die Bedeutung des Default Gateways für die Hosts im Netzwerk kennen. Erforscht, wie die Hosts die IPv4-Adresse des Routers über die im TCP/IP konfigurierte Default Gateway-Adresse erhalten und wie diese für die Kommunikation mit anderen Netzwerken verwendet wird.

A: Das "Default Gateway" ist eine IP-Adresse des Interface vom Router. Wie der Name sagt braucht jedes Gerät in der TCP/IP Konfiguration einen "Default Gateway" damit man mit anderen Geräten aus anderen Netzwerken kommunizieren kann. Wenn jetzt ein Gerät an eine IP-Adresse ein Datenpacket senden möchte welches sich nicht im eigenen Netz befinden, sendet das Gerät das Datenpacket an den "Default Gateway" (Routerinterface) damit er dann entscheiden kann wohin das Packet gesendet werden muss. 

---

**Aufgabe 5: Herausforderungen und Lösungen im Routing**

Erforscht die Komplexität der Routingtabellen und die verschiedenen Methoden, wie Einträge dynamisch aktualisiert oder manuell eingegeben werden können. Versteht, wie die Wahl der Netzwerktopologie innerhalb eines LANs die Sichtbarkeit, den Datenverkehr und die Netzwerkkomplexität beeinflusst.

Eure Mission ist es, durch euer Verständnis von Netzwerkrouting die Effizienz und Leistung der Netzwerke in den Datenwolken von EtherNetica zu steigern. Eure Entscheidungen werden den Handel und die Kommunikation in dieser digitalen Welt maßgeblich beeinflussen. Viel Erfolg, Netzwerkkaufleute!

A: Die Routing Tabelle ist eine Tabelle, welches den kompletten Weg, wohin ein Datenpacket vom Router aus hin gesendet wird mit verschieden Einträgen erfasst wird. In dieser Routingtabelle steht drinne mit welches Netzwerken (andere Router) der Router schon eine Konversation hatte. Der Typ bestimmt den Status der Nachricht (C = Connectet). Dann wird das Netzwerk erfasst und rechts wird dann der Jeweilige Port angegeben.