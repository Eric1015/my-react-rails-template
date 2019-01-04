# My React Rails Template (React Rails テンプレート)

このリポジトリにあるのはReactをフロントエンドに、Ruby on Railsをバックエンドに使用し、ユーザーのログイン機能を搭載したアプリです。

## Dependencies
* Ruby '2.4.4'
* Rails '5.0' または'5.0'以上
* Rspec '3.8'
* Knock (JWT)
* React Router
* React Cookie
* Semantic UI React
* Axios

## 機能
* ActiveAdmin                               [リンク](https://github.com/activeadmin/activeadmin)
* API Versionist                            [リンク](https://github.com/bploetz/versionist)
* メールによる本人確認
* パスワードのリセット
* JWTによるAPIの安全性保障
* Active Storageによる画像アップロード (amazon S3をデフォルトでは使っている)

## Set Up
Active StorageのためのAWSの環境変数設定
```
S3_BUCKET_NAME=your_bucket_name
```
```
AWS_ACCESS_KEY_ID=your_access_key_id
```
```
AWS_SECRET_ACCESS_KEY=your_secret_access_key
```
```
AWS_REGION=your_aws_region
```
SendGridアドオンを使っているため、ホスト名が必要になってくる
```
HOST_NAME=your_host_name
```
HerokuにnodeJSとRailsをビルドパックとして使うように指示する
```
heroku buildpacks:add heroku/nodejs --index 1
heroku buildpacks:add heroku/ruby --index 2
```
* ローカルでの環境変数のセットアップ
<code>environment_variables.yml</code>というファイルを<code>config/</code>ディレクトリに作り、以下の内容を入れる
```yml
development:
  HOST_NAME: https://example.heroku.com/
test:
  HOST_NAME: https://example.heroku.com/
production:
  HOST_NAME: https://example.heroku.com/
```
このファイルは<code>gitignore</code>内にあるので、ここで入力した情報は他人には公開されません。

## 大事なコマンド
* Railsバックエンドサーバーをスタートする
```
rails s -p 3001 (フロントエンドをポート3000で使うため)
```
* Reactフロントエンドサーバーをスタートする
```
cd frontend (もしも、ルートディレクトリ.../react-rails-templateにいるのなら)
npm start
```
* ActiveAdminモデルアクセッサ―の生成 (ここでActiveAdminでどの属性を変更できるかを指定できる）
```
rails generate active_admin:resource <Model_Name>
```
* APIの新しいバージョンを生成する
```
rails generate versionist:new_api_version <version> <module namespace> [options]
```
* 特定のバージョンのもとにコントローラーを生成する
```
rails generate versionist:new_controller <Controller_Name> <version>
```
* JSONオブジェクトの中にどの属性が含まれるかを決めるSerializerを生成する
```
rails generate serializer <Model_Name>
```
