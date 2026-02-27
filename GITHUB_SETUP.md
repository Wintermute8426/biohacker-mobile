# Push to GitHub - 2 Minutes

## You Need:
1. GitHub account (free at github.com)
2. GitHub personal access token (PAT)

## Step 1: Create GitHub Repo

1. Go to https://github.com/new
2. **Repository name:** `biohacker-mobile`
3. **Description:** "Biohacker peptide tracking app for iOS/Android"
4. **Public** (easier to share) or Private (your choice)
5. Click **Create repository**

## Step 2: Get Your Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click **Generate new token (classic)**
3. Name: `biohacker-build`
4. Scopes: Check `repo` (full control of private repositories)
5. Expiration: 90 days is fine
6. Click **Generate token**
7. **Copy the token** (you'll only see it once)

## Step 3: Push Code to GitHub

On your **Windows PC**, run this:

```powershell
cd C:\Users\ebbad\Downloads\biohacker-mobile

git remote add origin https://github.com/[YOUR_USERNAME]/biohacker-mobile.git
git branch -M main
git push -u origin main
```

When prompted for password, paste the **personal access token** you just created.

## Step 4: Download on Windows

Once on GitHub:

```powershell
cd C:\Users\ebbad\Downloads
git clone https://github.com/[YOUR_USERNAME]/biohacker-mobile.git
cd biohacker-mobile
npm install
eas build --platform android
```

---

## OR: I Push It

If you want, give me:
- Your GitHub username
- A personal access token

I'll push it for you right now.

---

## What Gets Pushed

✅ All source code (screens, navigation, auth)
✅ Configuration (app.json, eas.json, tsconfig.json)
✅ All documentation (SETUP.md, TEST_PLAN.md, etc.)
✅ .gitignore (excludes node_modules, .next, .git)

❌ NOT pushed: node_modules (you install locally)

---

Total size on GitHub: ~700KB (tiny)
