# Vercel デプロイメントガイド

このプロジェクトを Vercel にデプロイし、正常に動作させるための手順です。

## 1. データベースの準備 (最重要)
このアプリはデータベース (SQLite) を使用していますが、Vercel 上では SQLite ファイルへの書き込みが維持されません（お問い合わせなどが消えてしまいます）。
そのため、**Vercel Postgres (PostgreSQL)** への切り替えを推奨します。

### 手順
1. Vercel のダッシュボードで「Storage」タブから新しいデータベース (Postgres) を作成します。
2. 作成後、`.env.local` タブにある以下の環境変数をコピーします。
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   など

### コードの修正
`prisma/schema.prisma` を以下のように変更する必要があります。
※ デプロイ直前に変更してください。

```prisma
datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
  directUrl = env("POSTGRES_URL_NON_POOLING")
}
```

## 2. GitHub へのプッシュ
ソースコードを GitHub にアップロードします。

```bash
# リポジトリを作成後、以下のコマンドを実行
git remote add origin https://github.com/あなたのユーザー名/リポジトリ名.git
git branch -M main
git push -u origin main
```

## 3. Vercel プロジェクト作成
1. Vercel で「Add New Project」を選択し、GitHub リポジトリをインポートします。
2. **Framework Preset** は `Next.js` が自動選択されます。
3. **Build Command** はそのままでOKです。
4. **Environment Variables (環境変数)** を設定します。

### 必要な環境変数
以下の変数を Vercel の設定画面で追加してください。

| 変数名 | 説明 | 例 |
|--------|------|----|
| `NEXTAUTH_SECRET` | 認証用の秘密鍵 | ランダムな文字列 (openssl rand -base64 32などで生成) |
| `NEXTAUTH_URL` | 本番環境のURL | https://your-project.vercel.app |
| `SMTP_HOST` | メール送信サーバー | smtp.gmail.com |
| `SMTP_PORT` | メール送信ポート | 587 |
| `SMTP_USER` | メール送信ユーザー | your-email@gmail.com |
| `SMTP_PASS` | メール送信パスワード | アプリパスワード等 |
| `SMTP_FROM` | 送信元アドレス | no-reply@spurs-inc.com |

## 4. デプロイ後のデータベース反映
デプロイ後、Vercel の管理画面またはローカルからデータベースの構造を反映させる必要があります。
Vercel の Build Command が自動的に `prisma generate` を実行しますが、テーブル作成のためにマイグレーションが必要です。

```bash
# ローカルから本番DBにマイグレーションを適用する場合
# .env に本番用の POSTGRES_PRISMA_URL を設定してから実行
npx prisma migrate deploy
```
