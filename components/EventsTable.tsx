'use client'
import { eventDetailsInterface } from "@/utils/types"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Slider } from "@/components/ui/slider"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { getEventData, getFilteredEventData } from "@/lib/calls"
const formSchema = z.object({
    // priceRange: z.number().min(1, {
    //     message: "Price range must be at least $1",
    // }).max(100000000, {
    //     message: 'Wrong app...'
    // }),
    priceRange: z.string().transform((v) => Number(v) || 0),
})
export default function EventsTable({ events, searchQuery }: { events: eventDetailsInterface[], searchQuery: string }) {
    // console.log('THIS IS MY EVENT LIST', events)
    const [event, setevent] = useState(null)
    const [priceRange, setPriceRange] = useState([0])
    const selectEvent = async (id: string) => {
        const result = await getEventData(id)
        // console.log('MY RESULT EVENT HEREE', result)
        setevent(result)
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            priceRange: 0,
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const priceRange = values.priceRange
        const filteredResults = await getFilteredEventData(searchQuery, priceRange)
        console.log('MY FILTERED RESULTS HERE', filteredResults)
    }
    return (
        <div className="bg-gray-900">
            <div className="mx-auto max-w-7xl">
                <div className="bg-gray-900 py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {/* INSERT FORM BELOW HERE */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <div className="sm:flex sm:items-center">
                                    <div className="sm:flex-auto">

                                        {/* <h1 className="text-base font-semibold leading-6 text-white">
                                            Price Range
                                        </h1> */}
                                        <FormField
                                            control={form.control}
                                            name="priceRange"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Price Range</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            className="text-slate-900 font-semibold"
                                                            {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Enter your max price
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* <Button variant='secondary' type="submit">
                                            Submit
                                        </Button> */}

                                    </div>
                                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                        <button
                                            type="submit"
                                            className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </Form>
                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <table className="min-w-full divide-y divide-gray-700">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                    Location
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                    Ticket from:
                                                </th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-800">
                                            {events.map((event: eventDetailsInterface) => (
                                                <tr key={event?.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                                                        {event.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{event.dates.start.localDate}</td>
                                                    {event._embedded ? (
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{event._embedded?.venues[0].name}</td>
                                                    ) : (
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">TBD</td>
                                                    )}
                                                    {event.priceRanges ? (
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">${event.priceRanges[0]?.min}</td>
                                                    ) : (
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">TBD</td>
                                                    )}
                                                    {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                        <a href="#" className="text-indigo-400 hover:text-indigo-300">
                                                            Select <span className="sr-only"></span>
                                                        </a>
                                                    </td> */}
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-0">
                                                        <Button variant='secondary' className='' onClick={() => selectEvent(event.id)}>
                                                            <Sheet>
                                                                <SheetTrigger>Select</SheetTrigger>
                                                                {event && (
                                                                    <SheetContent>
                                                                        <SheetHeader>
                                                                            <SheetTitle className='mt-4'>{event.name}</SheetTitle>
                                                                            <SheetDescription>
                                                                                <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                                                                                    <div className='col-span-full'>
                                                                                        <Label className='' htmlFor="">Date</Label>
                                                                                        <Input className='my-2' readOnly value={event.dates.start.localDate} type="text" />
                                                                                    </div>
                                                                                    <div className='col-span-full'>
                                                                                        <Label className='' htmlFor="">Time</Label>
                                                                                        <Input className='my-2' readOnly value={event.dates.start.localTime} type="text" />
                                                                                    </div>
                                                                                    <div className='col-span-full'>
                                                                                        <Label className='' htmlFor="">Price Range</Label>
                                                                                        {event.priceRanges && (
                                                                                            <Input className='my-2' readOnly value={`$ ${event.priceRanges[0].min} - ${event.priceRanges[0].max}`} type="text" />
                                                                                        )}
                                                                                    </div>
                                                                                    <div className='col-span-full'>
                                                                                        <Label className='' htmlFor="">Venue</Label>
                                                                                        {event._embedded ? (
                                                                                            <Input className='my-2' readOnly value={event._embedded.venues[0].name} type="text" />
                                                                                        ) : (
                                                                                            <Input className='my-2' readOnly value='TBD' type="text" />
                                                                                        )}
                                                                                    </div>
                                                                                    <div className='col-span-full'>
                                                                                        <a target="_blank" href={event.url}>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
