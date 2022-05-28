---
title: 'Raft algoritmus'
metaTitle: 'Hledání konsenzu v distribuovaném systému'
date: '2022-05-26'
tags:
   - algoritmy
icon: 'ship'

---

**Raft je paralelní algortimus konsezu pro správu a replikaci logů. Poskytuje stejný výsledek jako [Paxos protokol](https://en.wikipedia.org/wiki/Paxos_(computer_science)). Jeho efektivita je stejná, ale pro běžného smrteníka jednudužší na pochopení. Poskytuje lepší funkcionalitu a základ pro implementaci v různých systémech. Pro zvýšení srozumitelnosti, Raft odděluje jednotlivé klíčové prvky konsenzu (např. volbu lídra, repikaci logů a bezpečnost). [1]**

## Fungování alogrimu Raft

### Jednotlivé fáze Raftu

1. volba lídra
2. běžný chod (základní replikace logu)
3. bezpečnost a konzistence po změně lídra
4. neutralizace starých lídrů
5. interakce s klienty

#### Volba lídra

Každé zařízení (server) může být právě v jednom z následujících stavů:

- **LÍDR** obsahuje požadavky klientů a replikue log
- **NÁSLEDOVNÍK** pasivní zařízení, které pouze reaguje na zprávy od jiných zařízení
- **KANDIDÁT** přechodná role v průběhu volby lídra

Kdy platí, že za běžného provozu exituje pouze 1 lídr a N následovníků.

#### Epochy

Celkový běh Rafu se rozděluje do jednotlových časových (logický čas) období, tzv. epoch.

Každá epocha má svoje ID číslo, které se vždy zvyšuje. Každé zařízení i uchovává si své číslo uchovává. Díky tomu se Raft umí vypořádat i s např. vypnutím.

Epocha se skládá ze dvou částí
- volba lídra
- běžný chod
  
Může nastat epocha bez lídra, jelikož se nepovede lídra zvolit.

#### Průběh

Na začátku jsou všechna zařízení jako ***následnovíci***. Ti očekávjí zprávu od *lídra* nebo od *kandidátu na lídra*.

Lídři posílají ***heartbeats***, aby si udrželi autoritu.

Jakmile *následník* neobrdží zprávu do určitého *timeoutu*, předpokládá, že lídr havaroval a iniciuje ***volbu nového lídra***.

##### Inicializace voleb

Zařízení, které spustí volbu nového lídra:
1. zvýší číslo epochy
2. změní svůj stav na KADNIDÁT
3. zahlasuje pro sebe
4. pošle *RequestVote* všem ostatním serverům a čeká na násedující stavy
   - obdrží hlasy od většiny serverů -> změní se na *LÍDR* a pošle *heartbeat* ostatní procesům
   - přijme zprávu od valdiního *lídra* (tedy jiný lídr byl zvolen dříve), vrátí se tedy do stavu *NÁSLEDOVNÍK*
   - nikod nevyhraje volby, tj. vyprší *timeout* -> zvýší se ID epochy

![Stavovy diagram](https://github.com/petrkucerak/blog/blob/post-raft-algoritmus/public/posts/raft-stavovy-diagram.png?raw=true)
   

## Reference

[1] In Search of an Understandable Consensus Algorithm (Extended Version) | *Diego Ongaro and John Ousterhout (Stanford University)*

[2] Algoritmus Raft (Michal Jakob) | *[Slideshow](https://cw.fel.cvut.cz/wiki/_media/courses/b4b36pdv/lectures/05_raft_2021.pdf)*