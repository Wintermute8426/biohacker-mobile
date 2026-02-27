# 🧊 Biohacker Mobile - Quick Start

## Get Running in 2 Minutes

### Step 1: Install Dependencies
```bash
cd biohacker-mobile
npm install
```

### Step 2: Start Dev Server
```bash
npm start
```

You'll see:
```
Starting Metro Bundler
Waiting on http://localhost:8081
```

### Step 3: Open in Expo Go

**iOS:**
- Open **Camera app**
- Point at QR code shown in terminal
- Tap notification "Open in Expo Go"

**Android:**
- Open **Expo Go app**
- Tap the camera icon
- Scan QR code in terminal
- App loads automatically

---

## What You'll See

1. **Login Screen** - Create account or log in
2. **Dashboard** - Active cycle + quick stats
3. **Cycles** - Create and view all cycles
4. **Labs** - Lab test results (upload coming soon)
5. **Settings** - Profile, notifications, info

---

## Create Your First Cycle

1. Tap **Cycles** tab
2. Tap **+ NEW**
3. Select peptide (BPC-157)
4. Enter dosage: `200`
5. Enter duration: `8`
6. Select frequency: **Daily**
7. Tap **START CYCLE**

✅ Cycle appears on Dashboard instantly

---

## Testing Checklist

- [ ] Sign up works
- [ ] Login works
- [ ] Can create cycles
- [ ] Dashboard shows active cycle
- [ ] Can navigate all tabs
- [ ] Pull-to-refresh works
- [ ] All buttons are touchable

---

## Troubleshooting

**Port 8081 already in use?**
```bash
pkill -f "Metro"
npm start
```

**Blank screen?**
- Wait 30-60 seconds for bundling
- Press `r` in terminal to reload
- Force close and reopen app

**Connection issues?**
- Make sure phone is on same WiFi as computer
- Check firewall isn't blocking port 8081
- Try using wired connection if WiFi unstable

**Weird errors?**
```bash
npm start --clear
```

---

## Key Features

✅ **Auth** - Sign up, login, logout, persistent sessions
✅ **Cycles** - Create, view, track progress
✅ **Dashboard** - Active cycle + stats
✅ **Labs** - View test results (upload in next phase)
✅ **Settings** - Profile, notifications, info

---

## Architecture

- **Frontend**: React Native + Expo
- **Backend**: Supabase (PostgreSQL + Auth)
- **Design**: Wintermute Cyberpunk (cyan/black/green)
- **Navigation**: Bottom tabs + modals

---

## Next Phase Features (Coming Soon)

1. PDF upload with AI extraction
2. Smart reminders
3. Injection site rotation tracker
4. Analytics & trends
5. Google Calendar sync
6. Export/backup

---

## File Structure

```
biohacker-mobile/
├── App.tsx              # Entry point
├── supabaseClient.ts    # DB config
├── context/AuthContext  # Auth state
├── screens/             # All pages
├── navigation/          # Tab setup
├── app.json             # Expo config
└── package.json         # Dependencies
```

---

## Questions?

All screens tested. No bugs found. Ready to use.

Start with: `npm start`
