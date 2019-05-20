# 記帳 APP

記錄你的生活開銷，理財首先從記帳開始！

## 安裝指示

---

# Installing

1. 下載專案

```
$ git clone https://github.com/purrup/Expense-Tracker-Sequelize.git
```

進入專案資料夾

```
$ cd todo-sequelize
```

2. install npm

```
$ npm install
```

3. activate app.js

```
$ npm run start
```

4. type this URL in your browser

   http://localhost:3000

5. 在專案中新增.env 檔並建立隱藏變數

- 隱藏的 facebook 第三方登入變數如下
- FACEBOOK_ID=304555647135657
- FACEBOOK_SECRET=bd9dc40bb5c509a31525ec1891c35ccb
- FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback

---

# Features

- 使用者可以透過 Facebook 登入
- 使用者登入、註冊時會依據情況出現適當提示訊息
- 使用者可以一次新增一筆記帳
- 使用者可以在首頁看到全部支出的統計金額
- 使用者可以修改一筆記帳
- 使用者可以刪除一筆記帳
- 使用者只能使用自己的記帳紀錄，無法觀看以及操作其他使用者的記帳紀錄
- 使用者可以依據月份及種類篩選記帳紀錄，並看到篩選後的總金額
- 在使用者新增、修改記帳時，送出時會驗證必要欄位，無填寫必要欄位會無法送出並送出使用者提示

# Tools

- [Express](https://www.npmjs.com/package/express) - 後端框架
- [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - 模板引擎
- [MySQL](https://dev.mysql.com/downloads/mysql) - DB
- [Sequelize](http://docs.sequelizejs.com/) - ORM of MySQL
- [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/) - IDE
- [Facebook Developers](https://developers.facebook.com/) - Facebook 第三方登入
