export interface IRoom {
    id: string
    title: string
    mainPicture: string
    description?: string
    pictures?: string[]
    price: number
    hotelId: string
}

export interface IFormInputs {
    title: string
    mainPicture: File
    description?: string
    pictures?: File[]
    price: number
    hotelId: string
}

export interface IFormSubmitInputs {
    title: string
    mainPicture: string
    description?: string
    pictures?: string[]
    price: number
    hotelId: string
}
