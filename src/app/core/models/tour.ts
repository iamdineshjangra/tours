export interface Tour {
    id: number,
    title: string,
    organizer: string,
    maxPersonCapacity: number,
    amountPerHead: number,
    startDate: Date | null | undefined,
    endDate: Date | null | undefined
}

export interface ResponseTour extends Tour {
    status: string,
    tours: Tour[]
}