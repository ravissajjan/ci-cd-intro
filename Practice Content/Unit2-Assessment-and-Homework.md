# Unit 2 — Assessment, Quiz & Homework
### CI/CD Pipeline and DevOps Automation

---

## Part A — Quick Quiz (10 questions, 10 min)

Use at 13:20 as a wrap-up, or at the start of the next session as a recap.
Project or read out **A1**; keep **A2** to yourself.

### A1 — Questions (project this / paste into a Google Form)

1. Continuous Delivery vs Continuous Deployment — in one line.
2. Where exactly must a workflow file be saved?
3. What is a **runner**?
4. Difference between `uses:` and `run:`?
5. What does `needs: test` do?
6. What does **"build once, deploy many"** mean, and why does it matter?
7. Name the 3 levels of the test pyramid, bottom to top.
8. Which deployment strategy gives **instant rollback**, and why is it expensive?
9. Which deployment strategy has the **smallest blast radius**?
10. Where do you keep a password that your pipeline needs?

**Tie-breaker:** which single checkbox turns Continuous **Deployment** into Continuous **Delivery**?

### A2 — Answer key

| # | Answer |
|---|---|
| 1 | Delivery = always **ready**, a human approves. Deployment = goes to production **automatically**. |
| 2 | `.github/workflows/<name>.yml` |
| 3 | The fresh, temporary machine that runs your pipeline |
| 4 | `uses` = a ready-made tool; `run` = a command you type |
| 5 | Makes a job wait until the `test` job passes |
| 6 | Build one artifact and promote that same one through environments — rebuilding means shipping something nobody tested |
| 7 | Unit → Integration → E2E/UI |
| 8 | Blue-Green — you keep two full production environments (2× cost) |
| 9 | Canary (only 1–5% of users get the new version) |
| 10 | In encrypted **secrets** — never in code or YAML |
| Tie | **"Required reviewers"** on a protected Environment |

---

## Part B — Homework (due before the next session)

Work in your `cicd-lab` repo. Every change must go through a **Pull Request**; `main` stays protected.

### B1. Practical (60 marks)

**The pipelines ship complete**, so the work here is *changing* them and proving the change.
**T1, T4, T8 and the optional T9 are new work.** T2, T3, T5, T6 and T7 may already exist from class —
those are evidence tasks.

| Task | New? | Marks |
|---|---|---|
| **T1.** Add a `power(a, b)` function to `math.js` **plus 3 tests** (include one edge case). Merge with a green PR. | 🆕 | 10 |
| **T2.** Push a **failing** test on a branch. Screenshot the PR showing the ❌ **and** the greyed-out Merge button. | | 10 |
| **T3.** Fix it, push to the same branch, screenshot the ✅, merge. | | 5 |
| **T4.** Make `ci.yml` also run every night at 2 AM IST using `on: schedule`. Show one run. | 🆕 | 10 |
| **T5.** Download the artifact the `build` job produced and screenshot the **Artifacts** box. | | 5 |
| **T6.** Add the CI status badge to `README.md`. | | 5 |
| **T7.** Turn on Pages and add a **required reviewer** on `production`. Submit the live URL plus a screenshot of the job showing *Waiting — Review deployments*. | | 10 |
| **T8.** Add `paths-ignore: [ '**.md' ]` to the **push** trigger. Prove it with two merged PRs: one that changes **only** `README.md` (after merging, no new run appears in the Actions tab) and one that changes `math.js` (a run does appear). Screenshot the Actions tab in both cases. | 🆕 | 5 |
| **T9.** *(optional bonus, +5)* Finish Lab 3D: add the Docker Hub secrets and screenshot the image showing **both** tags — commit SHA and `latest`. | 🆕 | — |

### B2. Written — choose a deployment strategy (30 marks)

In **400–500 words**, pick a strategy for **each** case and justify it. For every case mention
downtime, cost, rollback speed, blast radius and monitoring — that's 5 points × 3 cases, so keep it tight.

| Scenario | Hint |
|---|---|
| (a) A **college result portal** on results day | Huge 3-hour traffic spike, downtime unacceptable, small budget |
| (b) A **UPI payment app** used by 20 million people | A bug costs money and trust; rollback must be instant; regulated |
| (c) An internal **HR leave tool** for 200 employees | Nobody uses it at 11 PM; cheapest option wins |

### B3. Reflection (10 marks)

1. Your pipeline took *X* seconds. If 30 developers each push 5 times a day, how much **waiting** does
   the pipeline cost the team per day? Give one concrete way to reduce it.
2. Describe one bug that CI could **not** have caught. Which pipeline stage would you add to catch it?

### Submission
One PDF named `Unit2_<USN>_<Name>.pdf` containing:
1. Repository URL (public) + live deployed URL
2. Screenshots for T2, T3, T4, T5, T7, **both** T8 screenshots, and T9 if attempted
3. Written answers for B2 and B3

---

## Part C — How each task is marked

> **There is only one mark scheme: Part B, totalling 100.**
> This section is not a second set of marks — it tells you *how* to award the marks for each
> Part B task. Use the descriptors to decide full / partial / minimal credit.

| Applies to | Full marks | About 60% | About 30% |
|---|---|---|---|
| **T1** — new function + tests | Real assertions, includes an edge case and an error case | Only happy-path tests | Tests that assert nothing |
| **T2, T3** — red PR then green | Merge visibly blocked, then fixed on the *same* branch | Red and green shown, but merged around the rule | Screenshots missing or unclear |
| **T4** — scheduled run | Correct cron for 2 AM IST (`30 20 * * *`, UTC) with a successful run | Schedule present but wrong time | Syntax added, never ran |
| **T5** — artifact | Correct artifact downloaded and shown, `needs:` ordering understood | Screenshot unclear | Not attempted |
| **T6, T7** — badge + deploy | Badge green, live URL opens, approval pause evidenced | Deployed but no approval screenshot | URL dead |
| **T8** — path filter | Both screenshots prove it: doc-only commit skipped, code commit ran | Syntax added, only one case shown | Not attempted |
| **All practical tasks** | Every change through a PR, `main` protected, no secrets in code, action versions pinned | Some direct pushes to `main` | One giant commit, no branches |
| **B2** — written | Correct strategy for each case with cost / rollback / blast-radius reasoning | Correct choices, thin reasoning | Buzzwords, no reasoning |
| **B3** — reflection | Shows real arithmetic and a concrete improvement | Vague answer | Not attempted |

**Automatic deductions (applied after totalling Part B)**
- Any credential committed to the repo: **−15** (and rotate it immediately)
- Repo not public, or the link doesn't work: **−10**
- Missing screenshot: **−5 each**

---

## Part D — Viva Question Bank

**Level 1 — recall**
1. Expand CI, CD, CD.
2. Name four pipeline triggers.
3. What is an artifact? Give two examples.
4. What is a container registry?
5. What does `runs-on: ubuntu-latest` mean?

**Level 2 — understanding**
6. Jobs run in parallel by default. How do you force an order?
7. Why run the pipeline on Pull Requests and not just on push?
8. Why must the runner be a fresh machine every time?
9. Webhook vs polling — which is better and why?
10. Why does `npm ci` exist when `npm install` already works?

**Level 3 — judgement**
11. Your pipeline takes 45 minutes. Give four ways to speed it up.
12. During a rolling deployment two versions run at once. What can break, and how do you prevent it?
13. A test fails 1 run in 10. Your teammate says "just re-run it." Argue for or against.
14. You must deploy at 11 AM on the busiest day of the year. Which strategy, and why?
15. A developer says "the build server has the wrong Node version, let me log in and fix it." Which DevOps principle is being broken?
    *(Answer: builds must be reproducible and infrastructure must be code — no hand-tweaked servers.)*

---

## Part E — Mini Project (optional bonus, teams of 3, 1 week)

Build any small web app (quiz, to-do, attendance tracker) with a complete pipeline:

- [ ] Protected `main` with required status checks
- [ ] CI: lint + tests on at least 2 Node versions
- [ ] A build job with `needs:` that uploads an artifact
- [ ] A Docker image published to Docker Hub, tagged with the commit SHA
- [ ] Automatic deploy to staging, and production behind a **required reviewer**
- [ ] A rollback procedure written in the README

**Demo day (10 min per team):** push a bug live, let the class watch the pipeline block it, then fix and ship.

**Marks:** pipeline completeness 40 · Git history & teamwork 20 · security practices 15 · rollback plan 15 · demo 10.

---

## Part F — Instructor Answer Key for B2

- **(a) Result portal — Rolling.** Traffic is mostly read-only, no money at risk, budget is tight.
  Rolling gives zero downtime at no extra infrastructure cost. Pre-scale before the spike and cache
  results behind a CDN. Big-bang is unacceptable: downtime on results day is a public failure.
- **(b) UPI app — Canary, with Blue-Green for the final flip.** Financial correctness means the blast
  radius must be tiny, so route 1% of traffic and watch error rate, latency and transaction success.
  Rollback must be instant, which Blue-Green provides. The cost is justified by the risk. Requires
  strong monitoring, feature flags and backward-compatible database migrations. Being regulated, it
  should be Continuous **Delivery** with an audited approval gate, not automatic deployment.
- **(c) HR tool — Recreate / big-bang** in a night-time maintenance window. 200 internal users,
  downtime at 11 PM harms nobody, and paying for Blue-Green infrastructure here is over-engineering.

**Full marks require an explicit trade-off** between downtime × cost × rollback speed × blast radius × monitoring maturity.
