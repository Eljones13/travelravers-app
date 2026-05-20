---
name: app-store-submission
description: >
  Complete checklist and workflow for getting a Capacitor/React app approved on
  Apple App Store and Google Play Store. Use this skill whenever the user mentions
  app store submission, TestFlight, EAS submit, Play Console, app review, rejection,
  compliance, privacy policy, screenshots, metadata, push notifications entitlements,
  export compliance, or anything related to publishing a mobile app. Also trigger for
  questions like "what do I need to submit", "why was my app rejected", "how do I
  set up TestFlight", or "what screenshots do I need".
---

# App Store Submission Skill

A complete guide for submitting Capacitor + EAS Build apps to Apple App Store and Google Play Store — covering requirements, common rejections, and the exact submission workflow.

---

## Quick Reference — What You Need Before Submitting

### Apple App Store (iOS)
| Item | Requirement | Notes |
|------|------------|-------|
| App icon | 1024×1024 PNG, no alpha, no rounded corners | Apple adds rounding |
| iPhone screenshots | Min 1 × 6.5" (1242×2688 or 1284×2778px) | Required |
| iPad screenshots | Optional unless app supports iPad | |
| App name | Max 30 chars | Must match binary |
| Subtitle | Max 30 chars | Optional but recommended |
| Description | Max 4000 chars | No HTML |
| Keywords | Max 100 chars, comma separated | No spaces after commas |
| Support URL | Must be live and accessible | |
| Privacy Policy URL | Required for all apps | Must be live |
| Copyright | e.g. "2026 Your Company" | |
| Age rating | Fill questionnaire honestly | |
| Export compliance | Answer encryption questions | Most apps answer "No" |
| App Privacy | Data collection questionnaire | Required since iOS 14 |
| Build | Signed IPA uploaded via EAS or Transporter | |
| Bundle ID | Must match EAS config | |

### Google Play Store (Android)
| Item | Requirement | Notes |
|------|------------|-------|
| App icon | 512×512 PNG | |
| Feature graphic | 1024×500 PNG | Required for store listing |
| Phone screenshots | Min 2, max 8 (16:9 or 9:16) | |
| Short description | Max 80 chars | |
| Full description | Max 4000 chars | |
| Privacy Policy URL | Required | |
| Content rating | Fill IARC questionnaire | |
| Target audience | Age group declaration | |
| Data safety form | What data you collect/share | Equivalent to Apple Privacy |
| AAB file | Android App Bundle (.aab not .apk) | EAS produces this |

---

## Apple App Store — Step by Step

### Step 1 — Prerequisites
```bash
# Make sure EAS is configured
cat eas.json  # check submit profile has appleId, appleTeamId, ascAppId

# Build production IPA
eas build --platform ios --profile production

# Submit to App Store Connect
eas submit --platform ios --latest
```

### Step 2 — App Store Connect Setup
1. Go to https://appstoreconnect.apple.com
2. My Apps → "+" → New App
3. Fill: Platform (iOS), Name, Bundle ID, SKU, Primary Language
4. Save

### Step 3 — Version Information
Fill in Distribution → iOS App → 1.0:
- Previews and Screenshots (upload at correct sizes)
- Description, Keywords, Support URL, Marketing URL
- Version number (match your app.json)
- Copyright

### Step 4 — Build Attachment
- Click "+" next to Build
- Select your uploaded build
- Answer export compliance (usually "No" for standard apps)

### Step 5 — App Information (left sidebar)
- Category: pick Primary + optional Secondary
- Content Rights: declare if using third-party content

### Step 6 — App Privacy (left sidebar)
Answer honestly:
- Do you collect data? (analytics, crash reports = yes)
- What types? (usage data, diagnostics)
- Is it linked to identity? (usually No for anonymous analytics)

### Step 7 — Pricing and Availability
- Price: Free
- Availability: All territories (or restrict as needed)

### Step 8 — Submit for Review
- Click "Add for Review"
- Select manual or automatic release
- Confirm

### Step 9 — TestFlight (before public release)
```
TestFlight tab → Internal Testing → "+" → Create group
Add testers by Apple ID email
Build appears automatically after processing (5-15 min)
```

---

## Google Play Store — Step by Step

### Step 1 — Build AAB
```bash
eas build --platform android --profile production
eas submit --platform android --latest
```

### Step 2 — Play Console Setup
1. Go to https://play.google.com/console
2. Create app → fill name, language, app/game, free/paid
3. Accept Developer Program Policies

### Step 3 — Store Listing
- Short description (80 chars)
- Full description (4000 chars)
- Screenshots (min 2 phone screenshots)
- Feature graphic (1024×500)
- App icon (512×512)

### Step 4 — Content Rating
- Fill IARC questionnaire
- Submit for rating certificate

### Step 5 — Data Safety
- Declare what data your app collects
- Be specific about analytics, crash reporting, location

### Step 6 — Release
- Production → Create new release
- Upload AAB
- Release notes
- Review and rollout (start with 10% staged rollout)

---

## Screenshot Sizes — Quick Reference

### iOS Required Sizes
```
6.7" iPhone 15 Plus/Pro Max:  1290 × 2796px  ← USE THIS (covers 6.5" slot too)
6.5" iPhone 14 Plus/11 Pro Max: 1242 × 2688px
6.1" iPhone 15/14/13:         1179 × 2556px
5.5" iPhone 8 Plus:           1242 × 2208px  (older, often not required)
iPad Pro 12.9":               2048 × 2732px  (only if iPad supported)
```

### Android Required Sizes
```
Phone: 1080 × 1920px minimum (16:9 or 9:16)
Tablet: 1200 × 1920px (optional)
```

### Getting Screenshots Fast
```bash
# iOS Simulator screenshot (correct size automatically)
# 1. Open Simulator → File → Open Simulator → iPhone 15 Plus
# 2. Navigate to your app
# 3. Cmd+S to screenshot → saves to Desktop at correct size

# Android Emulator
# 1. Open Android Studio → Device Manager → Pixel 7 Pro
# 2. Navigate to app
# 3. Camera icon in emulator toolbar
```

---

## Common Rejection Reasons + Fixes

### Apple Guideline 2.1 — App Completeness
**Rejection:** "App crashes on launch" or "placeholder content"
**Fix:** Test on real device via TestFlight before submitting. Remove all Lorem Ipsum.

### Apple Guideline 4.0 — Design (Copycat)
**Rejection:** "App duplicates functionality of built-in apps"
**Fix:** Clearly differentiate. Add unique value in description and screenshots.

### Apple Guideline 5.1.1 — Privacy — Data Collection
**Rejection:** "App collects data without disclosure"
**Fix:** Add privacy policy URL. Fill App Privacy questionnaire accurately.

### Apple Guideline 2.3.3 — Accurate Metadata
**Rejection:** "Screenshots don't match app"
**Fix:** Screenshots must show actual app UI, not mockups.

### Apple Guideline 4.2 — Minimum Functionality
**Rejection:** "App is essentially a website"
**Fix:** Add native features (offline mode, push notifications, device features).
**Note:** Capacitor apps are vulnerable to this — make sure your app has features
that justify native distribution (offline, notifications, device APIs).

### Google — Policy Violation: Data Safety
**Rejection:** "Data safety section incomplete"
**Fix:** Declare ALL data collection including Firebase Analytics, Crashlytics etc.

---

## Capacitor-Specific Requirements

### Info.plist entries required for common features
```xml
<!-- Push Notifications -->
<key>UIBackgroundModes</key>
<array>
  <string>remote-notification</string>
</array>

<!-- Location (if used) -->
<key>NSLocationWhenInUseUsageDescription</key>
<string>Used to show weather at your festival location</string>

<!-- Camera (if used) -->
<key>NSCameraUsageDescription</key>
<string>Used to scan QR codes</string>
```

Add these in `ios/App/App/Info.plist` before building.

### AndroidManifest.xml entries
```xml
<!-- Push Notifications -->
<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>

<!-- Internet -->
<uses-permission android:name="android.permission.INTERNET"/>
```

### Push Notifications Setup (Capacitor)
```bash
npm install @capacitor/push-notifications
npx cap sync

# iOS: enable Push Notifications capability in Xcode
# Signing & Capabilities → + → Push Notifications

# Register in eas.json
# ios: { "capabilities": ["push-notifications"] }
```

---

## EAS Submit Configuration

### Complete eas.json submit profile
```json
{
  "submit": {
    "production": {
      "ios": {
        "appleId": "your@email.com",
        "appleTeamId": "XXXXXXXXXX",
        "ascAppId": "1234567890"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "production",
        "releaseStatus": "draft"
      }
    }
  }
}
```

### Get your ascAppId
```bash
# From App Store Connect URL:
# https://appstoreconnect.apple.com/apps/XXXXXXXXXX/...
# The number after /apps/ is your ascAppId
```

---

## Pre-Submission Checklist

Run through this before every submission:

### Build Quality
- [ ] App does not crash on launch
- [ ] All screens load correctly
- [ ] No placeholder/Lorem Ipsum content
- [ ] Tested on real device via TestFlight
- [ ] Offline mode works (if claimed)
- [ ] Deep links work (if implemented)

### Metadata
- [ ] App name matches binary (max 30 chars)
- [ ] Screenshots at correct sizes and show real UI
- [ ] Description is accurate and complete
- [ ] Keywords filled (100 chars max)
- [ ] Support URL is live
- [ ] Privacy Policy URL is live

### Compliance
- [ ] App Privacy / Data Safety filled accurately
- [ ] Export compliance answered
- [ ] Age rating completed
- [ ] Push notification permissions have usage descriptions
- [ ] Location permissions have usage descriptions (if used)

### EAS Config
- [ ] `ascAppId` set in eas.json
- [ ] Bundle ID matches App Store Connect
- [ ] `autoIncrement: true` in production profile
- [ ] `node: "22.0.0"` set (for Capacitor CLI)
- [ ] `eas-build-post-install` script builds web assets

---

## Privacy Policy — Minimum Requirements

Your privacy policy must cover:
1. What data you collect (analytics, crash reports, user inputs)
2. How it's used
3. Who it's shared with (Apple, analytics providers)
4. How users can request deletion
5. Contact email

Free generators: https://app-privacy-policy-generator.nisrulz.com/

Host it at: `https://yourdomain.com/privacy` (must be live before submission)

---

## After Approval

### iOS
- App appears in App Store within 24 hours of approval
- Send release: App Store Connect → Pricing and Availability → Release

### Android  
- Staged rollout: start at 10%, monitor crash rate, expand to 100%
- Full rollout: Play Console → Production → Edit rollout → 100%

### Post-Launch Monitoring
```bash
# Check crash reports
# iOS: App Store Connect → TestFlight → Crashes
# Android: Play Console → Android Vitals → Crashes

# Monitor reviews
# iOS: App Store Connect → Ratings and Reviews
# Android: Play Console → Reviews
```
