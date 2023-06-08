const express = require('express');
const cors = require('cors');
const axios = require('axios').default;
const app = express();

let list = []
let Total;
app.use(cors());

app.get('/d', (req, res) => {
    list = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css"/>
        <title>Document</title>
            <meta name="Access-Control-Allow-Origin" content="*">
    </head>
    <body style="background: #333; font-family: sans-serif;">
        <h1 style="color:#aaa;">Cantidad por regiones sin servicio.</h1>
        <div>`
    axios.get("https://api.miluma.lumapr.com/miluma-outage-api/outage/regionsWithoutService")
        .then(Res => {
            const Data = Res.data
            Total = Res.data.totals
            Data.regions.forEach((r, index) => {
                console.log(r)
                list += `
                <div style="display:flex;
                justify-items:center; margin:0px; padding:0px">
                <p style="
                    background:#222;
                    padding:4px;
                    color: white;
                    width:100%;
                    "
                
                    >${r.name} : <span style="color:#f00; font-size: 18px; font-weight: bold; padding: 2px;
                    "> ${r.totalClientsWithoutService}</span>
                    </p>
                </div>`
                console.log(list)

            })
            list += `   
            </div>
                <p style="color:white; font-weight: bold"> Total: 
                <span style="color: #f00; background: black; padding:2px">${Total.totalClientsWithoutService}</span></p>
                <div>
                    <a href="https://api.miluma.lumapr.com/miluma-outage-api/outage/regionsWithoutService">Data link</a>
                </div>
        </body>
        </html>`
            res.send(list);
            //  console.log(Res.data)
            //  res.send(html)

        })

        .catch(e => { })


});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});