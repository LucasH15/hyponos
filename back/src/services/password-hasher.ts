import { genSalt, hash, compare } from 'bcryptjs'
import { inject } from '@loopback/core'
import { PasswordHasherBindings } from '../utils/keys'

export type PasswordHash = (password: string, rounds: number) => Promise<string>

export async function passwordHasher(password: string, rounds: number): Promise<string> {
    const salt = await genSalt(rounds)
    return hash(password, salt)
}

export interface PasswordHasher<T = string> {
    hashPassword(password: T): Promise<T>
    comparePassword(providedPass: T, storedPass: T): Promise<boolean>
}

export class BcryptHasher implements PasswordHasher<string> {
    constructor(
        @inject(PasswordHasherBindings.ROUNDS)
        private readonly rounds: number
    ) {}

    async hashPassword(password: string): Promise<string> {
        const salt = await genSalt(this.rounds)
        return hash(password, salt)
    }

    async comparePassword(providedPass: string, storedPass: string): Promise<boolean> {
        const passwordIsMatched = await compare(providedPass, storedPass)
        return passwordIsMatched
    }
}
