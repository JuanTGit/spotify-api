// Declaration for song values;
let song;
let playsong;

// Spotify Credentials;

const clientId = 'd0a4d78b5eac429abee175f6ff8ccd57'
const clientSecret = 'CLIENT SECRET KEY'

// Fuction to get token from Spotify

const getToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json()
    return data.access_token
}