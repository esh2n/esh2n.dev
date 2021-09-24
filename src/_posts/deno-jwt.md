---
title: 'Deno + GraphQL + PostgreSQLでJWTを作ろうとして失敗したメモ'
date: '2021-01-05'
excerpt: '今回は 2020 年 5 月に ver1.0.0 がリリースされた Deno(ディーノ)に入門しつつ、
GraphQL と PostgreSQL を組み込んで JsonWebToken を発行する方法に失敗したので後の自分に託すとしてメモを残します。'
coverImage: 'https://user-images.githubusercontent.com/55518345/103642949-3d2dcd80-4f97-11eb-967e-77b1d6eefa69.png'
author:
  name: 'esh2n'
  picture: 'https://avatars.githubusercontent.com/u/55518345?v=4'
tags:
  - Deno
  - TypeScript
  - GraphQL
  - PostgreSQL
categories:
  - DEV
color: '#000000'
emoji: '🦕'
---

今回は 2020 年 5 月に ver1.0.0 がリリースされた Deno(ディーノ)に入門しつつ、
GraphQL と PostgreSQL を組み込んで JsonWebToken を発行する方法に失敗したので後の自分に託すとしてメモを残します。

(追記) : ふつうにできた。

<div align='center'>
  <img src="https://user-images.githubusercontent.com/55518345/103642949-3d2dcd80-4f97-11eb-967e-77b1d6eefa69.png" style="width: 600px">
</div>

## 🦕 Deno って?

> A secure runtime for JavaScript and TypeScript.(公式原文)

`Deno`は JavaScript/TypeScript のランタイム(実行環境)です。
`Node.js`とよく比較されますが製作者が同じライアン・ダールで
`Node.js`における設計ミスや後悔している点を修正したものらしいです。
Deno は Node のアナグラムになっています。

### 👉 Deno の特徴

#### 1. Deno has top-level async functionality.

Node.js 実行環境だと普通、以下のように async 関数内で await を使用します。

```ts
async function hoge() {
  await fuga();
}

await fuga(); // error!
```

Deno だと async 関数で囲む必要はありません。

#### 2. Deno uses ECMAScript6 syntax.

厳密には 1.の top-level async も ES6 のシンタックスを使っているからなのですが、
Node.js が Common.js のシンタックスを利用しているのに対し、
Deno は ES6 のシンタックスを使っています。

require()/module.exports だったり export/import だったりが内包するコードがなくなります。

#### 3. TypeScript is available by default.

Node.js では`ts-node`等で実行するか、一度コンパイルを挟んでから js ファイルを実行
というのが当たり前だったのですが、Deno ではデフォルトで ts ファイルを実行できます。
コンパイルは Deno 側で勝手にしてくれるので、何も考える必要はありません。

#### 4. Deno requires permissions for any access.

Deno はセキュリティに厳格なランタイムです。
実行時にファイルの読み書きの許可がないと使えなかったりネットの許可がないとアクセスできなかったりします。

#### 5. Deno imports modules by using URL.

Deno 実行環境で外部モジュールを使うには`npm`を使う必要はありません。
例えば`dotenv`を使うなら以下のようにします。

```ts
index.ts;
export { config } from 'https://deno.land/x/dotenv@v0.5.0/mod.ts';

const { NAME } = config();
console.log(NAME).env; // shunya
NAME = 'shunya';
```

つまり package.json がいらなくなり依存関係の煩わしい問題が解消されます。
また、TypeScript のサポートがあるので拡張子.ts のまま import しています。

実行時にモジュールのインストールが行われ、一度使われたモジュールはキャッシュされます。

#### 6. Deno has formatter and test-runner by default.

Deno にはテストランナーとフォーマッタが含まれています。
それぞれ以下で実行できます。

- `deno fmt`
- `deno test`

テストコードは、以下のように書きます。

```ts
Deno.test("hoge", () => {
  ...
})
```

## ✋ 実際に使ってみる

今回は Deno で Web サーバーをたてて GraphQL PlayGround から PostgreSQL に保存と確認を行います。

```ts
index.ts;

import { Application, Router } from 'https://deno.land/x/oak@v6.0.2/mod.ts';
import { GraphQLService } from 'https://deno.land/x/oak_graphql@0.6.2/mod.ts';

const typeDefs = gql`
  type User {
    firstName: String
    lastName: String
  }

  input UserInput {
    firstName: String
    lastName: String
  }

  type ResolveType {
    done: Boolean
  }

  type Query {
    getUser(id: String): User
  }

  type Mutation {
    setUser(input: UserInput!): ResolveType!
  }
`;

const resolvers = {
  Query: {
    getUser: (parent: any, { id }: any, context: any, info: any) => {
      console.log('id', id, context);
      if (context.user === 'hoge') {
        throw new GQLError({ type: 'auth error in context' });
      }
      return {
        firstName: 'fuga',
        lastName: 'fugafuga',
      };
    },
  },
  Mutation: {
    setUser: (parent: any, { input: { firstName, lastName } }: any, context: any, info: any) => {
      console.log('input:', firstName, lastName);

      await client.connect();
      await client.query(
        `INSERT INTO users(first_name, last_name) VALUES('${firstName}', '${lastName}') RETURNING id, first_name, last_name`,
      );
      return {
        done: true,
      };
    },
  },
};

const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: (ctx: RouterContext) => {
    return { user: 'hoge' };
  },
});

const app = new Application();

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());
console.log('http://localhost:8000/graphql');

await app.listen({ port: 8000 });

export const client = new Client({
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  hostname: DB_HOST,
  port: +DB_PORT,
});
```

## 📌 終わりに

JWT を Cookies にセットしてログイン情報を保存したかったのですが、
oak_graphql が返す context.cookies から cookies.set をしても保存されず諦めました。

まだまだ破壊的なアップデートが繰り返されているので、様子を見つつまたチャレンジしたいと思います。
