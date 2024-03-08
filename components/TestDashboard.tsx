'use client'
import React from 'react'
import { HoverEffect } from './ui/card-hover-effect';
export const projects = [
    {
        title: "NFL",
        description:
            "A technology company that builds economic infrastructure for the internet.",
        link: "/NFL",
    },
    {
        title: "NBA",
        description:
            "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
        link: "/NBA",
    },
    {
        title: "MLB",
        description:
            "A multinational technology company that specializes in Internet-related services and products.",
        link: "/MLB",
    },
    {
        title: "MLS",
        description:
            "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
        link: "/MLS",
    },
    {
        title: "NHL",
        description:
            "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
        link: "/NHL",
    },

];
const TestDashboard = () => {
    return (
        <div className="max-w-5xl mx-auto px-8">
            <HoverEffect items={projects} />
        </div>
    )
}

export default TestDashboard