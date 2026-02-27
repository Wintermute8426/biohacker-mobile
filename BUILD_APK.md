# Build APK with EAS (Expo Application Services)

## Quick Path: 10 Minutes to APK

EAS Build handles everything automatically (no Android SDK needed).

### Step 1: Login to Expo

```bash
cd /home/wintermute/.openclaw/workspace/biohacker-mobile
eas login
```

You'll be prompted to:
- Create Expo account (if you don't have one) 
- Or login with existing account

(1 min)

### Step 2: Start Build

```bash
eas build --platform android --local
```

This builds the APK on EAS servers. Takes ~10-15 minutes.

### Step 3: Get Download Link

When done, you'll get a download URL for the APK. Copy it.

### Step 4: Install on Phone

1. Download the APK file on your phone
2. Open it
3. Install
4. Done! App is ready to use

---

## Credentials Needed

**Expo Account:**
- Email: Any email (or use Rooz's existing)
- Password: Create one or use existing
- Free tier works (includes 30 free builds/month)

---

## Troubleshooting

### "Not authenticated"
```bash
eas logout
eas login
# Follow prompts to create account or login
```

### "Build failed"
- Check internet connection
- Try again: `eas build --platform android --local`
- Check EAS dashboard for detailed errors

### "APK too large"
- Normal (~50MB) - still fits on most phones

---

## Alternative: Web Version (Faster)

If EAS is slow, I can deploy to Vercel (web version) in 5 minutes → instant access in phone browser.

---

## Status

✅ APK build configured in `eas.json`
✅ `app.json` updated with Android package name
✅ EAS CLI installed
✅ Ready to build

Just run `eas login` then `eas build --platform android --local`
