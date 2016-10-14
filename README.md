# WWWELD
WELD's website is built and hosted with [Webhook](http://www.webhook.com/), a static site generator that allows you to easily create custom CMSs. When content is created or edited on the backend, the entire site gets rebuilt and served as a simple static site.

## Installation
I reccomend using the following instructions as I don't like to install Node with Homebrew, but you could follow the directions from [Webhook docs](http://www.webhook.com/docs/) if you want to: [Webhook installation instructions](http://www.webhook.com/docs/installation/#command_line_tools_for_mac). 

But these directions should work better:

### 1. Node
If you don't already have Node and NPM installed, download the newest version (v6.8.0 at the time of writing this) and follow the installer instructions.

[Go to nodejs.org](https://nodejs.org/en/)

### 2. NPM
[Node comes with NPM installed](https://docs.npmjs.com/getting-started/installing-node), but you should go ahead and update NPM just to make sure you have the latest version. On the command line enter:

```bash
npm install npm@latest -g
```

### 3. Webhook and Grund-CLI

To install the Webhook and [Grunt](http://gruntjs.com/) command line tools, run:

```bash
npm install -g wh grunt-cli
```

Now, just to make sure everthing worked, check the Webhook (wh) version:

```bash
wh -V
```

### 4. Clone weld-web repo

Clone the repo from GitHub:

```bash
git clone https://github.com/weld-co/weld-web.git
```

or if you use SSH instead:

```bash
git clone git@github.com:weld-co/weld-web.git
```bash

### 5. Install the site dependencies

First navigate into the `weld-web` directory:

```bash
cd weld-web
```

Then use npm to install the dependencies listed in package.json:

```bash
npm install
```

## Dev Workflow

### Local Dev Server
Webhook comes with a local dev server which you can launch by running from the site directory:

```bash
wh server
```

This will build the site, and compile SCSS/JS and all that stuff. View the other commands and options here: http://www.webhook.com/docs/command-line-tools/

### Deploying to weld.co

Webhook is a fully hosted system, so deploying your site is pretty trivial. When you're happy with the changes on your local server navigate to your site directory and type the following into your terminal:

```
wh deploy
```

### Using the CMS

You can log in to the CMS in two places: from `http://www.weld.co/cms` and from your `http://localhost:2002/cms`. 

Logging in from `weld.co/cms` only lets you edit content already created, where as `localhost:2002/cms` allows you to create new cms forms and define content types to be used in the templates.

## An Example of working with pages

You can view all of the existing pages on weld.co in `weld-web/pages`. Files within this folder get turned into nested pages in the final site. For example, `pages/gallery.html` will get compiled to `.build/gallery/index.html`. 

> By the way, if you're dotfiles aren't visible, run:
> ```bash
> defaults write com.apple.finder AppleShowAllFiles YES; killall Finder
> ```
> 
> To hide them again:
> 
> ```bash
> defaults write com.apple.finder AppleShowAllFiles NO; killall Finder
> ```

Anyway, so to create a new page that lives at `weld.co/newpage`, you'd simply add `pages/newpage.html`.

Here is a the `weld.co/NashvilleNYE` page markup

```django
{% extends 'templates/partials/nye.html' %}
{% block title %}NYE — WELD Nashville{% endblock %}

{% block content %}

<div id="main">
  <img src="/static/images/nye/nye.png">
  <p style="color:#ddd;">Come get your dance on and ring in the New Year with WELD! Limited tickets available. Beer, Wine & Bubbly Provided. Cheers!</p>
  <p style="color:#ddd;">Parking is limited and vehicles are not allowed overnight. We are partnering with LYFT and will be sending codes to all attendees for discounted rides.</p>
  <p style="font-weight:bold;">December 31st 2015</p>
  <p style="font-weight:bold;">10pm-2am</p>
  <p style="font-weight:bold;">$35 (21+ only)</p>
  <div style=" margin:0 auto; display:block; "> <a href="https://weldnashvillenye.eventbrite.com" class="btn yellow">PURCHASE TICKETS</a></div>
</div>
<canvas id="world"></canvas>

{% endblock %}

{% block scripts_extra %}
  <script src="/static/scripts/nye.js"></script>
{% endblock %}
```

This uses a custom template called `nye.html` because this page is very different from the other pages. This template basically just takes everything in `NashvilleNYE.html` and puts it in place of `{% block content %}{% endblock %}`. 

But, if you want to make a new page that doesn't use any templates/partials you can always just put all of your code into `newpage.html` rather than extending a template. Does that make sense?

## Help

If you get stuck with anything, hit me up on https"//welderwire.slack.com or email at jamie@weld.co.
