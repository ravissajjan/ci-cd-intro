# Unit 2 — Takeaway Sheet
### Everything from today on one page. Print it. Revise from it.

---

## 1. Every idea in one picture

If you forget the definition, remember the picture. The picture is enough to rebuild the answer.

| Concept | Picture |
|---|---|
| **Pipeline** | A kitchen line: chop → cook → plate → serve |
| **CI** | Spell-check while you type, not proofreading 300 pages the night before |
| **Fail fast** | Rice is burnt? Don't continue plating it |
| **Runner** | A hotel room — clean when you get it, wiped after you leave |
| **Build** | Packing a tiffin box (not just ingredients on the counter) |
| **Artifact** | The sealed tiffin with a date label |
| **Registry** | The fridge where all the labelled tiffins are kept |
| **Build once, deploy many** | Don't re-cook for each person. One dish, many plates |
| **Unit / Integration / E2E test** | Taste the dal · taste dal + rice · guest eats the full meal |
| **Branch protection** | The exam invigilator — nothing leaves the hall unchecked |
| **Secret** | Your ATM PIN. Never written on the card |
| **Matrix build** | Testing on Android 12, 13 and 14 *at the same time* |
| **Rolling** | Replacing tube lights one at a time — the room is never dark |
| **Blue-Green** | Two identical fest stages; set up the second, then move the spotlight |
| **Canary** | Taste one spoon before serving 500 guests |
| **Feature flag** | Bulb installed and wired, switch still off |
| **Rollback** | Ctrl + Z for production |

---

## 2. The three CDs — the question everyone gets asked

| Term | What it does | Human needed? |
|---|---|---|
| **Continuous Integration (CI)** | Every commit is automatically **built and tested** | No |
| **Continuous Delivery (CD)** | Every passing build is **ready** to release | **Yes — one click** |
| **Continuous Deployment (CD)** | Every passing build **goes live** automatically | No |

> **Memorise:** Delivery = *always ready*. Deployment = *actually deploys*.
> In our lab, the difference was literally one checkbox: **Required reviewers**.

---

## 3. The pipeline

```
Trigger → Build → Test → Quality checks → Package → Publish → Deploy → Verify
                                                                    ↓ problem
                                                                 Rollback
```

**Fail fast:** if any stage fails, everything stops. Cheap checks run before expensive ones.

**Golden rule — "build once, deploy many":** build **one** artifact and push that *same* one through
Dev → QA → Production. If you rebuild for production, you are shipping something **nobody tested**.

---

## 4. Workflow file anatomy

```yaml
name: CI                          # the name shown in the Actions tab

on:                               # WHEN to run
  push:
    branches: [ main ]
  pull_request:
  workflow_dispatch:              # a manual "Run workflow" button

jobs:                             # WHAT to do
  test:
    runs-on: ubuntu-latest        # a fresh computer, deleted after the run
    steps:
      - uses: actions/checkout@v4 # 'uses' = a ready-made tool
      - run: npm test             # 'run' = a command you type
```

| Remember | |
|---|---|
| File location | `.github/workflows/anything.yml` — **exact path or it won't run** |
| Indentation | **2 spaces, never Tab** |
| `needs: test` | Make one job wait for another |
| `matrix` | Run the same job on many versions **in parallel** |
| `paths-ignore` | Skip the pipeline for doc-only changes |

---

## 5. The words, and what they actually mean

| Word | In a workflow file | Plain English |
|---|---|---|
| **Workflow** | one `.yml` file in `.github/workflows/` | the whole pipeline |
| **Event** | `on:` | what starts it |
| **Job** | an entry under `jobs:` | a phase — jobs run **in parallel** unless you add `needs:` |
| **Step** | an item under `steps:` | one instruction |
| **Action** | `uses: actions/checkout@v4` | a reusable step someone else wrote |
| **Runner** | `runs-on: ubuntu-latest` | the fresh machine it runs on |
| **Secret** | `${{ secrets.X }}` | an encrypted value, never in the file |
| **Artifact** | `actions/upload-artifact` | the build output you can download |
| **Human approval** | `environment:` with reviewers | the pause before production |

**The tool changes. The concepts don't.** Learn the concepts once.

---

## 6. Testing

```
        E2E / UI tests      few · slow · most realistic
     Integration tests      some · seconds
          Unit tests        many · milliseconds · cheap
```

Industry mix: roughly **70% unit, 20% integration, 10% E2E**.

**Artifact** = the finished build output you actually ship (`.jar`, `.whl`, Docker image, `dist/` folder).
Stored in a **registry / repository**: Nexus, Artifactory, npm, PyPI, Docker Hub, GHCR.

**Never deploy `:latest`** — tag with the commit ID so you always know *exactly* what is running.

### Publishing an image after CI passes

```yaml
on:
  workflow_run:
    workflows: [ "CI" ]
    types: [ completed ]

jobs:
  publish:
    if: >-
      ${{ github.event.workflow_run.conclusion == 'success' &&
          github.event.workflow_run.head_branch == 'main' }}
```

**The exam trap \u2014 two guards, two different bugs.** `completed` also fires when CI **failed**, so
without the `conclusion` check a red build publishes itself. CI also runs on **pull requests**, so
without the `head_branch` check an unmerged PR can push an image. Log in with
`docker/login-action@v3` using a **Docker Hub access token** kept in `secrets.DOCKERHUB_TOKEN` —
never your password, never in the YAML.

---

## 7. Deployment strategies — high-scoring table

| | Recreate | Rolling | Blue-Green | Canary |
|---|---|---|---|---|
| Downtime | **Yes** | No | Near zero | No |
| Extra cost | None | None | **2×** | Small |
| Rollback speed | Slow | Slow | **Instant** | Instant |
| Users hurt if bad | 100% | Growing | 100% after flip | **1–5%** |
| Two versions at once | No | **Yes** | Briefly | **Yes** |
| Monitoring needed | Low | Medium | Medium | **High** |
| Best for | Internal tools | Default (Kubernetes) | Banking, payments | Big consumer apps |

- **Rolling** — replace servers in batches. Both versions run together, so keep the API and database **backward compatible**.
- **Blue-Green** — two full environments; flip the load balancer. Rollback = flip back.
- **Canary** — send 1% → 5% → 100% of traffic while watching error rates.
- **Feature flags** — deploy the code switched **off**, turn it on later. *Deployment ≠ Release.*

---

## 8. Security rules — non-negotiable

1. **Never** put a password, API key or token in code or YAML. Git history is **permanent**, and bots scan public repos within **seconds**.
2. Use encrypted **Secrets** → `${{ secrets.NAME }}`. They show as `***` in logs.
3. Give a job only the permissions it needs (`permissions: packages: write`).
4. Pin action versions (`@v4`), don't float.

---

## 9. Commands

```bash
git switch -c my-branch          # create a branch
git commit -am "message"         # save changes
git push -u origin my-branch     # send it to GitHub
git switch main && git pull      # get the latest

npm run lint                     # check for syntax mistakes
npm test                         # run the tests
npm run build                    # create dist/
npm start                        # run the app
```

Commit prefixes used in industry: `feat:` `fix:` `docs:` `test:` `ci:` `chore:`

---

## 10. When something breaks

| Problem | Fix |
|---|---|
| Workflow never appears | Wrong path — must be `.github/workflows/x.yml` |
| `mapping values are not allowed` | You used a **Tab**. Use 2 spaces |
| `push declined … protected branch` | Working as intended — use a branch + PR |
| Status check missing in settings | Run the pipeline once first |
| Works locally, fails in CI | Linux is **case-sensitive**: `Math.js` ≠ `math.js` |
| Test fails randomly | A **flaky test**. Fix it — never "re-run until green" |
| Pages shows 404 | Settings → Pages → Source: **GitHub Actions** |

---

## 11. Five answers worth memorising

1. **Delivery vs Deployment?** Delivery is always ready and a human approves; Deployment goes live automatically.
2. **Why build once, deploy many?** Rebuilding per environment means shipping an artifact nobody tested.
3. **Why does CI use `npm ci` / `mvn -B`?** It installs the **exact locked versions**, so builds are reproducible.
4. **Blue-Green vs Canary?** Blue-Green = instant rollback, 2× cost. Canary = smallest blast radius, needs strong monitoring.
5. **Where do secrets go?** In encrypted secrets — never in code, never in YAML, never in Git.

---

## 12. Stories worth remembering (they make great interview answers)

| Story | What it proves |
|---|---|
| **Knight Capital, 2012** — a manual deployment skipped 1 of 8 servers. Lost **$440 million in 45 minutes** and the company died | Manual deployment is a business risk, not a technical detail |
| **Ariane 5, 1996** — reused Ariane 4 code, never re-tested. Rocket exploded in **37 seconds**, **$370M** | Tests exist to prove code *still* works after something changes |
| **npm `left-pad`, 2016** — an **11-line** package was deleted and thousands of builds worldwide failed | Why companies run their own artifact repository as a caching proxy |
| **SolarWinds, 2020** — attackers compromised the **build server**, not the customers | Your pipeline holds the keys to production. It is a target |
| **Amazon, 2011** — reported a deployment every **11.6 seconds** | At that speed, zero humans can test each release |
| **Grace Hopper, 1947** — a real **moth** in a relay, taped into the logbook | Where the word "bug" comes from |
| **Coal-mine canaries** (used until 1986) | Why 1% of users go first in a canary deployment |
| **GitHub Actions, 2019** — CI moved *inside* the place the code already lived | The winning tool is usually the one with no setup step |

---

> **The one sentence to remember:**
> **CI/CD is not a tool. It is making the path from "code on my laptop" to "value for a user"
> automatic, repeatable, fast and reversible.**
