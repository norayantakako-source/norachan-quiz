# のらちゃんクイズ

## ファイル構成

- index.html：画面の骨組み
- style.css：文字サイズ、色、余白などの見た目
- questions.js：はじめて編の問題データ
- quiz.js：クイズの動き、点数、バッジ表示

## GitHubに置くもの

この4ファイルと、画像3枚を同じ場所にアップロードしてください。

- index.html
- style.css
- questions.js
- quiz.js
- Aのらノーマル.png
- Bのら万歳.png
- Eのら焦り.png

## よく触る場所

### 問題を増やす
questions.js を編集します。

### 文字サイズを変える
style.css を編集します。

### 出題数を変える
quiz.js のこの部分を変更します。

```js
selectedQuizzes =
  [...quizzes].sort(() => Math.random() - 0.5).slice(0, 10);
```

10問なら `slice(0, 10)`、20問なら `slice(0, 20)` です。
