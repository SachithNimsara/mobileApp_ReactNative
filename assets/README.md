# Assets Placeholder

This directory should contain the following assets for the FitBuddy app:

## Required Assets

1. **icon.png** (1024x1024)
   - App icon for iOS and Android
   - Should feature the FitBuddy logo with primary green color

2. **splash.png** (1284x2778)
   - Splash screen image
   - Background color: #10B981 (primary green)
   - Should contain app logo and name

3. **adaptive-icon.png** (1024x1024)
   - Adaptive icon for Android
   - Foreground should be the logo
   - Background: #10B981

4. **favicon.png** (48x48)
   - Web favicon

## Creating Placeholder Assets

If you don't have custom assets, you can use simple placeholder images:

### Using Online Tools
- **Icon Generator:** https://icon.kitchen
- **Expo Icon:** https://docs.expo.dev/guides/app-icons/

### Quick Setup
You can create simple colored squares as placeholders:
- Use any image editor to create images with the dimensions above
- Fill with the primary color (#10B981)
- Add white text "FB" or "FitBuddy"

### Generating with Expo
Run this command to generate default assets:
```bash
npx expo install expo-splash-screen
```

## Note
The app will work without custom assets. Expo provides default placeholders.
For production, replace these with properly designed assets.
