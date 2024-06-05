---
"type:": Modul
---

**Aufgabe 1: Das Herzstück - Der Standardgateway**

Jedes eurer Geräte muss die IPv4-Adresse des Routers kennen, der mit dem Netzwerk verbunden ist. Diese Adresse wird als Standardgateway-Adresse bezeichnet. Sie kann entweder statisch auf dem Gerät konfiguriert oder dynamisch über DHCP erhalten werden. Warum ist das Standardgateway so wichtig für die Reise durch die Datenwolken?

A: Der Default Gateway ist nichts anders als die IP-Adresse des Router, wodurch der Host Zugriff bekommt um in andern Netzwerken zu kommunizieren. Wenn die IP-Adressierung des Host per DHCP läuft wird meistens automatisch mit angegeben, da 99% aller DHCP Anfragen heutzutage über den Router laufen. Bei statischer IP-Adressierung muss man natürlich die IP selber eintragen.

**Aufgabe 2: Die Mächte des Drahtlosen Routers**

Der drahtlose Router agiert als DHCP-Server für alle an ihn angeschlossenen Hosts. Egal, ob sie per Ethernetkabel oder drahtlos verbunden sind. Doch wenn der drahtlose Router mit dem ISP verbunden ist, wird er selbst zum DHCP-Client. Warum benötigt der Router eine externe IPv4-Adresse vom ISP?

A: Alle Host innerhalb des internen Netzwerkes benutzen private IP-Adressen wie schon in Modul 9 erklärt. Wenn man als Host ein Paket außerhalb des Netzwerk senden möchte, braucht der Router (wo der Traffic (Daten-Verkehr) als erstes hin muss bevor er weitergeleitet werden kann) eine öffentliche IP (die weltweit Einzigartig ist) welches er vom ISP gestellt bekommt. Danach kann er Traffic welches raus geht an die Ziel IP senden und dann auch Traffic der rein kommt an die Quell IP senden. 

**Aufgabe 3: Die Grenzen zwischen Lokalem und Externem**

Der drahtlose Router dient als Grenze zwischen dem lokalen internen Netzwerk und dem externen Internet. Der ISP stellt eine internet-routbare Adresse bereit, die den Zugang zum Internet für die angeschlossenen Geräte ermöglicht. Was wäre die Folge, wenn der drahtlose Router keine öffentliche Adresse vom ISP erhalten würde?

A: Dann ist dem Router nicht möglich mit anderen Netzwerken zu kommunizieren.

**Aufgabe 4: Das Mysterium der NAT**

NAT (Network Address Translation) ist der Zauber, der private Adressen in internet-routbare Adressen verwandelt und umgekehrt. Könnt ihr den Prozess von privaten zu öffentlichen Adressen und umgekehrt erklären? Wie agiert der drahtlose Router als Vermittler?

A: Die Umwandlung der privaten IP-Adresse zu einer öffentlichen IP-Adresse habe schon quasi in Aufgabe 2 erklärt ich addiere jetzt nur den Punkt mit NAT. Durch NAT (Network Address Translation) erstellt der Router eine Tabelle um alle Subnetze innerhalb des Netzwerkes eine Öffentliche IP zu geben und es gleichzeitig zu speichern damit er später wenn Traffic rein oder raus kommt weiß in welches Subnetznetz er das Paket senden muss.

[[Modul 12.pdf]]