'use server'
const ROOT_URL = 'https://app.ticketmaster.com/discovery/v2/'
const KEY = 'MBSM3VgWjzRPVvJlOzYksEgNDbOUCYlu'
const SECRET = '8GZOd4O7xiif46EH'
export async function getTestData(keyword: string) {
    const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=MBSM3VgWjzRPVvJlOzYksEgNDbOUCYlu&keyword=${keyword}`,
    )
    if (!res.ok) {
        console.log('INCORRECT API CALL')
        throw new Error('Failed to fetch data')
    }

    return res.json()
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