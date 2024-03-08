'use client'
import { getInitalSearch } from '@/lib/calls'
import { getSportsTeams } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import React from 'react'


const SportsListView = ({ sport }: { sport: string }) => {
    const sportsTeams = getSportsTeams(sport)
    const router = useRouter()
    const handleTeamClick = async (team: string) => {
        router.push(`/${sport}/${team}`)
    }
    return (
        <>
            <div className='flex flex-col items-center w-screen mt-8'>
                {sportsTeams?.map((team: string, idx) => (
                    <div key={idx} className='py-4 border-b-2 border-zinc-800'>
                        <h2
                            className='hover:text-cyan-400 hover:cursor-pointer'
                            onClick={() => handleTeamClick(team)}
                        >
                            {team}
                        </h2>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SportsListView