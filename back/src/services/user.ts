import {inject} from '@loopback/context';
import { UserService } from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {UserProfile, securityId} from '@loopback/security';

import { User } from '../models';
import { Credentials, UserRepository } from '../repositories';
import {PasswordHasherBindings} from '../utils';
import {PasswordHasher} from './password-hasher';

export class UserManagementService implements UserService<User, Credentials> {
    constructor(
        @repository(UserRepository)
        public userRepository: UserRepository,
        @inject(PasswordHasherBindings.PASSWORD_HASHER)
        public passwordHasher: PasswordHasher,
    ) {}

    async verifyCredentials(credentials: Credentials): Promise<User> {
        const {email, password} = credentials;
        const invalidCredentialsError = 'Invalid email or password.';

        if (!email) {
            throw new HttpErrors.Unauthorized(invalidCredentialsError);
        }

        const foundUser = await this.userRepository.findOne({
            where: {email},
        });

        if (!foundUser) {
            throw new HttpErrors.Unauthorized(invalidCredentialsError);
        }

        const credentialsFound = await this.userRepository.findCredentials(
            foundUser.id,
        );

        if (!credentialsFound) {
            throw new HttpErrors.Unauthorized(invalidCredentialsError);
        }

        const passwordMatched = await this.passwordHasher.comparePassword(
            password,
            credentialsFound.password,
        );

        if (!passwordMatched) {
            throw new HttpErrors.Unauthorized(invalidCredentialsError);
        }

        return foundUser;
    }

    convertToUserProfile(user: User): UserProfile {
        return {
            [securityId]: user.id,
            email: user.email,
            id: user.id,
            role: user.role,
        };
    }

    async createUser(user: User): Promise<User> {
        const password = await this.passwordHasher.hashPassword(
            user.password,
        );
        user.password = password;
        const userCreated = await this.userRepository.create(user);
        userCreated.id = userCreated.id.toString();
        await this.userRepository.userCredentials(userCreated.id).create({password});
        return userCreated;
    }
}