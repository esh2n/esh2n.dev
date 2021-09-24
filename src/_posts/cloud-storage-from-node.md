---
title: 'GCP CloudStorageをNode.jsから操作するメモ'
date: '2021-04-04'
excerpt: 'GCP の Cloud Storage に関する公式ドキュメントがいまいちわかりにくかったのでメモ。🐵 やりたいこと Firestore のバックアップデータを Cloud Storage 上に保存しているが不必要になったものを自動的に消したい。'
coverImage: 'https://user-images.githubusercontent.com/55518345/113503475-0ef76400-956d-11eb-84c7-06b519da4f9a.png'
author:
  name: 'esh2n'
  picture: 'https://avatars.githubusercontent.com/u/55518345?v=4'
tags:
  - Node.js
  - TypeScript
  - GCP
categories:
  - DEV
color: '#339933'
emoji: '📝'
---

GCP の Cloud Storage に関する公式ドキュメントがいまいちわかりにくかったのでメモ。

<div align='center'>
  <img src="https://user-images.githubusercontent.com/55518345/113503475-0ef76400-956d-11eb-84c7-06b519da4f9a.png" style="width: 600px">
</div>

## 🐵 やりたいこと

Firestore のバックアップデータを Cloud Storage 上に保存しているが不必要になったものを自動的に消したい。</br>
Cloud Functions のスケジューラにトリガーは任せるとしてローカルで消せるか試す。

```
npm install --save @google-cloud/storage
```

[GCP 公式ドキュメント](https://cloud.google.com/storage/docs/deleting-buckets?hl=ja#storage-delete-bucket-nodejs)

### 👉 やり方

上記のサンプルのやり方だと認証情報を入れてないので、</br>
Storage インスタンス作成時に入れてあげる。</br>
例えば album bucket を作ってその中に 2021-4-4 フォルダを作ってその中に写真があるとすると、

```ts
import { Storage } from '@google-cloud/storage';
const keyName = `my-key.json`;
const projectId = 'my-project-id';
const bucketName = 'album';
const storage = new Storage({
  projectId: projectId,
  keyFile: require(`path/to/service-account-key/${keyName}`),
});
const bucket = storage.bucket(bucketName);

async function deleteFile() {
  await bucket.deleteFiles({
    prefix: '2021-4-4',
  });
  console.log(bucket);

  console.log(`${bucketName} deleted`);
}

deleteFile().catch(console.error);
```

これで 2021-4-4 フォルダごと削除できる。
サービスアカウントキーは GCP コンソール上「IAM と管理」から発行してダウンロードしてくる。

## 📌 終わりに

今回は Cloud Functions から GCP CloudStorage を操作したいので Node.Js を使ったが、</br>
ローカルで完結する場合は gsutil などを使ってシェルスクリプト組む方がいいと思う。
