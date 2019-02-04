const express = require('express')
const bodyParser = require('body-parser')
const rp = require('request-promise')


const app = express()
const PORT = 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine', 'ejs');


app.get('/', function(req, res){ 
    res.render('index',{clientid:"123abc", redirect_uri:`http://localhost:${PORT}/oauth2/callback`});
});

app.get('/oauth2/callback',async (req,res) => {
    console.log('GET .oauth2/callback')
    console.log(req.query)

    const code = req.query.code

    const options = {
        method: 'POST',
        uri: `http://localhost:8001/v1/oauth2/token`,
        body: {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: `http://localhost:${PORT}/oauth2/callback`,
            client_id:"123abc",
            client_secret:"secretvalue"
        },
        json:true
    }

    const response = await rp(options);
    console.log(response)


    res.send('authorize done')
})


app.listen(PORT,() => {
    console.log(`client started on ${PORT}`)
})