import { SchemaObject } from '@loopback/rest'

const CancelSchema: SchemaObject = {
    type: 'object',
    required: ['bookingId'],
    properties: {
        bookingId: {
            type: 'string'
        }
    }
}

export const CancelRequestBody = {
    description: 'Content for cancel a booking',
    required: true,
    content: {
        'application/json': { schema: CancelSchema }
    }
}
