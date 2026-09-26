# 中文手寫房間公佈欄部署說明

這是含 Python API 的完整網站，不能只用純靜態 GitHub Pages。GitHub repository 用於版本管理，正式網站請由 Render Web Service 執行 `server.py`。

## 本機測試

```powershell
python server.py 8030
```

接著開啟 `http://127.0.0.1:8030/`。

## Firebase Google 登入

專案已連接 Firebase 專案 `handwritten-bulletin`。

1. 到 Firebase Console > Authentication > Settings > Authorized domains。
2. 本機測試時加入 `127.0.0.1`。
3. 正式發布時加入 Render 提供的公開網域。
4. 可在 Render 新增 `FIREBASE_API_KEY` 環境變數；未設定時會使用 Web App 的公開 API key。

前端完成 Google 登入後，後端會向 Firebase Identity Toolkit 驗證 ID token，再發出網站既有的老師工作階段。原本的帳號密碼登入仍保留。

## Render Web Service

1. 連接 GitHub repository `doradana/classroom-handwriting-board`。
2. Runtime 選擇 Python。
3. Build Command 使用 `python --version` 或留空。
4. Start Command 使用 `python server.py`。
5. 若要保留老師、房間與作品，掛載 Persistent Disk 到 `/var/data`，並設定 `CLASSROOM_DATA_DIR=/var/data`。

## 不要公開的檔案

伺服器已阻擋下列內容的網頁存取：

- `data/`
- `server.py`
- `server-runtime.log`
- `server.err.log`
- `server.out.log`
