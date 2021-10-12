---
title: 'マークアップの環境を一瞬で作りたい!'
date: '2020-09-24'
excerpt: 'こちらの記事の続きで実際に作ってみました。Cobra で CLI ツールを作ろう ## 作るに当たっての背景'
coverImage: 'https://user-images.githubusercontent.com/55518345/94111973-b8072880-fe7f-11ea-9f29-f1ff18e006a4.jpeg'
author:
  name: 'esh2n'
  picture: 'https://avatars.githubusercontent.com/u/55518345?v=4'
tags:
  - Pug
  - Cobra
  - Sass
  - Gulp
categories:
  - DEV
color: '#A86454'
emoji: '🐶'
---

# はじめに

こちらの記事の続きで実際に作ってみました。

[Cobra で CLI ツールを作ろう](https://www.shunya.ninja/posts/cobra-cli-tool.html)

<div align='center'>
  <img src="https://user-images.githubusercontent.com/55518345/94111973-b8072880-fe7f-11ea-9f29-f1ff18e006a4.jpeg" style="width: 400px">
</div>

## 作るに当たっての背景

自分の性格として、新しい技術に対する好奇心が強すぎて足下が疎かになるというか、
基本的なマークアップの知識が抜け落ちてしまっているのをひしひしと感じていました。

そこで、HTML,CSS 当たりの復習をしようと思ったが、どうせなら新しいことも組み込みたい！と思い、

- Pug の書き方
- Sass(Scss)の書き方
- Gulp で以上をリアルタイムでトランスパイル
- FLOCSS の考え方
- CLI ツール化していつでも使えるテンプレートを作る

以上を一緒に学ぼうと思ったのがきっかけ。

## Pug 編

基本的な書き方はこのように閉じタグが不要になったり、

```html
<div>Hello HTML</div>
```

```pug
  div Hello Pug
```

変数が使えるようになったり、

```pug
  - var text = "Hello Pug"
  div #{text}
```

プログラミング言語的記述が使えたり、

```pug
  - var arr = ["Hello", "Pug"]
  each val in arr
    p #{val}
```

他ファイルからインポートできたり、

```pug
  include ./config.pug
  p #{text}
```

まあとにかく便利。
特に他ファイルからのインポート機能によってコンポーネント単位でファイルを分けたり
ページ単位で分けたりと、最近のフレームワークチックなことができそう。

## Sass(Scss) + FLOCSS 編

Sass は HTML における Pug のような立ち位置で同じく変数化したり、関数作ったり DRY 原則に則ったコーディングができそう。
CSS はとにかく苦手で今まで敬遠していたが Sass 触ってみて楽しいと感じた。

いつもガーっと Css を気ままに書いた後にとんでもないコードのレスポンシブ対応ができずに挫折しがちだったが、
そもそもレスポンシブ対応を並行しながらやればよいのでは？と気づいたのでやってみた。

それを助けてくれるのが関数化、こんな感じでいつでも mq メソッドを呼び出せるようにしておくと楽だった。

でもやっぱり Css はむずい。

```scss
$breakpoints: (
  'sm': 'screen and (min-width: 400px)',
  'md': 'screen and (min-width: 768px)',
  'lg': 'screen and (min-width: 1000px)',
  'xl': 'screen and (min-width: 1200px)',
) !default;

// over $bp px
@mixin mq($bp: md) {
  @media #{map-get($breakpoints, $bp)} {
    @content;
  }
}
```

ディレクトリ構造も FLOCSS に則ってこうしてみた。
命名規則が component なのか project なのかで一生悩みそう。

```tree
sass
├── component
│   └── _component.scss
├── foundation
│   ├── _foundation.scss
│   └── _reset.scss
├── layout
│   └── _layout.scss
├── project
│   └── _project.scss
├── style.scss
└── utility
    ├── _responsive.scss
    └── _utility.scss

```

## Gulp 編

トランスパイルの際にフォルダ分けしているファイル達も一緒に dist フォルダに作られてしまうのはよろしくないので、\_(アンダーバー)から始まるファイルは dist に送られないようにした。

主に[こちらの記事](https://qiita.com/ararie/items/e4d70fadafe0f5a8f28b)を参考に作りました。

```js
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const browsersync = require('browser-sync');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const del = require('del');

const paths = {
  src: 'src',
  dest: 'dist',
};

//Pug
gulp.task('html', function () {
  return gulp
    .src([paths.src + '/pug/**/*.pug', '!' + paths.src + '/pug/**/_*.pug'])
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>'),
      }),
    )
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.dest));
});

//Sass
gulp.task('css', function () {
  return gulp
    .src([paths.src + '/sass/**/*.scss', '!' + paths.src + '/sass/**/_*.scss'])
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>'),
      }),
    )
    .pipe(
      sass({
        outputStyle: 'expanded',
      }),
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: 'last 2 versions',
      }),
    )
    .pipe(cssmin())
    .pipe(gulp.dest(paths.dest + '/assets/css'));
});

//JavaScript
gulp.task('js', function () {
  return gulp
    .src(paths.src + '/js/**/*')
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest + '/assets/js'));
});

//Image File
gulp.task('image', function () {
  return gulp.src(paths.src + '/images/**/*').pipe(gulp.dest(paths.dest + '/assets/images'));
});

//Browser Sync
gulp.task('browser-sync', function (done) {
  browsersync({
    server: {
      //ローカルサーバー起動
      baseDir: paths.dest,
    },
  });
  done();
});

//Watch
gulp.task('watch', function () {
  const reload = () => {
    browsersync.reload(); //リロード
  };
  gulp.watch(paths.src + '/sass/**/*').on('change', gulp.series('css', reload));
  gulp.watch(paths.src + '/pug/**/*').on('change', gulp.series('html', reload));
  gulp.watch(paths.src + '/js/**/*').on('change', gulp.series('js', reload));
  gulp.watch(paths.src + '/images/**/*').on('change', gulp.series('image', reload));
});

//Clean
gulp.task('clean', function (done) {
  del.sync(paths.dest + '/**', '！' + paths.dest);
  done();
});

//Default
gulp.task(
  'default',
  gulp.series('clean', gulp.parallel('html', 'css', 'js', 'image', 'watch', 'browser-sync')),
);
```

## CLI 化 編

前回同様 cobra さんで作りました。
と言っても難しいことは何にもしておらず、
テンプレートリポジトリを`git clone`して`git remote remove origin`しただけ。

## 終わりに

こちらがテンプレートリポジトリ

- [https://github.com/esh2n/markup-template](https://github.com/esh2n/markup-template)

こちらが作成した CLI ツールのリポジトリ

- [https://github.com/esh2n/marks](https://github.com/esh2n/marks)

以下で使えます。

```sh
// installation
$ go get -u github.com/esh2n/marks

// init project
$ marks init -d <dirname>

// just replace with npm install
$ marks install

// just replace with gulp
$ marks dev
```
