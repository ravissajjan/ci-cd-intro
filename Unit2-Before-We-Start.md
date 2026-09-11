# Before We Start — A Quick Primer
### Read this before the CI/CD session. Nothing here is hard.

You will type a few commands today. This page explains the words so nothing feels like magic.

---

## 1. The terminal

The terminal is a window where you **type commands instead of clicking**.

| Your computer | How to open it |
|---|---|
| Windows | Press `Windows` key → type **PowerShell** → Enter |
| Mac | Press `Cmd + Space` → type **Terminal** → Enter |
| Inside VS Code | Menu **Terminal → New Terminal** (easiest — use this one) |

Three commands you'll use constantly:

```bash
cd my-folder      # go into a folder ("change directory")
cd ..             # go back out one folder
dir      (Windows)
ls       (Mac)    # list what's in this folder
```

If a command "does nothing" and just shows a new line — that usually means **it worked**. Silence is success.

---

## 2. Node.js

**Node.js runs JavaScript on your computer**, outside a web browser.

Normally JavaScript only runs inside Chrome. Node lets you run it like any other program, so we can build a small web app and run tests on it.

Check you have it:
```bash
node --version      # must show v20 or higher
```

> Nothing printed, or an error like *"not recognized"*? Jump to **section 6** — it walks through
> installing Node on Windows, including what to do without administrator rights.

---

## 3. npm and "npm scripts"

**npm** comes free with Node.js. Think of it as Node's **command shortcut list**.

Open `package.json` and you'll see:

```json
"scripts": {
  "test": "node --test",
  "start": "node app.js"
}
```

That means:

| You type | What actually runs |
|---|---|
| `npm test` | `node --test` |
| `npm start` | `node app.js` |
| `npm run lint` | whatever `lint` is set to |

That's all it is — **nicknames for long commands**, so everyone on a team types the same short thing.

> npm can also download libraries, but our project uses **zero libraries** on purpose. Nothing to download today.

---

## 4. YAML — the language of pipelines

YAML is just a way of writing **settings** in a file. It uses `key: value` and indentation.

```yaml
name: CI
jobs:
  test:
    runs-on: ubuntu-latest
```

Read that as: *"name is CI. There is a job called test. It runs on ubuntu-latest."*

**Three rules and you're done:**

1. Indent with **2 spaces**. **Never press Tab.** (This is the #1 error today.)
2. A `-` means "an item in a list".
3. Indentation shows what belongs to what — like bullet points.

---

## 5. The JavaScript you need to read (not write)

You only need to *recognise* four things.

```js
// 1. A function - takes input, gives back an answer
function add(a, b) {
  return a + b;
}

// 2. Sharing it with other files
module.exports = { add };

// 3. Using it in another file
const { add } = require('./math');

// 4. A test - "I expect add(2,3) to equal 5"
test('add works', () => {
  assert.equal(add(2, 3), 5);
});
```

The `() => { ... }` shape is just a short way to write a function. That's it.

---

## 6. Installing Node.js on Windows — do this first

Everything today runs on Node. Install it before anything else.

### The normal way

1. Go to **`https://nodejs.org`** and click the big **LTS** button.
2. Run the downloaded `.msi` file.
3. Click **Next** through the wizard and accept the licence. **Leave every default ticked** —
   especially *"Add to PATH"*. You do **not** need the "Tools for Native Modules" checkbox.
4. Click **Install**, then **Finish**.
5. **Close every terminal and VS Code window, then open a new one.** This step is not optional —
   Windows only picks up the new PATH in windows opened *after* the install.
6. Check it worked:

```powershell
node --version      # must print v20 or higher
npm --version       # must print a number
```

If both print a version, you are done.

> **On a Mac?** Same thing — download the LTS `.pkg` from `https://nodejs.org` and run it.

### If something goes wrong

**`npm : The term 'npm' is not recognized...`**
This is the most common error and it almost never means the install failed. It means your terminal
was opened *before* Node was installed, so it still has the old PATH. **Close the terminal and VS
Code completely and open a new one.** If it still fails after a restart, Node genuinely is not
installed — check `C:\Program Files\nodejs` exists.

**The installer asks for an administrator password you don't have**, or you get
**"Another installation is already in progress"** — common on college and office laptops.
Use the portable version instead. It needs no admin rights. Open **PowerShell** and run these lines
one at a time:

```powershell
$ver = 'v22.11.0'    # check nodejs.org for the current LTS version number
Invoke-WebRequest "https://nodejs.org/dist/$ver/node-$ver-win-x64.zip" -OutFile "$env:TEMP\node.zip"
Expand-Archive "$env:TEMP\node.zip" -DestinationPath "$env:TEMP\node-unzip" -Force
New-Item -ItemType Directory "$env:LOCALAPPDATA\Programs\nodejs" -Force
Copy-Item "$env:TEMP\node-unzip\node-$ver-win-x64\*" "$env:LOCALAPPDATA\Programs\nodejs" -Recurse -Force
[Environment]::SetEnvironmentVariable('Path', [Environment]::GetEnvironmentVariable('Path','User') + ";$env:LOCALAPPDATA\Programs\nodejs", 'User')
```

Then **close PowerShell, open a new one**, and check `node --version` again.

**`node` works but `npm` doesn't** — your install is incomplete. Uninstall Node from
*Settings → Apps* and install it again from the `.msi`.

---

## ✅ Install checklist — do this BEFORE the session

Come to class with all six ticked. If you arrive with these missing, you will spend the first hour installing instead of learning.

- [ ] **Git** installed — check with `git --version`
  <br/>Download: `https://git-scm.com/downloads`
- [ ] **Node.js 20 or newer** — check with `node --version` **and** `npm --version`
  <br/>Download: `https://nodejs.org` (choose the **LTS** button) — full steps in section 6 above
- [ ] **VS Code** installed — `https://code.visualstudio.com`
- [ ] **GitHub account** created and you can log in — `https://github.com`
- [ ] A **Personal Access Token** ready *(this is your password for pushing code)*
  <br/>GitHub → click your photo → **Settings** → **Developer settings** →
  **Personal access tokens** → **Tokens (classic)** → **Generate new token** →
  tick `repo` → Generate → **copy it and save it in a text file**.
  <br/>⚠️ GitHub shows the token **once**. If you lose it, generate a new one.
- [ ] An **empty repository** created on GitHub, named `cicd-lab`
  <br/>GitHub → **New repository** → name `cicd-lab` → select **Public** → **Create repository**.
  <br/>⚠️ **Do NOT tick "Add a README file", and leave .gitignore and licence set to None.**
  The repository must be completely empty, or your first push will be rejected in class.
  <br/>You should end up on a page that says *"Quick setup — we recommend every repository include a README"*.
  That's the correct screen. Leave it there.

> **Optional:** Docker Desktop (`https://docker.com`). Only needed for one bonus step — your teacher will demo it.

> **No laptop?** You can still do most of today's labs in a browser. Open any GitHub repo and press the `.` key — a full editor opens in your browser.

---

## Words you'll hear today

| Word | Meaning in one line |
|---|---|
| Repository (repo) | A project folder that Git tracks |
| Commit | A saved snapshot of your changes |
| Branch | A safe copy where you work without disturbing others |
| Pull Request (PR) | "Please review and merge my work" |
| Pipeline / Workflow | Steps a computer runs automatically after you push code |
| Build | Turning your code into the thing you actually ship |
| Test | Code that checks your code is correct |
| Deploy | Putting your app where real users can reach it |

You already met the first four in Unit 1. The last four are today.
