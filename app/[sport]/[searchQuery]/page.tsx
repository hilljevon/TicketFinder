import EventsTable from '@/components/EventsTable'
import { getInitalSearch } from '@/lib/calls'
import React from 'react'

const page = async ({ params }: { params: { searchQuery: string } }) => {
    console.log('THIS IS MY PARAMS', params.searchQuery)
    const searchQuery = params.searchQuery
    const result = await getInitalSearch(searchQuery)
    const eventList = result._embedded.events
    console.log('MY EVENT LIST IS HERE', eventList)
    return (
        <div>
            <EventsTable events={eventList} searchQuery={searchQuery} />
        </div>
    )
}

export default page