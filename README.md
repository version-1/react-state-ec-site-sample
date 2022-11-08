## Techpit 状態管理まとめ用サンプルアプリ

  こちらは Techpit での表示用のサンプルアプリです。ECサイトを模したアプリをそれぞれ、

  1. React 標準の Hooks API のみでの実装 (feature/base)
  2. React 標準 Hooks API + Context API での実装 (feature/context)
  3. Redux (Redux Toolkit) での実装 (feature/redux)
  4. Tnsack Query での実装 (feature/tansack)

  のようにブランチを分けて実装しています。

## 起動方法 (feature/base ブランチを利用)

  こちらのリポジトリは全てローカルで実行をすることを想定指定作成しています。

#### 1. リポジトリからクローン& yarn install

リポジトリをクローンして、 `yarn install` を利用して必要なパッケージをインストールします。

```bash
% git clone [repository url]
% cd react-state-ec-site-sample
% git checkout -b feature/base origin/feature/base
% cd server && yarn install
```


#### 2. クライアントアプリケーションを起動

リポジトリのルートディレクトリで下記コマンドを実行します。

```bash
% yarn install
% yarn start
```

#### 3. サーバアプリケーションを起動

2. とは別のウィンドウを立ち上げて、コマンドを実行します。
リポジトリのルートディレクトリからserverディレクトリに移動して下記コマンドを実行します。

```bash
% cd servers
% yarn install
% yarn start
```

#### 4. ブラウザでページにアクセス

2., 3. のアプリケーションが起動したことを確認して、ブラウザで
`http://localhost:3000` にアクセスします。

## ブランチの切り替え

冒頭にそれぞれのバージョンでの実装をブランチに分けているので、それぞれのバージョンを動かしてみたい場合は、
ブランチを切り替えて起動させます。

ブランチを切り替えた後には再度 `yarn install` でパッケージをインストールし直すようにしてください。
下記は、その例です。サーバ側の再起動は不要です。

1 ) feature/context ブランチでアプリを動かす場合

```bash
% git checkout -b feature/context origin/feature/context
% yarn install
% yarn start
```

