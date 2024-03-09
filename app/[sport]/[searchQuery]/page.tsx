import EventsTable from '@/components/EventsTable'
import { getInitalSearch } from '@/lib/calls'
import React from 'react'

const page = async ({ params }: { params: { searchQuery: string } }) => {
    const searchQuery = params.searchQuery
    const result = await getInitalSearch(searchQuery)
    const eventList = result._embedded.events
    return (
        <div>
            <EventsTable events={eventList} searchQuery={searchQuery} />
        </div>
    )
}

export default page