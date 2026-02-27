# Biohacker Mobile - Setup & Testing Guide

## Prerequisites

- **Expo Go app** installed on iOS or Android
- **Node.js 18+** installed locally
- **npm** or **yarn**

## Quick Start

### 1. Install Dependencies

```bash
cd biohacker-mobile
npm install
```

### 2. Start Expo Server

```bash
npm start
```

This will start the Metro bundler. You should see output like:

```
Starting Metro Bundler
Waiting on http://localhost:8081
```

### 3. Open in Expo Go

**iOS:**
- Press `i` in the terminal
- Or scan the QR code with your camera app
- Tap the notification to open in Expo Go

**Android:**
- Press `a` in the terminal
- Or scan the QR code with Expo Go camera
- App will automatically load

## Testing Workflow

### First Time Setup

1. Create an account in the app:
   - Click "CREATE ACCOUNT"
   - Email: `test@example.com` (any email)
   - Password: Any password (6+ chars)
   - First Name: Your name

2. Log in with your new account

### Testing Each Feature

#### Dashboard Tab
- Should show active cycle if you have one
- Shows quick stats (Weight, Protein, Water, Sleep)
- All data is refreshable (pull down to refresh)

#### Cycles Tab
- Click **+ NEW** to create a new cycle
- Select a peptide from dropdown
- Enter dosage (e.g., 200)
- Enter duration (e.g., 8 days)
- Select frequency (Daily, Every 2 Days, Weekly)
- Click **START CYCLE**
- New cycle will appear in the list with progress bar

#### Labs Tab
- Shows all lab test results
- Tap any date card to expand and see detailed biomarkers
- When you upload PDFs later, they'll appear here automatically

#### Settings Tab
- Shows your profile email
- Notification toggles (UI only for now)
- Google Calendar integration (UI only for now)
- App version and build info
- Click **LOG OUT** to sign out

### Common Test Cases

**Test 1: Complete Auth Flow**
- Sign up with new email ✓
- Verify account was created in Supabase
- Log in with same credentials ✓
- Log out ✓
- Log in again ✓

**Test 2: Create and View Cycles**
- Create 3 cycles with different peptides
- Verify they appear in Cycles tab
- Check progress bars update correctly
- Verify oldest cycle appears at bottom
- Create another cycle and verify it goes to top

**Test 3: Data Persistence**
- Create a cycle
- Restart the app (cmd+r)
- Verify cycle still appears
- Log out and log back in
- Verify all cycles still there

**Test 4: Mobile UX**
- All buttons should be at least 48px tall
- All text should be readable on small screen
- Modals should have proper bottom padding
- Pull-to-refresh works on all tabs
- No text input fields (only dropdowns, pickers, buttons)

## Troubleshooting

### "Port 8081 already in use"
```bash
# Kill the process using the port
pkill -f "Metro"
npm start
```

### "Module not found" errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start --clear
```

### Blank screen when opening app
- Wait 30-60 seconds for Metro to finish bundling
- Press 'r' in terminal to reload
- Try closing and reopening app from Expo Go

### Can't log in after signing up
- Check that your email/password are correct
- Make sure you created an account first
- Verify your internet connection

## File Structure

```
biohacker-mobile/
├── App.tsx                      # Main app entry point
├── supabaseClient.ts            # Supabase config
├── context/
│   └── AuthContext.tsx          # Auth state & functions
├── screens/
│   ├── LoginScreen.tsx          # Login page
│   ├── SignUpScreen.tsx         # Sign up page
│   ├── DashboardScreen.tsx      # Home/Dashboard
│   ├── CyclesScreen.tsx         # Cycles management
│   ├── LabsScreen.tsx           # Lab results
│   └── SettingsScreen.tsx       # Settings
├── navigation/
│   └── RootNavigator.tsx        # Navigation structure
├── app.json                     # Expo config
├── package.json                 # Dependencies
└── node_modules/                # Installed packages
```

## Key Features Implemented

✅ **Authentication**
- Sign up with email
- Sign in
- Persistent sessions
- Log out

✅ **Dashboard**
- Active cycle display
- Quick stats cards
- Pull-to-refresh

✅ **Cycles**
- View all cycles
- Create new cycles
- Peptide selection
- Progress bars

✅ **Labs**
- View lab results grouped by date
- Expandable result cards
- Biomarker display

✅ **Settings**
- Profile info
- Notification toggles (UI)
- Calendar integration (UI)
- App info
- Log out

## Design Details

**Colors (Wintermute Cyberpunk):**
- Primary: #00FFFF (Cyan)
- Secondary: #FF00FF (Magenta)
- Accent: #39FF14 (Neon Green)
- Background: #000000 (Black)
- Surface: #0A0E1A (Dark blue-black)

**Touch Targets:** All buttons are 48px minimum

**Mobile UX:** Bottom tab navigation, safe areas respected, full-width inputs

## Next Steps

After testing, we'll add:
1. PDF upload with AI extraction (Labs tab)
2. Smart Reminders with calendar sync
3. Injection site rotation tracker
4. Analytics & trends visualization
5. Export/Backup functionality

## Support

If you encounter any issues:
1. Check the terminal logs for errors
2. Look at Expo's error messages in the app
3. Try clearing cache: `npm start --clear`
4. Verify Supabase connection (check supabaseClient.ts)

Happy testing! 🧊
