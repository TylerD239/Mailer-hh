const express = require('express')
const app = express()
const xlsx = require('node-xlsx')
const XLSX = require('xlsx')
const mailer = require('./nodemail')
const validator = require("email-validator");
const path = require('path')
const config = require('config')

app.use(express.json({extended:true}))

const PORT = config.get('port') || 5000

const ips = []

app.get('/api/auth', (req,res) => {

    res.send({auth:ips.includes(req.connection.remoteAddress)})
})
app.post('/api/auth', (req,res) => {

    const auth = req.body.password === '7303188'
    res.send({auth})
    if (auth) ips.push(req.connection.remoteAddress)
})

app.post('/api/send', (req,res) => {

    const {subject, text, marks} = req.body
    try {
        Object.keys(marks).forEach((email) => {
            const message = {
                to: email,
                subject: subject,
                html: text.replace(/mark/gi, marks[email])
            }
            console.log(message)
            // mailer(message)
        })
        res.status(200).json({message: 'Сообщения отправлены'})
    } catch (e) {
        res.status(500).json({message: e.toString()})
    }
})

app.post('/api/edits/:cls', (req,res) => {
    try {
        reWrite(req.params.cls, req.body)
        res.status(200).json({message: 'Изменения сохранены'})
    } catch (e) {
        res.status(500).json({message: e.toString()})
    }
})


app.get('/api/getList/:group', (req, res)=> {

    const list =xlsx.parse(__dirname + '/classes/' + req.params.group + '.xlsx')[0].data
        .filter((el)=>el.length)
    list.forEach((el) => {
        if (!el[1]) {
            el[1] = false
        } else {
        el[2] = !validator.validate(el[1])}

    })
    res.send(list)
})



if (process.env.NODE_ENV === 'production') {

    app.use('/', express.static(path.join(__dirname,'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const reWrite = (name,data) => {
    console.log(data)
    const book = XLSX.utils.book_new()
    const sheet = XLSX.utils.aoa_to_sheet(data)
    XLSX.utils.book_append_sheet(book, sheet, 'sheet1')
    XLSX.writeFile(book, `./classes/${name}.xlsx`)
}


app.listen(PORT, ()=>{console.log(`Started on ${PORT}`)})