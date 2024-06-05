---
"type:": Modul
---
**Aufgabe 1: Die Doppelten Adressen - MAC und IP**

Bevor eine Nachricht gesendet wird, muss ein Gerät sowohl die IP- als auch die MAC-Adresse des Ziels kennen. Erkläre, warum beide Adressen wichtig sind und wie sie miteinander in Verbindung stehen.

A: Die **IP-Adresse** dient als Identifikator für Geräte in einem Netzwerk und ermöglicht es, Datenpakete zu routen und das Zielgerät zu identifizieren. Sie funktioniert auf der Netzwerkschicht des OSI-Modells und ist somit für die logische Adressierung zuständig. Die IP-Adresse ist vergleichbar mit einer Hausnummer in einem Straßennetzwerk, die den Weg für die Datenpakete weist.

Die **MAC-Adresse** (Media Access Control) ist hingegen auf der Pysikalischenschicht des OSI-Modells zu finden und repräsentiert die physische Adresse eines Netzwerkadapters. Diese Adresse wird vom Hersteller des Netzwerkadapters zugewiesen und ist eindeutig für jedes Gerät. Die MAC-Adresse ähnelt einem Fingerabdruck und ermöglicht die eindeutige Identifikation eines Geräts in einem lokalen Netzwerk.

Die Verbindung zwischen der IP-Adresse und der MAC-Adresse liegt in einem Prozess namens ARP (Address Resolution Protocol). Wenn ein Gerät Daten an ein anderes senden möchte, aber nur die IP-Adresse des Ziels kennt, verwendet es ARP, um die zugehörige MAC-Adresse herauszufinden. In diesem Prozess sendet das sendende Gerät eine ARP-Anfrage ins Netzwerk, die nach der MAC-Adresse für eine bestimmte IP-Adresse sucht. Das Zielgerät antwortet mit seiner MAC-Adresse, und diese wird dann im ARP-Cache des sendenden Geräts gespeichert. Von diesem Zeitpunkt an kann das sendende Gerät Datenpakete an die MAC-Adresse des Ziels senden, da es nun sowohl die IP- als auch die MAC-Adresse des Zielgeräts kennt. Bei IPv6 Adressen heißt dies **ND** (Neighbor Discovery).

**Aufgabe 2: Das Rätsel des Broadcasts**

Wenn das Ziel einer Nachricht sich auf einem entfernten Netzwerk befindet, wird die MAC-Adresse des Routers als Ziel verwendet. Was ist die "Broadcast MAC-Adresse", wie wird sie dargestellt, und warum wird sie für Nachrichten an unbekannte Ziele verwendet?

A: Die "Broadcast MAC-Adresse" ist eine spezielle MAC-Adresse, die verwendet wird, wenn ein Gerät in einem Netzwerk Daten an alle anderen Geräte im selben Netzwerk senden möchte. Diese Adresse ermöglicht es, Datenpakete an alle Geräte im Netzwerk zu broadcasten. Die Broadcast MAC-Adresse ist normalerweise als "ff:ff:ff:ff:ff:ff" dargestellt.

Wenn ein Gerät eine Nachricht an ein unbekanntes Ziel sendet, also wenn es die genaue MAC-Adresse des Ziels nicht kennt, wird die Broadcast MAC-Adresse verwendet. Das Gerät sendet das Datenpaket an die Broadcast MAC-Adresse, und alle Geräte im Netzwerk empfangen die Nachricht. Jedes Gerät prüft dann die Ziel-IP-Adresse im Datenpaket. Nur das Gerät mit der passenden IP-Adresse akzeptiert die Nachricht und verarbeitet sie weiter, während die anderen Geräte die Daten verwerfen.

Die Verwendung der Broadcast MAC-Adresse ist effektiv, wenn ein Gerät die genaue MAC-Adresse des Ziels nicht kennt oder wenn die Nachricht an alle Geräte im Netzwerk gerichtet ist. Dies ist besonders relevant in Situationen, in denen eine Ziel-IP-Adresse nicht einem bestimmten Gerät, sondern einer Gruppe von Geräten oder dem gesamten Netzwerk zugeordnet ist.

**Aufgabe 3: Die Macht des Switches**

Erkläre, wie Switches in einem lokalen Netzwerk mit einer oder mehreren Ethernet-Switches arbeiten. Was ist ein "Broadcast-Domäne" und warum könnte zu viel Broadcast-Verkehr zu Problemen führen?

A: Ethernet-Switches spielen eine wichtige Rolle in lokalen Netzwerken, indem sie den Datenverkehr effizient zwischen den angeschlossenen Geräten steuern. Wenn ein Gerät in einem lokalen Netzwerk Daten sendet, überprüft der Switch die Ziel-MAC-Adresse des Pakets. Anhand seiner MAC-Adresstabelle bestimmt der Switch den zugehörigen Ausgangsport und sendet das Paket nur dorthin. Dadurch reduziert der Switch den Datenverkehr und sorgt für effiziente Kommunikation zwischen den Geräten.

Eine "Broadcast-Domäne" bezieht sich auf den Bereich eines Netzwerks, in dem ein Broadcast-Paket alle Geräte erreicht. Broadcast-Pakete sind Datenpakete, die an alle Geräte im Netzwerk gesendet werden. In einem Switch-basierten Netzwerk erstreckt sich die Broadcast-Domäne über einen einzelnen Switch, da dieser Broadcast-Traffic nicht über die Ports hinausgeleitet wird, sondern nur an die Geräte innerhalb des Switches gesendet wird.

Zu viel Broadcast-Verkehr kann zu Problemen führen, da Broadcast-Pakete jedes Gerät in der Domäne erreichen und die Ressourcen belasten. Wenn viele Broadcasts auftreten, kann dies die Netzwerkleistung beeinträchtigen und zu einer Überlastung der Bandbreite führen. Daher ist es wichtig, die Broadcast-Domäne so klein wie möglich zu halten, um ein effizientes und stabiles Netzwerk zu gewährleisten. Switches tragen dazu bei, die Auswirkungen von Broadcast-Traffic zu minimieren, indem sie Broadcast-Pakete nur an die relevanten Ports senden und somit den Traffic effektiv steuern.

**Aufgabe 4: Die Kunst der Adressauflösung**

Der ARP-Prozess ist entscheidend, um die MAC-Adresse eines Hosts im lokalen Netzwerk zu entdecken. Erkläre die drei Schritte des ARP-Prozesses und warum er notwendig ist. Wie unterscheidet sich dieser Prozess für IPv6?

A: Schon in Aufgabe 1 beantwortet.