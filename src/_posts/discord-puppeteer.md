---
title: 'discord botでスクレイピングしてみた'
date: '2020-10-12'
excerpt: '以前`discord.js`で簡単な受け答えをする bot を作った経験から今回は`puppeteer`でスクレイピングをし、その結果を返す bot を作成してみたいと思います。今回は`heroku`にデプロイしております。'
coverImage: 'https://user-images.githubusercontent.com/55518345/95711465-c639af00-0c9d-11eb-84bf-239af0b8321c.png'
author:
  name: 'esh2n'
  picture: 'https://avatars.githubusercontent.com/u/55518345?v=4'
tags:
  - TypeScript
  - Discord.js
  - Puppeteer
categories:
  - DEV
color: '#40B5A4'
emoji: '🎈'
---

# はじめに

以前`discord.js`で簡単な受け答えをする bot を作った経験から今回は`puppeteer`でスクレイピングをし、<br />その結果を返す bot を作成してみたいと思います。今回は`heroku`にデプロイしております。

<div align="center">
	<img src='https://user-images.githubusercontent.com/55518345/95711465-c639af00-0c9d-11eb-84bf-239af0b8321c.png' style="width: 500px;" />
</div>

## Puppeteer とは

CLI から HeadlessBrowser を立ち上げてスクレイピングできるツール。
似たものに`PlayWright`もあるが今回はこちらで事足りるので不採用。

細かい使い方は省略するがこんな感じで簡単に動かせる。

```ts
import puppeteer from 'puppeteer';

const sample = {
  browser: null as any,
  page: null as any,
  url: 'http://example.com/',

  initialize: async (): Promise<void> => {
    sample.browser = await sample.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    sample.page = await sample.browser.newPage();
  },

  hoge: async (): Promise<any> => {
    try {
      // Describe here
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  close: (): void => {
    sample.browser.close();
  },
};

(async (): Promise<void> => {
  await sample.initialize();
  await sample.hoge();
  sample.close();
})();
```

※`args: ['--no-sandbox', '--disable-setuid-sandbox']`は入れないと Heroku 環境だとエラーになります。

参考になりそうな記事

- https://qiita.com/tomi_linka/items/a68cf7840c3da002c6e0
- https://qiita.com/k1832/items/87a8cf609b4ccf2c6195

## Discord.js とは

#### # Discord とは

`Zoom` や `Skype` と同じビデオ通話・音声通話・VoIP フリーソフトウェアの一つ。
元々は`ゲーマー向けチャットアプリ`として指示を得ていたが最近はビジネス向けとしても脚光を浴びている。

#### # Discord.js とは

`Discord` の API を Node.js から簡単に叩けるパワフルなモジュールだそう。
チャットで誰かがコメントしたら反応して返事をしたり、<br/>通話に入ってきて音楽を鳴らしたり結構いろいろできる。

以下に index.ts ファイルを晒しておきます。

```ts
src / index.ts;

import { Client } from 'discord.js';

const TOKEN = process.env.TOKEN;

export const client = new Client();
client.on('ready', () => {
  console.log('ready...');
});

const funcs: { [key: string]: string } = {
  // describe here your functions.
  sayHello: './funcs/sayHello',
};

const loadFunctions = (funcsObj: { [key: string]: string }): void => {
  for (const name in funcsObj) {
    import(funcsObj[name]);
  }
};

loadFunctions(funcs);

client.login(TOKEN);
```

```ts
src / funcs / sayHello.ts;

import { Message } from 'discord.js';
import { client } from '../index';

import { scraping } from '../util.scraping';

((): void => {
  client.on('message', (message: Message) => {
    (async (): Promise<void> => {
      const content = message.content;
      if (message.author.bot) return;
      switch (true) {
        case /^\/sample (.+)$/.test(content): {
          const data = await scraping(RegExp.$1);
          message.channel.send(`Hello ${data}`);
          break;
        }
        default:
          break;
      }
    })();
  });
})();
```

参考になりそうな記事

- https://note.com/exteoi/n/n87bd4fa02c95
- https://qiita.com/cryptocoin_harumaki/items/5d8c503e02093eca1f9b

## Heroku にデプロイ

まずはルートディレクトリに`Procfile`を作成して以下を記述

```procfile
worker: node <path to index.js(compiled)>

// コンパイルされたindex.jsまでのパスを入力
```

`HerokuCLI`を入れてから、

```bash
heroku login
heroku apps:create <app name> -b heroku/nodejs
heroku buildpacks:add https://github.com/CoffeeAndCode/puppeteer-heroku-buildpack

git remote add heroku git@heroku.com:<app name>.git
git add --all
git commit
git push heroku master
```

環境変数追加したいなら`Heroku`のサイトで作成したアプリのページに移動して<br/>Setting>Config Vars から追加可能。

Resources から Dynos の設定で web をオフに、worker をオンにするのも忘れずに。

参考になりそうな記事

- https://qiita.com/jerrywdlee/items/ffc988956eb75a99bc3c
- https://qiita.com/InkoHX/items/590b5f15426a6e813e92
