import SportsListView from '@/components/SportsListView'
import React from 'react'

const page = ({ params }: { params: { sport: string } }) => {
    const sport = params.sport
    return (
        <>
            <SportsListView sport={sport} />
        </>
    )
}

export default page