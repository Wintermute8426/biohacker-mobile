# Biohacker Mobile App - Test Plan

## Pre-Testing Checklist

- [ ] Expo Go installed on phone
- [ ] Phone connected to same WiFi as dev machine
- [ ] Node.js 18+ installed
- [ ] `npm install` completed
- [ ] `npm start` working without errors

---

## 1. AUTHENTICATION FLOW (15 min)

### 1.1 Sign Up
- [ ] Open app - should show Login screen
- [ ] Tap "CREATE ACCOUNT"
- [ ] Enter: Email: `test@biohacker.com`, Password: `TestPass123`, First Name: `TestUser`
- [ ] Tap "CREATE ACCOUNT" button
- [ ] Should see success message or be redirected to Login
- [ ] Verify account was created (check Supabase dashboard)

### 1.2 Login
- [ ] Return to Login screen
- [ ] Enter email and password from 1.1
- [ ] Tap "LOGIN"
- [ ] Should navigate to Dashboard tab

### 1.3 Session Persistence
- [ ] Restart app (kill Expo Go and reopen)
- [ ] Should still be logged in to Dashboard
- [ ] Verify no login screen appears

### 1.4 Logout
- [ ] Go to Settings tab
- [ ] Tap "LOG OUT"
- [ ] Should return to Login screen
- [ ] Verify session cleared

---

## 2. DASHBOARD TAB (10 min)

### 2.1 Empty State
- [ ] Fresh login should show "No active cycle"
- [ ] Stats cards visible (Weight, Protein, Water, Sleep)
- [ ] Pull-to-refresh works

### 2.2 With Active Cycle
- [ ] Create a cycle in Cycles tab (see Section 3.1)
- [ ] Return to Dashboard
- [ ] Should show active cycle card
- [ ] Card displays: Peptide name, dosage, progress bar
- [ ] Progress percentage updates correctly

### 2.3 Interaction
- [ ] Tap "DOSE NOW" button (should not crash, even if no action yet)
- [ ] Pull down to refresh - should work smoothly

---

## 3. CYCLES TAB (20 min)

### 3.1 Create Cycle - Full Form
- [ ] Tap "+ NEW" button
- [ ] Modal appears with form
- [ ] **Peptide dropdown:**
  - [ ] Tap dropdown - should show: BPC-157, TB-500, Epitalon, MK-677, Semax
  - [ ] Select "TB-500"
- [ ] **Dosage field:**
  - [ ] Enter "250"
- [ ] **Duration field:**
  - [ ] Enter "10"
- [ ] **Frequency buttons:**
  - [ ] Select "Every 2 Days"
- [ ] Tap "START CYCLE"
- [ ] Modal closes
- [ ] New cycle appears at top of list

### 3.2 Create Multiple Cycles
- [ ] Create 3 more cycles with different peptides
  - Cycle 2: BPC-157, 200mcg, 8 days, Daily
  - Cycle 3: Epitalon, 300mcg, 14 days, Weekly
  - Cycle 4: MK-677, 25mg, 30 days, Daily
- [ ] All 4 cycles should appear in list
- [ ] Most recent first

### 3.3 Cycle Cards
- [ ] Each card shows: Peptide name, dosage, status
- [ ] Progress bars visible and accurate
- [ ] Progress bar fills based on time elapsed

### 3.4 Pull-to-Refresh
- [ ] Pull down on cycles list
- [ ] Spinner appears
- [ ] List refreshes
- [ ] All cycles still visible

---

## 4. LABS TAB (10 min)

### 4.1 Empty State
- [ ] Initially should show "No lab results"
- [ ] Message: "Upload or log your lab results here"

### 4.2 Data from Existing Cycles
- [ ] Check Supabase database for any existing lab results
- [ ] If results exist, they should appear grouped by date

### 4.3 Expandable Cards
- [ ] If lab results appear:
  - [ ] Tap on date card - should expand
  - [ ] See biomarker list with values and units
  - [ ] Tap again - should collapse
  - [ ] Animation smooth

---

## 5. SETTINGS TAB (10 min)

### 5.1 Profile Section
- [ ] Email shown matches logged-in account
- [ ] Cannot edit email (UI is read-only)

### 5.2 Notifications Section
- [ ] Two toggles visible: "Dose Reminders" and "Cycle Reminders"
- [ ] Both show "ON" state (UI only for now)

### 5.3 Integrations Section
- [ ] Google Calendar card visible
- [ ] Status: "Not Connected"
- [ ] "CONNECT" button visible (disabled for now)

### 5.4 About Section
- [ ] Shows: "BIOHACKER v1.0.0"
- [ ] Shows: "Build: 2026.02.27"

### 5.5 Logout Button
- [ ] Red "LOG OUT" button at bottom
- [ ] Tapping shows confirmation dialog
- [ ] Confirm logs out and returns to Login

---

## 6. MOBILE UX (15 min)

### 6.1 Touch Targets
- [ ] All buttons are at least 48x48 pixels
- [ ] Easy to tap on phone (no missed taps)
- [ ] Button spacing comfortable (8px+ between elements)

### 6.2 Safe Areas
- [ ] iPhone: Top content respects notch, bottom respects home indicator
- [ ] Android: Proper margins on all sides
- [ ] No critical info in unsafe zones

### 6.3 Tab Navigation
- [ ] 4 tabs at bottom: 🏠 Dashboard, 💊 Cycles, 🧪 Labs, ⚙️ Settings
- [ ] Tab icons and labels visible
- [ ] Swiping between tabs works smoothly
- [ ] Tab bar visible on all screens

### 6.4 Modals
- [ ] All modals have proper bottom padding (clear of tab bar)
- [ ] Close button (✕) works
- [ ] Buttons at bottom are fully tappable

### 6.5 Keyboard Management
- [ ] Text inputs don't show keyboard on load
- [ ] Keyboard dismisses after form submission
- [ ] Dropdown inputs use native pickers (not text fields)

### 6.6 Visual Design
- [ ] Wintermute cyberpunk aesthetic consistent
- [ ] Cyan glow (#00FFFF) on interactive elements
- [ ] Black background throughout
- [ ] Text readable on all backgrounds (contrast OK)

---

## 7. PERFORMANCE & STABILITY (10 min)

### 7.1 Navigation
- [ ] Tab switching is instant
- [ ] No lag when opening modals
- [ ] List scrolling smooth

### 7.2 Data Loading
- [ ] Initial load <2 seconds
- [ ] Pull-to-refresh <1 second
- [ ] No spinner getting stuck

### 7.3 Error Handling
- [ ] Invalid login attempt shows error message (doesn't crash)
- [ ] Form validation works (missing fields prevented)
- [ ] Disconnect app from internet - should handle gracefully

### 7.4 Reliability
- [ ] Create 10 cycles - list doesn't break
- [ ] Rapid tab switching doesn't crash
- [ ] Sign out/in multiple times works
- [ ] App survives being sent to background/foreground

---

## 8. FUNCTIONALITY VERIFICATION (10 min)

### 8.1 Data Sync
- [ ] Create cycle in app
- [ ] Check Supabase `user_cycles` table - data present
- [ ] User ID matches logged-in user
- [ ] All fields correctly saved (peptide, dosage, etc.)

### 8.2 Auth Tokens
- [ ] Check AsyncStorage has session token after login
- [ ] Token persists across app restarts
- [ ] Token cleared after logout

### 8.3 UI State
- [ ] Form resets after successful submission
- [ ] Modal closes on success
- [ ] Loading states show during async operations

---

## Feedback Template

When testing, please provide feedback for each area:

**Section: [Name]**
- ✅ Passed: [What worked]
- ⚠️ Issue: [What didn't work]
- 💡 Suggestion: [How to improve]

---

## Critical Issues (Must Fix Before Next Phase)

If you encounter ANY of these, please report:
- [ ] App crashes on any action
- [ ] Can't create account or login
- [ ] Cycles don't appear after creation
- [ ] App freezes or becomes unresponsive
- [ ] Text is unreadable or cut off
- [ ] Buttons are unresponsive

---

## Nice-to-Have Feedback

- Visual tweaks (colors, spacing, fonts)
- Animation preferences (faster/slower)
- Feature request for upcoming phases
- Anything that feels clunky or non-intuitive

---

## After Testing

1. Share feedback using the template above
2. Report any errors seen in the app
3. Note any performance issues (slow, laggy, etc.)
4. Suggest UI/UX improvements

We'll iterate and add Phase 2 features:
- PDF upload with AI extraction
- Smart reminders
- Lab trends chart
- And more...
