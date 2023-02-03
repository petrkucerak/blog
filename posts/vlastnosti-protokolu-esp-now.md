---
title: 'Vlastnosti protokolu ESP-NOW'
metaTitle: 'Vlastnosti protokolu ESP-NOW'
date: '2023-02-03'
tags:
  - embeded
  - IoT
  - wireless
icon: 'wifi'
---

**Jedním z problémů, který jsem řešil během práce na samostatném projektu v rámci studia na univerzitě bylo vybudování bezdrátové sítě, která by umožňovala propojit moduly používající *IEEE 802.11* (Wifi) na druhé vrstvě, tj.&nbsp;adresovat pomocí mac adres a informace balit do ethernet *framů*. A následně změřit vlastnosti, které takto vybudovaná infrastruktura bude mít.**

## Příprava prostředí pro měření
### Použitý hardware

K práci jsem využíval moduly od firmy *Espressif*, konkrétně **ESP32-S2-pico** a **ESP32-S2-LCD-0.96inch** s displejem pro účely debuggování. Jedná se o Wifi vývojové desky s základními periferiemi jako je *ADC* převodník, *I2C* a *SPI* komunikace či *UART*. Deska integruje *low-power Wifi System on Chip (SoC)*. Oproti od *ESP32*, které má 2 jádra procesoru, *ESP32-S2* má pouze jeden *Xtensa singlecore 32-bit procesor*, označován jako *ESP32-S2FH4*, který podporuje frekvenci hodin až do 240 MHz.

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
1. **Spustí měření**, které má za úkol simulovat reálný provoz. Zde je možné konfigurovat základní parametry. Program **měří round-time trip**. Respektive dobu, poslání
informace ze&nbsp;zařízení A, jejího uložení do&nbsp;patřičné struktury v&nbsp;zařízení B, odeslání zpět
do&nbsp;zařízení A a&nbsp;uložení do&nbsp;patřičné struktury v&nbsp;zařízení A. Pokud se informace nevrátí
ze&nbsp;zařízení B do&nbsp;určitého deadlinu, zařízení A registruje zprávu jako chybovou a&nbsp;odesílá
rovnou další. *V případě použití MCU s&nbsp;displejem, je proces měření zobrazován ve&nbsp;formě
progress baru.*
1. Po ukončení měření, **se data vypíšou** do konzole pro následné zpracování.

[^uno]: Jako je například `ESP_NOW_HANDLER`.

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

V scénářích typu A se snažím otestovat to, jak změna parametru typu odesílání, tj.
přepínání mezi *brodacastem* a *unicastem*, ovlivní *round-time trip* **v závislosti na velikosti
zprávy**. Měření se odehrává v prostředí bytu v činžovním domě, kde dochází k rušení
několika okolními Wifi sítěmi.


Výsledky měření těchto scénářů si je možné prohlédnout v grafech B.1 a B.2. Odesílání
se chová dle očekávání. Zprávy větší velikosti trvají déle než zprávy menší. Zajímavé
je srovnání broadcastu a unicastu. Broadcast je nepatrně pomalejší.

Také je zajímavé si povšimnout nakumulovaných odpovědí v jeden čas. Tuto skutenčost si vysvětluji implementací broadcastu v prokolou ESP-NOW.