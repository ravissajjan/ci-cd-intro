# cicd-lab — starter files

<!-- Replace <user> with your GitHub username - you do this in Lab 2B -->
![CI](https://github.com/<user>/cicd-lab/actions/workflows/ci.yml/badge.svg)

Copy these files into your own `cicd-lab` repository — **except the `.github` folder**.
Those workflow files are the finished answers; you write them yourself during the labs.
No libraries to install. You only need **Node.js 20+**.

## Files

| File | What it is |
|---|---|
| `math.js` | 4 small functions |
| `math.test.js` | 5 tests for those functions |
| `app.js` | a 15-line web server |
| `index.html` | the web page |
| `build.js` | copies the page into a `dist` folder (this is our "build") |
| `package.json` | the commands: lint, test, build, start |
| `Dockerfile` | packages the app into a container image |
| `.dockerignore` | keeps `node_modules`, `dist` and `.git` out of the image |
| `.github/workflows/ci.yml` | *(answer key)* test on 3 Node versions → build + artifact → image smoke test |
| `.github/workflows/cd.yml` | *(answer key)* after CI passes: push to Docker Hub, deploy to Pages, approval gate |

## Run it on your laptop

```bash
npm run lint     # checks for syntax mistakes
npm test         # runs the 5 tests
npm run build    # creates the dist folder
npm start        # open http://localhost:3000
```

## Break it on purpose

In `math.js`, change `add` to `return a - b;`, push it on a branch, open a Pull Request
and watch the pipeline turn red.

## Docker (optional)

```bash
docker build -t cicd-lab .
docker run -p 3000:3000 cicd-lab
curl http://localhost:3000/health     # the check CI runs against the container
```

### Publishing to Docker Hub

`cd.yml` pushes the image automatically **after the CI workflow succeeds**. It needs two
repository secrets — *Settings → Secrets and variables → Actions*:

| Secret | Value |
|---|---|
| `DOCKERHUB_USERNAME` | your Docker Hub username |
| `DOCKERHUB_TOKEN` | an **access token** from Docker Hub → Account settings → Personal access tokens |

Use an access token, never your password — a token can be revoked on its own.
The image is tagged twice: with the **commit SHA** (so you can always identify exactly what shipped)
and with `latest`.
