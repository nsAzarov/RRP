import fetch from 'node-fetch'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { logReq, logRes, logErr, getRandomInt } from './utils/index.js'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let time = new Date()
let multiplicator = 1

setInterval(() => {
	time = new Date(new Date(time).getTime() + multiplicator * 60000)
}, 1000)

app.post('/Time', (req, res) => {
	logReq('Time', `request came from ${req.body.from} module`)
	const response = {
		time,
		multiplicator,
	}
	logRes('Time', response)
	res.json(response)
})

app.post('/ChangeMultiplicator', (req, res) => {
	logReq('ChangeMultiplicator')
	multiplicator = req.body.value
	const response = {
		time,
		multiplicator,
	}
	logRes('ChangeMultiplicator', response)
	res.json(response)
})

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))

	app.get('*', (_, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = process.env.PORT || 4003
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
