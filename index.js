const express = require('express');
const request = require('request');
var cors = require('cors')

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

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Hello Redirector v11')
})
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
