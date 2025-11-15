# Fantasy Sports App

A React-based fantasy cricket team management app where you create teams, select players, and register for contests.

## 🎯 Features

- **Create Teams** - Build multiple teams with 11 players each
- **Player Selection** - Pick players based on credits (max 100)
- **Captain Selection** - Choose captain (2x points) and vice-captain (1.5x points)
- **Team Registration** - Register one or multiple teams with ₹25 per team
- **Live Timer** - 3-hour countdown with auto-restart
- **Balance Tracking** - Real-time wallet updates
- **Team Preview** - View full team details before registration

## 📊 Team Rules

- Exactly 11 players required
- Max 100 credits per team
- Max 7 players from same team
- Role limits: WK(5), BAT(7), AR(4), BOWL(7)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start app
npm start

# Add to public/players/ folder
P1.png  # Yellow team avatar
P2.png  # Blue team avatar
```

## 📱 How to Use

1. Click on a match from dashboard
2. Click "Create Team"
3. Select 11 players (watch credits)
4. Choose captain and vice-captain
5. Check teams and click "Register"
6. Confirm registration and pay ₹25

## 💾 Data Saved

- Teams saved in localStorage
- Balance persists between sessions
- Registered teams marked automatically

## 🛠️ Tech Stack

- React
- Tailwind CSS
- Lucide React Icons
- localStorage for persistence

## 📝 Notes

- Timer counts down from 3 hours and auto-restarts
- Each registration costs ₹25
- You can select and register multiple teams at once
- Already registered teams have checkboxes disabled