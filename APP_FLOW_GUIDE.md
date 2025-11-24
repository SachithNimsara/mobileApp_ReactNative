# FitBuddy - App Flow & Screen Guide

## 📱 Application Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     APP LAUNCH                              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
              ┌────────────────┐
              │  Auth Check    │
              │  (AsyncStorage)│
              └────────┬───────┘
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
    NOT LOGGED IN              LOGGED IN
         │                           │
         ▼                           ▼
┌─────────────────┐         ┌─────────────────┐
│  LOGIN SCREEN   │         │   MAIN TABS     │
│                 │         │                 │
│ • Username      │         │ 1. Home         │
│ • Password      │         │ 2. Exercises    │
│ • Login Button  │         │ 3. Favorites    │
│ • Sign Up Link  │         │ 4. Profile      │
│                 │         │                 │
│ Demo Creds:     │         └─────────────────┘
│ emilys/emilyspass│
└─────────────────┘
         │
         │ (New User?)
         ▼
┌─────────────────┐
│ REGISTER SCREEN │
│                 │
│ • First Name    │
│ • Last Name     │
│ • Email         │
│ • Username      │
│ • Password      │
│ • Confirm Pass  │
│ • Create Button │
└─────────────────┘
```

---

## 🏠 Home Screen Flow

```
┌────────────────────────────────────────────────────────────┐
│  HOME SCREEN                                               │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Header: "Welcome, [Name]!"                                │
│                                                            │
│  ┌──────────────────────────────────────────────────┐     │
│  │  WATER INTAKE TRACKER                            │     │
│  │  ○ ○ ○ ○ ○ ○ ○ ○  (0/8 glasses)                │     │
│  │  Progress Bar: [████░░░░] 50%                    │     │
│  │  Tap circles to track!                           │     │
│  └──────────────────────────────────────────────────┘     │
│                                                            │
│  ┌──────────────────────────────────────────────────┐     │
│  │  🔍 Search exercises...                          │     │
│  └──────────────────────────────────────────────────┘     │
│                                                            │
│  Exercises & Wellness Tips                                 │
│                                                            │
│  ┌──────────────────────────────────────────────────┐     │
│  │  [Image with gradient overlay]            ❤️     │     │
│  │  BEGINNER                                        │     │
│  │  Push-ups                                        │     │
│  │  A classic upper body exercise...               │     │
│  │  [Strength Training]              50 cal        │     │
│  └──────────────────────────────────────────────────┘     │
│                                                            │
│  [More exercise cards...]                                 │
│                                                            │
│  (Pull down to refresh)                                   │
└────────────────────────────────────────────────────────────┘
```

---

## 💪 Exercises Screen Flow

```
┌────────────────────────────────────────────────────────────┐
│  EXERCISES                                                 │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Header: "Browse workout library"                          │
│                                                            │
│  ┌──────────────────────────────────────────────────┐     │
│  │  🔍 Search exercises...                          │     │
│  └──────────────────────────────────────────────────┘     │
│                                                            │
│  Difficulty:                                               │
│  [All] [Beginner] [Intermediate] [Advanced]               │
│                                                            │
│  10 Exercises                                              │
│                                                            │
│  [Exercise cards with same design as Home]                 │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 📋 Exercise Details Screen Flow

```
┌────────────────────────────────────────────────────────────┐
│  ← EXERCISE NAME                                      ❤️   │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────────────────────────────────────────────┐     │
│  │  [Full width image]                              │     │
│  │  BEGINNER badge                                  │     │
│  └──────────────────────────────────────────────────┘     │
│                                                            │
│  ┌────────────────┐  ┌────────────────┐                   │
│  │  🔥 50         │  │  🏆 Strength   │                   │
│  │  Calories      │  │  Type          │                   │
│  └────────────────┘  └────────────────┘                   │
│                                                            │
│  Description                                               │
│  A classic upper body exercise that targets...            │
│                                                            │
│  Equipment                                                 │
│  [BODY ONLY]                                               │
│                                                            │
│  Muscle Groups                                             │
│  [CHEST]                                                   │
│                                                            │
│  Instructions                                              │
│  Start in a plank position with hands shoulder-           │
│  width apart. Lower your body until your chest...         │
│                                                            │
│  Category                                                  │
│  [Strength Training]                                       │
│                                                            │
│  [Add to Favorites] Button                                 │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## ❤️ Favorites Screen Flow

```
┌────────────────────────────────────────────────────────────┐
│  FAVORITES                                                 │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Header: "3 saved items"                                   │
│                                                            │
│  [Favorited exercise cards]                                │
│                                                            │
│  (Tap ❤️ to remove from favorites)                        │
│                                                            │
│  ─── OR if empty ───                                      │
│                                                            │
│         💔                                                 │
│    No Favorites Yet                                        │
│  Start adding exercises                                    │
│  to your favorites!                                        │
│                                                            │
│  Tap the heart icon on any                                 │
│  exercise card to save it here.                           │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 👤 Profile Screen Flow

```
┌────────────────────────────────────────────────────────────┐
│  PROFILE                                                   │
├────────────────────────────────────────────────────────────┤
│                                                            │
│               ┌──────┐                                     │
│               │  E   │  (Gradient Avatar)                  │
│               └──────┘                                     │
│            Emily Johnson                                   │
│          emily.johnson@example.com                         │
│                                                            │
│  Weekly Stats                                              │
│  ┌────────────────┐  ┌────────────────┐                   │
│  │  🏆            │  │  💧            │                   │
│  │  3             │  │  6             │                   │
│  │  Favorites     │  │  Today's Water │                   │
│  └────────────────┘  └────────────────┘                   │
│                                                            │
│  Settings                                                  │
│  ┌──────────────────────────────────────────────────┐     │
│  │  🌙 Dark Mode              [Toggle Switch]       │     │
│  │  Enabled/Disabled                                │     │
│  └──────────────────────────────────────────────────┘     │
│                                                            │
│  [Logout] Button                                           │
│                                                            │
│  FitBuddy v1.0.0                                           │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 🎯 Bottom Tab Navigation

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  [Current Screen Content]                                  │
│                                                            │
├────────────────────────────────────────────────────────────┤
│  Navigation Bar                                            │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                  │
│  │  🏠  │  │  💪  │  │  ❤️  │  │  👤  │                  │
│  │ Home │  │ Exer │  │ Fav  │  │ Prof │                  │
│  └──────┘  └──────┘  └──────┘  └──────┘                  │
└────────────────────────────────────────────────────────────┘
```

---

## 🌓 Dark Mode Comparison

```
┌─────────────────────────────┬─────────────────────────────┐
│      LIGHT MODE             │      DARK MODE              │
├─────────────────────────────┼─────────────────────────────┤
│  Background: #F9FAFB        │  Background: #111827        │
│  Cards: #FFFFFF             │  Cards: #1F2937             │
│  Text: #111827              │  Text: #F9FAFB              │
│  Search: #FFFFFF            │  Search: #1F2937            │
│                             │                             │
│  Bright, clean look         │  Easy on eyes, dark theme   │
└─────────────────────────────┴─────────────────────────────┘
```

---

## 🔄 User Journey Examples

### Journey 1: First Time User
```
1. Open app
2. See Login screen
3. Tap "Sign Up"
4. Fill registration form
5. Create account
6. Return to Login
7. Login with new credentials
8. See Home screen
9. Track first water glass
10. Browse exercises
11. Add favorite
```

### Journey 2: Returning User
```
1. Open app
2. Auto-login (token in AsyncStorage)
3. See Home screen with previous data
4. Water tracker shows today's progress
5. Favorites still saved
6. Dark mode preference remembered
```

### Journey 3: Exercise Discovery
```
1. Go to Exercises tab
2. Filter by "Beginner"
3. Search for "push"
4. Find "Push-ups"
5. Tap card to see details
6. Read instructions
7. Add to favorites
8. Return to list
9. Find more exercises
```

### Journey 4: Daily Tracking
```
1. Open app (Home screen)
2. Drink water → Tap circle
3. See progress bar update
4. Complete workout → Browse exercises
5. Add workout to favorites
6. Check Profile for stats
7. Logout when done
```

---

## 📱 Gestures & Interactions

- **Tap** exercise card → Open details
- **Tap** heart icon → Toggle favorite
- **Tap** water circle → Increment counter
- **Pull down** on list → Refresh data
- **Type** in search → Filter results
- **Tap** filter button → Change difficulty
- **Toggle** switch → Enable/disable dark mode
- **Press** back button → Return to previous screen

---

## 🎨 Visual Highlights

### Animations
- Card press: Scale down to 0.97
- Screen transitions: Fade/slide
- Water circles: Scale up when tapped
- Theme change: Smooth color transitions

### Colors in Action
- Green badges = Easy/Beginner
- Amber badges = Medium/Intermediate  
- Red badges = Hard/Advanced
- Gradient headers = Primary → Secondary

---

This guide shows the complete app flow and user experience!
