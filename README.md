# Hyponos

## Description
This is a project for [Studi](https://www.studi.com/fr)

## Test
- Website url : [https://hyponos.vercel.app](https://hyponos.vercel.app)
- API url : [https://hyponos-back.herokuapp.com/explorer/](https://hyponos-back.herokuapp.com/explorer/)
- ADMIN account : login hello@studi.fr and password Studi2022

## How to use this project in local
### For back environment
You need to create .env file in root project and add :

All DB_* provide postgresql config

FRONT_URL is required for cors security
```
DB_HOST=""
DB_USER=""
DB_NAME=""
DB_PASSWORD=""
FRONT_URL="http://localhost:3000"
```
After that, you can run `npm install`

### For front environment
You need to create .env file in root project and add :

REACT_APP_BASE_URL is the backend url for all requests
```
REACT_APP_BASE_URL="http://localhost:4000"
```
After that, you can run `npm install`

### Root project
Run `npm install` and then `npm dev` to run the project