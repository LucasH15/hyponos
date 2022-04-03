import { Client, expect } from '@loopback/testlab'
import { HyponosApplication } from '../../index'
import { setupApplication } from './test-helper'

describe('PingController', () => {
    let app: HyponosApplication
    let client: Client

    before('setupApplication', async () => {
        ;({ app, client } = await setupApplication())
    })

    after(async () => {
        await app.stop()
    })

    it('invokes GET /users without authorization', async () => {
        const res = await client.get('/users').expect(401)
        expect(res.body.error.message).to.equal('Authorization header not found.')
    })
})
