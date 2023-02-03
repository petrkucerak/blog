---
title: 'Jak tvořit prezentace v&nbsp;markdawnu'
metaTitle: 'Jak tvořit prezentace v markdawnu'
date: '2023-01-02'
tags:
  - slideshow
  - markdown
icon: 'presentation'
---

**Rádi byste tvořili slideshow pro svoji prezentaci as a code a ideálně využili verzovacího nástroje jako je git? Pak je tento krátký článek přesně pro vás.**

## Motivace

Nedávno jsem připravoval workshop o aplikacích AI služeb, které nabízí Microsoft Azure. Veškerá DEMA se *snippety kódu* jsem nahrál do repositáře na GitHub i s postupem v *markdownu*. Potřeboval jsem ovšem navíc ještě připravit slideshow, kterou bych rád dal také k dispozici. Jelikož jsem již veškeré poznámky měl vytvořené v *markdownu*, lákalo mne zjistit, jestli neexistuje i možnost pro tvorbu prezentací v ***markdownu***.

## Řešení

Po rychlém googlení mi vypadlo několik možností. Nejvhodnější mi ale připadalo využít *open-source* [**Marp (Markdwon Presentation Ecosystem)**](https://marp.app/) a to především díky možnosti integrace do [VS Code](https://code.visualstudio.com/), který využívám.

Framework nabízí několik základních šablon a umožňuje dostylování pomocí css tříd. Řešení má ale i své limity. Nelze provádět pokročilejší formátování. Při větším množství informací obsah přeteče slide.

![Využití rozšíření Marp pro VS Code](/posts/images/jak-tvorit-prezentace-as-code-v-markdownu-01.png)

Po tvorbě prezentace je možné slideshow exportovat přímo z VS Code [díky rozšíření](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode) hned do několika formátů, jako je `.pdf`, `.pptx` či `.html`. Nejzajímavější pro mne bylo využití html prezentace, která umožňuje všechny módy prezentace jako *PowerPoint*. Tj. zobrazení poznámek pro přednášejícího, rozdělení okna pro prezentujícího a pro zobrazení prezentace.

Přikládám odkaz na [ukázkovou prezentaci](https://github.com/petrkucerak/AzureAI-Workshop/tree/main/slideshow).
