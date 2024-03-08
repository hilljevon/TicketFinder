export type eventDetailsInterface = {
    accessibility: string,
    dates: {
        start: {
            dateTime: string,
            localDate: string,
            localTime: string
        },
        timezone: string,
        status: {
            code: string
        }
    },
    id: string,
    images: any[],
    name: string,
    pleaseNote: string,
    priceRanges: {
        currency: string,
        max: number,
        min: number,
        type: string
    }[],
    promoter: {
        id: string,
        description: string,
        name: string
    },
    sales: {
        public: {
            startDateTime: string,
            endDateTime: string
        }
    },
    type: string,
    url: string,
    _embedded: {
        venues: {
            address: string,
            boxOfficeInfo: any,
            city: { name: string },
            country: {
                name: string,
                countryCode: string
            },
            id: string,
            locale: string,
            location: {
                latitude: string,
                longitude: string
            },
            name: string,
            postalCode: string,
            state: {
                name: string,
                stateCode: string
            },
            timeZone: string,
            type: string,
            url: string
        }[]
    }
}