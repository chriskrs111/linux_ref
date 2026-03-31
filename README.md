🐧 Terminal Reference
A mobile-first, multi-platform terminal command reference app built with React + Vite. Designed for IT professionals and sysadmins who need quick access to commands while working in the field — optimized for iPhone use as a PWA (Progressive Web App) but fully responsive on desktop.
🔗 Live App: chriskrs111.github.io/linux_ref

📱 Screenshots
LinuxMac TerminalWindows CMDPowerShell🐧🍎🪟💙

✨ Features

4 Platform Sections — Linux, Mac Terminal, Windows CMD, and PowerShell
Hamburger Menu — Tap the OS icon to switch between platforms
A–Z Navigation — Jump to commands by first letter with a scrollable letter bar
Category Filtering — Color-coded category pills to filter by command type
Full Command Details — Each command includes:

Main purpose / description
Parameters with explanations
Options / flags with descriptions
Usage syntax and real-world example


⭐ Favorites — Star any command to save it; favorites persist across sessions
🔍 Search — Instant search across command names and descriptions
Swipe Navigation — Swipe left/right to switch between A–Z, Categories, and Favorites tabs
PWA Support — Install to iPhone home screen for a native app experience
Responsive Layout — Single column on mobile, multi-column grid on desktop
Dark Theme — Easy on the eyes in the field


🗂️ Command Coverage
PlatformCommandsCategories🐧 Linux94File & Directory, Networking, Process Management, Security, and more🍎 Mac Terminal45Includes macOS-specific tools: open, brew, diskutil, defaults, pbcopy🪟 Windows CMD40Includes robocopy, diskpart, tasklist, findstr, sc, and more💙 PowerShell40Full cmdlet coverage: Get-Process, Invoke-RestMethod, Select-String, and more

🚀 Getting Started
Prerequisites

Node.js v18+
Git

Local Development
bash# Clone the repo
git clone https://github.com/chriskrs111/linux_ref.git
cd linux_ref

# Install dependencies
npm install

# Start local dev server
npm run dev
Open http://localhost:5173/linux_ref/
Build & Deploy
bash# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
Deployment pushes the built dist/ folder to the gh-pages branch automatically.

📁 Project Structure
linux_ref/
├── public/
│   ├── tux.png              # Linux Tux logo
│   └── manifest.json        # PWA manifest
├── src/
│   ├── App.jsx              # Main app component (UI, routing, state)
│   ├── commands.js          # Linux command data
│   ├── mac.js               # Mac Terminal command data
│   ├── windows.js           # Windows CMD command data
│   ├── powershell.js        # PowerShell command data
│   └── main.jsx             # React entry point
├── index.html               # HTML shell with PWA meta tags
├── vite.config.js           # Vite config (base path)
└── package.json             # Scripts and dependencies

📲 Install as iPhone App (PWA)

Open chriskrs111.github.io/linux_ref in Safari
Tap the Share button (box with arrow)
Tap Add to Home Screen
Tap Add

The app opens full screen with no browser UI — just like a native app.

🛠️ Tech Stack
ToolPurposeReact 18UI frameworkVite 5Build tool and dev servergh-pagesGitHub Pages deploymentCSS-in-JS (inline styles)Styling — no external CSS frameworklocalStorageFavorites persistence

➕ Adding Commands
Open the relevant data file (src/commands.js, src/mac.js, etc.) and add a new object to the array:
js{
  cmd: "newcmd",
  desc: "Short one-line description",
  usage: "newcmd [options] argument",
  ex: "newcmd -v /path/to/file",
  cat: "Networking",        // Must match an existing category
  purpose: "Full explanation of what this command does and when to use it.",
  params: [
    { name: "argument", desc: "What this positional argument does" }
  ],
  options: [
    { flag: "-v", desc: "Enable verbose output" },
    { flag: "-n N", desc: "Limit to N results" }
  ]
}
Then redeploy:
bashnpm run deploy

🔄 Update Workflow
bash# 1 — Make your changes in VS Code

# 2 — Test locally
npm run dev

# 3 — Save source code to GitHub
git add .
git commit -m "describe your changes"
git push origin main

# 4 — Deploy live site
npm run deploy

📄 License
MIT — free to use, modify, and distribute.

👤 Author
Christopher VanSon
GitHub: @chriskrs111
