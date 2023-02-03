---
title: 'Vlastnosti protokolu ESP-NOW'
metaTitle: 'Vlastnosti protokolu ESP-NOW'
date: '2023-02-03'
updated: '2023-02-04'
tags:
  - embeded
  - IoT
  - wireless
  - PlatformIO
icon: 'wifi'
---

**Jedním z problémů, který jsem řešil během práce na samostatném projektu v rámci studia na univerzitě bylo vybudování bezdrátové sítě, která by umožňovala propojit moduly používající *IEEE 802.11 (Wifi)* na druhé vrstvě, tj.&nbsp;adresovat pomocí mac adres a informace balit do ethernet *framů*. A následně změřit vlastnosti, které takto vybudovaná infrastruktura bude mít.**

## Příprava prostředí pro měření
### Použitý hardware

K práci jsem využíval moduly od firmy *Espressif*, konkrétně **ESP32-S2-pico** a **ESP32-S2-LCD-0.96inch** s displejem pro účely debuggování. Jedná se o Wifi vývojové desky s základními periferiemi jako je *ADC* převodník, *I2C* a *SPI* komunikace či *UART*. Deska integruje *low-power Wifi System on Chip (SoC)*. Oproti od *ESP32*, které má 2 jádra procesoru, *ESP32-S2* má pouze jeden *Xtensa singlecore 32-bit procesor*, označován jako *ESP32-S2FH4*, který podporuje frekvenci hodin až do 240 MHz.

![Fotka modulů při měření](/posts/images/vlastnosti-protokolu-esp-now-02.jpg)

### Vývojové prostředí

MCU z rodiny *ESP32* a *EPS8266* lze programovat v podstatě 2 způsoby, respektive 2 frameworky. Já se rozhodl postavit základ na **Arduino frameworku**, který je pro počáteční konfiguraci méně náročný a používat knihovny z **ESP-IDF frameworku**. Jako vývojové prostředí jsem si vybral **VS Code** s **PlatformIO**. Dle mého se jedná o uživatelsky přívětivé prostředí. Navíc má vysokou podporu komunity a disponuje již spoustou připravených balíčků a konfigurací pro vývojové desky.

```ini
; Konfigurace platform.io projektu
[env:esp32dev]                   ; podmínka prostředí
platform = espressif32           
board = esp32-s2-saola-1         ; vývojový bord se sejným procesorem
framework = arduino              ; volba framweorku
board_build.mcu = esp32s2        ; volba typu procesoru
upload_protocol = esptool        ; nástroj pro stahování softwaru do zařízení
board_build.f_cpu = 240000000L   ; definování frekvence
board_build.flash_mode = dio     ; rychlostní mód nahrávaní do paměti

```

### Protokol

Při průzkumu knihoven, které bych mohl využít použít právě pro takovýto přístup, jsem objevil protokol **==ESP-NOW==**. Jedná se o protokol, který je určený především pro ovládání IoT zařízení, například v aplikaci ovládání LED světélek či přenos dat mezi sezory. Protokol je *open-source* a díky pouze základní implementaci je široce modifikovatelný, respektive pro komplexnější využití je nutné ho modifikovat.

**Protokol podporuje:**

- šifrovanou a nešifrovanou unicast komunikaci nastavitelnou pro každé zařízení individuálně,
- přenosovou kapacitu 250 bajtů,
- odesílání callbacku, které slouží jako potvrzení o úspěšném přijetí zprávy.

**Nejvýraznější limity protokolu dle mého jsou:**

- neefektivní implementace broadcastu *(lze si povšimnout na naměřených hodnotách)*
- a limitace počtu připojených zařízení.

### Program použitý pro měření

Vytvořil jsem jednoduchý program, který v podstatě testuje **round-time trip**.

Funguje tak, že:
1. **zaregistruje USB callback** a&nbsp;spustí sériovou komunikaci,
2. **inicializuje struktury** nutné pro správné fungování protokolu ESP-NOW&nbsp;[^uno] a&nbsp;zaregistruje callback pro příchozí a&nbsp;odchozí komunikaci.
3. *V případě veze MCU s displejem, **inicializuje displej** a&nbsp;vypíše na něj vlastni MAC adresu.*
4. **Ukončí inicializační metodu**. *V případě MCU bez displaje ohlásí konec konfigurace
bliknutím červené LED diody, která je vestavěné na desce.*
5. **Spustí měření**, které má za úkol simulovat reálný provoz. Zde je možné konfigurovat základní parametry. Program **měří round-time trip**. Respektive dobu, poslání
informace ze&nbsp;zařízení A, jejího uložení do&nbsp;patřičné struktury v&nbsp;zařízení B, odeslání zpět
do&nbsp;zařízení A a&nbsp;uložení do&nbsp;patřičné struktury v&nbsp;zařízení A. Pokud se informace nevrátí
ze&nbsp;zařízení B do&nbsp;určitého deadlinu, zařízení A registruje zprávu jako chybovou a&nbsp;odesílá
rovnou další. *V případě použití MCU s&nbsp;displejem, je proces měření zobrazován ve&nbsp;formě
progress baru.*
6. Po ukončení měření, **se data vypíšou** do konzole pro následné zpracování.

*Veškeré kódy jsou dostupné v [repozitáři](https://github.com/petrkucerak/rafting-button/) na mém GitHubu.*

[^uno]: Jako je například `ESP_NOW_HANDLER`.

![Fotka při měření](/posts/images/vlastnosti-protokolu-esp-now-01.jpg)

## Měření

Aby bylo možné otestovat **různé parametry** v různých prostředích, rozhrnul jsem měření
na několik scénářů.

Při měření byly sledovány následující parametry:
- prostředí, v němž bylo měření prováděno,
- překážka mezi zařízeními,
- vzdálenost mezi zařízeními,
- velikost zprávy (*payload*),&nbsp;[^dos]
- počet odeslaných zpráv,
- typ odesílání (broadcast/unicast),
- počet chybných zpráv.&nbsp;[^tres]

[^dos]: Maximální velikost je 250 bajtů.
[^tres]: Tento parametr nebyl sledován u scénáře A, jelikož zde nedocházelo k ztrátě zpráv.

### Scénář A

![Vizualizace scénáře typu A](/posts/images/vlastnosti-protokolu-esp-now/ScenarioA.png)

V scénářích typu A se snažím otestovat to, jak změna parametru typu odesílání, tj.
přepínání mezi *brodacastem* a *unicastem*, ovlivní *round-time trip* **v závislosti na velikosti
zprávy**. Měření se odehrává v prostředí bytu v činžovním domě, kde dochází k rušení
několika okolními Wifi sítěmi.

#### Broadcast

| **SCÉNÁŘ**     | **A11**             | **A12**             | **A13**             | **A14**             | **A15**             |
| -------------- | ------------------- | ------------------- | ------------------- | ------------------- | ------------------- |
| **prostředí**  | byt (s WiFi sítěmi) | byt (s WiFi sítěmi) | byt (s WiFi sítěmi) | byt (s WiFi sítěmi) | byt (s WiFi sítěmi) |
| **překážka**   | volný vzduch        | volný vzduch        | volný vzduch        | volný vzduch        | volný vzduch        |
| **vzdálenost** | 50 cm               | 50 cm               | 50 cm               | 50 cm               | 50 cm               |
| **velikost**   | **==1 bajt==**      | **==10 bajt==**     | **==50 bajt==**     | **==120 bajt==**    | **==250 bajt==**    |
| **počet**      | **10 000 zpráv**    | **10 000 zpráv**    | **10 000 zpráv**    | **1 000 zpráv**     | **5 000 zpráv**     |
| **typ**        | **broadcast**       | **broadcast**       | **broadcast**       | **broadcast**       | **broadcast**       |

#### Unicast

| **SCÉNÁŘ**     | **A21**             | **A22**             | **A23**             | **A24**             | **A25**             |
| -------------- | ------------------- | ------------------- | ------------------- | ------------------- | ------------------- |
| **prostředí**  | byt (s WiFi sítěmi) | byt (s WiFi sítěmi) | byt (s WiFi sítěmi) | byt (s WiFi sítěmi) | byt (s WiFi sítěmi) |
| **překážka**   | volný vzduch        | volný vzduch        | volný vzduch        | volný vzduch        | volný vzduch        |
| **vzdálenost** | 50 cm               | 50 cm               | 50 cm               | 50 cm               | 50 cm               |
| **velikost**   | **==1 bajt==**      | **==10 bajt==**     | **==50 bajt==**     | **==120 bajt==**    | **==250 bajt==**    |
| **počet**      | 10 000 zpráv        | 10 000 zpráv        | 10 000 zpráv        | 10 000 zpráv        | 10 000 zpráv        |
| **typ**        | **unicast**         | **unicast**         | **unicast**         | **unicast**         | **unicast**         |

![graf A2x](/posts/images/vlastnosti-protokolu-esp-now/ScenarioA2-graph.png)

Výsledky měření těchto scénářů si je možné prohlédnout v následujících. Odesílání
se **chová dle očekávání**. Zprávy **větší velikosti trvají déle** než zprávy menší. Zajímavé
je srovnání *broadcastu* a *unicastu*. *Broadcast* je nepatrně pomalejší.

![graf A1x](/posts/images/vlastnosti-protokolu-esp-now/ScenarioA1-graph.png)

Také je zajímavé si povšimnout **nakumulovaných odpovědí** v jeden čas. Tuto skutenčost si vysvětluji implementací **broadcastu** v prokolou ESP-NOW.


### Scénář C

![Vizualizace scénáře typu C](/posts/images/vlastnosti-protokolu-esp-now/ScenarioC.png)

Sadou scénářů Cx se snažím pozorovat vlastnosti v&nbsp;signálově **čistém prostředí**&nbsp; v&nbsp;
závislosti na&nbsp;vzdálenosti a&nbsp;typu vysílání. Nejedná se o laboratorně čisté prostředí. Měření bylo prováděno v prostředí lesa, který je od nejbližší
obce vzdálen asi 5 km a v okolí mého bydliště nejvíce čisté od 2,4 GHz rušení.

| SCÉNÁŘ                   | C1                | C2                | C3                | C4                | C5                | C6                |
| ------------------------ | ----------------- | ----------------- | ----------------- | ----------------- | ----------------- | ----------------- |
| **prostředí**            | les (bez 2.4 GHz) | les (bez 2.4 GHz) | les (bez 2.4 GHz) | les (bez 2.4 GHz) | les (bez 2.4 GHz) | les (bez 2.4 GHz) |
| **překážka**             | vzduch            | vzduch            | vzduch            | vzduch            | vzduch            | vzduch            |
| **vzdálenost**           | **==0,5 m==**     | **==25 m==**      | **==50 m==**      | **==100 m==**     | **==100 m==**     | **==50 m==**      |
| **velikost**             | 125 bajtů         | 125 bajtů         | 125 bajtů         | 125 bajtů         | 125 bajtů         | 125 bajtů         |
| **počet**                | 5 000 zpráv       | 5 000 zpráv       | 5 000 zpráv       | 5 000 zpráv       | 5 000 zpráv       | 5 000 zpráv       |
| **počet chybných zpráv** | ==0 zpráv==       | ==3 zpráv==       | ==15 zpráv==      | ==35 zpráv==      | ==15 zpráv==      | ==6 zpráv==       |
| **typ**                  | **==unicast==**   | **==unicast==**   | **==unicast==**   | **==unicast==**   | **==brodcast==**  | **==brodcast==**  |

![graf Cx](/posts/images/vlastnosti-protokolu-esp-now/ScenarioC-graph.png)

Výsledky měření těchto scénáře si je možné prohlédnout v grafu. Zde se opět prokol **chová dle očekávání**. Nedochází k takovému zpoždění, jako například při měření scénářů typu A. Také si je možné povšimnou toho, že se jednou za čas nějaká **zpráva opozdí**.

Při tomto měření jsem zaznamenával také chybovost počet **chybných zpráv**.&nbsp;[^quadro] Jejich četnost si ji možné prohlédnout v tabulce s C scénáři.

[^quadro]: Chybnou zprávou se myslí taková zpráva, která nedorazí do specifikovaného deadlinu, tedy mimo graf.

Během tohoto měření jsem zjistil, že je důležité, aby na větší vzdálenosti *(25 m a více)*, nestála signálu v cestě žádná překážka.

**Zajímavé je také srovnání scénáře A a C. Můžeme pozorovat, že ==vliv vzdálenosti ovlivňuje především ztrátovost paketů. Naopak velikost ovlivňuje rychlost přenosu==**.


### Scénář D

![Vizualizace scénáře typu D](/posts/images/vlastnosti-protokolu-esp-now/ScenarioD.png)

Scénář D byl oproti ostatním měřením odlišný v tom, že jsem se nejprve **snažili stanovit hranici**, kdy je zařízení ještě schopno přijímat zprávy a kdy už ne. Experimentálně jsem dospěl k hranici 580 m. Následně jsem odeslal 1000 zpráv s cílem zjistit, jak je veliká ztrátovost. Měření bylo realizováno na poli, přes které může procházet signál na 2,4 GHz.

| SCÉNÁŘ                   | D1               |
| ------------------------ | ---------------- |
| **prostředí**            | pole (s 2.4 GHz) |
| **překážka**             | vzduch           |
| **vzdálenost**           | **577 m**        |
| **velikost**             | 125 bajtů        |
| **počet**                | 1 000 zpráv      |
| **počet chybných zpráv** | 50 zpráv         |
| **typ**                  | **unicast**      |

![graf D1](/posts/images/vlastnosti-protokolu-esp-now/ScenarioD-graph.png)

Při měření jsme zjistil, že při odesílání na velikou vzdálenost je třeba **dbát na orientaci čipu**. Pokud nebylo zařízení správně natočeno, nešlo odeslat žádné zprávy.

Výsledek měření je vizualizován grafem D1. Při tomto scénáři bylo ovšem mnohem zajímavjěíš pozorovat **četnost úplné ztráty** dat. Při odeslání 1000 zpráv, se ztratilo 50. Můžeme tedy jednoduchým výpočtem zjistit, jaká je procentuální ztrátovost na dlouhé vzdálenosti.

$$$
loss = err / sent
$$$

V našem případě se při odeslání 1000 zpráv objevilo 50 chyb. Pro chybovost tedy platí:

$$$
50/1000 = 0,05 = loss
$$$

## Závěř

Veškerá naměřená data se skripty pro vyrenderováni grafů je možné najít v [**repositáři**](https://github.com/petrkucerak/rafting-button/tree/main/measure).

Uvědomuji si, že **měření nebylo** prováděno **za ideálních podmínek**. Přesnost měření
mohlo ovlivnit především to, že:
- se jeden čipů měl větší odběr proudu a mírně se při měření přehříval,
- větší vzdálenosti byly měřeny s přesností na jednotky metrů a největší vzdálenosti s přesností na 10 m,
- les nebyl absolutně odstíněný od 2,4 GHz,
- během měření různých scénářů jsme upravoval kód,
- v některých scénářích by větší množství dat, mohlo říci více.

Zajímavé jsou ještě 2 výše zmíněné poznání. Konkrétně to, že **při přenosu na delší
vzdálenost je nutné**, aby signálu **nebránilo nic v cestě** a aby byly moduly **správně
orientovány**.

Výsledky mi prokázali, že protokol ESP-NOW splňuje očekávané požadavky a je
vhodný pro použití v budoucí implementaci.

***Všechna data tohoto článku, jsou vytažena z části mé bakalářské práce, respektive samonstatného projektu, který je dostupný na mém [GitHubu](https://github.com/petrkucerak/rafting-button/)***.