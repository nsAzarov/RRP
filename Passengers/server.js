import fetch from 'node-fetch'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { logReq, logRes, logErr, getRandomInt } from './utils/index.js'

const MODULE_NAME = 'PASSENGERS'

let tickets = []

let time = undefined
let multiplicator = undefined

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

setInterval(async () => {
	await updateTime()
	await updateTickets()
	await buyTickets()
	await registerPassengers()
}, 1000)

const updateTickets = async () => {
	await updateTime()
	logReq('AvailableFlights')
	const availableFlights = await (
		await fetch('http://localhost:4000/OutcomingFlights')
	).json()

	removeOldFlights()

	for (let i = 0; i < availableFlights.length; i++) {
		if (
			new Date(availableFlights[i].time) > new Date(time) &&
			!tickets.find((x) => x.flight === availableFlights[i].flight)
		) {
			tickets.push({
				flight: availableFlights[i].flight,
				time: availableFlights[i].time,
				amount: availableFlights[i].capacity,
				sold: 0,
				registered: 0,
			})
		}
	}
	logRes('AvailableFlights', { tickets })
}

const removeOldFlights = () => {
	const result = []
	for (let i = 0; i < tickets.length; i++) {
		if (new Date(tickets[i].time) > new Date(time)) {
			result.push(tickets[i])
		}
	}
	tickets = result
}

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

const buyTickets = async () => {
	if (tickets.length === 0) return

	const requestedTicketsNumber = multiplicator * 10
	logReq('BuyTickets', { tickets, requestedTicketsNumber })
	const response = await (
		await fetch('http://localhost:4004/BuyTickets', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ tickets, requestedTicketsNumber }),
		})
	).json()
	tickets = response
	logRes('BuyTickets', response)
}

const registerPassengers = async () => {
	if (tickets.length === 0) return

	const passengers = multiplicator * 10
	logReq('RegisterPassengers', { passengers, ticketsNumber: tickets.length })
	const response = await (
		await fetch('http://localhost:4006/RegisterPassengers', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ passengers, tickets }),
		})
	).json()
	tickets = response
	logRes('RegisterPassengers', response)
}

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))

	app.get('*', (_, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = process.env.PORT || 4005
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
