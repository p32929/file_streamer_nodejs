const express = require('express');
var request = require('request');
const cors = require('cors')
const jsdom = require("jsdom");
request = request.defaults({ jar: true })
const fs = require('fs')

const { JSDOM } = jsdom;

const app = express();
app.use(cors())

const getPinterestData = (csrfValue, url, cookie, callback) => {
    var options = {
        'method': 'POST',
        'url': 'https://botdownloader.com/pinterest-video-downloader',
        'headers': {
            'authority': 'botdownloader.com',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': cookie,
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
            'csrfmiddlewaretoken': csrfValue,
            'download': url
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
                const obj = {
                    title: `Image ${i + 1}`,
                    links: []
                }
                for (var j = 0; j < as.length; j++) {
                    const text = as[j].innerHTML
                    const href = as[j].href

                    console.log(`text`, text)
                    if (text.includes("Force")) {
                        obj.links.push({
                            title: text.replace("Force Download ", ""),
                            link: href
                        })
                    }
                }

                arr.push(obj)
            }
        }
        else {
            var qls = document.getElementsByClassName('down_file_container')
            for (var i = 0; i < qls.length; i++) {
                const as = qls[i].getElementsByTagName('a')

                const obj = {
                    title: `Video ${i + 1}`,
                    links: []
                }
                for (var j = 0; j < as.length; j++) {
                    const text = as[j].innerHTML
                    const href = as[j].href

                    console.log(`text`, text)
                    if (text.includes("Force")) {
                        obj.links.push({
                            title: text.replace("Force Download ", ""),
                            link: href
                        })
                    }
                }

                arr.push(obj)
            }
        }

        callback(arr)
        // callback(response.body)
    });
}

const getPinterestCsrf = (callback) => {
    var options = {
        'method': 'GET',
        'url': 'https://botdownloader.com/',
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);

        const document = new JSDOM(response.body).window.document;
        const csrfValue = document.querySelector('#download_form > input[type=hidden]').value

        // console.log(response)
        // fs.writeFileSync('./abc.json', JSON.stringify(response))

        callback(csrfValue, response.headers['set-cookie'][0])
    });


}

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

    getPinterestCsrf((csrf, cookies) => {
        getPinterestData(csrf, url, cookies, (arr) => {
            console.log(cookies)
            res.send(arr)
        })
    })
});

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Hello Redirector v17')
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
