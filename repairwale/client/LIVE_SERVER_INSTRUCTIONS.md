# How to Open RepairWale with Live Server

## ✅ CORRECT METHOD

1. **Build the app first** (only needed once, or after changes):
   ```bash
   cd client
   npm run build
   ```

2. **Open the built version:**
   - Navigate to: `client/dist/index.html`
   - Right-click on `dist/index.html`
   - Select "Open with Live Server"
   - OR click "Go Live" button in VS Code status bar when `dist/index.html` is open

3. **Your browser will open at:**
   - `http://127.0.0.1:5500/dist/index.html`
   - The app will work in DARK MODE
   - All features will work WITHOUT needing backend server (uses localStorage only)

---

## ❌ WRONG METHOD - Don't do this:

- DON'T open `client/index.html` (this is just a template)
- DON'T use `npm run dev` if you want Live Server
- DON'T try to access port 5173

---

## 🔄 When to Rebuild:

Run `npm run build` again when you:
- Make changes to any `.jsx` files
- Modify styles in `.css` files
- Update any component code

---

## 📁 Project Structure:

```
client/
  ├── index.html          ❌ Don't open this (template)
  ├── src/                    (Source code - edit here)
  └── dist/               ✅ Open this folder
      └── index.html      ✅ Use Live Server on this file
```

---

## Quick Start:

```bash
# Terminal 1: Build once
cd c:\Users\Lenovo\Desktop\CAPSTONE\repairwale\client
npm run build

# Then: Open dist/index.html with Live Server
```

---

## Notes:

- ✅ Dark mode is now default
- ✅ No backend server needed (localStorage only)
- ✅ Works offline
- ✅ All user data saved in browser
