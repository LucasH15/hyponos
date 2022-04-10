export const HOME = '/'
export const REGISTER = '/inscription'
export const LOGIN = '/connexion'
export const MY_SPACE = '/mon-espace'
export const HOTELS = '/hotels'
export const HOTEL = '/hotels/:hotelId'

export const ADMIN = '/admin'
export const ADMIN_USERS = `${ADMIN}/utilisateurs`
export const ADMIN_USERS_ADD = `${ADMIN_USERS}/ajouter`
export const ADMIN_USERS_EDIT = `${ADMIN_USERS}/modifier/:userId`
export const ADMIN_HOTEL = `${ADMIN}/hotels/:hotelId`
export const ADMIN_HOTELS = `${ADMIN}/hotels`
export const ADMIN_HOTELS_ADD = `${ADMIN_HOTELS}/ajouter`
export const ADMIN_HOTELS_EDIT = `${ADMIN_HOTELS}/modifier/:hotelId`
export const ADMIN_ROOMS = `${ADMIN}/suites`
export const ADMIN_ROOMS_ADD = `${ADMIN_ROOMS}/ajouter`
export const ADMIN_ROOMS_EDIT = `${ADMIN_ROOMS}/modifier/:roomId`
