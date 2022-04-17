import { SchemaObject } from '@loopback/rest'

const ContactSchema: SchemaObject = {
    type: 'object',
    required: ['firstName', 'lastName', 'email', 'subject', 'message'],
    properties: {
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        email: {
            type: 'string',
            format: 'email'
        },
        subject: {
            type: 'string'
        },
        message: {
            type: 'string'
        }
    }
}

export const ContactRequestBody = {
    description: 'Inputs of contact function',
    required: true,
    content: {
        'application/json': { schema: ContactSchema }
    }
}
