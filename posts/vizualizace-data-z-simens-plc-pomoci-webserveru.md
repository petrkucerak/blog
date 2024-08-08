---
title: "Vizualizace Dat z Siemens PLC pomocí Webserveru"
description: "Jednoduchá demonstrace, jak vizualizovat data z Siemens PLC pomocí webserveru tak, aby se hodnoty dynamicky měnily bez nutnosti neustálého znovunačítání stránky."
date: "2024-08-08"
tags:
  - repo
  - PLC
  - vizualizace
icon: "chart"
---

**V dnešní době je efektivní vizualizace dat klíčová pro monitoring a správu různých systémů, včetně průmyslových řídicích systémů, jako jsou programovatelné logické automaty (PLC). Tento článek demonstruje, jak vizualizovat data z Siemens PLC pomocí generovaného webserveru tak, aby se hodnoty dynamicky měnily bez nutnosti neustálého znovunačítání stránky.**

## Uvedení do problematiky

Vytvořit webový server na PLC, které ho podporují, je jednoduché. Výzva je v tom, jak pravidelně aktualizovat data tak, aby nebylo potřebné načítat stránku. V praxi bychom použili API server či bychom se dotazovali databáze nebo paměti, kde jsou daná data uložená. Pro usnadnění většina aplikačních inženýrů, kteří PLC nasazují, využívá server, který si tzv. naklikají. Ten běží již na definovaném jádru od Siemensu a je možné měnit jeho chování pouze omezeně. Nicméně umožňuje využít tzv. _template_ pro proměnné, které při vyrenderování stránky na místo _template_ vrátí požadovanou proměnnou. Z toho důvodu je třeba si šikovně poradit a samotný server použít jako takové API.

> Projekt byl rychlou odpovědí na problém, který řešil taťka v práci, tedy aktualizace dat bez nutnosti načítání stránky. Koncept, resp. myšlenku jsem sem chtěl uložit, třeba by se mohla někomu hodit. Celé DEMO bohužel nemůžu zveřejnit, protože běží na ostrých datech.

## Princip Funkce

Hlavní princip vizualizace je znázorněn následujícím diagramem:

![Vizualizace fungování serveru](/posts/images/vizualizace-data-z-simens-plc-pomoci-webserveru-01.jpg)

Při otevření stránky _index.html_ se klientovi vrátí stránka _index.html_ s aktuálními proměnnými. O chvíli později se již hodnoty mohou změnit, a proto stránka _index.html_ požádá o vrácení stránky _frame.htm_, která vrátí aktuální hodnoty v požadovaném formátu. Hodnoty se rozparsují a aktualizují se proměnné.

### Popis

1. **Index.html:** Tato stránka slouží jako hlavní rozhraní pro uživatele. Je zobrazena pouze při prvním načtení.
2. **Frame.htm:** Tato stránka je požadována pomocí AJAX volání z index.html a vrací aktuální hodnoty proměnných z jádra Siemens PLC.

## Detailní Popis Implementace

### Index.html

Stránka `index.html` je zodpovědná za zobrazení hodnot. Načítá se pouze jednou, a poté pravidelně žádá o aktualizaci hodnot ze stránky `frame.htm`. K tomu využívá knihovnu jQuery.

#### Ukázka Kódu

```html
<!DOCTYPE html>
<html lang="cs">
  <head>
    <meta charset="UTF-8" />
    <title>Siemens PLC Data</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
      $(document).ready(function () {
        setInterval(function () {
          $("#data").load("frame.htm");
        }, interval); // interval je definovaná proměnná
      });
    </script>
  </head>
  <body>
    <div id="data">
      <!-- Zde se budou zobrazovat hodnoty z frame.htm -->
    </div>
  </body>
</html>
```

### Frame.htm

Stránka `frame.htm` obsahuje pouze hodnoty proměnných, které jsou vyrenderované jádrem Siemens PLC. Tato stránka je volána AJAXem z `index.html` a její obsah je dynamicky aktualizován.

## Závěr

Toto demo ukazuje, jak jednoduše a efektivně vizualizovat data z Siemens PLC pomocí webových technologií. Použitím jQuery pro pravidelné aktualizace a jednoduchých JavaScript funkcí pro zpracování dat lze dosáhnout dynamických a interaktivních webových aplikací bez nutnosti složitých řešení.

Oficiální datasheet Siemens tento postup doporučuje. [1] Toto řešení ovšem může skrývat potenciální problém při požadavcích na vracení velikého množství dat v jeden čas.

Ukázka řešení je dostupná v [repositáři](https://github.com/petrkucerak/simens-plc-webserver) bez konfigurace serveru.

[1] [Siemens Datasheet](https://cache.industry.siemens.com/dl/files/496/68011496/att_959527/v2/68011496_Examples_for_S7WebServer_DOC_v21_en.pdf)
