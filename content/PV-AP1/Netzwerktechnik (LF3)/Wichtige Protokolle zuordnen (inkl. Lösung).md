
# **Aufgabe 1**

Führen Sie die folgenden Protokolle tabellarisch auf. Ordnen Sie die OSI-Schicht, den ausgeschriebenen Namen sowie eine Beschreibung zu:

- DNS
- SMB
- NFS
- SMTP/S
- HTTP/S
- IPSEC
- IP
- TCP
- UDP
- SSH
- DHCP
- ARP
- TLS

| OSI-Schicht           | Protokoll (ausgeschrieben)                                                | Beschreibung                                                           |
| --------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Anwendungsschicht** | DNS (Domain Name System)                                                  | Domainnamen in IP-Adressen und umgekehrt umwandeln                     |
| **Anwendungsschicht** | SMB (Server Message Block)                                                | Dateisysteme und Drucker über Netzwerke freigeben                      |
| **Anwendungsschicht** | NFS (Network File System)                                                 | Dateisysteme über Netzwerke freigeben (ähnlich SMB)                    |
| **Anwendungsschicht** | SMTP/S (Simple Mail Transfer Protocol / Secure SMTP)                      | Versenden und Empfangen von E-Mails                                    |
| **Anwendungsschicht** | HTTP/S (Hypertext Transfer Protocol / Secure Hypertext Transfer Protocol) | Daten für das World Wide Web übertragen                                |
| **Netzwerkschicht**   | IPSEC (IP Security)                                                       | Verschlüsselung und Authentifizierung für die IP-Kommunikation         |
| **Netzwerkschicht**   | IP (Internet Protocol)                                                    | Adressierung und Routing von Datenpaketen in IP-Netzwerken             |
| **Transportschicht**  | TCP (Transmission Control Protocol)                                       | Zuverlässige Datenübertragung mit Verbindungsaufbau und Sequenzierung  |
| **Transportschicht**  | UDP (User Datagram Protocol)                                              | Verbindungslose Datenübertragung für datengrammorientierte Anwendungen |
| **Anwendungsschicht** | SSH (Secure Shell)                                                        | Sichere Remote-Verbindungen zu Netzwerkgeräten herstellen              |
| **Netzwerkschicht**   | DHCP (Dynamic Host Configuration Protocol)                                | IP-Adressen und andere Netzwerkkonfigurationen automatisch zuweisen    |
| **Netzwerkschicht**   | ARP (Address Resolution Protocol)                                         | MAC-Adressen zu IP-Adressen zuordnen                                   |
| **Transportschicht**  | TLS (Transport Layer Security)                                            | Sichere Datenübertragung auf Basis von SSL/HTTPS                       |

# **Aufgabe 2**

Welche Informationen sind zur Konfiguration eines E-Mail-Accounts in einem Client notwendig? Suchen Sie die Protokolle und Einstellungen zur Konfiguration Ihrer Schul-E-Mail-Adresse in einem Client heraus.

![[Pasted image 20240424154612.png]]


Man braucht den IMAP-Server auf Port 143 um die Email empfangen zu können & den SMTP-Server auf Port 25 um Emails im Namen des Email Kontos versenden zu können.

# **Aufgabe 3**

Inwiefern unterscheiden sich die Protokolle HTTP und HTTPS voneinander? Erläutern Sie, wie die SSL Verschlüsselung funktioniert.


**HTTP (Hypertext Transfer Protocol)** und **HTTPS (Hypertext Transfer Protocol Secure)** sind beide Protokolle zur Übertragung von Daten im World Wide Web. Sie unterscheiden sich jedoch in einem wichtigen Punkt: der **Sicherheit**.

**HTTP:**

- **Unverschlüsselte Kommunikation:** Die Datenübertragung mit HTTP erfolgt im Klartext.
- **Mangelnde Sicherheit:** Dies bedeutet, dass sensible Informationen wie Passwörter, Kreditkartendaten oder private Nachrichten von Unbefugten abgefangen und mitgelesen werden können.
- **Gefährdung durch Man-in-the-Middle-Angriffe:** Angreifer können sich zwischen Client und Server positionieren und den Datenverkehr manipulieren.

**HTTPS:**

- **Verschlüsselte Kommunikation:** HTTPS verwendet die SSL/TLS-Verschlüsselung, um die Datenübertragung zu schützen.
- **Verbesserte Sicherheit:** Die Daten werden mit einem geheimen Schlüssel verschlüsselt, der nur vom Client und Server bekannt ist.
- **Schutz vor Man-in-the-Middle-Angriffen:** Durch die Verschlüsselung und Zertifikate ist es für Angreifer praktisch unmöglich, den Datenverkehr zu lesen oder zu manipulieren.

**So funktioniert die SSL-Verschlüsselung:**

1. **Handshake:** Client und Server tauschen Informationen über ihre kryptografischen Fähigkeiten und Zertifikate aus.
2. **Zertifikatauthentifizierung:** Der Client prüft die Gültigkeit des Serverzertifikats, um sicherzustellen, dass er mit dem richtigen Server kommuniziert.
3. **Schlüsselgenerierung:** Client und Server generieren einen gemeinsamen Sitzungsschlüssel, der nur für diese Verbindung verwendet wird.
4. **Datenverschlüsselung:** Die Daten werden mit dem symmetrischen Sitzungsschlüssel verschlüsselt und über den sicheren Kanal übertragen.
5. **Entschlüsselung:** Der Server entschlüsselt die Daten mit dem gemeinsamen Sitzungsschlüssel.

# **Aufgabe 4**

Was genau ist HTTPS-Inspection? Welche Probleme können damit einher gehen?


**HTTPS-Inspection** (auch bekannt als **SSL/TLS-Inspection** oder **Deep Packet Inspection**) ist eine Technik zur Überwachung und Analyse des Datenverkehrs auf Netzwerkebene. Sie ermöglicht es Netzwerkadministratoren und Sicherheitsteams, den Inhalt von HTTPS-verschlüsselten Datenpaketen zu inspizieren, um potenzielle Bedrohungen wie Malware, Phishing-Angriffe oder unerwünschte Inhalte zu erkennen.

**Vorteile von HTTPS-Inspection:**

- **Verbesserte Sicherheit:** Durch die Analyse des Datenverkehrs können Bedrohungen erkannt und blockiert werden, bevor sie Schaden anrichten können.
- **Einhaltung von Richtlinien:** HTTPS-Inspection kann verwendet werden, um sicherzustellen, dass Unternehmensrichtlinien hinsichtlich der Nutzung des Internets eingehalten werden.
- **Bandbreitenmanagement:** Durch die Identifizierung von datenintensiven Anwendungen und Websites kann die Bandbreitenbelastung im Netzwerk geregelt werden.

**Probleme mit HTTPS-Inspection:**

- **Datenschutzbedenken:** Die Inspektion von verschlüsseltem Datenverkehr kann als Eingriff in die Privatsphäre der Benutzer angesehen werden.
- **Leistungseinbußen:** Die Analyse von HTTPS-Daten kann die Netzwerkleistung beeinträchtigen.
- **Umgehungsmechanismen:** Hacker können versuchen, die HTTPS-Inspection zu umgehen, indem sie neue Verschlüsselungstechniken oder Obfuscation verwenden.
- **Komplexität:** Die Implementierung und Verwaltung von HTTPS-Inspection kann komplex und kostspielig sein.


---


Lösung:

**Aufgabe 1**

|Protokoll|OSI-Schicht|Ausgeschriebener Name|Beschreibung|
|---|---|---|---|
|DNS|Anwendung|Domain Name System|Übersetzt Hostnamen in IP-Adressen und umgekehrt.|
|SMB|Sicherung|Server Message Block|Protokoll für die Datei- und Druckerfreigabe in Netzwerken.|
|NFS|Anwendung|Network File System|Ermöglicht den Zugriff auf Dateien über ein Netzwerk.|
|SMTP/S|Anwendung|Simple Mail Transfer Protocol/Secure|Überträgt E-Mails zwischen Servern.|
|HTTP/S|Anwendung|Hypertext Transfer Protocol/Secure|Überträgt Webseiteninhalte über das Internet.|
|IPSEC|Sicherung|IP Security|Bietet Sicherheit für die Kommunikation auf Netzwerkschicht.|
|IP|Netzwerk|Internet Protocol|Ermöglicht die Übertragung von Datenpaketen im Netzwerk.|
|TCP|Transport|Transmission Control Protocol|Gewährleistet zuverlässige, geordnete Datenübertragung.|
|UDP|Transport|User Datagram Protocol|Überträgt Daten ohne Bestätigung oder Verbindungsaufbau.|
|SSH|Anwendung|Secure Shell|Sichert die Kommunikation über unsichere Netzwerke.|
|DHCP|Anwendung|Dynamic Host Configuration Protocol|Automatisiert die Vergabe von Netzwerkkonfigurationen.|
|ARP|Sicherung|Address Resolution Protocol|Ermittelt die Hardwareadresse zu einer IP-Adresse im lokalen Netzwerk.|
|TLS|Sicherung|Transport Layer Security|Gewährleistet sichere Datenübertragung über das Internet.|

  

**Aufgabe 2**

**Allgemein**

- **Benutzername und Passwort:**
    - _Benutzername:_ Die E-Mail-Adresse des Kontos, z.B. "[benutzername@example.com](mailto:benutzername@example.com "mailto:benutzername@example.com")".
    - _Passwort:_ Das Passwort, das mit dem E-Mail-Konto verknüpft ist.
- **E-Mail-Protokoll und Serverinformationen:**
    - _E-Mail-Protokoll:_ IMAP (Internet Message Access Protocol) oder POP3 (Post Office Protocol).
    - _Eingangsserver (IMAP/POP3):_ z.B. "imap.example.com" oder "pop.example.com".
    - _Ausgangsserver (SMTP):_ z.B. "smtp.example.com".
- **Verschlüsselungsmethoden:**
    - _SSL/TLS:_ Informationen darüber, ob SSL (Secure Sockets Layer) oder TLS (Transport Layer Security) für die Verschlüsselung verwendet werden sollen. Dies betrifft sowohl den Eingangs- als auch den Ausgangsserver.
- **Portnummern:**
    - IMAP-Port: Normalerweise 143 (unverschlüsselt) oder 993 (verschlüsselt).
    - POP3-Port: Normalerweise 110 (unverschlüsselt) oder 995 (verschlüsselt).
    - SMTP-Port: Normalerweise 25 (unverschlüsselt), 587 (verschlüsselt), oder 465 (verschlüsselt).
- **Authentifizierungsmethode:**
    - Informationen darüber, ob die Authentifizierung über Passwort, OAuth (Open Authorization) oder ein anderes Verfahren erfolgt.
- **Domaininformationen (falls zutreffend):**
    - Manchmal erfordern bestimmte E-Mail-Anbieter die Eingabe der Domäne, z.B. "example.com".

**E-Mail-Konfiguration für die MMBbS:**

- Empfangsserver (IMAP): mail.mm-bbs.de
- Server-Port (IMAP): 143
- Sendeserver (SMTP): mail.mm-bbs.de
- Server-Port (SMTP): 25
- Benutzername: Ihre E-Mail Adresse (@mm-bbs.de)
- Passwort: Ihr Portal (WLAN) Passwort
- Verschlüsselung: STARTTLS

**Aufgabe 3**

**HTTP (Hypertext Transfer Protocol):**

- **Nicht sicher:** HTTP ist ein unverschlüsseltes Protokoll, was bedeutet, dass die Daten, die zwischen dem Webserver und dem Browser übertragen werden, in Klartext lesbar sind.
    
- **Port:** HTTP verwendet normalerweise Port 80 für die Kommunikation.
    
- **Keine Authentifizierung:** HTTP bietet keine integrierte Möglichkeit zur Authentifizierung von Servern oder Clients.
    

**HTTPS (Hypertext Transfer Protocol Secure):**

- **Sicher:** HTTPS ist die sichere Version von HTTP. Hierbei werden die Daten zwischen dem Webserver und dem Browser verschlüsselt, was die Vertraulichkeit und Integrität der übertragenen Daten gewährleistet.
    
- **Verschlüsselung:** HTTPS verwendet SSL (Secure Sockets Layer) oder das modernere TLS (Transport Layer Security) zur Verschlüsselung der Datenübertragung.
    
- **Port:** HTTPS verwendet normalerweise Port 443 für die Kommunikation.
    
- **Authentifizierung:** HTTPS ermöglicht die Authentifizierung des Servers durch digitale Zertifikate. Dadurch kann der Browser sicherstellen, dass er mit dem tatsächlichen Server und nicht mit einem potenziell bösartigen Server verbunden ist.
    

**SSL (Secure Sockets Layer) Verschlüsselung:**

Die SSL-Verschlüsselung, die jetzt oft durch das sicherere TLS-Protokoll ersetzt wurde, funktioniert folgendermaßen:

1. **Handshake:** Der SSL/TLS-Handshake ist der Prozess, bei dem der Server und der Client sich auf die Verschlüsselungsmethoden einigen und die erforderlichen Schlüssel austauschen. Dies beinhaltet auch die Überprüfung der Integrität der erhaltenen Zertifikate.
    
2. **Verschlüsselung:** Nach dem Handshake wird eine sichere Verbindung hergestellt, und die Datenübertragung zwischen Server und Client erfolgt verschlüsselt. Dies bedeutet, dass selbst wenn ein Angreifer die übertragenen Daten abfängt, er sie nicht ohne den richtigen Schlüssel entschlüsseln kann.
    
3. **Entschlüsselung beim Empfänger:** Der Empfänger (Server oder Client) entschlüsselt die empfangenen Daten mit dem entsprechenden Schlüssel, um sie im Klartext zu erhalten.
    

SSL/TLS bietet somit eine sichere Kommunikation über unsichere Netzwerke wie das Internet, indem es die Vertraulichkeit, Integrität und Authentizität der übertragenen Daten gewährleistet.

**Aufgabe 4**

HTTPS-Inspection, auch als HTTPS Interception oder SSL/TLS Inspection bekannt, bezieht sich auf einen Prozess, bei dem der Inhalt von verschlüsselten HTTPS-Verbindungen von einem Sicherheitsgerät (z.B., Firewalls, Proxy-Server, Content-Filter) entschlüsselt, inspiziert und anschließend wieder verschlüsselt wird, bevor er an den ursprünglichen Empfänger gesendet wird. Dieser Vorgang wird oft in Unternehmensnetzwerken und Sicherheitsinfrastrukturen eingesetzt, um die Sicherheit und Kontrolle über den Datenverkehr zu erhöhen.

Hier sind die grundlegenden Schritte des HTTPS-Inspection-Prozesses:

1. **Entschlüsselung des HTTPS-Verkehrs:**
    
    - Das Sicherheitsgerät, das HTTPS-Inspection durchführt, fungiert als sogenannter "Man-in-the-Middle". Es empfängt die verschlüsselten Daten, entschlüsselt sie und kann somit den Klartextinhalt einsehen.
2. **Inspektion des Datenverkehrs:**
    
    - Der entschlüsselte Datenverkehr wird vom Sicherheitsgerät inspiziert. Dies kann verschiedene Sicherheitsmaßnahmen umfassen, wie das Überprüfen auf schädliche Inhalte, Filtern unerwünschter Websites, Implementierung von Sicherheitsrichtlinien oder Überwachung der Aktivitäten im Netzwerk.
3. **Wieder-Verschlüsselung und Weiterleitung:**
    
    - Nachdem der Datenverkehr inspiziert wurde, wird er vom Sicherheitsgerät wieder verschlüsselt, um die ursprüngliche Verschlüsselung beizubehalten. Anschließend wird der Datenverkehr an das ursprüngliche Ziel (z.B., Webserver) weitergeleitet.

Die Gründe für die Implementierung von HTTPS-Inspection können sein:

- **Sicherheitskontrolle:** Die Möglichkeit, verschlüsselten Datenverkehr zu inspizieren, ermöglicht es Sicherheitslösungen, bösartige Aktivitäten zu erkennen, schädliche Inhalte zu blockieren und Sicherheitsrichtlinien durchzusetzen.
    
- **Compliance:** In einigen Branchen und Organisationen sind Sicherheitsüberprüfungen und Kontrollen erforderlich, um bestimmten Compliance-Anforderungen zu entsprechen.
    

**Soziale und sicherheitsbezogene Gesichtspunkte**

HTTPS-Inspection hat auch kontroverse Aspekte, insbesondere im Hinblick auf die Privatsphäre. Da es eine Entschlüsselung des Datenverkehrs erfordert, kann dies zu Bedenken hinsichtlich der Vertraulichkeit und des Datenschutzes führen. Daher sollte der Einsatz von HTTPS-Inspection sorgfältig abgewogen und transparent kommuniziert werden, um die Erwartungen der Benutzer in Bezug auf Privatsphäre zu berücksichtigen.

Die Entschlüsselung und Inspektion des HTTPS-Verkehrs durch HTTPS-Inspection-Punkte kann potenziell von Angreifern ausgenutzt werden, wenn nicht angemessen implementiert und geschützt. Eine der bekannteren Methoden stellen die Man-in-the-Middle-Angriffe (MitM) dar. Ein Angreifer könnte versuchen, die Rolle des "Man-in-the-Middle" zu übernehmen, indem er die Entschlüsselungspunkte im HTTPS-Inspection-System ausnutzt. Dies könnte durch falsche Zertifikate oder Schwächen in der Implementierung erreicht werden.