# Pinyin Kitchen Deployment

This website needs the included Python server because multiplayer sync and teacher monitoring use `/api/state`.

## Upload To Render

1. Create a new Render Web Service.
2. Upload or connect this `outputs` folder.
3. Use these settings:
   - Runtime: Python
   - Build command: leave blank
   - Start command: `python server.py $PORT 0.0.0.0`
4. Open the public URL Render gives you.

## Local Test

Run:

```powershell
python server.py 8088 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8088/index.html
```
