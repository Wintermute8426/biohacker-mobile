# Windows Setup - Build APK for Testing

## Quick Setup (5 minutes)

### Prerequisites
- Windows 10/11
- Node.js 18+ installed (download from nodejs.org)
- Expo account with credentials ready

### Step 1: Download Project

**Option A: From Linux Server (via SCP)**
```powershell
# On Windows, run in PowerShell:
scp -r wintermute@[server-ip]:/home/wintermute/.openclaw/workspace/biohacker-mobile C:\Users\ebbad\Downloads\
```

**Option B: Manual Copy**
Files to copy from Linux to Windows:
- All files in `/home/wintermute/.openclaw/workspace/biohacker-mobile/`
- EXCEPT: `node_modules/`, `.next/`, `.git/`

### Step 2: Install Dependencies

```powershell
cd C:\Users\ebbad\Downloads\biohacker-mobile
npm install
```

(Wait ~2 minutes)

### Step 3: Build APK

```powershell
npm install -g eas-cli
eas build --platform android
```

When prompted:
- **Email or username:** `ebbadi@gmail.com`
- **Password:** `@Erooz321`
- **Android build type:** Select `APK` (preview)

Wait 10-15 minutes for build to complete.

### Step 4: Download & Install

1. When build completes, you'll get a **download link**
2. Download the APK file
3. Copy to your Android phone
4. Open file → Install
5. Done!

---

## Troubleshooting

### "npm: command not found"
- Install Node.js from https://nodejs.org (LTS version)
- Restart PowerShell after install

### "Project directory not found"
- Verify path: `C:\Users\ebbad\Downloads\biohacker-mobile`
- Check that `package.json` exists in that folder

### Build failed
- Check internet connection
- Run: `eas build --platform android` again
- Check EAS dashboard for details

### APK won't install
- Might need to enable "Unknown sources" in phone Settings
- Go to Settings → Security → Install unknown apps → Allow

---

## File Structure

```
biohacker-mobile/
├── App.tsx
├── package.json
├── eas.json
├── app.json
├── screens/          (6 files)
├── context/          (1 file)
├── navigation/       (1 file)
├── supabaseClient.ts
└── [docs]
```

All source code is in root (no `src/` folder).

---

## What Gets Built

- **APK file** - ~50MB Android app
- **Installable** on any Android phone (Android 10+)
- **Full functionality** - auth, cycles, labs, settings
- **Real data** - connects to Supabase backend

---

## After Installation

1. Open app on phone
2. Sign up: `test@biohacker.com` / `TestPass123`
3. Create cycle: BPC-157, 200mcg, 8 days
4. See it on Dashboard ✅

---

## Questions?

Check these files:
- `START_HERE.md` - Overview
- `TEST_PLAN.md` - What to test
- `BUILD_SUMMARY.md` - Technical details
