---
title: 'Jaký je liturgický cyklus?'
metaTitle: 'Jaký je liturgický cyklus?'
date: '2022-11-06'
tags:
  - repo
  - cirkev
  - short
icon: 'recycle'
---

**Jednoduchá PWA aplikace, která řeší můj věčný problém - mám na poslední chvíli najít žalm, nepamatuju si, jaký je liturgický cyklus. Apka běží plně offline, takže stačí stáhnout a jednou spustit, kvůli nacachování.**

| 🌐 url aplikace | [cyklus.petrkucerak.cz](https://cyklus.petrkucerak.cz)                                        |
| -------------- | ------------------------------------------------------------------------------------- |
| 🔨 repo         | [/petrkucerak/jaky-cyklus](https://github.com/petrkucerak/jaky-cyklus)                |
| GitPod         | [Gitpod ready-to-code](https://gitpod.io/#https://github.com/petrkucerak/jaky-cyklus) |


## Jak funguje algoritmus?

Spočítá celočíselný součet aktuálního roku. Přičte korektor. Ten se postará o problematiku toho, že církevní rok začíná během první adventní neděle. Ze získaného čísla získá modulo 3. Následně platí, že:

- 0 => cyklus C
- 1 => cyklus A
- 2 => cyklus B

![screenshot z webove apliakce](https://raw.githubusercontent.com/petrkucerak/blog/main/public/posts/jaky-je-liturgicky-cyklus-01.png)