
# **Aufgabe 1**

Beschreiben Sie den Aufbau mithilfe von Netzwerk-Komponenten, die das Netzwerk in folgendem Beispiel abbilden. Welche teilweise auch nicht eingezeichneten/nicht explizit genannten Kopplungselemente werden für das Netzwerk benötigt?


![[Pasted image 20240425081246.png]]


Der Netzwerkaufbau läuft wie folgt ab: 

1. Traffic über das Internet (Die Wolke) zu dem Router (Gerät rechts neben Wolke)
2. Beim Router angekommen wird muss der Traffic durch die Firewall, um zu überprüfen ob alle Daten auch sicher fürs Netzwerk sind.
3. Danach gehts über mehrere Switche entweder zum Desktop PC oder über einen Access Point zu einem kabellosen Gerät wie ein Laptop. 
 


# **Aufgabe 2**

Welche Aufgabe hat ein Router? Machen Sie diese mithilfe eines Beispiels mit IP-Adressen Ihrer Wahl deutlich.

**Die Hauptaufgaben eines Routers sind:**

**1. Routing:**

- Der Router empfängt Datenpakete von einem Gerät in seinem Netzwerk und analysiert die Ziel-IP-Adresse des Pakets.
- Basierend auf einer Routing-Tabelle, die der Router enthält, bestimmt er den besten Weg, um das Datenpaket an das Ziel zu leiten.
- Der Router leitet das Datenpaket dann an das nächste Gerät auf dem Weg zum Ziel weiter.

**Beispiel:**

 Ein Heimnetzwerk mit zwei Computern, einem Smartphone und einem Router. Die Computer haben die IP-Adressen 192.168.1.10 und 192.168.1.11, das Smartphone hat die IP-Adresse 192.168.1.12 und der Router hat die IP-Adresse 192.168.1.1.

Wenn der Computer mit der IP-Adresse 192.168.1.10 eine Website im Internet besuchen möchte, sendet er die Datenpakete an den Router. Der Router analysiert die Ziel-IP-Adresse der Datenpakete und stellt fest, dass sie nicht im lokalen Netzwerk (192.168.1.x) liegen. Der Router verwendet dann seine Routing-Tabelle, um den besten Weg zum Internet zu finden. In der Routing-Tabelle ist der Internet-Service-Provider (ISP) als nächster Hop mit der IP-Adresse 192.168.0.1 angegeben. Der Router leitet die Datenpakete dann an den ISP weiter, der dann die Datenpakete an das Internet weiterleitet.

**2. IP-Adressvergabe:**

- Der Router weist den Geräten in seinem Netzwerk IP-Adressen zu.
- Diese IP-Adressen werden verwendet, um die Geräte im Netzwerk eindeutig zu identifizieren.
- Der Router verwendet DHCP (Dynamic Host Configuration Protocol), um IP-Adressen automatisch zuzuweisen.

**Beispiel:**

Wenn ein neuer Computer ans Heimnetzwerk angeschlossen wird, weist der Router diesem Computer automatisch eine IP-Adresse zu.

**3. NAT (Network Address Translation):**

- Wenn Geräte in einem privaten Netzwerk (z. B. einem Heimnetzwerk) auf das Internet zugreifen möchten, müssen die privaten IP-Adressen in öffentliche IP-Adressen umwandelt werden.
- Der Router verwendet NAT, um diese Übersetzung durchzuführen.
- NAT ermöglicht es mehreren Geräten in einem privaten Netzwerk, dieselbe öffentliche IP-Adresse zu verwenden, um auf das Internet zuzugreifen.

**Beispiel:**

Wenn der Computer mit der IP-Adresse 192.168.1.10 eine Website im Internet besuchen möchte, muss er seine private IP-Adresse 192.168.1.10 in eine öffentliche IP-Adresse umwandeln. Der Router verwendet NAT, um diese Übersetzung durchzuführen und weist dem Computer eine temporäre öffentliche IP-Adresse zu.

**4. Firewall:**

- Ein Router kann eine integrierte Firewall haben, die das Netzwerk vor unbefugtem Zugriff und Cyberangriffen schützt.
- Die Firewall kann Regeln definieren, welche Arten von Datenverkehr das Netzwerk passieren dürfen und welche nicht.

**Beispiel:**

Die Firewall des Routers kann so konfiguriert sein, dass sie alle eingehenden Verbindungen von unbekannten IP-Adressen blockiert. Dies hilft, das Netzwerk vor Hackern und anderen Bedrohungen zu schützen.


# **Aufgabe 3**

Ein Server-Rack hat eine definierte Größe sowohl in der Höhe als auch in der Breite. In welchen Maßeinheiten werden diese angegeben?


Die Höhe in **Höheneinheiten** (HE) und die Breite **Zoll** oder **Millimetern**.

# **Aufgabe 4**

Für ein kleines Unternehmen wird diskutiert, ob ein managed oder unmanaged Switch eingesetzt werden sollte. Stellen Sie beide Varianten gegenüber und wägen Sie die Vor- und Nachteile ab.


**Managed Switches:**

**Vorteile:**

- **Erweiterte Funktionen:** Managed Switches bieten erweiterte Funktionen wie VLANs, Port-Priorisierung, Bandbreitenkontrolle und Quality of Service (QoS)
- **Verbesserte Sicherheit:** Managed Switches bieten erweiterte Sicherheitsfunktionen wie Zugriffskontrolle, Port-Sicherheit und DHCP-Snooping
- **Fernverwaltung:** Managed Switches können über eine webbasierte Oberfläche oder eine SNMP-Schnittstelle remote verwaltet werden, was die Verwaltung des Netzwerks vereinfacht.
- **Fehlerbehebung:** Managed Switches bieten detaillierte Überwachungs- und Fehlerbehebungsfunktionen, mit denen Netzwerkprobleme schnell identifiziert und behebt werden können.

**Nachteile:**

- **Höhere Kosten:** Managed Switches sind in der Regel teurer als Unmanaged Switches.
- **Komplexität:** Managed Switches erfordern mehr Konfigurations- und Verwaltungsaufgaben als Unmanaged Switches.
- **Benötigte Expertise:** Für die Verwaltung von Managed Switches sind Netzwerkkenntnisse erforderlich.

**Unmanaged Switches:**

**Vorteile:**

- **Günstigere Anschaffungskosten:** Unmanaged Switches sind in der Regel deutlich günstiger als Managed Switches.
- **Einfache Installation und Einrichtung:** Unmanaged Switches sind einfach zu installieren und einzurichten. Sie erfordern keine Konfiguration.
- **Geringer Wartungsaufwand:** Unmanaged Switches erfordern nur geringen Wartungsaufwand.

**Nachteile:**

- **Begrenzte Funktionen:** Unmanaged Switches bieten keine erweiterten Funktionen wie VLANs, Port-Priorisierung oder QoS.
- **Geringere Sicherheit:** Unmanaged Switches bieten nur grundlegende Sicherheitsfunktionen und sind anfälliger für unbefugten Zugriff.
- **Keine Fernverwaltung:** Unmanaged Switches können nicht remote verwaltet werden.
- **Fehlerbehebung:** Die Fehlerbehebung bei Unmanaged Switches kann aufgrund der fehlenden Überwachungs- und Diagnosefunktionen schwieriger sein.


---

Lösung:

**Aufgabe 1**

**Kopplungselemente vom Internet bis zum Client:**

- Anschlussdose des Internetproviders, je nach Anschlussart
    - Übergabepunkt für die Glasfaserverbindung
    - ein Glasfaser-Modem (von Glasfaser zu Kupferkabel) vor allem bei Fiber-To-The-Home (FTTH)
- Router
- Patchkabel zur Firewall
- Patchkabel zum Router
- Patchkabel zum Patchpanel
- Drahtlos
    - Verlegekabel vom Patchpanel zur Netzwerkdose
    - Patchkabel von der Netwerkdose zum Access-Point
    - WLAN-Strecke vom Access-Point zum Client
- Kabelgebunden
    - Verlegekabel vom Patchpanel zur Netzwerkdose
    - Patchkabel von der Netwerkdose zum Client

**Aufgabe 2**  

Ein Router ist ein Netzwerkgerät, das Datenpakete zwischen verschiedenen Computernetzwerken weiterleitet. Seine Hauptaufgabe besteht darin, den Datenverkehr effizient und sicher zwischen verschiedenen Netzwerken zu steuern. Dies geschieht durch die Weiterleitung von Datenpaketen zwischen verschiedenen IP-Adressen.

**Beispiel:**

Angenommen, Sie haben ein Heimnetzwerk mit mehreren Geräten, wie Computern, Smartphones und Druckern. Jedes Gerät in Ihrem Netzwerk hat eine eindeutige IP-Adresse, damit es identifiziert werden kann.

- Ihr Computer hat die IP-Adresse 192.168.1.2.
- Ihr Smartphone hat die IP-Adresse 192.168.1.3.
- Ihr Drucker hat die IP-Adresse 192.168.1.4.

Ihr Heimnetzwerk ist über einen Breitband-Internetdienstanbieter mit dem Internet verbunden. Hier erhält der Router als Gateway eine zweite IP-Adresse, die öffentliche IP z.B. 81.100.100.100. Der Router in Ihrem Netzwerk hat zwei Hauptaufgaben:

**Weiterleitung von Daten innerhalb des lokalen Netzwerks:**

Wenn Sie beispielsweise Dateien von Ihrem Computer (192.168.1.2) zu Ihrem Drucker (192.168.1.4) senden möchten, leitet der im Heim-Router enthaltene Switch oder je nach Setup ein separater Switch die Datenpakete innerhalb des lokalen Netzwerks weiter, ohne dass diese das Netzwerk verlassen.

**Weiterleitung von Daten zwischen lokalem Netzwerk und dem Internet:**

Wenn Sie jedoch eine Webseite aufrufen, sendet Ihr Computer (192.168.1.2) eine Anfrage an den Router 192.168.1.1. Der Router leitet dann diese Anfrage an den Internetdienstanbieter über die IP 81.100.100.100 weiter und gibt die Antwort vom Internet an Ihren Computer (192.168.1.2) zurück.

**Aufgabe 3**

Die Größe eines Server-Racks wird in der Regel in Höheneinheiten (HE oder "U") gemessen. Eine Höheneinheit entspricht 1,75 Zoll oder etwa 4,45 cm. Die Höheneinheiten werden verwendet, um die vertikale Höhe des Racks zu messen und die Höhe von Geräten und Ausrüstungen anzugeben, die in das Rack montiert werden sollen.

Die Breite von Server-Racks wird normalerweise in Zoll gemessen. Standardbreiten sind 19 Zoll (ca. 482,6 mm) für Ausrüstung, die in IT-Umgebungen verwendet wird. Es gibt jedoch auch schmalere Racks, zum Beispiel 10 Zoll, die in einigen speziellen Anwendungen in kleineren Umgebungen vorkommen können.

Zusätzlich zur Höhe und Breite können auch die Tiefe eines Racks und andere spezifische Abmessungen wichtig sein, je nach den Anforderungen der in das Rack montierten Geräte (bspw. Medizin-Sektor, wissenschaftliche Instrumente, ...).

**Aufgabe 4**

**Unmanaged Switch:**

_Vorteile:_

1. **Einfachheit:** Unmanaged Switches sind einfach zu bedienen und erfordern in der Regel keine Konfiguration. Sie können direkt aus der Box heraus verwendet werden.
2. **Kosten:** Unmanaged Switches sind oft kostengünstiger als ihre verwaltbaren Gegenstücke. Dies kann für kleine Unternehmen mit begrenzten Budgets attraktiv sein.

_Nachteile:_

1. **Begrenzte Kontrolle:** Unmanaged Switches bieten wenig bis keine Kontrolle über den Datenverkehr im Netzwerk. Es fehlen Funktionen wie Quality of Service (QoS) oder VLAN-Unterstützung.
2. **Geringere Flexibilität:** Da keine Konfiguration möglich ist, sind unmanaged Switches in Bezug auf die Anpassungsfähigkeit an spezifische Netzwerkanforderungen begrenzt.

**Managed Switch:**

_Vorteile:_

1. **Netzwerksteuerung:** Managed Switches bieten erweiterte Funktionen zur Steuerung des Datenverkehrs, wie z. B. VLANs, Quality of Service (QoS) und Bandbreitenmanagement.
2. **Fernzugriff und Überwachung:** Administratoren können den Switch aus der Ferne überwachen, konfigurieren und verwalten. Das ermöglicht eine effiziente Netzwerkverwaltung, besonders wenn das Unternehmen mehrere Standorte hat.
3. **Sicherheit:** Einige Managed Switches bieten Funktionen wie Port-Sicherheit und Zugangskontrolle, die die Netzwerksicherheit verbessern können.

_Nachteile:_

1. **Komplexität:** Die Konfiguration und Verwaltung von Managed Switches erfordern technisches Know-how. Kleine Unternehmen ohne dedizierten IT-Personal könnten Schwierigkeiten haben, diese Geräte optimal zu nutzen.
2. **Kosten:** Managed Switches sind in der Regel teurer als unmanaged Switches, sowohl in der Anschaffung als auch in der Wartung.

**Fazit:** Die Entscheidung zwischen einem managed und unmanaged Switch hängt von den spezifischen Anforderungen und Ressourcen des Unternehmens ab. Für kleine Unternehmen mit einfachen Netzwerkanforderungen und begrenztem Budget kann ein unmanaged Switch ausreichend sein. Wenn jedoch erweiterte Netzwerkkontrolle, Sicherheit und Skalierbarkeit erforderlich sind, ist ein managed Switch die bessere Wahl, auch wenn dies mit höheren Kosten und einer gewissen Komplexität verbunden ist.