---
title: 'Jak automaticky přidávat příspěvky na&nbsp;statický web pomocí Github Actions'
description: 'Článek o tom, jak vytvořit službu pro automatické přidávání příspěvků na statický web pomocí GitHub Actions.'
date: '2023-02-22'
tags:
  - repo
  - serverless
  - GitHubActions
icon: 'circlePlus'
---
**Při práci na open-source projektu *[Deníku sráčů](https://deniksracu.cz/)* jsem čelil výzvě umožnit přidávání dat do webové aplikace a&nbsp;zároveň hostovat aplikaci jako statický web tak, abych nemusel utratit ani korunu. Koncept se mi povedlo vymyslet a&nbsp;rád bych se s&nbsp;vámi o&nbsp;něj podělil.**

## Představení konceptu

Webovou aplikaci jsem tvořil v&nbsp;[Next.js](https://nextjs.org/) se statický exportem a&nbsp;hostoval ji pomocí služby [Cloudflare Pages](https://pages.cloudflare.com/). Vím, že existuje mnoho jiných alternativ jako je například [Vercel](https://vercel.com/home), [Netlify](https://www.netlify.com/) či [Heroku](https://www.heroku.com/). Cloudflare jsem zvolil především z&nbsp;důvodu pokročilého **cachování** a&nbsp;**ochraně** na&nbsp;úrovni DNS. A&nbsp;v&nbsp;aplikaci jsem měl již připravený HTML form, který mi sbíral data a&nbsp;uměl z&nbsp;nich vytvořit JSON soubor.

Rozhodl jsem se tedy **infrastrukturu** postavit následujícím způsobem:

![Scéma infrastrukutry](/posts/images/jak-automaticky-pridavat-prispevky-na-staticky-web-pomoci-github-actions-01.png)

1. Na webu uživatel vyplní **HTML formulář**, který po stisknutí tlačítka **vytvoří JSON soubor** a&nbsp;*POST request*, který obsahuje požadovaná data. Web je chráněn proti návštěvě robotů a&nbsp;pro navštívení, je potřeba splňovat nejvyšší bezpečnostní kritérium.
2. *Post request* se zpracuje v&nbsp;**proxy serveru**, který běží jako *serverless* funkce na&nbsp;službe [Cloudflare Workers](https://workers.cloudflare.com/). Proxy server data ověří a&nbsp;pošle POST request na&nbsp;GitHub API, které **spustí GitHub Actions** s&nbsp;daty jako vstupními parmatery.
3. GitHub Actions **vytvoří *pull request***, který čeká na schválení a ověření dat.
4. Po schválení se mergnou branche a&nbsp;nová verze se **automaticky nahraje** s&nbsp;novými daty.

## Limity

Toto řešení není vhodné pro veškeré aplikace a to především kvůli několika limitům. Mezi ty největší z mého pohledu patří především nutnost každou **změnu manuálně schválit** a **doba procesu** vytvoření změny.

## Nástřel implementace

Následující kódy mají pouze ilustrovat implenetaci v projetku. Nejedná se o funkční kód.

### HTML form request

```js
async function createRequest(exportObj, fileName) {
  const body = `
  {
    "filename": "${fileName}",
    "content": ${JSON.stringify(exportObj)},
    "title": "${exportObj.placeName}"
}
  `;

  const response = await fetch("https://api.deniksracu.cz/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body,
  });

  response.json().then((data) => {
    if (data.status === "OK") {
      Swal.fire({
        title: "Rulička!",
        text: "BOT Rulička úspěšně vytvořil žádost o přidání nového trůnu. Díky",
        icon: "success",
        confirmButtonColor: "#0078D4",
      });
    } else {
      Swal.fire({
        title: "Rulička!",
        text: "V procesu přidání nového trůnu zaznamenal BOT Rulička problém.",
        icon: "error",
        confirmButtonColor: "#0078D4",
      });
    }
  });
}
```

### Proxy server

```js
import { Octokit } from "@octokit/core";

const octokit = new Octokit({
  auth: PAT_TOKEN,
});

async function readRequestBody(request) {
  const { headers } = request;
  const contentType = headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return JSON.stringify(await request.json());
  }
  return `ERROR: The wrong data format.`;
}

async function handlePost(request) {
  const reqBody = await readRequestBody(request);
  const retBody = JSON.parse(reqBody);

  console.log(JSON.stringify(retBody));

  await octokit.request(
    "POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches",
    {
      owner: "owner",
      repo: "repo",
      workflow_id: "workflow_id",
      ref: "main",
      inputs: {
        filename: `${retBody.filename}`,
        content: `${JSON.stringify(retBody.content)}`,
        title: `${retBody.title}`,
      },
    }
  );

  return new Response(`{"status":"OK"}`, {
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
    status: 200,
    statusText: "OK",
  });
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "web_url",
  "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-PINGOTHER",
};

function handleOptions(request) {
  if (
    request.headers.get("Origin") !== null &&
    request.headers.get("Access-Control-Request-Method") !== null &&
    request.headers.get("Access-Control-Request-Headers") !== null
  ) {
    // Handle CORS pre-flight request.
    return new Response(null, {
      headers: corsHeaders,
    });
  } else {
    // Handle standard OPTIONS request.
    return new Response(null, {
      headers: {
        Allow: "GET, HEAD, POST, OPTIONS",
      },
    });
  }
}

async function handle(request) {
  if (request.method === "OPTIONS") {
    return handleOptions(request);
  } else if (request.method === "POST") {
    return handlePost(request);
  } else if (request.method === "GET" || request.method == "HEAD") {
    // Pass-through to origin.
    return fetch(request);
  } else {
    return new Response(null, {
      status: 405,
      statusText: "Method Not Allowed",
      headers: corsHeaders,
    });
  }
}

addEventListener("fetch", (event) => {
  event.respondWith(
    handle(event.request)
      // For ease of debugging, we return exception stack
      // traces in response bodies. You are advised to
      // remove this .catch() in production.
      .catch(
        (e) =>
          new Response(e.stack, {
            status: 500,
            statusText: "Internal Server Error",
          })
      )
  );
});
```
### GitHub Actions

```yml
name: 🧻 Rulička bot
on:
  workflow_dispatch:
    inputs:
      filename:
        description: 'Filename (without extension)'
        required: true
        default: ''
      content:
        description: 'Content (JSON data)'
        required: true
        default: ''
      title:
        description: 'Business name'
        required: true
        default: ''

jobs:
  create_json:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout the repo
      uses: actions/checkout@v3
    
    - name: Create a json file
      run: |
        cd _toilets
        echo '${{ github.event.inputs.content }}' > ${{ github.event.inputs.filename }}.json
        cat ${{ github.event.inputs.filename }}.json
        
    - name: Create a pull request
      uses: peter-evans/create-pull-request@v4
      with:
        token: ${{ secrets.PAT }}
        commit-message: Add ${{ github.event.inputs.filename }}.json toilet 
        committer: Rulicka [Bot] <rulicka@deniksracu.cz>
        author: Rulica <rulicka@deniksracu.cz>
        signoff: false
        branch: new-toilet-${{ github.event.inputs.filename }}
        delete-branch: true
        title: 'A new toilet request:  ${{ github.event.inputs.title }}'
        body: |
          | KEY | VALUE |
          | ------ | ---------- |
          | placeName | **${{ fromJSON(github.event.inputs.content).placeName }}** |
          | coords | `${{ fromJSON(github.event.inputs.content).latitude }}` `${{ fromJSON(github.event.inputs.content).longtitude }}` |
          | wayDescription | ${{ fromJSON(github.event.inputs.content).wayDescription }} |
          | toiletType | ${{ fromJSON(github.event.inputs.content).toiletType }} |
          | comment | ${{ fromJSON(github.event.inputs.content).comment }} |
          | nickName | ${{ fromJSON(github.event.inputs.content).nickName }} |
          | timeStamp | ${{ fromJSON(github.event.inputs.content).timeStamp }} |
          
          Filename: ${{ github.event.inputs.filename }}.json
          
          ```json
          ${{ toJSON(fromJSON(github.event.inputs.content)) }}
          ```
        labels: |
          toilet
        reviewers: petrkucerak
        draft: false
```