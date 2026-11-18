# file_streamer_nodejs

A tiny Express server that downloads files for your web app. Browsers often can't download a file from another site because of CORS or hotlink rules. This server fetches the file for you and sends it back as a normal download. It can also find the direct media links for a Pinterest pin.

It used to run at `file-streamer-nodejs.vercel.app`, but that deployment is no longer online. Run your own copy with the steps below.

## Endpoints

### `GET /download?url=<remote-url>`

Fetches `url` server-side and pipes it straight back with `Content-Disposition: attachment`, in 1 MB chunks. The browser sees a same-origin download, so CORS and hotlink restrictions on the original host stop being your problem.

```bash
curl -L "http://localhost:5000/download?url=https://example.com/video.mp4" -o video.mp4
```

### `GET /pinterest?url=<pin-url>`

Returns a JSON array of the downloadable media found for that pin — each entry has a `title`, a `thumb` and a list of `links` by quality.

```json
[
  { "title": "Video 1", "thumb": "https://…", "links": [{ "title": "HD", "link": "https://…" }] }
]
```

> **Heads up:** this endpoint works by parsing the HTML of a third-party downloader site. When that site changes its markup, this breaks. The `/download` endpoint has no such dependency.

## Run it

```bash
git clone https://github.com/p32929/file_streamer_nodejs.git
cd file_streamer_nodejs
npm install
npm run dev          # nodemon on http://localhost:5000
# or
npm start
```

Set `PORT` in the environment to change the port. `vercel.json` is already set up to deploy the whole thing as a single serverless function.

## Good to know

1. There is **no login and no allow-list** on `/download`. Anyone who can reach it can use your server as a download proxy, so keep that in mind before leaving it public.

## Contributing

Contributions are very welcome, thank you! Before you start on a pull request, please open an issue and tell me what you would like to add or change. That way we can agree on it first, and your time is not wasted on something that might not fit. Thanks for helping make file_streamer_nodejs better.

## You might also like

<p><a href="https://openstore.pfay.workers.dev/more/p32929/_/0"><picture><source media="(prefers-color-scheme: dark)" srcset="https://openstore.pfay.workers.dev/more/p32929/_/0-dark.svg"><img src="https://openstore.pfay.workers.dev/more/p32929/_/0-light.svg" width="50%" align="top" alt="More apps by p32929 on OpenStore (1)"></picture></a><a href="https://openstore.pfay.workers.dev/more/p32929/_/1"><picture><source media="(prefers-color-scheme: dark)" srcset="https://openstore.pfay.workers.dev/more/p32929/_/1-dark.svg"><img src="https://openstore.pfay.workers.dev/more/p32929/_/1-light.svg" width="50%" align="top" alt="More apps by p32929 on OpenStore (2)"></picture></a><br><a href="https://openstore.pfay.workers.dev/more/p32929/_/2"><picture><source media="(prefers-color-scheme: dark)" srcset="https://openstore.pfay.workers.dev/more/p32929/_/2-dark.svg"><img src="https://openstore.pfay.workers.dev/more/p32929/_/2-light.svg" width="50%" align="top" alt="More apps by p32929 on OpenStore (3)"></picture></a><a href="https://openstore.pfay.workers.dev/more/p32929/_/3"><picture><source media="(prefers-color-scheme: dark)" srcset="https://openstore.pfay.workers.dev/more/p32929/_/3-dark.svg"><img src="https://openstore.pfay.workers.dev/more/p32929/_/3-light.svg" width="50%" align="top" alt="More apps by p32929 on OpenStore (4)"></picture></a></p>

<p><a href="https://p32929.github.io/share/?repo=file_streamer_nodejs"><picture><source media="(prefers-color-scheme: dark)" srcset="https://p32929.github.io/readme/footer-share-dark.svg"><img src="https://p32929.github.io/readme/footer-share-light.svg" width="50%" align="top" alt="Share this project with your friends in one click"></picture></a><a href="https://p32929.github.io/support/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://p32929.github.io/readme/footer-support-dark.svg"><img src="https://p32929.github.io/readme/footer-support-light.svg" width="50%" align="top" alt="If you like my work and want to support me, feel free to support"></picture></a><br><a href="https://openstore.pfay.workers.dev/add"><picture><source media="(prefers-color-scheme: dark)" srcset="https://p32929.github.io/readme/footer-join-dark.svg"><img src="https://p32929.github.io/readme/footer-join-light.svg" width="100%" align="top" alt="Put your own apps on OpenStore: free, your listing lives in your own repo"></picture></a></p>
