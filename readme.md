# Percival

a simple web app wrote with expressJs and vueJs
to send/recieve Files, Texts and Links to other peaple.
it`s just simple as open the site, tell the other about
your username, then they can send anything to you with it.


### How to use

to recive any data, just open the last tab with user icon,
then the sender should scan the QRcode or copy the username
to the username field, then sender element will appear then.

> after entring the reciver username sending boxes will apear


### How to deploy 

**API**

1. well, first migrate the database and then
just run the `app.js` with node

```bash
# Migrating db
node bin.js migrate

# run the API
node app.js
```

**Front**

2. you should build the front, then put it somewhere for
nginx or any other web server.

```bash

npm run build
```

> Dont forget to change the base API.

### TODO

1. ~show sender username for each reciever.~
2. list what you sent.
3. ~make the refresh a better way.~
4. ~show file name of each file instead of it`s id.~


> name Percival come from a character of *the legends of vox machina* anime.

