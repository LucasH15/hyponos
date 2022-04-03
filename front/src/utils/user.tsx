import UserService from '@Services/user'

export const isLoggedIn = async () => {
    const token = localStorage.getItem('hyponosToken')

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
