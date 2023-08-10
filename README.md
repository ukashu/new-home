[![pl](https://img.shields.io/badge/lang-pl-blue.svg)](https://github.com/ukashu/new-home/tree/main/readme/README.pl.md)

<div align="center">
  <img src="./readme/nh_banner_rounded.svg" alt="New Home" width="60%" height="auto"/>
</div>

## Description

This is a Chromium extension replacing browsers default new tab with a custom productivity focused tab.

## Features

<ul>
  <li>habit tracking</li>
  <li>task tracking</li>
  <li>Spotify API integration -> currently playing track</li>
  <li>Google Calendar API integration -> current task</li>
  <li>daily stoic phrase from <a href="https://github.com/benhoneywill/stoic-quotes">stoic quotes API</a></li>
  <li>website shortcuts</li>
  <li>daily browsing time tracking</li>
</ul>

## Built with

This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

<ul>
  <li>TypeScript</li>
  <li>React</li>
  <li><a href="https://docs.plasmo.com/">Plasmo</a></li>
  <li>Tailwind</li>
  <li>Google Calendar API</li>
  <li>Spotify Web API</li>
</ul>

## Requirements

<ul>
  <li>Node >= 18</li>
  <li>npm</li>
  <li>Chromium browser</li>
  <li>Application registered in Google Console with Calendar API access enabled</li>
  <li>Application registered in <a href="https://developer.spotify.com/">Spotify for Developers</a></li>
</ul>

You can run the extension without registering it in Google Console and Spotify for Developers - you just won't get the Google Calendar and Spotify API features.

## Getting Started

1. Clone this repository

2. Install the dependencies:

```bash
pnpm install
# or
npm install
```

3. Create environment variables:

```bash
# .env
PLASMO_PUBLIC_GOOGLE_API_KEY='[Your google api key]'
PLASMO_PUBLIC_SPOTIFY_CLIENT_ID='[Your Spotify Client id]'
```

4. Finally, make a production build:

```bash
pnpm build
# or
npm run build
```

Or run the development server if you'd like to edit the code:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and enable developer mode in Chrome extension settings. Load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

For further guidance, [visit Plasmo Documentation](https://docs.plasmo.com/)

## Usage

The extension will replace your browsers default new tab with a custom one. It will begin calculating time spent on various domains and will show you todays Stoic Quote. To add habits and tasks to track go to extension options. You can also add shortcuts that will show up on the new tab. You might have to experiment with the URL format to get the websites favicon to show up (most of the time it's `https://www.website.com` or `https://website.com`) You can add tasks to `WORK` or `LIFE` mode and change between the modes in the extensions popup.
