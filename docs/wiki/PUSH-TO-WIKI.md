# How to Push Wiki Content to GitHub

The wiki pages are staged in `docs/wiki/` in the main repo.
Once you initialize the wiki through GitHub's web UI, run these commands:

## Step 1: Initialize wiki through GitHub UI

1. Go to https://github.com/toniomon96/Omnexus/wiki
2. Click "Create the first page"
3. Set title to "Home", add any text, click "Save Page"

## Step 2: Clone wiki repo and push content

```bash
cd /tmp
git clone https://github.com/toniomon96/Omnexus.wiki.git
cd Omnexus.wiki

# Copy staged wiki files
cp /path/to/fitness-app/docs/wiki/Home.md ./Home.md
cp /path/to/fitness-app/docs/wiki/Roadmap.md ./Roadmap.md
cp /path/to/fitness-app/docs/wiki/Architecture.md ./Architecture.md
cp /path/to/fitness-app/docs/wiki/Contributing.md ./Contributing.md
cp /path/to/fitness-app/docs/wiki/Milestones.md ./Milestones.md

git add .
git commit -m "Add full wiki: home, roadmap, architecture, contributing, milestones"
git push origin master
```

## Result

The wiki will have 5 pages:
- **Home**: project overview and quick links
- **Roadmap**: full 3-phase roadmap (v1 → v2 → v3)
- **Architecture**: tech stack, key files, data models, env vars
- **Contributing**: branching strategy, PR workflow, commit conventions
- **Milestones**: current sprint goals and release targets
