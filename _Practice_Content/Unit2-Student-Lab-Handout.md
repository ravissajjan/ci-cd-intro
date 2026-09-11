# Unit 2 — Student Lab Handout
### CI/CD Pipeline and DevOps Automation

> Tick each box as you finish. Raise your hand at every ✅ CHECKPOINT.

**Your repo for today:** `https://github.com/<your-username>/cicd-lab` (must be **Public**)

---

## ⚠️ DO THIS BEFORE THE SESSION (15 min at home)

Read **`Unit2-Before-We-Start.md`** and finish its install checklist. Come to class with:

- [ ] `git --version` works
- [ ] `node --version` shows **v20 or higher**
- [ ] VS Code installed
- [ ] GitHub account created, and you can log in
- [ ] A **Personal Access Token** saved in a text file *(this is your push password)*
- [ ] An **empty Public repo called `cicd-lab`** on github.com — created **without** a README,
      .gitignore or licence. It must be completely empty or your first push will be rejected.

> If you arrive without these, you will spend the first hour installing instead of learning.
> Everyone else will be building pipelines.

---

## 🔴 Keep your repo PUBLIC all day

There is **nothing to install** for GitHub Actions — it runs on GitHub's computers. But on a free
GitHub account, these features only work on a **public** repository:

| Feature | You need it in |
|---|---|
| Branch protection | Lab 2C |
| Environments + approval gate | Lab 4.3 |
| GitHub Pages | Lab 4 |
| Unlimited pipeline minutes | All day |

If you make the repo private, those settings **disappear from your menu** and you'll think you broke
something. So: **public repo — and never put a real password in it.**

### Settings you will change today

| Setting | Where | Lab |
|---|---|---|
| Secret `MY_SECRET` | Settings → Secrets and variables → Actions | 3B |
| Branch protection on `main` | Settings → Branches | 2C |
| Pages source = GitHub Actions | Settings → Pages | 4.1 |
| Environment `production` + reviewer | Settings → Environments | 4.3 |

---

## LAB 0 — Connect your folder to GitHub (15 min)

```bash
mkdir cicd-lab
cd cicd-lab
git init -b main

git config --global user.name "Your Name"
git config --global user.email "your-github-email@example.com"

echo "# CI/CD Lab" > README.md
git add .
git commit -m "first commit"
```

Now connect it to the empty `cicd-lab` repo you created in the pre-work:

```bash
git remote add origin https://github.com/<your-username>/cicd-lab.git
git push -u origin main
```

> When it asks for a password, paste your **Personal Access Token** — not your GitHub password.

Practise the branch + Pull Request flow (Unit 1 revision):

```bash
git switch -c my-branch
echo "Author: Your Name" >> README.md
git commit -am "add author"
git push -u origin my-branch
```
On GitHub: **Compare & pull request → Create → Merge**. Then:
```bash
git switch main
git pull
```

- [ ] Repo is on GitHub and Public
- [ ] One merged Pull Request

**✅ CHECKPOINT 0**

---

## LAB 1 — Your first pipeline (45 min)

### 1.1 Add the app (10 min)

Copy **everything** from the `lab-starter` folder into your `cicd-lab` folder, including the hidden
`.github` folder.

App files: `math.js`, `math.test.js`, `app.js`, `index.html`, `build.js`, `package.json`,
`Dockerfile`, `.dockerignore`, `.gitignore`.
Pipeline files: `.github/workflows/ci.yml` and `.github/workflows/cd.yml`.

> ⚠️ On Windows, File Explorer hides folders that start with a dot. Turn on **View → Show → Hidden
> items**, or copy the folder from inside VS Code, or you will silently miss `.github` and nothing
> will run.

> The workflow files are already written for you — today is about **understanding and running** a
> pipeline, not about memorising YAML. You will read each job as you reach it, then watch it work.

Check them:

```bash
npm run lint
npm test
npm start        # open http://localhost:3000 , then press Ctrl+C
```

- [ ] All 5 tests pass
- [ ] The page opens

> **Rule:** if it fails on your laptop, it will fail in CI. CI is not magic — it runs the same commands on a clean computer.

### 1.2 Look at the files (5 min)

**math.js** — the code being tested:
```js
function add(a, b) {
  return a + b;
}
```

**math.test.js** — the test:
```js
test('add works', () => {
  assert.equal(add(2, 3), 5);
});
```

That's it. A test just says *"I expect this answer"*. If the answer is different, the test fails and the pipeline turns red.

### 1.3 Read the workflow file (10 min)

Open `.github/workflows/ci.yml`. The path is exact — a workflow file anywhere else is ignored.
Here is the top of it, and the first job:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [ '20', '22', '24' ]
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}

      - run: npm run lint
      - run: npm test
```

**What each line means:**

| Line | Meaning |
|---|---|
| `on:` | **When** to run — on push, on a PR, or when you click the button |
| `permissions:` | What this workflow is allowed to touch. `contents: read` = look, don't change |
| `concurrency:` | Push twice quickly and the older run is **cancelled** — you only wait for the latest code |
| `jobs:` | The work to do |
| `runs-on: ubuntu-latest` | A brand-new computer given to you by GitHub, then deleted |
| `strategy: matrix:` | Run this job once per Node version, **all at the same time** |
| `steps:` | The instructions, one after another |
| `uses:` | Use a ready-made tool someone else wrote |
| `run:` | Type a command yourself |

> 🎭 **Think of it like a hotel room.** GitHub gives you a clean computer, you use it for two
> minutes, and housekeeping wipes it completely. That's why your pipeline can never depend on
> a file sitting on your desktop — that machine has never seen your desktop.

**YAML rules:** 2 **spaces** to indent. **Never a Tab.**

### 1.4 Push and watch (10 min)

> 🎯 **Predict first — write it down before you push:**
> Will this go **green** or **red**? _______ How many seconds will it take? _______

```bash
git add .
git commit -m "add pipeline"
git push
```

Go to **GitHub → your repo → Actions**.

- [ ] I see a yellow dot, then a green tick ✅
- [ ] I clicked the run and expanded every step to read the log
- [ ] My pipeline took `______` seconds

### 1.5 Break it on purpose (10 min) — the most important step today

In `math.js` change `add` to:
```js
function add(a, b) {
  return a - b;      // wrong on purpose
}
```

```bash
git switch -c bug-branch
git commit -am "add a bug"
git push -u origin bug-branch
```

Open a Pull Request.

- [ ] The PR shows a red ❌
- [ ] I clicked **Details** and found the line in the log that says the test failed
- [ ] I fixed it back to `a + b`, pushed again to the **same branch**, and it turned green ✅
- [ ] I merged the PR

**Write the answer:** how many seconds did the pipeline take to catch the bug? If there were no pipeline, who would have found it, and when?

> 📖 **DEFINITION — Continuous Integration (CI)**
> Every commit is automatically **built and tested** by a machine, several times a day.

> 📌 **WHAT YOU JUST LEARNED**
> 1. A workflow file must live at `.github/workflows/*.yml` — exact path, 2 spaces, no Tab.
> 2. `uses:` borrows a ready-made tool; `run:` types a command.
> 3. The runner is a **fresh computer**, deleted after the run — so builds can't depend on your laptop.
> 4. A red ❌ is not failure. It is the system **working**.

**✅ CHECKPOINT 1**

---

## LAB 2 — Make the pipeline stronger (30 min)

### 2A. Test on more than one Node version (8 min)

You already saw this happen in Lab 1 — **three** `test` jobs ran, not one. Look again at why:

```yaml
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [ '20', '22', '24' ]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm run lint
      - run: npm test
```

One job definition, three real jobs. GitHub runs the job once for every value in the list, and
`${{ matrix.node-version }}` is replaced with `20`, `22` and `24` in turn.

- [ ] In my last run I can see **3 jobs that ran at the same time**

> 🎯 **Predict first:** 3 jobs instead of 1 — did it take **3× longer**, **2× longer**, or
> **about the same**? _______ Now check the actual time.

> 🎭 Like testing your app on **Android 12, 13 and 14 at the same time** — not one after another.

**Question:** why does running 3 jobs take almost the same time as running 1?

### 2B. Status badge (2 min — skip if you're running behind, it's homework T6)

Add this to the top of `README.md` (replace `<user>`):

```markdown
![CI](https://github.com/<user>/cicd-lab/actions/workflows/ci.yml/badge.svg)
```

- [ ] The green badge shows on my repo home page

### 2C. Branch protection — this is the important one (20 min)

Right now the pipeline is only a *suggestion*. Let's make it a *rule*.

**Settings → Branches → Add branch protection rule** (or **Rules → Rulesets**):
- Branch name pattern: `main`
- ✅ Require a pull request before merging
- ✅ Require status checks to pass before merging → in the search box type `test` and select **all three**: `test (20)`, `test (22)`, `test (24)`
- Save

> ⚠️ The check is no longer called just `test`. Because of the matrix, each Node version gets its
> own check name. If a check doesn't appear in the search box, run the pipeline once — GitHub only
> lists checks it has already seen.

Now break a test again on a new branch and open a PR.

> 🎯 **Predict first:** try to click **Merge**. What do you think will happen? _______

> 🎭 Branch protection is the **exam invigilator**. You can write whatever you like on your
> answer sheet — but nothing leaves the hall unchecked.

- [ ] The **Merge** button is greyed out and cannot be clicked
- [ ] I took a screenshot (needed for homework)
- [ ] I closed that PR and deleted the branch

> Your pipeline now has more authority over `main` than you do. That is on purpose.

### ⚠️ From here on, `main` is locked

You can no longer run `git push` straight to `main`. Every change in Lab 3 and Lab 4 must go through
a branch and a Pull Request:

```bash
git switch main
git pull
git switch -c my-next-change
# ...edit files...
git commit -am "my change"
git push -u origin my-next-change
# then open the PR on GitHub, wait for green, and merge
```

This is exactly how you will work in a company. Get used to it now.

> 📖 **DEFINITION — Branch protection**
> A rule on a branch (usually `main`) that blocks merging until the required checks pass.

> 📖 **DEFINITION — Matrix build**
> Running the same job across several versions or operating systems **in parallel**.

> 📌 **WHAT YOU JUST LEARNED**
> 1. A matrix tests many versions in the time of one, because jobs run **in parallel**.
> 2. Without branch protection, CI is a **suggestion**. With it, CI is a **contract**.
> 3. Real teams cannot push to `main` — and now, neither can you.

**✅ CHECKPOINT 2**

---

## LAB 3 — Build artifacts and publishing (20 min + optional 10)

An **artifact** is the finished thing your pipeline produces — the file you actually ship.

> 🎭 **Building** is packing a **tiffin box**. Ingredients on the counter are your source code;
> a sealed, labelled tiffin you can carry anywhere is the **artifact**. The **registry** is the
> fridge where all the labelled tiffins are kept.
>
> And you never re-cook the food for each person — one dish, many plates.
> That's the rule called **"build once, deploy many"**.

### 3A. The build job (10 min)

Find the `build` job in `ci.yml`, below the `test` job:

```yaml
  build:
    needs: test            # runs only if the tests passed
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: my-app
          path: dist/
```

The important line is `needs: test`. Without it, `build` would start **immediately, in parallel**
with the tests — and you could package code that was failing.

Open your most recent run in the **Actions** tab.

- [ ] `build` started only **after** all three `test` jobs finished
- [ ] At the bottom of the run page there is an **Artifacts** box
- [ ] I downloaded `my-app.zip` and opened it

**Question:** what happens to `build` if a test fails?

### 3B. Secrets — never put passwords in code (5 min)

1. **Settings → Secrets and variables → Actions → New repository secret**
   Name: `MY_SECRET`, Value: `hello123`
2. Add this step to the test job:
   ```yaml
      - run: echo "The secret is ${{ secrets.MY_SECRET }}"
   ```
3. Push and read the log.

- [ ] The log printed `***` instead of `hello123`

> Never type a password, token or API key into your code. Git remembers everything forever, and bots scan public repos within seconds.

### 3C. Docker (optional — watch the demo) (5 min)

The `Dockerfile` packs your app + Node.js + the OS into one image:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json app.js index.html ./
USER node
EXPOSE 3000
CMD ["node", "app.js"]
```

```bash
docker build -t cicd-lab .
docker run -p 3000:3000 cicd-lab
```

"It works on my machine" → now you can **ship the machine**.

> We copy **named files**, not `COPY . .`, and drop to `USER node` instead of root. An image should
> contain the app and nothing else, and it should not run as the most powerful user on the machine.

**CI checks the container too.** Your tests prove the *code* works. They say nothing about whether
the *image* actually starts. That is the third job in `ci.yml`:

```yaml
  image:
    needs: build           # only package code that tested and built cleanly
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build the image
        run: docker build -t cicd-lab:ci .

      - name: Smoke test the image
        run: |
          docker run -d --name smoke -p 3000:3000 cicd-lab:ci
          for i in $(seq 1 10); do
            if curl -fs http://localhost:3000/health; then
              echo "container is healthy"
              exit 0
            fi
            sleep 1
          done
          echo "container never answered /health"
          docker logs smoke
          exit 1

      - name: Remove the test container
        if: always()
        run: docker rm -f smoke
```

The loop asks *"are you alive yet?"* once a second, up to ten times, and stops the moment it gets an
answer. The lazy version would be `sleep 3` then one check — but a container that takes four seconds
would then fail at random. **Never guess how long something takes; retry until it works or give up
loudly.** If all ten tries fail it prints the container's own log, so you can see why.

`if: always()` on the last step means the container is removed **even when the smoke test failed** —
otherwise a failure would leave rubbish behind on the runner.

- [ ] The `image` job is green and its log prints `OK`

> This is what `/health` in `app.js` was always for. A **smoke test** asks one question — "is it
> alive?" — and it catches the whole class of bugs where the code is perfect but the image is broken.

### 3D. Push the image to Docker Hub, automatically (10 min — do it now or finish it as homework)

Building an image in CI is only half the job. Now let's **publish** it — and only when the tests passed.

**Step 1 — get a Docker Hub token** (never use your password):
1. Sign in at `https://hub.docker.com` → **Account settings → Personal access tokens**
2. **Generate new token**, name it `github-actions-lab`, give it **Read & Write**
3. Copy the token — it is shown **once**

**Step 2 — store it in GitHub:** *Settings → Secrets and variables → Actions → New repository secret*

| Name | Value |
|---|---|
| `DOCKERHUB_USERNAME` | your Docker Hub username |
| `DOCKERHUB_TOKEN` | the token you just copied |

**Step 3 — read `.github/workflows/cd.yml`:**

This is your **CD** pipeline — everything that happens *after* CI goes green. It is already in your
repo; the two secrets above are what switch it on.

```yaml
name: CD

on:
  workflow_run:
    workflows: [ "CI" ]      # wait for the workflow called CI
    types: [ completed ]
  workflow_dispatch:         # ...or run it by hand

permissions:
  contents: read

concurrency:
  group: cd
  cancel-in-progress: false

jobs:
  # The single decision point: is this commit allowed to ship at all?
  gate:
    if: >-
      ${{ github.event_name == 'workflow_dispatch' ||
          (github.event.workflow_run.conclusion == 'success' &&
           github.event.workflow_run.head_branch == 'main') }}
    runs-on: ubuntu-latest
    outputs:
      sha: ${{ steps.commit.outputs.sha }}
    steps:
      - id: commit
        run: echo "sha=${{ github.event.workflow_run.head_sha || github.sha }}" >> "$GITHUB_OUTPUT"

  publish-image:
    needs: gate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ needs.gate.outputs.sha }}

      - uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: |
            ${{ secrets.DOCKERHUB_USERNAME }}/cicd-lab:${{ needs.gate.outputs.sha }}
            ${{ secrets.DOCKERHUB_USERNAME }}/cicd-lab:latest
```

Once both secrets are saved, push any small change through a PR and watch **Actions**.

- [ ] CI finished green, and **then** the **CD** workflow started **by itself**
- [ ] My image is visible on `hub.docker.com` under my username
- [ ] It has **two tags**: a long commit SHA, and `latest`
- [ ] A classmate ran `docker run -p 3000:3000 <myname>/cicd-lab:latest` and saw my page

> 🎯 **Predict first:** if a test fails, does the image still get pushed? _______

**The trap, and the whole point of this step:** that `if:` block is doing **two** jobs.
`completed` also fires when CI **failed** — without the `conclusion` check, every red build would
publish itself. And CI also runs on **pull requests** — without the `head_branch` check, anyone
opening a PR could push an image to your Docker Hub account. Delete either line and you have a bug
that only shows up in production.

**Why a separate `gate` job?** Two reasons. It states the shipping rule **once**, instead of copying
that `if:` onto every job. And it works out *which commit* to ship: a `workflow_run` workflow starts
on the default branch, so `gate` captures the exact SHA that CI tested and hands it to the other jobs
as `needs.gate.outputs.sha`. Without that, you could test one commit and ship a different one.

> 🎭 Tagging with the commit SHA is the **batch number on a medicine strip**. When something goes
> wrong in production you must be able to ask "exactly which build is running?" — `latest` can
> never answer that. Deploy the SHA; `latest` is only a convenience.

> 📖 **DEFINITION — Artifact**
> The finished, versioned output of a build — the exact thing you deploy.

> 📖 **DEFINITION — Registry**
> A server that stores build artifacts and container images (Docker Hub, GHCR, Nexus, npm, PyPI).

> 📌 **WHAT YOU JUST LEARNED**
> 1. `needs:` creates **order** — no artifact is built from code that failed its tests.
> 2. **Build once, deploy many**: build one artifact and promote that same one everywhere.
> 3. Secrets go in **encrypted secrets**, never in code. Logs show `***`.
> 4. A container image bundles your code **and** its runtime **and** its OS libraries.
> 5. `workflow_run` **chains** one workflow to another — publish only after CI says success.
> 6. Tag images with the **commit SHA**. `latest` cannot tell you what is actually running.

**✅ CHECKPOINT 3**

---

## LAB 4 — Deploy it (12 min)

### 4.1 Turn on GitHub Pages
**Settings → Pages → Source: GitHub Actions**

> ⚠️ **If you skip this you will see:**
> `Error: Get Pages site failed. Please verify that the repository has Pages enabled...`
> It means the repo has no Pages site yet, so there is nothing for the workflow to publish to.
> Our `cd.yml` passes `enablement: true`, which tries to switch Pages on for you — but if that
> fails, set it here by hand and re-run the workflow.

### 4.2 The deploy jobs in `cd.yml`

Open `cd.yml` again. Below `publish-image` are the two jobs that put your page on the internet:

```yaml
  staging:
    needs: gate
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ needs.gate.outputs.sha }}
      - run: npm run build
      - uses: actions/configure-pages@v5
        with:
          enablement: true       # switches Pages on if Settings -> Pages was never touched
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deploy
        uses: actions/deploy-pages@v4

  production:
    needs: [ gate, staging ]     # gate is listed so we can read its sha output
    runs-on: ubuntu-latest
    environment: production      # add a Required reviewer here to pause for approval
    steps:
      - run: echo "Deploying ${{ needs.gate.outputs.sha }} to production..."
```

> `staging` hangs off `gate`, **not** off `publish-image` — so your site deploys even if you never
> set up Docker Hub. Same gate, two independent delivery paths running in parallel.

Push any small change through a PR and merge it. Merging into `main` runs CI; a green CI starts CD.

- [ ] My site is live — I opened `https://<user>.github.io/cicd-lab/` **on my phone**

### 4.3 Add the approval gate

**Settings → Environments → New environment → `production`**
→ ✅ **Required reviewers** → add **yourself** → Save.

Run the workflow again (**Actions → CD → Run workflow**, or merge any small PR).

- [ ] The `production` job says **Waiting** with a *Review deployments* button
- [ ] I clicked Approve and it ran

**Write the answer:** before you added the reviewer, was this Continuous **Delivery** or Continuous **Deployment**? What about after?

> 📖 **DEFINITION — Continuous Delivery**
> Every passing build is kept **ready to release**; a human approves the final step.

> 📖 **DEFINITION — Continuous Deployment**
> The same, but the release to production happens **automatically**, with no human click.

> 📌 **WHAT YOU JUST LEARNED**
> 1. A pipeline can deploy to a **real, public URL** with nobody touching a server.
> 2. An **approval gate** is the single difference between Delivery and Deployment.
> 3. `environment:` is how you attach reviewers, URLs and protection rules to a deployment.

**✅ CHECKPOINT 4 — you're done 🎉**

---

## If you finish early

- [ ] Add a `power(a, b)` function to `math.js` with 2 tests, merged through a green PR
- [ ] Make the pipeline run every night: `on: schedule: [ { cron: '30 20 * * *' } ]`
- [ ] Make the pipeline skip README-only changes: `paths-ignore: [ '**.md' ]`
- [ ] Run the `CD` workflow manually from the Actions tab and watch the `gate` job decide

---

## Command cheat sheet

```bash
git status                    # what changed
git switch -c my-branch       # new branch
git commit -am "message"      # save changes
git push -u origin my-branch  # send branch to GitHub
git switch main
git pull                      # get the latest

npm run lint
npm test
npm run build
npm start
```
