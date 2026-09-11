# Unit 2 — CI/CD Pipeline and DevOps Automation
### Value Added Course · 2nd Semester UG · 09:30 – 13:30

## Files in this folder

| File | Use it for |
|---|---|
| [Unit2-Before-We-Start.md](Unit2-Before-We-Start.md) | **Give to students in the PREVIOUS class.** Explains terminal, Node, npm, YAML and the JavaScript they need to read, plus the install checklist |
| [Unit2-CICD-Teaching-Material.md](Unit2-CICD-Teaching-Material.md) | **Instructor document** — session plan, concepts, diagrams, talking points, troubleshooting, glossary |
| [Unit2-Student-Lab-Handout.md](Unit2-Student-Lab-Handout.md) | **Give to students on the day** — Labs 0–4, step by step with checkboxes |
| [Unit2-Takeaway-Sheet.md](Unit2-Takeaway-Sheet.md) | **Hand out at 13:25.** One-page revision sheet: every table, command and exam answer |
| [Unit2-Assessment-and-Homework.md](Unit2-Assessment-and-Homework.md) | Quiz, homework, mark scheme, viva bank, mini project |
| [labs/lab-starter/](labs/lab-starter/README.md) | The sample app + pipeline files students copy into their repo |

## Handout order

| When | Give them |
|---|---|
| Previous class | `Unit2-Before-We-Start.md` — with a clear instruction to install everything **and create the empty `cicd-lab` repo at home** |
| Start of session | `Unit2-Student-Lab-Handout.md` + the `lab-starter` ZIP (**without** the `.github` folder) |
| 13:25 | `Unit2-Takeaway-Sheet.md` |
| End of session | `Unit2-Assessment-and-Homework.md` |

## Session at a glance

| Time | Segment |
|---|---|
| 09:30 – 09:55 | Unit 1 recap + Git warm-up (**Lab 0**) |
| 09:55 – 10:30 | CI vs CD vs CD, pipeline architecture, how GitHub Actions runs a workflow |
| 10:30 – 11:15 | **Lab 1** — first workflow, green build, break it, fix it |
| 11:15 – 11:30 | Break |
| 11:30 – 12:15 | Build & test automation + **Lab 2** (matrix, badge, branch protection) |
| 12:15 – 12:45 | Artifacts & registries + **Lab 3** (artifact, secrets, Docker demo) |
| 12:45 – 13:05 | Pipeline triggers + workflow chaining and the Actions Marketplace |
| 13:05 – 13:25 | Deployment strategies + **Lab 4** (deploy + approval gate) |
| 13:25 – 13:30 | Wrap-up and homework |

## The lab code, on purpose, is tiny

A dozen small files, flat, **no libraries to install**:

```
labs/lab-starter/
├── math.js                          # 4 functions
├── math.test.js                     # 5 tests
├── app.js                           # 15-line web server
├── index.html                       # the page
├── build.js                         # creates dist/
├── package.json                     # lint / test / build / start
├── Dockerfile                       # 9 lines
├── .dockerignore                    # keeps junk out of the image
├── .gitignore                       # dist/, node_modules/, .env
└── .github/workflows/
    ├── ci.yml                       # test (3 Node versions) -> build -> artifact -> image smoke test
    └── cd.yml                       # after CI passes: Docker Hub push, Pages, approval gate
```

Everything runs in seconds, so students get many feedback loops in one session instead of
waiting on `npm install` over college Wi-Fi.

> The three files under `.github/workflows/` are the **answer key**. Students write those themselves
> during Labs 1–4 — tell them to copy everything *except* the `.github` folder.

## Before the session

**Instructor**
- Zip `labs/lab-starter/` **without the `.github` folder** and share it (LMS, pen-drive, template repo)
- Dry-run Labs 1–4 once on your own account — especially **Pages** and **Environments**
- Keep a mobile hotspot ready

**Students** — all of this is pre-work, covered by `Unit2-Before-We-Start.md`:
Git, Node.js 20+, VS Code, a GitHub account, a saved Personal Access Token, and an empty
Public repo called `cicd-lab`. Docker is optional.

> Enforce the pre-work. GitHub authentication is the biggest time sink in this session — 40 students
> generating access tokens at 09:35 will cost you Lab 1.

> Students without a working laptop can still do most labs in the browser — press `.` on any GitHub repo.

## Why these tools

- **GitHub Actions for hands-on** — nothing to install, green tick in five minutes.
- **Docker as an instructor demo** — shows how a build artifact becomes a shippable image.
