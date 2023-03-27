const express = require('express');
const request = require('request');
var cors = require('cors')

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const app = express();
app.use(cors())

app.get('/download', async (req, res) => {
    console.log('req', req.query);
    const url = req.query?.url?.toString() ?? '';

    res.setHeader('Content-Disposition', `attachment`);
    request
        .get(url, { encoding: null, highWaterMark: 1024 * 1024 })
        .on('error', (err) => {
            console.log(err);
            res.status(500).send('Internal server error');
        })
        .pipe(res);
});

app.get('/pinterest', async (req, res) => {
    console.log('req', req.query);
    const url = req.query?.url?.toString() ?? '';

    var request = require('request');
    var options = {
        'method': 'POST',
        'url': 'https://botdownloader.com/pinterest-video-downloader',
        'headers': {
            'authority': 'botdownloader.com',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'csrftoken=yluEI0u657wixHgbfxvXL0ORgOFKGImumUBLbqDuFyzpuyPEW1mq9sjo2tmoxnM4; __cf_bm=IApxy3uX2FKTirMpTRZZ_KL57Ax0s5QyRCPROor7XUk-1679653691-0-AfnWV745BYnubMDD8N7muZVE8BpuTGNePiRjxPtZ5albu/Iw/Ex5AoInPHdZgaZa4gork3LRwqUwf5p9GwiDDBvFODw/vXmzt2CHxQHvtmMkQEcypqxJSVD5ZsRfeTVDGA==; csrftoken=yluEI0u657wixHgbfxvXL0ORgOFKGImumUBLbqDuFyzpuyPEW1mq9sjo2tmoxnM4',
            'origin': 'https://botdownloader.com',
            'referer': 'https://botdownloader.com/pinterest-video-downloader',
            'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
        },
        form: {
            'csrfmiddlewaretoken': 'BfsPUaR8rLnUQiJgFcwhuBi4UhoGm10EpOzWnA0w1cq1N9iJmGnKS3NBGW5kdGqe',
            'download': 'https://pin.it/7s8jhxV'
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);

        const arr = []
        const document = new JSDOM(response.body).window.document;
        var qls = document.getElementsByClassName('quality_list')
        if (qls.length > 0) {
            for (var i = 0; i < qls.length; i++) {
                const as = qls[i].getElementsByTagName('a')
                const text = `Image ${i + 1}`
                const href = as[5].href
                console.log(text, href)
                arr.push({
                    title: text,
                    link: href
                })
            }
        }
        else {
            var qls = document.getElementsByClassName('down_file_container')
            for (var i = 0; i < qls.length; i++) {
                const as = qls[i].getElementsByTagName('a')
                const text = `Video ${i + 1}`
                const href = as[1].href
                console.log(text, href)
                arr.push({
                    title: text,
                    link: href
                })
            }
        }

        // console.log(arr);
        res.send(arr)
    });

});

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Hello Redirector v13')
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
