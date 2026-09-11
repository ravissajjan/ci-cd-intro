# Unit 2 — CI/CD Pipeline and DevOps Automation

Everything you need for today's session. Work through it in this order.

## 1. Before the class — do this at home

Read **[Unit2-Before-We-Start.md](Unit2-Before-We-Start.md)** and finish its checklist.
You must arrive with:

- [ ] `git --version` works
- [ ] `node --version` shows **v20 or higher**
- [ ] VS Code installed
- [ ] A GitHub account you can log into
- [ ] A **Personal Access Token** saved in a text file — this is your push password
- [ ] An **empty Public repo called `cicd-lab`** — created with **no** README, .gitignore or licence

> ⚠️ Your `cicd-lab` repo must stay **Public** all day. Branch protection, Environments and
> GitHub Pages do not work on private repos with a free account — the settings simply disappear
> from the menu and you will think you broke something.

If you arrive without the checklist done, you will spend the first hour installing instead of
building pipelines.

## 2. The app you will build a pipeline for

The **[lab-starter/](lab-starter/)** folder holds a tiny Node.js app — 4 functions, 5 tests and a
15-line web server — **plus the two finished pipeline files**. Copy all of it into your own
`cicd-lab` repo at the start of Lab 1, including the hidden `.github` folder.

| | |
|---|---|
| `.github/workflows/ci.yml` | lint + test on 3 Node versions → build + artifact → container smoke test |
| `.github/workflows/cd.yml` | after CI passes: push to Docker Hub, deploy to Pages, approval gate |

You do **not** have to write YAML from memory today. You copy these in, then read each job as the
labs reach it — the goal is to understand a pipeline and watch it catch a real bug.

> ⚠️ Windows hides folders starting with a dot. Turn on **View → Show → Hidden items** or copy from
> inside VS Code, or you will miss `.github` and nothing will run.

## 3. During the class

Follow **[Unit2-Student-Lab-Handout.md](Unit2-Student-Lab-Handout.md)** — Labs 0 to 4, with a
checkbox for every step. Tick them as you go and raise your hand at each CHECKPOINT.

| Lab | You will build |
|---|---|
| 0 | A repo and a merged Pull Request |
| 1 | Your first pipeline — green, then red, then green again |
| 2 | A matrix build and branch protection that blocks a bad merge |
| 3 | A downloadable artifact, secrets, and a Docker image published automatically |
| 4 | A live public URL, behind a human approval gate |

## 4. After the class

- **[Unit2-Takeaway-Sheet.md](Unit2-Takeaway-Sheet.md)** — one-page revision sheet: every table,
  command
- **[Unit2-Homework.md](Unit2-Homework.md)** — the assignment

## Quick command reference

```bash
npm run lint     # check for syntax mistakes
npm test         # run the 5 tests
npm run build    # create the dist folder
npm start        # http://localhost:3000 , Ctrl+C to stop
```

---

> **Never commit a password, API key or token.** Git history is permanent and bots scan public
> repos within seconds of a push. Secrets belong in
> *Settings → Secrets and variables → Actions*, and nowhere else.
