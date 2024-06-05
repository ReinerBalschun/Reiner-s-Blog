# **Aufgabe 1**

Welche Informationen muss ein kabelgebundener Netzwerk-Client wie bspw. ein Desktop-PC erhalten, um am Netzwerk teilnehmen zu können?

A: 
Um an einem kabelgebundenen Netzwerk teilnehmen zu können, benötigt ein Netzwerk-Client wie ein Desktop-PC verschiedene Informationen, die in der Regel von einem Netzwerkadministrator oder DHCP-Server bereitgestellt werden:

**Essenzielle Informationen:**

**1. IP-Adresse:**

- Eine eindeutige Adresse, die den Client im Netzwerk identifiziert.
- Sie kann statisch vom Netzwerkadministrator zugewiesen oder dynamisch von einem DHCP-Server vergeben werden.

**2. Subnetzmaske:**

- Definiert den Bereich des Netzwerks, zu dem der Client gehört.
- Ermöglicht dem Client, zu erkennen, ob ein Zielgerät im selben Netzwerk oder in einem anderen Netzwerk liegt.

**3. Standard-Gateway:**

- Die IP-Adresse des Routers, der den Datenverkehr zwischen dem lokalen Netzwerk und dem Internet oder anderen externen Netzwerken leitet.

**4. DNS-Server:**

- Die IP-Adresse(n) von DNS-Servern, die Domainnamen in IP-Adressen umwandeln, damit der Client Websites und andere Onlinedienste aufrufen kann.


# **Aufgabe 2**

Wenn in einem Netzwerk ein DHCP verfügbar ist, übernimmt dieser Aufgaben. Welche sind dies?

A:  
In einem Netzwerk mit DHCP übernimmt der DHCP-Server (Dynamic Host Configuration Protocol) verschiedene wichtige Aufgaben, um die automatische Konfiguration von Netzwerkparametern für Client-Geräte zu ermöglichen.

**Die Hauptaufgaben eines DHCP-Servers umfassen:**

**1. Zuweisung von IP-Adressen:**

- DHCP vergibt dynamisch IP-Adressen aus einem zugewiesenen Adresspool an Client-Geräte, die sich mit dem Netzwerk verbinden.
- Dies stellt sicher, dass jedem Gerät eine eindeutige Adresse zugewiesen wird, die für die Kommunikation im Netzwerk erforderlich ist.
- DHCP verhindert auch IP-Adresskonflikte, indem es bereits vergebene Adressen nicht erneut vergibt.

**2. Bereitstellung von Konfigurationsinformationen:**

- Neben der IP-Adresse stellt DHCP Clients auch weitere wichtige Konfigurationsinformationen zur Verfügung, z. B.:
    - Subnetzmaske: Definiert das Subnetz, zu dem der Client gehört.
    - Standard-Gateway: Die IP-Adresse des Routers, der den Datenverkehr zum Internet oder anderen Netzwerken leitet.
    - DNS-Server: IP-Adressen von DNS-Servern, die Domainnamen in IP-Adressen umwandeln.
    - Weitere optionale Konfigurationen wie WINS-Server, Suchpfade und Zeitzoneneinstellungen.

**3. Verwaltung von Adressleases:**

- DHCP vergibt IP-Adressen an Clients für einen bestimmten Zeitraum (Lease-Zeit).
- Nach Ablauf der Lease-Zeit kann die Adresse vom Client freigegeben oder an einen anderen Client neu vergeben werden.
- Dies gewährleistet eine effiziente Nutzung der IP-Adressen im Netzwerk und verhindert, dass Adressen von inaktiven Geräten blockiert werden.

# **Aufgabe 3**

Wie erhalte ich mit einem verbundenen Client Informationen zu den Netzwerk-Details. Unterscheiden Sie zwischen Windows- & Linux-Systemen.

A: Um Informationen zu den Netzwerkdetails eines verbundenen Clients zu erhalten, gibt es verschiedene Methoden, die sich je nach Betriebssystem unterscheiden.

**Windows-Systeme:**

**1. Befehlszeile:**

- Öffne die Eingabeaufforderung (cmd).
- Gebe den Befehl `ipconfig` ein.
- Dieser Befehl zeigt detaillierte Informationen zur Netzwerkverbindung des Clients an, einschließlich IP-Adresse, Subnetzmaske, Standard-Gateway, DNS-Servern und MAC-Adresse.

**2. Netzwerk- und Freigabecenter:**

- Klicke mit der rechten Maustaste auf das Netzwerksymbol in der Taskleiste.
- Wähle "Netzwerk- und Freigabecenter" aus.
- Klicke auf den aktuell verbundenen Netzwerkadapter.
- Im Statusfenster findet man Informationen zur IP-Adresse, Subnetzmaske, Standard-Gateway und DNS-Servern.

**3. Systemsteuerung:**

- Öffne die Systemsteuerung.
- Gehe zu "Netzwerk und Internet" > "Netzwerkverbindungen".
- Klicke mit der rechten Maustaste auf den aktuell verbundenen Netzwerkadapter.
- Wähle "Eigenschaften" aus.
- Im Dialogfeld "Netzwerkeigenschaften" finden man Informationen zur IP-Adresse, Subnetzmaske, Standard-Gateway und DNS-Servern.

**Linux-Systeme:**

**1. Befehlszeile:**

- Öffne ein Terminalfenster.
- Gib den Befehl `ifconfig` ein.
- Dieser Befehl zeigt detaillierte Informationen zu allen Netzwerkverbindungen des Systems an, einschließlich IP-Adresse, Subnetzmaske, MAC-Adresse und Empfangs- und Sendebytes.
- Um Informationen zu einer bestimmten Netzwerkverbindung zu erhalten, kann man den Befehl `ifconfig` mit dem Namen der Schnittstelle verwenden (z. B. `ifconfig eth0`).

	*gibt bei Linux noch weitere Netzwerktools die so ähnlich funktionieren wie `nmcli` oder auch `iwconfig`    


# **Aufgabe 4**

Wie lautet der Kommandozeilenbefehl, um die Anbindung an einen anderen Client im Netzwerk zu testen, wenn der Ziel-Client die IP-Adresse 192.168.178.2 hat?

A:

```
ping 192.168.178.2
```

- Dieser Befehl sendet eine Reihe von ICMP(**Internet Control Message Protocol**)-Echo-Anfragen an den Ziel-Client mit der angegebenen IP-Adresse und wartet auf Antworten.
    
- Erfolgreiche Antworten zeigen eine funktionierende Netzwerkverbindung zum Ziel-Client an.
    
- Informationen wie Paketverlust, Latenz und Antwortzeiten werden ebenfalls angezeigt.


# **Aufgabe 5**

Welche IP-Adressbereiche kommen für private Netze in Frage?

A: Diese Adressen dienen der internen Verwendung innerhalb eines privaten Netzwerks. Sie sind nicht eindeutig oder weltweit einzigartig und können daher von mehreren Organisationen verwendet werden, solange sie sich in unterschiedlichen privaten Netzwerken befinden. Die drei private IP-Adressbereiche sind:

	   - 10.0.0.0 bis 10.255.255.255 (10.0.0.0/8)
	   - 172.16.0.0 bis 172.31.255.255 (172.16.0.0/12)
	   - 192.168.x.x (192.168.x.x/16)



---

Lösung:

**Aufgabe 1**

- **IP-Adresse:** Der Netzwerk-Client benötigt eine eindeutige IP-Adresse, um im Netzwerk identifiziert zu werden. Diese Adresse kann statisch (manuell konfiguriert) oder dynamisch (durch DHCP) zugewiesen werden.
- **Subnetzmaske:** Die Subnetzmaske wird verwendet, um festzulegen, welcher Bereich von IP-Adressen im Netzwerk lokal erreichbar ist. Sie bestimmt die Netzwerkteilung und die IP-Bereiche, die im selben Subnetz liegen.
- **Gateway-Adresse:** Das Gateway ist die IP-Adresse des Routers, der den Netzwerkverkehr zwischen dem lokalen Netzwerk und anderen Netzwerken, wie dem Internet, vermittelt. Der Netzwerk-Client muss wissen, welche IP-Adresse als Gateway verwendet wird.
- **DNS-Server-Adresse:** Der DNS-Server (Domain Name System) wird verwendet, um Domainnamen in IP-Adressen aufzulösen. Der Netzwerk-Client benötigt mindestens eine DNS-Server-Adresse, um Internetdienste und Ressourcen im Netzwerk anhand von Namen statt IP-Adressen zu erreichen.

**Aufgabe 2**

Ein DHCP-Server (Dynamic Host Configuration Protocol) übernimmt in einem Netzwerk verschiedene Aufgaben in Bezug auf die Zuweisung von IP-Adressen und anderen Netzwerkkonfigurationsinformationen an angeschlossene Clients.

- **IP-Adresszuweisung:** Der DHCP-Server weist IP-Adressen an Netzwerkclients dynamisch zu. Dies bedeutet, dass er Clients bei Bedarf eine freie IP-Adresse aus einem vordefinierten Adresspool zuweist. Dies erleichtert die Verwaltung von IP-Adressen im Netzwerk, da keine manuelle Konfiguration erforderlich ist.
- **Subnetzmaskenzuweisung:** Der DHCP-Server weist den Clients auch die passende Subnetzmaske zu, um festzulegen, welcher Bereich von IP-Adressen im lokalen Netzwerk erreichbar ist.
- **Gateway-Informationen:** Der DHCP-Server teilt den Clients die IP-Adresse des Standardgateways mit, das für die Weiterleitung von Datenverkehr außerhalb des lokalen Netzwerks verwendet wird.
- **DNS-Server-Informationen:** Der DHCP-Server gibt den Clients die IP-Adressen der DNS-Server im Netzwerk, die zur Auflösung von Domainnamen in IP-Adressen benötigt werden.
- **Weitere Konfigurationsoptionen:** DHCP kann auch zusätzliche Informationen wie Zeitserver, NTP-Server, WINS-Server und spezielle DHCP-Optionen bereitstellen, die von den Clients verwendet werden können.
- **Leasemanagement:** DHCP-Server weisen IP-Adressen auf Zeitbasis zu. Clients erhalten eine temporäre Leasetime für die zugewiesene IP-Adresse, und der DHCP-Server aktualisiert oder erneuert die Leases, wenn sie ablaufen. Dies ermöglicht die effiziente Nutzung von IP-Adressen, da nicht verwendete Adressen freigegeben werden.
- **Fehlerbehandlung:** Der DHCP-Server kann Fehler behandeln, wie z.B. IP-Adresskonflikte, die auftreten können, wenn eine bereits verwendete IP-Adresse erneut zugewiesen wird.

**Aufgabe 3**

**Für Windows-Systeme:**

1. Öffnen Sie die Eingabeaufforderung (CMD): Klicken Sie auf "Start", geben Sie "cmd" in das Suchfeld ein und drücken Sie "Enter". Dies öffnet das Eingabeaufforderungsfenster.
2. Geben Sie den Befehl "ipconfig" ein und drücken Sie "Enter". Dieser Befehl zeigt Ihnen Informationen zur Netzwerkkonfiguration Ihres Windows-Systems, einschließlich Ihrer IP-Adresse, Subnetzmaske, Standardgateway und DNS-Server.
3. Für weitere Details können Sie "ipconfig /all" eingeben. Dies zeigt erweiterte Informationen, einschließlich Ihrer MAC-Adresse und DHCP-Konfiguration.
4. Wenn Sie Informationen zur Netzwerkkarte benötigen, können Sie den Befehl "netsh interface show interface" verwenden, um Details zur Netzwerkschnittstelle anzuzeigen.

**Für Linux-Systeme:**

1. Öffnen Sie das Terminal: Je nach Ihrem Linux-Desktop-Umgebung können Sie das Terminal über das Anwendungsmenü oder mit einer Tastenkombination öffnen.
2. Geben Sie den Befehl "ifconfig" ein und drücken Sie "Enter". Dieser Befehl zeigt Informationen zur Netzwerkkonfiguration Ihres Linux-Systems, einschließlich Ihrer IP-Adresse, Subnetzmaske und MAC-Adresse.
3. Für neuere Linux-Distributionen oder solche, die das "ip" -Befehlszeilenwerkzeug verwenden, können Sie "ip addr show" verwenden, um ähnliche Informationen anzuzeigen.
4. Wenn Sie weitere Netzwerkinformationen benötigen, können Sie "route -n" verwenden, um Details zu Ihrer Routing-Tabelle anzuzeigen.
5. Für erweiterte Informationen und Konfigurationen können Sie je nach Linux-Distribution das Network Manager-Tool oder das "nmcli" -Befehlszeilenwerkzeug verwenden.

**Aufgabe 4**

Um die Netzwerkverbindung zu einem anderen Client im Netzwerk zu testen, können Sie den "ping" -Befehl verwenden. Dieser Befehl wird verwendet, um festzustellen, ob ein Remote-Host (in diesem Fall der Ziel-Client mit der IP-Adresse 192.168.178.2) erreichbar ist.

> ping 192.168.178.2

Wenn der Ziel-Client erreichbar ist und die Verbindung ordnungsgemäß funktioniert, erhalten Sie eine Antwort vom Ziel-Client in Form von ICMP-Echo-Antworten. Wenn Sie keine Antwort erhalten oder "Zeitüberschreitung" oder "Host nicht erreichbar" sehen, bedeutet dies, dass es ein Problem mit der Verbindung zum Ziel-Client gibt.

**Aufgabe 5**

Für private Netzwerke werden spezielle IP-Adressbereiche verwendet, die in den folgenden RFC-Dokumenten (Request for Comments) festgelegt sind, um Konflikte mit öffentlichen IP-Adressen im Internet zu vermeiden. Diese privaten IP-Adressbereiche sind für die Verwendung in privaten Netzwerken und lokalen Netzwerken reserviert:

**IPv4-Adressbereiche für private Netze:**

- **10.0.0.0 bis 10.255.255.255 (10.0.0.0/8):** Dieser Bereich umfasst 16.777.216 IP-Adressen und ist für größere private Netzwerke geeignet.
- **172.16.0.0 bis 172.31.255.255 (172.16.0.0/12):** Dieser Bereich umfasst 1.048.576 IP-Adressen und wird häufig in mittelgroßen Netzwerken verwendet.
- **192.168.0.0 bis 192.168.255.255 (192.168.0.0/16):** Dieser Bereich bietet 65.536 IP-Adressen und ist für kleinere Netzwerke oder Heimnetzwerke geeignet.

**IPv6-Adressbereiche für private Netze:**

- **fc00::/7:** Dieser Bereich ist für IPv6-Adressen in privaten Netzwerken reserviert. Innerhalb dieses Bereichs können private IPv6-Adressbereiche erstellt werden, um die Adressierung in lokalen Netzwerken zu ermöglichen.


