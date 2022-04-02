import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { logReq } from './utils/index.js'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let ticketSalesEvents = []
let checkInEvents = []
let waitingForLandingFlightEvents = []
let landingFlightEvents = []
let waitingForTakeOffFlightEvents = []
let takingOffFlightEvents = []

app.post('/AddTicketSalesEvent', (req, res) => {
	logReq('AddTicketSalesEvent')
	const type = req.body.type
	if (type === 'passengers_came') {
		const requestedTicketsNumber = req.body.requestedTicketsNumber
		console.log('requestedTicketsNumber', requestedTicketsNumber)
		ticketSalesEvents.push({
			type,
			requestedTicketsNumber,
		})
	} else if (type === 'tickets_bought') {
		const ticketsBought = req.body.ticketsBought
		console.log('ticketsBought', JSON.stringify(ticketsBought))
		ticketSalesEvents.push({
			type,
			ticketsBought,
		})
	}
	res.json('ok')
})

app.get('/GetTicketSalesEvents', (_, res) => {
	logReq('GetTicketSalesEvents')
	res.json(ticketSalesEvents)
	ticketSalesEvents = []
})

app.post('/AddCheckInEvent', (req, res) => {
	logReq('AddCheckInEvent')
	const type = req.body.type
	if (type === 'passengers_came') {
		const passengers = req.body.passengers
		console.log('requestedTicketsNumber', passengers)
		checkInEvents.push({
			type,
			passengers,
		})
	} else if (type === 'tickets_registered') {
		const ticketsRegisteredArr = req.body.ticketsRegisteredArr
		console.log('tickets_registered', JSON.stringify(ticketsRegisteredArr))
		checkInEvents.push({
			type,
			ticketsRegisteredArr,
		})
	}
	res.json('ok')
})

app.get('/GetCheckInEvents', (_, res) => {
	logReq('GetCheckInEvents')
	res.json(checkInEvents)
	checkInEvents = []
})

app.post('/AddWaitingForLandingFlightEvent', (req, res) => {
	logReq('AddWaitingForLandingFlightEvent', req.body)

	waitingForLandingFlightEvents.push(req.body)
	res.json('ok')
})

app.post('/AddLandingFlightEvent', (req, res) => {
	logReq('AddLandingFlightEvent', req.body)

	landingFlightEvents.push(req.body)
	res.json('ok')
})

app.get('/GetWaitingForLandingFlightEvents', (_, res) => {
	logReq('GetWaitingForLandingFlightEvents')
	res.json(waitingForLandingFlightEvents)
	waitingForLandingFlightEvents = []
})

app.get('/GetLandingFlightEvents', (_, res) => {
	logReq('GetLandingFlightEvents')
	res.json(landingFlightEvents)
	landingFlightEvents = []
})

app.post('/AddWaitingForTakeOffFlightEvent', (req, res) => {
	logReq('AddWaitingForTakeOffFlightEvent', req.body)

	waitingForTakeOffFlightEvents.push(req.body)
	res.json('ok')
})

app.post('/AddTakingOffFlightEvent', (req, res) => {
	logReq('AddTakingOffFlightEvent', req.body)

	takingOffFlightEvents.push(req.body)
	res.json('ok')
})

app.get('/GetWaitingForTakeOffFlightEvents', (_, res) => {
	logReq('GetWaitingForTakeOffFlightEvents')
	res.json(waitingForTakeOffFlightEvents)
	waitingForTakeOffFlightEvents = []
})

app.get('/GetTakingOffFlightEvents', (_, res) => {
	logReq('GetTakingOffFlightEvents')
	res.json(takingOffFlightEvents)
	takingOffFlightEvents = []
})

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))

	app.get('*', (_, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = process.env.PORT || 4007
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
