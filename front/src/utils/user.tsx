import { TOKEN_KEY } from '@Constants/request'
import UserService from '@Services/user'

export const isLoggedIn = async () => {
    const token = localStorage.getItem(TOKEN_KEY)

    if (token) {
        try {
            return await UserService.me(token)
        } catch (e) {
            return false
        }
    } else {
        return false
    }
}
