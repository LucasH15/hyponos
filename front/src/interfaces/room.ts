export interface IRoom {
    id: string
    title: string
    mainPicture: string
    description?: string
    pictures?: string[]
    price: number
}

export interface IFormInputs {
    title: string
    mainPicture: string
    description?: string
    pictures?: string[]
    price: number
}
