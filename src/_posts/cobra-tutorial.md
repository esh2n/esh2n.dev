---
title: 'CobraでCLIツールを作ろう'
date: '2020-09-07'
excerpt: '良く使う CLI コマンドをエイリアス等に登録するのも良いですが、CLI ツールとしてきちんとコマンドを自作したいと思い作りました。sample-dir という名前のツールを作ります。以下のコマンドで雛形を作成します'
coverImage: 'https://user-images.githubusercontent.com/55518345/93424281-b626ed80-f8f2-11ea-8904-8b173609cf6c.png'
author:
  name: 'esh2n'
  picture: 'https://avatars.githubusercontent.com/u/55518345?v=4'
tags:
  - Golang
  - CLI
  - Cobra
categories:
  - DEV
color: '#0868F4'
emoji: '🐍'
---

# はじめに

良く使う CLI コマンドをエイリアス等に登録するのも良いですが、CLI ツールとしてきちんとコマンドを自作したいと思い作りました。

## cobra をインストールと雛形作成

sample-dir という名前のツールを作ります。
以下のコマンドで雛形を作成します。

また、GitHub 上にも`sample-dir`という名前のリポジトリを作成しておいてください。

```sh

$ go get https://github.com/spf13/cobra
$ mkdir sample-dir && cd sample-dir
$ cobra init --pkg-name github.com/<your-github-username>/sample-dir

```

次に GoModules も初期化しておきます。

```sh

$ go mod init  github.com/<your-github-username>/sample-dir

```

今こんな感じ

![ディレクトリ構造](https://user-images.githubusercontent.com/55518345/93425464-030bc380-f8f5-11ea-90a0-50c4a5384046.png)

## Hello World してみる

`cmd/root.go`の l48 あたりを以下のように編集

> (`Run: ~~`の部分がコメントアウトされているのでアンコメントして`fmt.Println("Hello World")`を追加してください)

```root.go
  var rootCmd = &cobra.Command{
    Use:   "sample-dir",
    Short: "A brief description of your application",
    Long: `A longer description that spans multiple lines and likely contains
  examples and usage of using your application. For example:

  Cobra is a CLI library for Go that empowers applications.
  This application is a tool to generate the needed files
  to quickly create a Cobra application.`,
    // Uncomment the following line if your bare application
    // has an action associated with it:
    Run: func(cmd *cobra.Command, args []string) {
      // ココ追加
      fmt.Println("Hello World")
    },
}

```

画像だとこんな感じ

![Hello World](https://user-images.githubusercontent.com/55518345/93425873-d99f6780-f8f5-11ea-96ad-65ac7303883c.png)

次に、以下のコマンドで実行

```sh

$ go run ./main.go

# OutPut: Hello World

```

こんな感じになっていれば ok

![output](https://user-images.githubusercontent.com/55518345/93426244-9f829580-f8f6-11ea-9655-c1c9902d9ddf.png)

## 実際にコマンドを使ってみる

まずは GitHub にローカルリポジトリをプッシュしてください。(割愛)

以下のコマンドで sample-dir コマンドをインストールします。
(ちょっと時間かかるかも)

```sh

$ go get -u github.com/<your-github-username>/sample-dir

```

無事にインストールできたら sample-dir コマンドを打ってみましょう

```sh
$ sample-dir

# OutPut: Hello World

```

こんな感じになっていれば ok

![sample-dir](https://user-images.githubusercontent.com/55518345/93427242-78c55e80-f8f8-11ea-897b-35ecf04d4a4a.png)

## 終わりに

あとは Golang でファイルいじる方法だったり unix コマンド叩く方法だったりプラグインだったり入れてみて自由に CLI コマンドを作成してください。
自分もまだ手探りです。
