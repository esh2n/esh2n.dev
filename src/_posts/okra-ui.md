---
title: '(WIP)ブログを作り直していた筈なのに気づいたらUIライブラリを作っていた話'
excerpt: '今まで使っていた[ブログサイト](esh2n.com)に飽きてきたので新しく作りなおしています。技術選定の段階で Deno をベースとした React フレームワークの Aleph.js を使って色々試したりSSG で事足りるなら Pagic もありかなと思っていましたが結局使い慣れている Next.js で作り始めました。'
coverImage: 'https://user-images.githubusercontent.com/55518345/134610723-79664a98-3977-4978-966e-758a21671366.png'
date: '2021-09-10'
author:
  name: esh2n
  picture: 'https://avatars.githubusercontent.com/u/55518345?v=4'
tags:
  - Web Components
  - Next.js
  - Chakra UI
categories:
  - DEV
color: '#29ABE2'
emoji: '🌎'
---

今まで使っていた[ブログサイト](https://www.esh2n.com/)に飽きてきたので新しく作りなおしています。

技術選定の段階で Deno をベースとした React フレームワークの Aleph.js を使って色々試したり
SSG で事足りるなら Pagic もありかなと思っていましたが結局使い慣れている Next.js で作り始めました。

デザインについては自信がないので Chakra UI を使ってサクッと作ってしまおうかと思いましたが、
ここで頭に「Sakura UI」という単語がよぎります。「Chakra UI のパロディで Sakura UI とかあったら素敵やん。」と。

でも既に Sakura UI あったんです。悔しかったので(?) Okra UI というパッケージを作ってやろうと心に決めました。

私の悪い癖なのですが作っているとどんどん脱線してしまう傾向があります。すでにブログサイトを作り直すということは抜けていて 頭の中には Okra UI という響きとどういう構成で UI コンポーネントライブラリを作るかということでいっぱいでした。

## 使った技術

今回は Web Components ベースでライブラリを作ることにしました。
Svelte と悩みましたが、以前 Lit element を使ったことがあったことと Web Components のネックである SSR のしにくさも改善されているようでしたので。
Lit element を使っている UI ライブラリで[material-components/material-web](https://github.com/material-components/material-web)がとても参考になりました。
