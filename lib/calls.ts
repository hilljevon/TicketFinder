'use server'

import { eventDetailsInterface } from "@/utils/types"

const ROOT_URL = 'https://app.ticketmaster.com/discovery/v2/'
const KEY = 'MBSM3VgWjzRPVvJlOzYksEgNDbOUCYlu'
const SECRET = '8GZOd4O7xiif46EH'
export async function getInitalSearch(keyword: string) {
    const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=MBSM3VgWjzRPVvJlOzYksEgNDbOUCYlu&keyword=${keyword}`,
    )
    if (!res.ok) {
        console.log('INCORRECT API CALL')
        throw new Error('Failed to fetch data')
    }

    return await res.json()
}
export async function getEventData(eventId: string) {
    const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${KEY}`,
    )
    if (!res.ok) {
        console.log('INCORRECT API CALL')
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
export async function getFilteredEventData(searchQuery: string, userMinimum: number) {
    const results: any = await getInitalSearch(searchQuery)
    const unfilteredResults: eventDetailsInterface[] = results._embedded.events
    const filteredResults: eventDetailsInterface[] = []
    unfilteredResults.forEach((event: eventDetailsInterface) => {
        if (event.priceRanges && event.priceRanges[0].min < userMinimum) {
            filteredResults.push(event)
        }
    })
    return filteredResults
}