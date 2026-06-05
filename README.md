# Harsh Nirala | Premium Personal Portfolio

A premium, highly interactive single-page personal portfolio website featuring a modern **"Dark Nebula" & Glassmorphism** aesthetic. Built from scratch using Vanilla HTML5, CSS3, and modern JavaScript, it delivers a high-performance, responsive experience without framework overhead.

---

## 🌟 Key Features

- **Interactive Background Nebula**: A canvas-based interactive particle field that floats and reacts dynamically to cursor movements.
- **Role Typewriter Loop**: An automated typing effect showcasing professional roles and titles (Full Stack Developer, CS Student, AI Builder, etc.).
- **Technical Expertise Grids**: Interactive category-grouped grids highlighting languages, frameworks, AI/ML utilities, and tools.
- **Interactive Project Hub**: A grid of six modular project cards. Clicking "Learn More" triggers a smooth glassmorphic detail modal rendering key features, technical details, and direct links.
- **Theme-Aware Blog Section**: A dedicated section displaying technical thought leadership articles. Readers can click "Read Article" to view clean dedicated subpages complete with custom formatting and syntax highlighting. Supports instant dark/light theme persistence.
- **Responsive Navigation**: Mobile-responsive drawer navigation with active-link indicators synced to your scroll position.
- **Resume Download Integrations**: Direct access to your downloadable resume from both the header navigation and a prominent About section CTA button.
- **Contact Dispatcher Mockup**: Sleek feedback form with animated focus states and interactive submission handlers.

---

## 📚 Published Technical Articles (Read on GitHub)

You can read the Markdown versions of the articles directly on GitHub:

1. **[Automating Code Quality: Building a Local CLI RAG Pipeline for Auto-Testing](blog/automating-code-quality.md)** - Explores indexing codebases with LangChain/ChromaDB and local Ollama testing correction loops.
2. **[Scaling Backend Workflows: Orchestrating AI Automations with n8n](blog/scaling-backend-workflows.md)** - Details webhook trigger flows, asynchronous processing, and parallel validation pipelines.
3. **[Interactive Data Visualizations: Rendering Dynamic DAGs in React Flow](blog/interactive-data-visualizations.md)** - Covers flattening hierarchical JSON maps recursively and laying out nodes with Dagre engines.

---

## 🛠️ Tech Stack

- **Core**: HTML5 & ES6+ JavaScript
- **Styling**: Vanilla CSS3 (utilizing modern CSS variables and HSL color modeling)
- **Typography**: Google Fonts (Space Grotesk, Outfit, Inter)
- **Icons**: FontAwesome v6.4

---

## 📁 Project Structure

```bash
├── blog/
│   ├── automating-code-quality.html          # Article 1 HTML Page
│   ├── automating-code-quality.md            # Article 1 Markdown Document
│   ├── interactive-data-visualizations.html  # Article 3 HTML Page
│   ├── interactive-data-visualizations.md    # Article 3 Markdown Document
│   ├── scaling-backend-workflows.html       # Article 2 HTML Page
│   └── scaling-backend-workflows.md         # Article 2 Markdown Document
├── docs/
│   └── Harsh_Nirala_Resume.pdf               # Downloadable PDF Resume
├── index.html                                # Main HTML5 semantic structure
├── me.jpg                                    # Grayscale portrait photo
├── push.ps1                                  # Git deploy PowerShell automation
├── script.js                                 # Canvas particle loop, typewriter & modals
├── style.css                                 # Colors, glassmorphism panel & animations
└── README.md                                 # Project documentation
```

---

## 🚀 Running Locally

To host the static files on a local server, you can use Python's built-in HTTP server:

1. Open your terminal in the project directory:
   ```bash
   cd d:\TP\ANTIGRAVITY\portfolio
   ```
2. Start the local server:
   ```bash
   python -m http.server 3000
   ```
3. Open your browser and navigate to:
   👉 **[http://localhost:3000/](http://localhost:3000/)**

---

## 🌐 Deploying to GitHub

We have provided an automated deploy script to make pushing your new website to GitHub simple:

1. Make sure you have created an empty repository on your account at [github.com/new](https://github.com/new). Do **not** initialize it with a README.
2. In your terminal inside the project directory, run:
   ```powershell
   .\push.ps1
   ```
3. The script will initialize your local Git branch, commit the files, link your GitHub repository, and open a secure popup window to authenticate and complete the upload.
