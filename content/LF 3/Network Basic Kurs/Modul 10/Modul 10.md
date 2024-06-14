---
"type:": Modul
---


**Aufgabe 1: Die Notwendigkeit von IPv6** 

Die Reise beginnt mit der grundlegenden Frage: Warum wurde IPv6 ins Leben gerufen, und welche Schwierigkeiten von IPv4 sollte dieses neue Protokoll überwinden? Durchforstet die Überlieferungen und bringt das Wissen mit, um das Rätsel zu lösen.

A:  IPv6 wurde ins Leben gerufen, um die begrenzte Anzahl von verfügbaren IP-Adressen in IPv4 zu überwinden. IPv4 verwendet 32-Bit-Adressen und kann daher nur rund 4,3 Milliarden eindeutige Adressen bereitstellen. Mit dem exponentiellen Wachstum der vernetzten Geräte, wie Smartphones, IoT-Geräten und anderen Technologien, wird diese Anzahl jedoch schnell erschöpft.

IPv6 verwendet hingegen 128-Bit-Adressen und kann daher theoretisch über 340 Sextillionen (3,4 x 10^38) eindeutige Adressen bereitstellen. Dies bietet ausreichend Adressraum für die Zukunft und ermöglicht es, jedem vernetzten Gerät eine eindeutige IP-Adresse zuzuweisen.

**Aufgabe 2: IPv6 Address Space** 

Eure Reise führt weiter zu den endlosen Weiten des IPv6-Adressraums. Berechnet die schier unglaubliche Anzahl der möglichen IPv6-Adressen und ergründet, wie diese Fülle an Adressen die Herausforderungen von IPv4 übertrifft.

A: Schon Aufgabe 1 beantwortet 

**Aufgabe 3: IPv6 Migrationstechniken** 

Um die Reise fortzusetzen, müsst ihr die drei Hauptmigrationstechniken erforschen: Dual Stack, Tunneling und Translation. Versteht ihre Bedeutung und erforscht die Vor- und Nachteile jeder Technik, um Euch sicher durch die Datenwolken zu bewegen.

A: **Dual Stack** bedeutet das IPv4 und IPv6 innerhalb des Netzwerkes koexistieren können, also bei Protokolle gleichzeitig laufen. Das bedeutet das entweder die Datei per IPv4 gesendet werden kann oder IPv6. **Tunneling** wird benutzt das IPv6 Packet durch ein IPv4 Netzwerk transportiert werden muss. Das IPv6 Packet wird eingekapselt innerhalb eines eines IPv4 Packet und dann später wieder entkapselt. Bei NAT64 (Network Address Translation 64) wird dem IPv6 kompatiblen Geräte die Möglichkeit gegeben mit IPv4 Geräten zu kommunizieren über einer ähnlichen Übersetzungstechnik wie bei NAT zu IPv4.

Tunneling und NAT64 sind nur als Alternative gesehen. Das Ziel sollte immer sein seine Kommunikation über Dual Stack/ native IPv6 zu führen. 

**Aufgabe 4: Dual Stack und Tunneling** 

Als nächstes erkundet ihr die Dual Stack-Geräte und erfahrt, wie sie beide Protokollstapel simultan unterstützen. Taucht dann in die Geheimnisse des Tunnelings ein und versteht, wie IPv6-Pakete über IPv4-Netzwerke transportiert werden.

A: In Aufgabe 3 beantwortet

**Aufgabe 5: IPv6 Addressing Format** 

Eure Reise führt euch zu den Grundlagen der IPv6-Adressen. Skizziert die Struktur einer IPv6-Adresse und entdeckt, warum diese oft als hexadezimale Zeichenfolgen dargestellt werden.

A: Eine IPv6-Adresse besteht aus 128 Bits, wird aus Hexadezimalen Zahlen gebildet und wird üblicherweise in acht Blöcken zu je 16 Bits dargestellt. Jedes Bit kann den Zahlenwert 0 oder 1 annehmen.

Ein Beispiel für eine IPv6-Adresse ist:

2001:0db8:85a3:0000:0000:8a2e:0000:7334

Die IPv6-Adresse kann jedoch auch verkürzt dargestellt werden, indem führende Nullen weggelassen werden. Dabei darf jedoch höchstens eine aufeinanderfolgende Gruppe von Nullen ausgelassen werden. Außerdem können Blöcke die nur 0 besitzen durch ein :: verkürzt werden. Dabei ist wichtig zu wissen das bei mehreren Blöcken (die auch noch gleich lang sind) an verschiedenen Stellen 0s besitzen, immer erst die erste Blockreihe abgekürzt wird.  
Die obige Adresse könnte also so verkürzt:

2001:db8:85a3::8a2e:0:7334 dargestellt werden.

Darüber hinaus können IPv6-Adressen spezielle Formate haben, wie zum Beispiel Link-Local-Adressen (beginnend mit fe80::) oder Multicast-Adressen (beginnend mit ff00::).

**Aufgabe 6: IPv6 Addressing Rules** 

Erforscht die Regeln der IPv6-Adressendarstellung – das Weglassen führender Nullen und die Verwendung des Doppelpunkts. Begreift, warum diese Regeln von entscheidender Bedeutung 
sind.

A: In Aufgabe 5 beanwortet

**Aufgabe 7: Präferiertes Format und Hextets** 

Eure Reise nähert sich dem Höhepunkt. Taucht in das "Preferred Format" der IPv6-Adressen ein und entschlüsselt das Mysterium der Hextets. Wie werden 16-Bit-Hextets in einer IPv6-Adresse repräsentiert?

A: Auch schon in Aufgabe 5 beantwortet