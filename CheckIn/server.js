import fetch from 'node-fetch'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { logReq, logRes, logErr, getRandomInt } from './utils/index.js'

const MODULE_NAME = 'CHECK_IN'

let currentTicketsState = []

let time = undefined
let multiplicator = undefined

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

setInterval(async () => {
	await updateTime()
}, 1000)

const updateTime = async () => {
	logReq('Time')
	const response = await (
		await fetch('http://localhost:4003/Time', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ from: MODULE_NAME }),
		})
	).json()
	time = response.time
	multiplicator = response.multiplicator
	logRes('Time', time)
}

const updateFlight = (updatedTicket, tickets) => {
	const newTickets = []
	for (let i = 0; i < tickets.length; i++) {
		if (tickets[i].flight === updatedTicket.flight)
			newTickets.push(updatedTicket)
		else newTickets.push(tickets[i])
	}
	return newTickets
}

app.post('/RegisterPassengers', async (req, res) => {
	let passengers = req.body.passengers
	let tickets = req.body.tickets
	const ticketsRegisteredArr = []
	logReq('RegisterPassengers', { ticketsRequested: passengers })

	logReq('AddCheckInEvent')
	await fetch('http://localhost:4007/AddCheckInEvent', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			type: 'passengers_came',
			passengers,
		}),
	})

	if (passengers) {
		for (let i = 0; i < tickets.length; i++) {
			if (
				new Date(new Date(tickets[i].time).getTime() - 5 * 60000) >
				new Date(time)
			) {
				const ticketsRegistered = Math.min(
					tickets[i].sold - tickets[i].registered,
					getRandomInt(passengers)
				)
				if (ticketsRegistered > 0) {
					ticketsRegisteredArr.push({
						flight: tickets[i].flight,
						tickets: ticketsRegistered,
					})
				}
				tickets = updateFlight(
					{
						flight: tickets[i].flight,
						time: tickets[i].time,
						amount: tickets[i].amount,
						sold: tickets[i].sold,
						registered: tickets[i].registered + ticketsRegistered,
					},
					tickets
				)
			}
		}
	}

	if (ticketsRegisteredArr.length > 0) {
		logReq('AddCheckInEvent')
		await fetch('http://localhost:4007/AddCheckInEvent', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				type: 'tickets_registered',
				ticketsRegisteredArr,
			}),
		})
	}

	currentTicketsState = tickets
	logRes('RegisterPassengers', { tickets })
	res.json(tickets)
})

app.get('/CurrentTicketsState', async (_, res) => {
	logRes('CurrentTicketsState', { currentTicketsState })
	res.json(currentTicketsState)
})

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))

	app.get('*', (_, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = process.env.PORT || 4006
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
