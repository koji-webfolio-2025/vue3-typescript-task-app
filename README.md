# タスク管理SPA（Vue3 + Laravel API構成）

## 📌 概要

このアプリは、Vue3（TypeScript）で構築されたフロントエンドと、Laravel API（Sanctum認証）によるバックエンドで構成されたシングルページアプリケーション（SPA）です。

- 認証機能（ログイン／ログアウト）
- タスクの一覧表示、作成、削除
- セッション維持／CORS対応済
- Vercel（Vue） × Render（Laravel）で無料デプロイ

---

## 🚀 アクセスURL（デモ）

- フロントエンド（Vue）  
  https://vue3-typescript-task-i0kqx9wd1-koji-dev-s-projects.vercel.app 

- バックエンドAPI（Laravel）  
  https://api.codeshift-lab.com

---

## 🛠 技術スタック

| 種類 | 技術 |
|------|------|
| フロントエンド | Vue3, TypeScript, Vite, Axios, Pinia |
| バックエンド | Laravel 12, Sanctum, MySQL |
| デプロイ | Vercel（フロント）, Render（API） |
| DB | PlanetScale（MySQL互換） |

---

## 🔐 認証とセキュリティ

- Laravel Sanctum によるセッションベース認証
- CORS / SameSite=None + Secure Cookie 対応済み
- クロスドメイン構成でもセッション維持OK（実績あり）

---

## 📁 ディレクトリ構成（概要）

```bash
laravel-api-full/
├── public/
│   └── app/        # Vueビルド済み成果物配置
├── routes/api.php
├── app/Http/Controllers/
└── ...
```

##📄 使用方法（ローカル開発）
Laravel APIの起動：

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

Vue フロントの起動：

```bash
cd vue-app
npm install
npm run dev
```
