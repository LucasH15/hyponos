import { AuthorizationContext, AuthorizationDecision, AuthorizationMetadata } from '@loopback/authorization'
import { securityId, UserProfile } from '@loopback/security'
import _ from 'lodash'

export async function basicAuthorization(
    authorizationCtx: AuthorizationContext,
    metadata: AuthorizationMetadata
): Promise<AuthorizationDecision> {
    let currentUser: UserProfile

    if (authorizationCtx.principals.length > 0) {
        const user = _.pick(authorizationCtx.principals[0], ['id', 'email', 'role'])
        currentUser = {
            [securityId]: user.id,
            email: user.email,
            role: user.role
        }
    } else {
        return AuthorizationDecision.DENY
    }

    if (!currentUser.role) {
        return AuthorizationDecision.DENY
    }

    if (!metadata.allowedRoles) {
        return AuthorizationDecision.ALLOW
    }

    let roleIsAllowed = false
    if (metadata.allowedRoles.includes(currentUser.role)) {
        roleIsAllowed = true
    }

    if (!roleIsAllowed) {
        return AuthorizationDecision.DENY
    }

    return AuthorizationDecision.ALLOW
}
