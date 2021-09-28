---
title: 'Vue3 + TypeScriptのまとめ'
date: '2020-10-16'
excerpt: 'Vue CLI (ver4.5.3)から利用可能な Vue 3.0 beta でいろいろな変更点があったようなので個人用にまとめ。Options API から Composition API へ'
coverImage: 'https://miro.medium.com/max/700/1*7sDKJjnuO9QyjnM7BvfDEA.png'
author:
  name: 'esh2n'
  picture: 'https://avatars.githubusercontent.com/u/55518345?v=4'
tags:
  - Vue.js
  - TypeScript
categories:
  - DEV
color: '#4FC08D'
emoji: '🚀'
---

# はじめに

Vue CLI (ver4.5.3)から利用可能な Vue 3.0 beta でいろいろな変更点があったようなので個人用にまとめ。

まとめにあたって参考にした記事

- [先取り Vue 3.x !! Composition API を試してみる](https://qiita.com/ryo2132/items/f055679e9974dbc3f977)
- [正式リリース前に総予習!! Vue3 の変更点まとめ](https://qiita.com/ryo2132/items/3d0379e85c38a9a5b355)
- [[CSS] z-index とスタックコンテキスト](https://qiita.com/hoto17296/items/42e62989193504d512c7)
- [Vue3 Study Teleport でキレイに解消するモーダルの z-index 問題](https://uit-inside.linecorp.com/episode/51)

## Options API から Composition API へ

<div align='center'>
  <img src="https://user-images.githubusercontent.com/55518345/95752792-8b566c00-0cdb-11eb-8c1e-81ddc980fad6.png" style="width: 400px">
</div>

`Composition API`は従来の`Options API`から移行することで、<br />ロジックの柔軟な構成を可能にする関数ベースの API だそうな。(以下公式原文)

> Introducing the Composition API: a set of additive, function-based APIs that allow flexible composition of component logic

Vue2 での`methods`, `data`等々は`defineComponent`内オブジェクトの`setup()`関数で宣言。

```ts
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup() {
    // Describe here your data, func, etc.
  },
});
```

`defineComponent`でコンポーネントを作ることによって型推論が効くそう。
`Vue3` から `TypeScript` に互換性が出てきたらしい。

従来の`data`に対応するリアクティブな値は、`setup()`内で以下の 2 パターンで宣言。

1. `ref()`
2. `reactive()`

この 2 パターンの違いは[こちら](https://vue-composition-api-rfc.netlify.app/#ref-vs-reactive)を参照。

```ts
import { defineComponent, reactive, ref } from '@vue/composition-api';

export default defineComponent({
  setup() {
    const state = reactive({
      hoge: 'hogehoge',
    });
    const fuga = ref('fugafuga');

    return {
      state,
      fuga,
    };
  },
});
```

```html
<div>
  <h2>{{ state.hoge }}</h2>
  <h2>{{ fuga }}</h2>
</div>
```

`props`は`defineComponent`内の`props`プロパティとして宣言。
以下は型推論のために type を定義してアノテーションをつけた例。

```ts
type Props = {
  message: string;
};

export default defineComponent({
  props: {
    message: {
      type: String,
      default: 'Default',
    },
  },
  setup(props: Props) {
    props.message;
  },
});
```

`emit`は`setup()`の第二引数に渡す`context`のメソッドとして使用。
以下に`props`と`emit`を使ったサンプルを記述。

- ChildComponent

```ts
import { defineComponent, SetupContext } from '@vue/composition-api';

type Props = {
  count: number;
};

export default defineComponent({
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  setup(props: Props, context: SetupContext) {

  const increment = () => {
    context.emit('change-count', props.count++);
    }

    return {
      increment
    };
  };,
});
```

```html
<div>
  <button @click="increment">+</button>
</div>
```

- ParentComponent

```ts
import ChildComponent from '@/components/ChildComponent'; // @ is an alias to /src
import { defineComponent, computed, reactive } from '@vue/composition-api';

export default defineComponent({
  components: {
    ChildComponent,
  },
  setup() {
    const state = reactive({
      count: 0,
    });

    const changeCount = (count: number) => {
      state.count = count;
    };

    const multipleCount = computed(() => state.count * 1000);

    return {
      state,
      changeCount,
      multipleCount,
    };
  },
});
```

```html
<div>
  <h1>{{ state.count }}</h1>
  <h1>1000倍したら{{ multipleCount }}</h1>
  <ChildComponent :count="state.count" @change-count="changeCount"></ChildComponent>
</div>
```

ライフサイクル系は`setup()`内で設定可能。

```ts
import { onMounted, onUpdated, onUnmounted } from 'vue';

setup() {
  onMounted(() => {
    console.log('mounted!');
  });
  onUpdated(() => {
    console.log('updated!');
  });
  onUnmounted(() => {
    console.log('unmounted!');
  });
}
```

## Teleport ( Portal Vue ) の追加

<div align='center'>
  <img src="https://camo.githubusercontent.com/9111a7ea610057ccbb33cea37eb4fe23e5fcdbc1/68747470733a2f2f706f7274616c2d7675652e6c696e7573622e6f72672f6c6f676f2e706e67" style="width: 400px">
</div>

> A Portal Component for Vuejs, to render DOM outside of a component, anywhere in the document.

定義したコンポーネント外のどこからでも別の DOM ツリー上に自身のコンポーネントを描画でき、あたかもテレポートしたように振舞う機能。

React の`CreatePortal`の`Vue.js`版。

主な使い方は以下。

```vue
<template>
  <div>
    <teleport to="#teleport-target">
      <div v-if="isVisible">content</div>
    </teleport>
  </div>
  <template></template>
</template>
```

通常`Vue.js`は`#app`にマウントされ、その DOM ツリーを出ることはないのですが、
`teleport`を介してツリー構造を無視したレンダリングが可能になる。

```html
<body>
  <div id="app"></div>
  <div id="teleport-target"></div>
</body>
```

主にモーダル等に使う機会がありそうで、`z-index`と`スタックコンテスト`で煩雑になりがちなコードをよしなにしてくれそう。

## Class 型 Component

Vue2.X.X からは TypeScript を使用する際に書き方が複数あるようで、別モジュールを使用してクラスとして管理する方法もあるそう。
Function Component 以前の React みたい。

`vue-class-component` , `vue-property-decolator` を利用してクラス単位でコンポーネント管理ができる。

Vue3 の`Composition API`とどう使い分けるべきか。

- Vue2

```ts
import Vue from 'vue';

export default Vue.extend({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
    },
  },
  methods: {
    sayHello(): string {
      return 'Hello!';
    },
  },
});
```

- Class 型 Component

```ts
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop()
  private msg!: string;

  sayHello(): string {
    return 'Hello!';
  }
}
```

型推論を行うなら`Vue.extend`の書き方でも問題無さそうだし、`Composition API`でも大丈夫そう。
