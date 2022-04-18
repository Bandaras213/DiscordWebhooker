const YOUTUBE_API_KEY = process.env['youtube-api-key'];
const nodefetch = require("node-fetch");

/** 
 * Function that Fetches more urls if needed.
 * @param {string} url - Url with new nextPageToken as String.
 * @return {JSON} Returns the Fetched URL as JSON.
 */
async function getMore(url) {
    const response = await nodefetch(url);
    const data = await response.json();

    return data;
}

/** 
 * Fetches the provided URL.
 * @param {string} playListId - The Id for the Playlist that gets Fetched.
 * @return {JSON} Returns the Fetched URL as JSON.
 */
async function fetch(playListId) {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playListId}&key=${YOUTUBE_API_KEY}&part=snippet&maxResults=50`;

    // Get and Convert response to JSON
    const response = await nodefetch(url);
    const data = await response.json();
    // ========== //

    return data;
}

/** 
 * Only get New Videos that are not in the data.json under the provided PlaylistId.
 * @param {JSON} db - Parsed data.json to use.
 * @param {string} playListId - Provided Id to get the right one from data.json.
 * @param {JSON} data - Fetched URL with data.
 * @return {JSON} Returns the changed data.json.
 */
async function getOnlyNew(db, playListId, data) {
    for (let i = data.items.length - 1; i >= 0; i--) {
        for (let j = 0; j < db[playListId].items.length; j++) {
            if (data.items[i].snippet.id == db[playListId].items[j].snippet.id) {
                break;
            }
        }
        db[playListId].items.unshift(data.items[i]);
    }
    db[playListId].count = data.pageInfo.totalResults;

    return db;
}

/** 
 * Get all Videos and Empty provided PlaylistId items array.
 * @param {JSON} db - Parsed data.json to use.
 * @param {string} playListId - Provided Id to get the right one from data.json.
 * @param {JSON} data - Fetched URL with data.
 * @return {JSON} Returns the changed data.json.
 */
async function getAllVideos(db, playListId, data) {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playListId}&key=${YOUTUBE_API_KEY}&part=snippet&maxResults=50`;
    db[playListId].items = [];

    for (let i = 0; i < data.items.length; i++) {
        db[playListId].items.push(data.items[i]);
    }

    // As long as nextPageToken gets returnt and is not undefined Fetch next Page
    if (data.nextPageToken != undefined) {
        let check = false;
        let nextToken = data.nextPageToken;

        do {
            data = await getMore(url + "&pageToken=" + nextToken);
            for (let i = 0; i < data.items.length; i++) {
                db[playListId].items.push(data.items[i]);
            }
            if (data.nextPageToken == undefined) {
                check = true;
            } else {
                nextToken = data.nextPageToken;
            }
        } while (!check);
    }

    return db;
}


// Export to use it in another js file
module.exports = {
    fetch: async function (playListId) {
        try {
            let ret = await fetch(playListId);
            return ret;
        } catch (err) {
            console.log(err)
        }
    },
    getNew: async function (db, playListId, data) {
        try {
            let ret = await getOnlyNew(db, playListId, data);
            return ret;
        } catch (err) {
            console.log(err)
        }
    },
    getAll: async function (db, playListId, data) {
        try {
            let ret = await getAllVideos(db, playListId, data);
            return ret;
        } catch (err) {
            console.log(err)
        }
    }
};
// ========== //