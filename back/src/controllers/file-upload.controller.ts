import { authenticate } from '@loopback/authentication'
import { authorize } from '@loopback/authorization'
import { inject } from '@loopback/core'
import { post, Request, requestBody, Response, RestBindings } from '@loopback/rest'
import multer from 'multer'
import path from 'path'
import _ from 'lodash'

import { ROLE_ADMIN, ROLE_MANAGER } from '../constants'
import { basicAuthorization } from '../services'

export class FileUploadController {
    constructor() {}

    @post('/files', {
        responses: {
            200: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object'
                        }
                    }
                },
                description: 'Files and fields'
            }
        }
    })
    @authenticate('jwt')
    @authorize({
        allowedRoles: [ROLE_ADMIN, ROLE_MANAGER],
        voters: [basicAuthorization]
    })
    async fileUpload(
        @requestBody.file()
        request: Request,
        @inject(RestBindings.Http.RESPONSE) response: Response
    ): Promise<object> {
        const storage = multer.diskStorage({
            destination: './files',
            filename: function (req, file, cb) {
                const extension = path.extname(file.originalname)
                cb(null, `${file.originalname.replace(extension, '')}${Date.now()}${extension}`)
            }
        })
        const upload = multer({ storage: storage }).any()

        return new Promise<object>((resolve, reject) => {
            upload(request, response, (err: unknown) => {
                if (err) reject(err)
                else {
                    resolve(FileUploadController.getFiles(request))
                }
            })
        })
    }

    private static getFiles(request: Request) {
        const uploadedFiles = request.files
        const mapper = (f: globalThis.Express.Multer.File) => ({
            filename: f.filename
        })
        let files: object[] = []
        if (_.isArray(uploadedFiles)) {
            files = uploadedFiles.map(mapper)
        } else {
            for (const filename in uploadedFiles) {
                files.push(...uploadedFiles[filename].map(mapper))
            }
        }

        return { files }
    }
}
