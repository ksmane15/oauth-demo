const express = require('express')
const bodyParser = require('body-parser')
const nanoid = require('nanoid')

const app = express()
const PORT = 8001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine', 'ejs');

app.get('/' , (req,res) => {
    res.render('index')
})

app.get('/v1/oauth2/authorize', (req,res) => {
    console.log('GET /v1/oauth2/authorize')

    const qs = req.query;
    console.log(qs)
    const auth_code = nanoid()
    res.redirect(qs.redirect_uri+`?code=${auth_code}`)
})

app.post('/v1/oauth2/token', (req,res) => {
    console.log('POST v1/oauth2/token')
    console.log(req.body)

    const access_token = nanoid()
    res.send({
        access_token,
        
    })
})


app.listen(PORT,() => {
    console.log(`sever started on ${PORT}`)
})