---
title: 'Jak poslat veliké množství SMS z&nbsp;IPhone'
description: 'Článek o tom, jak odeslat veliké množství perzonalizovaných SMS z IPhonu jako SMS.'
date: '2025-02-03'
tags:
  - IPhoneShortucts
  - tip
icon: 'message'
---

***Chtěli byste poslat veliké množství personalizovaných SMS z IPhonu? Po prvním googlení vyskočí spousta aplikací třetích stran, ale nejsou třeba. Řešení je zcela jednoduché a lze k němu použít službu IPhone Shortcuts.***

## Motivace

Nedávno jsme zakládali Whats App (dále jen WA) skupinu pro větší množství lidí. Abyste je mohli pozvat, je ideální, aby vám k tomu dali souhlas. WA nabízí možnost založit skupinu či komunitu. Pro náš učel je vhodnější komunita, která má featuru, že umožňuje odeslat odkaz a každý kdo ho má, tak se po kliknutí dostane do dané komunity. Cílem bylo tedy moci každému člověku odeslat SMS s jeho oslovením a odkazem do WA komunity.

## Prerekvizity

Abyste mohli postupovat podle tohoto návodu musíte:

-	mít IPhone
-	nainstalovaný WA

## Založení komunity a nastavení komunity

Podrobný návod, jak založit komunitu je na stránkách mety: [https://faq.whatsapp.com/438859978317289/](https://faq.whatsapp.com/438859978317289/?cms_platform=iphone&helpref=platform_switcher&locale=cs_CZ). Osobně doporučuji nezapomenout přidat obrázek, popis a nastavit správně oprávnění, abyste neztratili kontrolu nad komunitou.

*Poznámka: součástí komunity může být maximálně 2000 členů.*


## Připravení zpráv

Na WA získáte odkaz, pomocí kterého se může kdokoliv připojit do komunity. Před jeho odesláním doporučuji doladit jméno, obrázek a popis, protože se lidem zobrazí při načtení zprávy.
Já jsem si zprávu představoval asi nějako takto:

```txt
Ahoj <oslovení>, 👋
Rád bych Tě pozval do naší komunity na whats appu. Chtěl bych, aby to byl prostor, skrze který budu moci sdílet rychle informace a budeme se moci propojovat navzájem. Pokud se chceš připojit, klikni na odkaz níže.
<odkaz>

Měj hezký den
Petr
```

Pro jednodušší sestavení zprávy jsem si připravil jednoduchý skript, který sestaví data do požadovaného formátu. Skript lze nalézt na odkaze: [messageparser.petrkucerak.cz](https://messageparser.petrkucerak.cz)

## Odeslání zpráv

Pro odeslání zprávy si je třeba stáhnout předpřipravenou [IPhone Shortcuts](https://www.icloud.com/shortcuts/20ce896726744a03b602ede811580ba3) a jako vstup jí dát soubor ve formátu:

```txt
<tel. cislo>;<zprava>
<tel. cislo>;<zprava>
...
```
který si lze nechat vyexportovat z již zmiňovaného online skriptu pro přípravu dat: [messageparser.petrkucerak.cz](https://messageparser.petrkucerak.cz).

![Přidání zdrojového souboru](/posts/images/jak-poslat-veliké-množství-sms-z-iphone_01.png)

Shortcuts může běžet ve dvou módech – interaktivním a automatizovaném. V interaktivním, je třeba každou zprávu zkontrolovat, v automatizovaném se odešlou na pozadí.

## Závěr

Přiznám se, že mě IPhone Shortcuts hodně překvapily. Nevěděl jsem, že umožňují tolik věcí, a to včetně i REST API. Skript nebyl testovaný na enormním počtu zpráv. Nevím, jestli nebude provozovatel odesílání u většího počtu blokovat. V takové případě by bylo vhodné přidat timeout.

