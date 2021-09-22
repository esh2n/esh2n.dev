---
title: 'ブログを作り直していた筈なのに気づいたらUIライブラリを作っていた話'
excerpt: '今まで使っていた[ブログサイト](esh2n.com)に飽きてきたので新しく作りなおしています。技術選定の段階で Deno をベースとした React フレームワークの Aleph.js を使って色々試したりSSG で事足りるなら Pagic もありかなと思っていましたが結局使い慣れている Next.js で作り始めました。'
coverImage: 'https://user-images.githubusercontent.com/55518345/98099391-d9255500-1ed2-11eb-9056-5d4b813c7067.png'
date: '2020-11-4'
author:
  name: Shunya Endo
  picture: ''
tags:
  - Web Components
  - Next.js
  - Chakra UI
categories:
  - DEV
color: '#0868F4'
emoji: '🙅'
---

今まで使っていた[ブログサイト](esh2n.com)に飽きてきたので新しく作りなおしています。

技術選定の段階で Deno をベースとした React フレームワークの Aleph.js を使って色々試したり
SSG で事足りるなら Pagic もありかなと思っていましたが結局使い慣れている Next.js で作り始めました。

UI については Chakra UI が便利なので今回も使おうかと思いましたが、ここで頭に「Sakura UI」という単語がよぎります。
「Chakra UI のパロディで日本人作の Sakura UI とかあったら素敵やん。」と。

でも既に Sakura UI あったんです。悔しかったので(?) Okra UI というパッケージを作ってやろうと心に決めました。

私の悪い癖なのですが作っているとどんどん脱線してしまう傾向があります。すでにブログサイトを作り直すということは抜けていて 頭の中には Okra UI という響きとどういう構成で UI コンポーネントライブラリを作るかということでいっぱいでした。
