const express = require('express')
const dotenv = require('dotenv')
const mg = require("mailgun-js");

dotenv.config()

const mailgun = ()=> mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
});


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/api/email', (req, res) => {



    const { email, message, upload } = req.body;
    mailgun().messages().send({
        from: 'Travis Flake <tflake83@gmail.com>',
        to: `${email}`,
        html: `<p>${message}</p>`,
        upload: `${upload}`
    },
    (error, body) => {
        if (error) {
            console.log(error);
            res.status(500).send({ message: 'error in sending message' });
        } else {
            console.log(body)
            res.send({message: 'email sent'})
        }
        
    })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
})