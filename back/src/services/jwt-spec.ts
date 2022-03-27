import {bind} from '@loopback/core';
import {asSpecEnhancer, OASEnhancer, OpenApiSpec, SecuritySchemeObject, ReferenceObject, mergeOpenAPISpec} from '@loopback/rest';
import debugModule from 'debug';
import {inspect} from 'util';
const debug = debugModule('loopback:jwt-extension:spec-enhancer');

export type SecuritySchemeObjects = {
    [securityScheme: string]: SecuritySchemeObject | ReferenceObject;
};

export const SECURITY_SCHEME_SPEC: SecuritySchemeObjects = {
    jwt: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    },
};

@bind(asSpecEnhancer)
export class SecuritySpecEnhancer implements OASEnhancer {
    name = 'bearerAuth';

    modifySpec(spec: OpenApiSpec): OpenApiSpec {
        const patchSpec = {
            components: {
                securitySchemes: SECURITY_SCHEME_SPEC,
            },
            security: [],
        };
        const mergedSpec = mergeOpenAPISpec(spec, patchSpec);
        debug(`security spec extension, merged spec: ${inspect(mergedSpec)}`);
        return mergedSpec;
    }
}