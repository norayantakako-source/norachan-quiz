# のらちゃんクイズ

## ファイル構成

- index.html：画面の骨組み
- style.css：文字サイズ、色、余白などの見た目
- questions-beginner.js：はじめて編の問題データ
- questions-hall.js：ホール編の問題データ
- quiz.js：クイズの動き、点数、バッジ表示

## GitHubに置くもの

この5ファイルと、画像3枚を同じ場所にアップロードしてください。

- index.html
- style.css
- questions-beginner.js
- questions-hall.js
- quiz.js
- Aのらノーマル.png
- Bのら万歳.png
- Eのら焦り.png

## よく触る場所

### はじめて編の問題を増やす
questions-beginner.js を編集します。

### ホール編の問題を増やす
questions-hall.js を編集します。

### 文字サイズを変える
style.css を編集します。

### 出題数を変える
quiz.js の startBeginner / startHall を編集します。

```js
// はじめて編は10問
.slice(0, 10)

// ホール編は20問
.slice(0, 20)
```
