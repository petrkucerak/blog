---
title: 'Raft algoritmus'
metaTitle: 'Hledání konsenzu v distribuovaném systému'
date: '2022-05-26'
tags:
   - algoritmy
icon: 'ship'

---

## Úvod

Raft je paralelní algortimus konsezu pro správu a replikaci logů. Poskytuje stejný výsledek jako [Paxos protokol](https://en.wikipedia.org/wiki/Paxos_(computer_science)). Jeho efektivita je stajná, ale jeho struktura je odlišná od Paxos. Díky tomu je Raft více srozumitelný a také poskytuje lepší funkcionalitu a základ pro implementaci v různých systémech. Aby se zlepšila srozumitelnost, Raft odděluje jednotlivé klíčové prvky konsenzu (např. volbu lídra, repikaci logů a bezpečnost). [1]

## Reference

[1] In Search of an Understandable Consensus Algorithm (Extended Version) | *Diego Ongaro and John Ousterhout (Stanford University)*