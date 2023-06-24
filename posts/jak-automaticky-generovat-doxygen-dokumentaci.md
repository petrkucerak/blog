---
title: 'Jak automaticky generovat Doxygen dokumentaci'
description: 'Článek o tom, proč je důležité dokumentovat a jak automaticky generovat Doxygen dokumentaci pomocí GitHub Action a zveřejnit ji pomocí GitHub Pages'
date: '2023-06-24'
tags:
  - GitHubActions
  - GitHubPages
  - tip
icon: 'writingSign'
---

Tvorba **dokumentace nebaví nikoho**, ale přesto je velice důležitá. Osobně mám zkušenost s tím, že pokud vytvořím práci, kterou nezdokumentuji, je vlastně k ničemu.  A to hned z několika důvodů:

- je **závislá** na mně, tj. často jí nikdo jiný nerozumí,
- pokud se jedná o **komplikovaný problém**, často také sám **zapomenu** na to, jak jsem ho v daném případě řešil.

Nástrojů pro dokumentování kódu existuje je mnoho. Jedním z nejvíce oblíbených je **[Doxygen dokumentace](https://www.doxygen.nl/index.html)**. Tento nástroj používám s [rozšířením VS Code](https://marketplace.visualstudio.com/items?itemName=cschlosser.doxdocgen), které mi pomáhá s tvorbou popisu funkcí, souborů, maker atd. Dokumentaci si může následně každý vygenerovat pomocí předpřipraveného skriptu. Co se o generování nestarat, nýbrž využít nástroje jako je *GitHub Action* a *GitHub Pages* a nechat **dokumentaci generovat automaticky**?

Toto je poměrně jednoduché a jak na to bych rád popsal v tomto článku. Způsob jsem využil ve své bakalářské práci. Fungující výsledek si můžete prohlédnout v [repositáři projektu](https://github.com/petrkucerak/rafting-button/).

## Návod

1. V rootovém adresáři si založte složku `doc`. Není nutné, ale dle mého to pomáhá přehlednosti.
2. Ve složce si vygenerujte `Doxyfile`, který popisuje konfiguraci dokumentace. Příkladem pro `C` program může být například [konfigurace v zmiňovaném bakalářském projektu](https://github.com/petrkucerak/rafting-button/blob/main/code/rafting-button/doc/Doxyfile).
3. Dále doporučuji odladit výslednou dokumnetaci pomocí manuálního lokálního vygenerování.<br>*příkaz `doxygen <path to Doxyfile>`*
4. Vytvořte novou GitHub Action, podle uvedené specifikace:

```yml
name: 📖 Create Docs # Název action

on:
  # Action se spustí pokud je pushnutá nová verze do větve 'main'
  push:
    branches: ["main"]

  # Action je také možné spustit manuálně
  workflow_dispatch:

# Nastavení povolení GITHUB_TOKEN action, aby mohlo dojít k deplymentu GitHub Pages 
permissions:
  contents: read
  pages: write
  id-token: write

# Nastavení deploymentu GitHub Pages
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Doplying není paralelizován
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      # Checkout reposiáře pro přístup k souborům
      - name: Checkout 
        uses: actions/checkout@v3
      # Instalace nutných knihoven pro vykreslení dokumentace a grafů závislostí
      - name: Build Doxygen
        run: |
          sudo apt install doxygen
          sudo apt install graphviz
          cd code/rafting-button/doc
          doxygen Doxyfile
      # Setup Pages
      - name: Setup Pages
        uses: actions/configure-pages@v3
      # Nahrání vygenerované dokumentace
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: './code/rafting-button/doc/html/' # Cesta k exportované dokumentaci
      # Deployment GitHub Pages
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```