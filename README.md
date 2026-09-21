# file_streamer_nodejs

A tiny Express server with two jobs: stream any remote file back to the client as a download (handy for getting around CORS in a browser app), and look up the direct media links for a Pinterest URL.

**Deployed at:** https://file-streamer-nodejs.vercel.app

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

## Notes

- There's **no authentication and no allow-list** on `/download` — anyone who can reach it can use your server as a download proxy. Keep that in mind before leaving it public.

## Contributing

Contributions are warmly welcomed and greatly appreciated! Whether it's a bug fix, new feature, or improvement, your input helps make this project better for everyone.

Before submitting a pull request, please:

1. Create an issue describing the feature or bug fix you'd like to work on
2. Wait for discussion and approval to ensure alignment with project goals
3. Fork the repository and create your feature branch
4. Submit your pull request with a clear description of changes

This approach helps avoid duplicate efforts and ensures smooth collaboration. Thank you for considering contributing!

## Share

Sharing this repository with your friends is just one click away from here

[![facebook](https://user-images.githubusercontent.com/6418354/179013321-ac1d1452-0689-493f-9066-940cf2302b6e.png)](https://www.facebook.com/sharer/sharer.php?u=https://github.com/p32929/file_streamer_nodejs/)
[![twitter](https://user-images.githubusercontent.com/6418354/179013351-7d8d6d1c-4ce2-46ab-bef8-4c4765a1b888.png)](https://twitter.com/intent/tweet?url=https://github.com/p32929/file_streamer_nodejs/)
[![tumblr](https://user-images.githubusercontent.com/6418354/179013343-3111f55a-3b90-40c7-8487-9777348672b0.png)](https://www.tumblr.com/share?v=3&u=https://github.com/p32929/file_streamer_nodejs/)
[![pocket](https://user-images.githubusercontent.com/6418354/179013334-b095c45f-becf-49f4-9ee1-5a731a9b1f85.png)](https://getpocket.com/save?url=https://github.com/p32929/file_streamer_nodejs/)
[![pinterest](https://user-images.githubusercontent.com/6418354/179013331-44cd9206-11b1-4b65-becb-5863b61c828f.png)](https://pinterest.com/pin/create/button/?url=https://github.com/p32929/file_streamer_nodejs/)
[![reddit](https://user-images.githubusercontent.com/6418354/179013338-7416ae3f-73ba-4522-86e1-1374d7082d22.png)](https://www.reddit.com/submit?url=https://github.com/p32929/file_streamer_nodejs/)
[![linkedin](https://user-images.githubusercontent.com/6418354/179013327-ca7b7102-1da8-4b1c-858f-1a6e5f21bd70.png)](https://www.linkedin.com/shareArticle?mini=true&url=https://github.com/p32929/file_streamer_nodejs/)
[![whatsapp](https://user-images.githubusercontent.com/6418354/179013353-f477fa0b-3e6f-4138-a357-c9991b23ff88.png)](https://api.whatsapp.com/send?text=https://github.com/p32929/file_streamer_nodejs/)
