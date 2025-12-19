
---

## 📝 FILE 2 — `database/init.js`


```js
use blogdb;

db.users.insertOne({
  username: "admin",
  password: "password123"
});
