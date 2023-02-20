---
title: 'Riskuj'
description: 'Aplikace pro společenskou hru Riskuj.'
date: '2023-02-20'
tags:
  - hry
  - repo
  - short
icon: 'axe'
---

**Hledáte aplikaci pro rychlé a hezké hraní hry Riskuj? Věřím, že skautské riskuj od Wančua vás potěší.**


| 🌐 app  | https://riskuj.petrkucerak.cz/                                                       |
| ------ | ---------------------------------------------------------------------------------------- |
| 🔨 repo | [/petrkucerak/riskuj](https://github.com/petrkucerak/riskuj) |


## Motivace

Nedávno jsem na jeden z kroužků pro děcka připravoval hru Riskuj. Mám ji rád. Už na základce jsem flexil s tím, že jsem ji dokázal připravit v PowerPointu. Tentokráte jsem neměl moc času a tak jsem hledal nějakou apku, která by hru ideálně sestavila za mě. Podařilo se a objevil jsem skvělou verzi – [skautské riskuj](https://riskuj.petrkucerak.cz/). Tak jsem si ji zahostoval a tadadá.

![sceenshot z hry riskuj](/posts/images/riskuj-01.png)

## Jak riskuj funguje

### O projektu
Projekt **skautské riskuj** vznikl jako podpora pro oddíly v době distanční skautské činnosti. *Autorem projektu je [Wanaču](mailto:wanacu@skaut.cz).* Projekt je určen pro zábavné hraní vědomostního kvízu známého z televizní soutěže a to během online setkáních na libovolné platformě (Google Meets, Microsoft Teams, Skype, Zoom...). Nicméně je možné ho využít i při hraní prezenčně (s použitím velké obrazovky nebo projektoru).

### Příprava otázek
Otázky je možné upravit pomocí intuitivního Editoru. Otázky se ukládají do paměti prohlížeče, není tedy možné si zaregistrovat uživatelský profil a otázky ukládat na server. Otázky jsou potom dostupné v prohlížečí i po jeho zavření a znovu otevření. Chcete-li připravené otázky zálohovat, nebo přenést mezi různými prohlížeči, či počítači, případně je sdílet v týmu, je možné stáhnout sadu otázek do souboru. Tento soubor potom můžete zálohovat či sdílet s ostatními a otázky z něj pak můžete kdykoliv nahrát.

### Příprava hry
- V editoru si připrav témata a otázky
- V panelu přidej hráče, kteří budou hrát (lze měnit i v průběhu hry)
- Kliknutím na záložku Projekce se otevře nová karta prohlížeče ve verzi pro promítání a sdílení
- Na tvé oblíbené videokonfereční platformě nasdílej kartu s prezentací (nesdílej ovládací panel - hráči by viděli správné odpovědi)
- Můžete začít hrát

### Průběh hry
- Zvol hráče, který bude začínat s výběrem otázek
- Hráč ústně sdělí otázku, kterou vybral (téma a bodovou hodnotu)
- Klikni na vybranou otázku ve svém panelu. Zadání otázky vidí jak vedoucí hry, tak i účastnici v prezentaci.
- Přečti otázku. Po přečtení se hráči mohou přihlásit k odpovědi pomocí funkce Hlášení o slovo na videokonferenční platformě.
- Videokonfereční platformy zpravidla zobrazují přihlášené posluchače v pořadí v jakém se přihlásili, takže snadno poznáš, kdo se přihlásil první.
- Ve svém panelu klikni na jméno hráče, který se přihlásil první. V projekci bude jeho jméno zvýrazněno.
- Vyzvi hráče k odpovědi a označ, zda odpověděl správně či špatně. Jeho odpověď pak můžeš doplnit či přidat zajímavost.
- Pokud se nepřihlásil nikdo, pokračuj tlačítkem Nikdo neví
- Požádej všechny hráče, aby se přestali hlásit, případně to udělejte za ně.
- Vyzvi hráče, který naposledy odpověděl správně, aby vybral další otázku.


### Režim úprav
Odebrání hráče v průběhu hry mu nevratně smaže všechny body. Menu pro mazání hráčů jsem proto skryl do režimu úprav. Stejně jako volbu pro reset celé hry. Tyto skryté funkce je možné aktivovat kliknutím na ozubené kolo v pravém horním rohu.

### Co nefunguje oproti televizní verzi
Oproti televizní verzi nefungují takzvané bonusové cihličky (body dostane hráč, který vybírá otázku zdarma - bez otázky) a dále potom premiové otázky.

### Tip pro pokročilé
Soubor s uloženými otázkami je ve formátu JSON. Pokud jsi technicky zdatnější, můžeš si otázky upravovat přímo v něm. Díky tomu si můžeš i přizpůsobit počet témat či počet otázek v tématu. Jen si dej pozor, abys neporušil syntax a a by definovaný počet otázek odpovídal počtu témat a bodových hodnot.

### Tip pro resetování hry

Pokud chcete smazat data uložená v mezipaměti, doporučuji postupovat dle návodu viz screenshot.

1. otevřete detaily stránky
2. zobrazte soubory cookies
3. označte lokalní pamět a pamět session
4. smažte veškerá data

![sceenshot z hry riskuj](/posts/images/riskuj-02.png)