

# **Aufgabe 1**

Zeigen Sie den tabellarischen Aufbau des OSI-Referenz-Modells auf, indem Sie die Layer-Nr., den Namen auf englisch und deutsch sowie die Aufgaben der Schicht darstellen.
## OSI-Referenzmodell:

| Nummer | Layer (Englisch)   | Layer (Deutsch)       | Aufgaben                                                                 |
| ------ | ------------------ | --------------------- | ------------------------------------------------------------------------ |
| 1      | Physical Layer     | Physikalische Schicht | Übertragung von Bits über ein physisches Medium (z.B. Kabel, Funkwellen) |
| 2      | Data Link Layer    | Sicherungsschicht     | Fehlerfreie Datenübertragung zwischen direkt verbundenen Netzwerkgeräten |
| 3      | Network Layer      | Netzwerkschicht       | Adressierung und Routing von Datenpaketen über Netzwerke                 |
| 4      | Transport Layer    | Transportschicht      | Organisation der Datenübertragung zwischen Anwendungsprozessen           |
| 5      | Session Layer      | Sitzungsschicht       | Verwaltung von Datenverbindungen zwischen Anwendungsprozessen            |
| 6      | Presentation Layer | Darstellungsschicht   | Formatierung und Verschlüsselung von Daten für die Anwendung             |
| 7      | Application Layer  | Anwendungsschicht     | Bereitstellung von Netzwerkdiensten und -anwendungen für Benutzer        |
# **Aufgabe 2**

Welche Ziele werden mit der Nutzung / Erläuterung von Netzwerken mithilfe des OSI-Referenz-Modells verfolgt?

**Das OSI-Modell ist aufgebaut wie eine Briefsendung:**

- **Jede Schicht hat ihre eigene Aufgabe:**
    - Genauso wie beim Briefeschreiben hat jede Schicht im OSI-Modell eine bestimmte Aufgabe,
    - um die Daten von einem Computer zum anderen zu übertragen.
- **Die Schichten arbeiten zusammen:**
    - Genauso wie beim Briefeschreiben müssen alle Schichten zusammenarbeiten,
    - damit der Brief erfolgreich zugestellt wird.
- **Das Modell hilft uns, Netzwerke zu verstehen:**
    - Das OSI-Modell ist wie eine Anleitung zum Verstehen von Netzwerken.
    - Es zeigt uns, wie die einzelnen Teile eines Netzwerks zusammenarbeiten.

*Mit dem OSI-Modell kann man Netzwerke besser verstehen und Probleme lösen, wenn etwas nicht funktioniert.



# **Aufgabe 3**

Beschreiben Sie die einzelnen Schichten nun etwas detaillierter. Was sind die Aufgaben, welche Pakete werden genutzt, welche Fehler könnten in dieser Schicht vorliegen?


| Nummer | Layer (Deutsch)           | Aufgaben                                                                 | Pakete                           | Mögliche Fehler                                                                    |
| ------ | ------------------------- | ------------------------------------------------------------------------ | -------------------------------- | ---------------------------------------------------------------------------------- |
| 1      | **Physikalische Schicht** | Übertragung von Bits über ein physisches Medium (z.B. Kabel, Funkwellen) | Bits                             | Kabeldefekte, Rauschen, Interferenzen, Signalverzerrungen                          |
| 2      | **Sicherungsschicht**     | Fehlerfreie Datenübertragung zwischen direkt verbundenen Netzwerkgeräten | Frames                           | Bitfehler, Kollisionen (bei Ethernet), Verzerrungen, Synchronisationsverluste      |
| 3      | **Netzwerkschicht**       | Adressierung und Routing von Datenpaketen über Netzwerke                 | Pakete                           | Falsche Adressierung, Subnetzmaskenfehler, Routing-Schleifen, Paketverluste        |
| 4      | **Transportschicht**      | Organisation der Datenübertragung zwischen Anwendungsprozessen           | Segmente = TCP, Datagramme = UDP | Verbindungsabbrüche, Paketverluste, Verzögerungen, Reihenfolgefehler               |
| 5      | **Sitzungsschicht**       | Verwaltung von Datenverbindungen zwischen Anwendungsprozessen            | -                                | Verbindungsauf- und -abbau, Synchronisationsfehler, Token-Verluste                 |
| 6      | **Darstellungsschicht**   | Formatierung und Verschlüsselung von Daten für die Anwendung             | -                                | Datenformatierungsfehler, Komprimierungsfehler, Entschlüsselungsfehler             |
| 7      | **Anwendungsschicht**     | Bereitstellung von Netzwerkdiensten und -anwendungen für Benutzer        | -                                | Protokollfehler, Anwendungsfehler, Zugriffsberechtigungen, Kompatibilitätsprobleme |


---

Lösung:

**Aufgabe 1**

|Layer-Nr.|Englischer Name|Deutscher Name|Aufgaben der Schicht|
|---|---|---|---|
|7|Application|Anwendung|Bereitstellung von Netzwerkdiensten für Anwendungen|
|6|Presentation|Darstellung|Datenübersetzung, Verschlüsselung und Kompression|
|5|Session|Sitzung|Aufrechterhaltung und Beendigung von Kommunikationssitzungen|
|4|Transport|Transport|Zuverlässiger Datenaustausch und Flusskontrolle|
|3|Network|Netzwerk|Routing, Logische Adressierung, Paketweiterleitung|
|2|Data Link|Sicherung|Zuverlässige Datenübertragung im lokalen Netzwerk|
|1|Physical|Bitübertragungsschicht|Physikalische Verbindung und Bitübertragung|

  

**Aufgabe 2**

- **Standardisierung:**
    - _Ziel:_ Eine gemeinsame Basis für die Entwicklung von Netzwerktechnologien schaffen.
    - _Erläuterung:_ Das OSI-Referenzmodell bietet einen Rahmen für die Standardisierung von Netzwerkprotokollen und -technologien. Dies ermöglicht die Interoperabilität verschiedener Systeme und Geräte, die auf der ganzen Welt entwickelt werden.
- **Klare Strukturierung:**
    - _Ziel:_ Die Komplexität von Netzwerken in überschaubare Schichten unterteilen.
    - _Erläuterung:_ Das Modell organisiert Netzwerkfunktionalitäten in sieben klar definierte Schichten. Dies erleichtert das Verständnis, die Entwicklung und den Betrieb von Netzwerklösungen, indem komplexe Aufgaben in leichter handhabbare Teile zerlegt werden.
- **Fehlerisolierung und -behebung:**
    - _Ziel:_ Die Lokalisierung von Fehlern in Netzwerken vereinfachen.
    - _Erläuterung:_ Durch die klare Schichtstruktur des OSI-Modells kann bei Netzwerkproblemen leichter identifiziert werden, in welcher Schicht der Fehler auftritt. Dies erleichtert die Fehlerdiagnose und -behebung.
- **Förderung von Interoperabilität:**
    - _Ziel:_ Die Kommunikation zwischen unterschiedlichen Systemen und Technologien ermöglichen.
    - _Erläuterung:_ Das OSI-Modell fördert die Interoperabilität, da es als Referenzrahmen dient, dem verschiedene Hersteller bei der Entwicklung ihrer Netzwerkprodukte folgen können. Dadurch wird die nahtlose Integration von Produkten unterschiedlicher Hersteller erleichtert.

**Aufgabe 3**

1. **Bitübertragungsschicht (Physical Layer):**
    - _Aufgaben:_ Übertragung von Bitfolgen über physikalische Medien (Kabel, Funkwellen).
    - _Genutzte Pakete:_ Bits.
    - _Mögliche Fehler:_ Signalverlust, Rauschen, Physische Kabelprobleme.
2. **Sicherungsschicht (Data Link Layer):**
    - _Aufgaben:_ Zuverlässige Übertragung von Frames zwischen direkt benachbarten Knoten. Adressierung, Fehlererkennung und -korrektur.
    - _Genutzte Pakete:_ Frames.
    - _Mögliche Fehler:_ Kollisionen, verlorene Frames, Duplikate.
3. **Netzwerkschicht (Network Layer):**
    - _Aufgaben:_ Logische Adressierung, Routing von Paketen zwischen verschiedenen Netzwerken, Paketweiterleitung.
    - _Genutzte Pakete:_ Pakete.
    - _Mögliche Fehler:_ Fehlerrate bei der Weiterleitung, Routing-Probleme.
4. **Transportschicht (Transport Layer):**
    - _Aufgaben:_ Segmentierung von Daten in kleinere Einheiten, Flusskontrolle, Zuverlässige Übertragung von Daten zwischen Endsystemen.
    - _Genutzte Pakete:_ Segmente.
    - _Mögliche Fehler:_ Datenverlust, Überlastung, fehlerhafte Reihenfolge der Segmente.
5. **Sitzungsschicht (Session Layer):**
    - _Aufgaben:_ Aufrechterhaltung und Beendigung von Sitzungen, Synchronisation von Datenübertragung.
    - _Genutzte Pakete:_ Keine eigenen Pakete, verwendet die Dienste der darunterliegenden Schichten.
    - _Mögliche Fehler:_ Sitzungsabbruch, Probleme bei der Synchronisation.
6. **Darstellungsschicht (Presentation Layer):**
    - _Aufgaben:_ Datenübersetzung, Verschlüsselung, Kompression, Umwandlung von Datenformaten.
    - _Genutzte Pakete:_ Keine eigenen Pakete, verwendet die Dienste der darunterliegenden Schichten.
    - _Mögliche Fehler:_ Probleme bei der Datenübersetzung, Dekodierung oder Verschlüsselung.
7. **Anwendungsschicht (Application Layer):**
    - _Aufgaben:_ Bereitstellung von Netzwerkdiensten für Anwendungen, Nutzerinteraktion.
    - _Genutzte Pakete:_ Nutzerdaten.
    - _Mögliche Fehler:_ Anwendungsfehler, unerwartetes Verhalten von Anwendungen.