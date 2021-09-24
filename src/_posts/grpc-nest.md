---
title: 'gRPCのClientとServerをNestJsで実装する'
date: '2021-02-03'
excerpt: '今回は gRPC 入門ということで NestJs で gRPC のサーバーとクライアントを作成します。gRPCは Google が開発した RPC フレームワークでREST API と違って内部で HTTP/2 を使っていることによってデータの受け渡しが高速に行えます。'
coverImage: 'https://user-images.githubusercontent.com/55518345/106738125-e9c4a300-665a-11eb-9067-96729558c627.png'
author:
  name: 'esh2n'
  picture: 'https://avatars.githubusercontent.com/u/55518345?v=4'
tags:
  - gRPC
  - NestJs
  - Node.js
  - TypeScript
categories:
  - DEV
color: '#E0234E'
emoji: '🦁'
---

今回は gRPC 入門ということで NestJs で gRPC のサーバーとクライアントを作成します。<br/>

<div align='center'>
  <img src="https://user-images.githubusercontent.com/55518345/106738125-e9c4a300-665a-11eb-9067-96729558c627.png" style="width: 600px">
</div>

## 🐵 gRPC って?

[gRPC](https://www.grpc.io/)は Google が開発した RPC フレームワークで<br/>
REST API と違って内部で HTTP/2 を使っていることによってデータの受け渡しが高速に行えます。<br/>
近年の micro service architecture の流行りによってドメイン, サービスごとにシステムを疎結合するケースが増えています。<br/>
gRPC を用いると proto ファイルさえ統一していれば言語の壁なしにサーバとの通信が高速に行えます。<br/>

### 👉 とりあえず動かす

今回動かすサンプルコードは[こちら](https://github.com/esh2n/nestjs-grpc)にあります。<br/>
<br/>
まだ Unary ケースしか実装していないので興味がありましたら追加してみてください。<br/>
<br/>
以下コマンドで動かせます。<br/>

```sh
# project root
yarn install

# start server
cd server && yarn install
yarn start

# start client
cd client && yarn install
yarn start
```

[http://localhost:3000/hero](http://localhost:3000/hero)にいくとデータが取得できているのが確認できると思います。

### 🗒 解説

まずは proto ファイル

```proto
syntax = "proto3";

package hero;

service HeroService {
 // Unary
 rpc FindOne (HeroById) returns (Hero) {};
}

message HeroById {
 int32 id = 1;
}

message Hero {
 int32 id = 1;
 string name = 2;
}
```

この proto ファイルをベースにいろんな言語用のファイルを自動生成していきます。<br/>
<br/>
すごく余談ですが、<br/>
Yahoo の技術ブログや Wantedly の技術ブログに実際のユースケースを乗せてくださっているのでとても参考になりました。<br/>
Github actions を利用して特定のブランチに PR を出すとそのブランチ名のプログラミング言語用のファイル生成するように組んでいて<br/>
使う側は純粋に開発に集中できる環境作りをされていました。<br/>
<br/>
今回は NestJs 用にコードジェネレートします。<br/>
generate.sh を作成していつでも実行できるようにします。

```sh
#! bin/bash

protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto \
  --ts_proto_out=generates/hero \
  --ts_proto_opt=nestJs=true \
  --ts_proto_opt=outputClientImple=true \
  --ts_proto_opt=addGrpcMetadata=true \
  -Iprotos \
  protos/hero.proto
```

生成されたコードにはサーバー、クライアントに必要な interface 群や<br/>
メソッドをまとめてくれています。(今回だと finedOne だけ)<br/>
<br/>
server 側 hero.controller.ts<br/>

```ts
@Controller('hero')
@HeroServiceControllerMethods()
export class HeroController implements HeroServiceController {
  findOne(data: HeroById, metadata?: Metadata): Promise<Hero> | Hero {
    if (metadata) console.log(metadata);

    return {
      id: data.id,
      name: 'Hi, from server.',
    } as Hero;
  }
}
```

コード生成されているおかげで少ない記述でメソッドを実装できます。<br/>
今回だと findOne()呼び出しで Hero オブジェクトが返されます。<br/>
<br/>
client 側 hero.service.ts<br/>

```ts
@Injectable()
export class HeroService implements OnModuleInit {
  private heroService: HeroServiceClient;

  constructor(@Inject('HERO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.heroService = this.client.getService<HeroServiceClient>('HeroService');
  }

  getHero(): Observable<Hero> {
    return this.heroService.findOne({ id: 1 });
  }
}
```

こちらは getHero()呼び出しで先程の findOne()を呼び出しています。<br/>
<br/>
client 側 hero.controller.ts<br/>

```ts
@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get()
  call(): Observable<any> {
    return this.heroService.getHero();
  }
}
```

http://localhost:5000/hero に GET リクエストを送ると heroService.getHero()の結果を返します。<br/>

## 📌 終わりに

今回はサーバー側も NestJs で実装しましたが、Go や Rust でも挑戦してみたいです。<br/>
少しでも gRPC 入門したいけど Go わからんマンの役に立てれば良いです。<br/>
<br/>
今回は BFF として NestJs を使ってみるか考えていたら気づいたら gRPC に興味が沸いてしまい入門しました。<br/>
