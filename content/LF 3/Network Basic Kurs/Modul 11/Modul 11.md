---
"type:": Modul
---

**Aufgabe 1: Statisch oder Dynamisch?** Zu Beginn eurer Reise müsst ihr die grundlegende Entscheidung zwischen statischer und dynamischer IP-Konfiguration verstehen. Untersucht, welche Geräte statische Adressen verwenden und warum, um die ersten Hinweise zu erhalten.

A: Statische IP-Konfiguration:
- Bei einer statischen IP-Konfiguration wird die IP-Adresse manuell festgelegt und bleibt dauerhaft erhalten.
- Die statische IP-Adresse wird entweder vom Internetdienstanbieter oder im lokalen Netzwerk vom Administrator zugewiesen.
- Vorteil: Eine statische IP-Adresse ermöglicht es, dass der Computer immer unter derselben Adresse erreichbar ist, was beispielsweise für Server oder bestimmte Netzwerkanwendungen wichtig sein kann.
- Nachteil: Eine statische IP-Adresse kann zu Problemen führen, wenn sie bereits von einem anderen Gerät im Netzwerk verwendet wird. Zudem ist sie weniger flexibel und erfordert manuelle Einstellungen bei der Netzwerkkonfiguration.

Dynamische IP-Konfiguration:
- Bei einer dynamischen IP-Konfiguration erhält der Computer seine IP-Adresse automatisch vom DHCP (Dynamic Host Configuration Protocol)-Server.
- Der DHCP-Server weist dem Computer eine freie und temporäre IP-Adresse zu, die nur für die Dauer der Verbindung gültig ist.
- Vorteil: Eine dynamische IP-Konfiguration ermöglicht eine einfache Einrichtung des Netzwerks, da keine manuellen Einstellungen erforderlich sind. Zudem können mehrere Geräte im Netzwerk dieselbe dynamische Adresse verwenden.
- Nachteil: Bei jeder Verbindung zum Netzwerk erhält der Computer eine neue IP-Adresse, was dazu führen kann, dass er unter unterschiedlichen Adressen erreichbar ist. Dies kann beispielsweise bei bestimmten Netzwerkanwendungen (z.B. Webserver) zu Problemen führen.

**Aufgabe 2: Manuelle Zuweisung von IP-Konfigurationen** Taucht tiefer ein in die Welt der statischen Adressierung. Wie erfolgt die manuelle Zuweisung von IPv4-Adressen, Subnetzmasken und Standardgateways? Sammelt das Wissen, um das erste Rätsel zu lösen.

A: Um eine manuelle Zuweisung durchzuführen, müssen zunächst die verfügbaren IP-Adressen im Netzwerk bekannt sein. Diese können entweder statisch festgelegt oder dynamisch über einen DHCP-Server zugewiesen werden. Bei der manuellen Zuweisung werden die IP-Adressen jedoch in der Regel statisch festgelegt. Die Subnetzmaske definiert den Adressbereich des Netzwerks und wird vom Netzwerkadministrator festgelegt. Sie bestimmt, welche Teile der IP-Adresse zur Identifikation des Netzwerks und welche zur Identifikation des Hosts verwendet werden. Das Standardgateway ist die IP-Adresse des Routers, über den das Gerät mit anderen Netzwerken außerhalb seines eigenen kommuniziert. Auch diese wird manuell vom Netzwerkadministrator festgelegt. Es ist wichtig sicherzustellen, dass jede zugewiesene IPv4-Adresse eindeutig innerhalb des Netzes ist und nicht von anderen Geräten verwendet wird, um Konflikte zu vermeiden.

**Aufgabe 3: Dynamische Adressierung mit DHCP** Eure Reise führt euch nun zu DHCP, dem Herzstück dynamischer Adressierung. Versteht, wie DHCP automatisch IP-Konfigurationen an verbundene Geräte zuweist und warum dies flexibler ist als statische Zuweisungen.

A: schon in Aufgabe 1 beantwortet.

**Aufgabe 4: Zeitlich begrenzte Zuweisungen und Rückgabe an den Pool** Erforscht die zeitliche Dimension von DHCP. Warum werden IP-Konfigurationen nur für eine begrenzte Zeit zugewiesen? Und was passiert, wenn ein Gerät die Verbindung trennt? Sammelt die Puzzlestücke, um das Gesamtbild zu vervollständigen.

A: Wenn ein Gerät das über DHCP seine IP-Adresse gezogen bekommen hat und dann offline geht (Power off, Netzwerkkarte defekt usw.), wird die zugewiesene IP-Adresse zurück an den DHCP Server gesendet und in den IP-Adresspool wieder eingeordnet, damit wieder ein anderes Gerät, welches sich neu verbinden möchte die IP-Adresse zugewiesen bekommt.     

**Aufgabe 5: DHCP-Serverdienste** Begebt euch auf die Suche nach den Hütern der DHCP-Adressen. Wer kann DHCP-Serverdienste bereitstellen, und wie geschieht dies? Erforscht die verschiedenen Quellen dieser wichtigen Dienstleistung.

A: Früher wurde der DHCP Serverdienst über einen einzelnen Server bereitgestellt. Heutzutage ist der Serverdienst meistens innerhalb des Router konfiguriert, da eine Router heutzutage ein Multifunktionsgerät ist (WLAN, Firewall, DHCP)

**Aufgabe 6: Der Tanz der DHCP-Nachrichten** Die letzte Etappe eurer Reise bringt euch zu den Kommunikationsritualen von DHCP. Untersucht die Bedeutung der DHCP-Discover-, DHCP-Offer-, DHCP-Request- und DHCP-Acknowledgment-Nachrichten. Wie tanzen diese Nachrichten, um eine erfolgreiche IP-Konfiguration zu gewährleisten?

A: Der DHCP-Server ist mit einem Bereich oder Pool von IPv4-Adressen konfiguriert, die DHCP-Clients zugewiesen werden können. Ein Client, der eine IPv4-Adresse benötigt, sendet eine DHCP-Discover-Nachricht, bei der es sich um einen Broadcastnachricht mit der Ziel-IPv4-Adresse 255.255.255.255 handelt. Alle Hosts im Netzwerk erhalten diese Nachricht, aber nur der DHCP-Server kann antworten. Der Server antwortet mit einer DHCP-Offer/Angebot-Nachricht. Diese Nachricht enthält eine vorgeschlagene IP-Adresse die der Client entweder annehmen oder ablehnen kann. Wenn der Client die vorgeschlagene IP-Adresse annehmen möchte sendet er eine DHCP-Request/Anfrage zu dem DHCP Server, der dann eine DHCP-PACK/Bestätigung zurück sendet als Bestätigung der IP-Adresse.


[[Modul 11.pdf]]

