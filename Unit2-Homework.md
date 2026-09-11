# Unit 2 — Homework
### CI/CD Pipeline and DevOps Automation

Work in your `cicd-lab` repo. Every change must go through a **Pull Request**; `main` stays protected.

**T5–T7 are catch-up tasks** — if you finished Labs 3 and 4 in class you already have them, just
submit the evidence. **T1, T4 and T8 are new work.**

---

## Part 1 — Practical

| Task | New? |
|---|---|
| **T1.** Add a `power(a, b)` function to `math.js` **plus 3 tests** (include one edge case). Merge with a green PR. | 🆕 |
| **T2.** Push a **failing** test on a branch. Screenshot the PR showing the ❌ **and** the greyed-out Merge button. | |
| **T3.** Fix it, push to the same branch, screenshot the ✅, merge. | |
| **T4.** Make the pipeline also run every night at 2 AM IST using `on: schedule`. Show one manual run. | 🆕 |
| **T5.** Make the `build` job upload `dist/` as an artifact. Screenshot the downloadable artifact. | |
| **T6.** Add the CI status badge to `README.md`. | |
| **T7.** Deploy to GitHub Pages from the pipeline, keeping the `production` approval gate. Submit the **live URL**. | |
| **T8.** Add `paths-ignore: [ '**.md' ]` to the **push** trigger. Prove it with two merged PRs: one that changes **only** `README.md` (after merging, no new run appears in the Actions tab) and one that changes `math.js` (a run does appear). Screenshot the Actions tab in both cases. | 🆕 |

---

## Part 2 — Written: choose a deployment strategy

In **400–500 words**, pick a strategy for **each** case and justify it. For every case mention
downtime, cost, rollback speed, blast radius and monitoring — three cases, so keep it tight.

| Scenario | Hint |
|---|---|
| (a) A **college result portal** on results day | Huge 3-hour traffic spike, downtime unacceptable, small budget |
| (b) A **UPI payment app** used by 20 million people | A bug costs money and trust; rollback must be instant; regulated |
| (c) An internal **HR leave tool** for 200 employees | Nobody uses it at 11 PM; cheapest option wins |

A strong answer makes an explicit trade-off between **downtime × cost × rollback speed × blast radius
× monitoring maturity** — not just naming a strategy.

---

## Part 3 — Reflection

1. Your pipeline took *X* seconds. If 30 developers each push 5 times a day, how much **waiting** does
   the pipeline cost the team per day? Give one concrete way to reduce it.
2. Describe one bug that CI could **not** have caught. Which pipeline stage would you add to catch it?


---

## Practice questions for the viva

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

---

## Optional bonus — Mini Project (teams of 3)

Build any small web app (quiz, to-do, attendance tracker) with a complete pipeline:

- [ ] Protected `main` with required status checks
- [ ] CI: lint + tests on at least 2 Node versions
- [ ] A build job with `needs:` that uploads an artifact
- [ ] A Docker image published to Docker Hub, tagged with the commit SHA
- [ ] Automatic deploy to staging, and production behind a **required reviewer**
- [ ] A rollback procedure written in the README

**Demo day:** push a bug live, let the class watch the pipeline block it, then fix and ship.
