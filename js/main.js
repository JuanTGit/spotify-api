// Declaration for song values;
let song;
let playSong;

// Spotify Credentials;

const clientId = 'd0a4d78b5eac429abee175f6ff8ccd57'
const clientSecret = 'YOUR CLIENT SECRET'

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

// Fucntion to search a song

/**
 * @param track
 * @param artist
 * Function gets song from Spotify using track and artist as params
 * and returns the song's preview_url
 */

const searchSong = async (track, artist) => {
    // Get Token
    let token = await getToken();

    // Setup search request to Spotify

    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);

    let request = new Request(`https://api.spotify.com/v1/search?q=${track},${artist}&type=track`, {
        method: 'GET',
        headers: headers
    });

    let response = await fetch(request);
    let data = await response.json();
    console.log(data);

    let song = data.tracks.items[0].preview_url;
    return song;
}

/**
 * @param url
 * url = song preview_url
 * 
 * Function will return an audio clip from the preview_url
 */

const songSnippet = (url) => {
    playSong = new Audio(url)
    playSong.play()
}

/**
 * NO PARAMS
 * 
 * Function will stop song snippet
 */

const stopSnippet = () => playSong.pause()

let stopMusic = document.getElementById('stopAudio')

stopMusic.addEventListener('click', () => { 
    console.log('Music stopped');
    stopSnippet(); 
});

/**
 * @param figId
 * 
 * Function to trigger getting song from Spotify and then playing song
 */

const clickedFigure = async (figId) => {
    let image = document.getElementById(figId).children[0];
    let songInfo = image.alt
    let track = songInfo.split(' - ')[0];
    let artist = songInfo.split(' - ')[1];
    
    let song = await searchSong(track, artist)
    
    if (playSong){
        stopSnippet()
    }
    songSnippet(song)
}
