'use client'
import { getEventData, getTestData } from '@/lib/calls'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { ModeToggle } from './ui/moodtoggle'
import { Input } from './ui/input'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from './ui/label'
import Navbar from './shared/Navbar'
import NavbarWithSearch from './shared/NavbarWithSearch'
import SportsCard from './SportsCard'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
interface eventInterface {
    dates: {
        spanMultipleDays: boolean,
        start: {
            dateTime: string,
            localDate: string,
            localTime: string
        }
    },
    name: string,
    images: any[],
    id: string,
    sales: {
        public: {
            startDateTime: string,
            endDateTime: string,
            startTBA: boolean,
            startTBD: boolean
        }
    }
}
interface sportsCardInterface {
    leagueNameAbv: string,
    leagueNameFull: string,
    image: string
}

const sports = [
    {
        leagueNameAbv: 'NFL',
        leagueNameFull: 'National Football League',
        image: '',
    },
    {
        leagueNameAbv: 'NBA',
        leagueNameFull: 'National Basketball Association',
        image: ''
    },
    {
        leagueNameAbv: 'MLB',
        leagueNameFull: 'Major League Baseball',
        image: ''
    },
    {
        leagueNameAbv: 'NHL',
        leagueNameFull: 'National Hockey League',
        image: ''
    },
    {
        leagueNameAbv: 'MLS',
        leagueNameFull: 'Major League Soccer',
        image: ''
    },

]
const MainDashboard = () => {

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                {/* <div className='py-8 px-24'>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input
                            className='bg-slate-200'
                            onChange={e => handleQueryChange(e)}
                            value={searchQuery}
                            name='searchQuery'
                        />
                        <Button variant='secondary' onClick={handleTestData}>Search!</Button>
                    </div>
                    {events && (
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full divide-gray-300 mt-12">
                                    <thead>
                                        <tr>
                                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-400 sm:pl-0">Name</th>
                                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-400 sm:pl-0">Date</th>
                                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-400 sm:pl-0">Time</th>

                                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-400 sm:pl-0">Select</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-gray-200">
                                        {events.map((event: eventInterface) => (
                                            <tr className='border-b-2 py-4' key={event.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-600 sm:pl-0">
                                                    {event.name}
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-0">
                                                    {event.dates.start.localDate}
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-0">
                                                    {event.dates.start.localTime}
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-0">
                                                    <Button variant='secondary' className='' onClick={() => selectEvent(event.id)}>
                                                        <Sheet>
                                                            <SheetTrigger>Select</SheetTrigger>
                                                            {eventDetails && (
                                                                <SheetContent>
                                                                    <SheetHeader>
                                                                        <SheetTitle className='mt-4'>{eventDetails.name}</SheetTitle>
                                                                        <SheetDescription>
                                                                            <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                                                                                <div className='col-span-full'>
                                                                                    <Label className='' htmlFor="">Date</Label>
                                                                                    <Input className='my-2' readOnly value={eventDetails.dates.start.localDate} type="text" />
                                                                                </div>
                                                                                <div className='col-span-full'>
                                                                                    <Label className='' htmlFor="">Time</Label>
                                                                                    <Input className='my-2' readOnly value={eventDetails.dates.start.localTime} type="text" />
                                                                                </div>
                                                                                <div className='col-span-full'>
                                                                                    <Label className='' htmlFor="">Price Range</Label>
                                                                                    {eventDetails.priceRanges && (
                                                                                        <Input className='my-2' readOnly value={`$ ${eventDetails.priceRanges[0].min} - ${eventDetails.priceRanges[0].max}`} type="text" />
                                                                                    )}
                                                                                </div>
                                                                                <div className='col-span-full'>
                                                                                    <Label className='' htmlFor="">Venue</Label>
                                                                                    <Input className='my-2' readOnly value={eventDetails._embedded.venues[0].name} type="text" />
                                                                                </div>
                                                                                <div className='col-span-full'>
                                                                                    <a target="_blank" href={eventDetails.url}>
                                                                                        <Button variant='secondary'>
                                                                                            Buy Tickets
                                                                                        </Button>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </SheetDescription>
                                                                    </SheetHeader>
                                                                </SheetContent>
                                                            )}
                                                        </Sheet>

                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                </div> */}
                <div className='flex flex-row justify-center mt-8'>
                    {sports.map((sport: sportsCardInterface) => (
                        <div key={sport.leagueNameAbv}>
                            <SportsCard leagueNameAbv={sport.leagueNameAbv} leagueNameFull={sport.leagueNameFull} image={sport.image} />
                        </div>
                    ))}
                </div>
            </ThemeProvider>
        </>
    )
}

export default MainDashboard