# Hyponos

## Description
This is a project for [Studi](https://www.studi.com/fr)

All in /doc is for Studi exam

## Test
- Website url : [https://hyponos.lucas-hubert.me](https://hyponos.lucas-hubert.me)
- API url : [https://hyponos-back.herokuapp.com/explorer/](https://hyponos-back.herokuapp.com/explorer/)
- ADMIN account : login hello@studi.fr and password Studi2022
- MANAGER account : login hello@manager.fr and password Manager2022

## How to use this project in local
### For back environment
You need to create .env file in root project and add :

DATABASE_URL provide postgresql config, ex: postgres://test:mypassword@localhost:5432/dev

DATABASE_SSL is a boolean to set SSL connection for database

CONTACT_EMAIL and CONTACT_EMAIL_PASSWORD is for form contact, the configuration is for google account

FRONT_URL is required for cors security
```
DATABASE_URL=""
DATABASE_SSL=""
CONTACT_EMAIL=""
CONTACT_EMAIL_PASSWORD=""
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