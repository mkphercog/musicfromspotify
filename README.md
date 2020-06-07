# Music from Spotify

The application requires loggin into Spotify. When I writing the app I learned how authorization OAuth works. This is first application written with TypeScript.

## If you want you can copy this app, for that use command:

```
git clone https://github.com/mkphercog/musicfromspotify.git
```

### After that in cloned folder use:

```
npm install
```

You should also create file .env.local in global folder with:

- REACT_APP_CLIENT_ID - your ID from https://developer.spotify.com/
- REACT_APP_CLIENT_SECRET - your secret key also from https://developer.spotify.com/
- REACT_APP_REDIRECT_URI - your application url or "http://localhost:3000/" if you want test this just local
- REACT_APP_SCOPES = user-read-email

## In this project I'm using:

- react (CRA)
- typescript
- redux
- preprocessor SASS with methodology BEM

## See my project:

[Launch application here](https://mkphercog.github.io/musicfromspotify/)
