# 中文手寫房間公佈欄部署說明

這個資料夾需要一起部署：

- `index.html`
- `styles.css`
- `app.js`
- `server.py`
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

## Google 登入設定

Google 登入不能只靠按鈕，必須先到 Google Cloud 建立 OAuth Client ID。

本機測試：

1. 打開 `google-client-id.txt`
2. 把 Google 提供的 Web Client ID 貼進去
3. Google Cloud 的 Authorized JavaScript origins 加入 `http://127.0.0.1:8030`
4. 使用 `http://127.0.0.1:8030/` 開啟網站

雲端發布：

1. 在部署平台新增環境變數 `GOOGLE_CLIENT_ID`
2. 值填入 Google 提供的 Web Client ID
3. Google Cloud 的 Authorized JavaScript origins 加入你的公開網址，例如 `https://your-classroom.onrender.com`

## Render Web Service

1. 把這個資料夾上傳到 GitHub repository
2. 到 Render 建立 `New > Web Service`
3. 連接 GitHub repository
4. 設定：
   - Language: Python
   - Build Command: 留空
   - Start Command: `python server.py`
5. 發布後，把 Render 網址加到 Google Cloud 的 Authorized JavaScript origins
