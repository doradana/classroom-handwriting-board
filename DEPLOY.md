# 中文手寫房間公佈欄部署說明

這個資料夾需要一起部署：

- `index.html`
- `styles.css`
- `app.js`
- `server.py`
- `firebase_store.py`
- `requirements.txt`
- `google-client-id.txt`

不要部署這些暫存資料：

- `data/`
- `__pycache__/`
- `server.out.log`
- `server.err.log`

## 本機使用

請用 `啟動網站.bat` 開啟，或執行：

```bash
python server.py
```

然後用瀏覽器打開：

```text
http://127.0.0.1:8030/
```

不要用 `file:///.../index.html` 測試多人同步或 Google 登入，因為它不是真正的網站伺服器網址。

## Firebase Google 登入設定

專案已連接 Firebase 專案 `handwritten-bulletin`，老師可以使用 Firebase Authentication 的 Google 登入。

本機測試：

1. 到 Firebase Console > Authentication > Settings > Authorized domains
2. 加入 `127.0.0.1`
3. 使用 `http://127.0.0.1:8030/` 開啟網站

雲端發布：

1. 將公開網域加入 Firebase Authentication 的 Authorized domains
2. 可在部署平台新增環境變數 `FIREBASE_API_KEY`；未設定時會使用 Web App 的公開 API key
3. 後端會先向 Firebase Identity Toolkit 驗證 ID token，再發出既有的老師工作階段

## Firebase 永久儲存設定

課程、老師帳號、刪除紀錄與分段後的手寫 PNG 圖片會存入 Cloud Firestore。
Render 只執行網站，不再依賴免費主機會被清除的本機檔案。預設不使用
Firebase Storage，因此不需要為了圖片儲存升級 Blaze 方案。

1. 在 Firebase Console 建立 Cloud Firestore 資料庫。
2. 到「專案設定 > 服務帳戶」建立新的私密金鑰。
3. 在 Render 的 Environment 頁面加入以下變數：
   - `CLASSROOM_STORAGE_BACKEND=firebase`
   - `FIREBASE_PROJECT_ID=handwritten-bulletin`
   - `FIREBASE_IMAGE_BACKEND=firestore`
   - `FIREBASE_SERVICE_ACCOUNT_JSON`：貼入完整的服務帳戶 JSON，設定為 Secret。
   - `CLASSROOM_SESSION_SECRET`：至少 32 個隨機字元。
4. 重新部署後，以老師帳號登入並開啟 `/api/storage/status`；`backend` 應為
   `firebase`，`persistent` 應為 `true`。

不要把服務帳戶 JSON 放進 GitHub、JavaScript 或對話訊息。前端 Firebase Web App
設定中的 API key 可以公開，但服務帳戶的 `private_key` 不可以公開。

若未來已升級 Firebase Blaze，才可以改成 `FIREBASE_IMAGE_BACKEND=storage` 並設定
`FIREBASE_STORAGE_BUCKET`。目前不需要這兩個付費 Storage 設定。

若要把舊 JSON 課程搬入 Firebase，先讓部署內容包含舊的 `data/` 資料，再暫時設定
`CLASSROOM_MIGRATE_LEGACY_DATA=1` 並部署一次。確認匯入完成後立刻移除這個變數。

## Render Web Service

1. 把這個資料夾上傳到 GitHub repository
2. 到 Render 建立 `New > Web Service`
3. 連接 GitHub repository
4. 設定：
   - Language: Python
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python server.py`
5. 發布後，把 Render 網址加到 Google Cloud 的 Authorized JavaScript origins
