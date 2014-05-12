npm install -g meteorite
npm install -g yo
npm install -g generator-meteor

cd myAppDir
yo meteor

[?] Shall we include Iron Router? Yes

[?] Shall we include Bootstrap with LESS? Yes

smart.json
{
  "packages": {
    "iron-router": {},
    "bootstrap3-less": {},
    "collectionFS": {},
    "collection2": {},
    "collection-helpers": {}
  }
}

mrt add:
simple-schema
accounts-ui
accounts-password
migrations

mrt update


Структура данных:

lib/geography.js
Countries:
Страны мира
	- title

Cities:
Города
	- title
	- countryId

lib/sports.js
Sports:
Виды спорта
	- title

Teams:
Команды
	- title
	- sportId
	- cityId
	- countryId


Tournaments:
Турниры
	- title
	- sportId
	- countryId

Games:
Игры
	- tournamentId
	- sportId
	- dateOf
	- countryId
	- cityId
	- prediction
	- teamId1
	- teamId2

lib/posts.js
Posts:
Статьи
	- title
	- content
	- authorId
	- createdAt
	- sportId
	- tournamentId
	- gameId
	- gameDate
	- tags

