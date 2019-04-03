//localhost stuff
const cors = require("cors");
const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
// localhost stuff ends

'use strict';

const request = require('request');

// Replace <Subscription Key> with your valid subscription key.
const subscriptionKey = '0a0c9fa84de24370a2363fec68496e32';

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase =
    'https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze';

let imageUrl =
    'https://www.sciencenews.org/sites/default/files/2018/02/main/articles/022118_EE_horses_feat.jpg';

// Request parameters.
const params = {
    'visualFeatures': 'Categories,Description,Color',
    'details': '',
    'language': 'en'
};

const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': subscriptionKey
    }
};

app.get("/api", (req, res) => {
    // res.json(jsonResponse)
    imageUrl = req.query.img;
    options.body = '{"url": ' + '"' + imageUrl + '"}';

    request.post(options, (error, response, body) => {
        if (error) {
            console.log('Error: ', error);
            return;
        }
        let jsonResponse = JSON.parse(body);
        console.log(options.body)
        res.json(jsonResponse);

        // console.log('JSON Response\n');
        // console.log(jsonResponse);
    });
})

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));