const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook(process.env['weebhookurl']);
//const hook = new Webhook(process.env['testhoocker']);
const fetch = require("node-fetch");
const fs = require('fs');
const YOUTUBE_API_KEY = process.env['youtube-api-key'];

// Channel id's for easy looping
const channelPlaylistIds = ["UUjWsE9cjRu5gImk99yFhwVg", "UU4mvIQntW-fX27Ez-U-KDHw", "UUPhVv8K3Z1t8e-EHb-FsnMQ"];
// ========== //

// Write the completed JSON file
function writeJson(content) {
	try {
		fs.writeFileSync('./data.json', content)
	} catch (err) {
		console.error(err)
	}
}
// ========== //

// Read the data.json
function readDB() {
	let retData;
	try {
		const data = fs.readFileSync('./data.json', 'utf8')
		let JSONdata = JSON.parse(data);
		retData = JSONdata;
	} catch (err) {
		console.error(err)
	}
	return retData;
}
// ========== //

// Get more if the API gives a nextPage token
async function getMore(url) {
	const response1 = await fetch(url);
	const data1 = await response1.json();

	return data1;
}
// ========== //

// Get a random video from the data.json
function getVideo(db) {
	console.log("1")
	let rdm;
	do {
		rdm = Math.floor(Math.random() * channelPlaylistIds.length);
	} while(Object.keys(db)[rdm] == channelPlaylistIds[2])
	let rdm1 = Math.floor(Math.random() * db[channelPlaylistIds[rdm]].count);
	hook.send("https://www.youtube.com/watch?v=" + db[channelPlaylistIds[rdm]].items[rdm1].snippet.resourceId.videoId);
}

function getMusic(db) {
	const IMAGE_URL = 'https://replit.com/@Bandaras213/BitesizedTrickyBases#a1.gif';
	let rdm = 2;
	let rdm1 = Math.floor(Math.random() * db[channelPlaylistIds[rdm]].count);
	hook.send("https://www.youtube.com/watch?v=" + db[channelPlaylistIds[rdm]].items[rdm1].snippet.resourceId.videoId);
}
// ========== //

// Main function
async function main(str) {
	console.log("Ready to get Youtube data!");
	let db = await readDB();
	// Loop through the playlistid array
	for (let i = 0; i < channelPlaylistIds.length; i++) {
		// Fetch the [i] id from api
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${channelPlaylistIds[i]}&key=${YOUTUBE_API_KEY}&part=snippet&maxResults=50`;

		// Convert response to JSON
		const response = await fetch(url);
		const data = await response.json();
		// ========== //

		// Check if the Playlistid is in the file
		if (!(channelPlaylistIds[i] in db)) {
			db[channelPlaylistIds[i]] = {
				kind: `${data.kind}`,
				etag: `${data.etag}`,
				count: 0,
				items: []
			}
		}
		// ========== //

		// Only get New Videos
		async function getNew() {
			for (let j = data.items.length - 1; j >= 0; j--) {
				for (let k = 0; k < db[channelPlaylistIds[i]].items.length; k++) {
					if (data.items[j].snippet.id == db[channelPlaylistIds[i]].items[k].snippet.id) {
						break;
					}
				}
				db[channelPlaylistIds[i]].items.unshift(data.items[j]);
			}
		}
		// ========== //

		// Get all videos from Channel new
		async function getAll() {
			db[channelPlaylistIds[i]].items = [];

			for (let j = 0; j < data.items.length; j++) {
				db[channelPlaylistIds[i]].items.push(data.items[j]);
			}

			// As long as nextPageToken gets returnt and is not undefined Fetch next Page
			if (data.nextPageToken != undefined) {
				let check = false;
				let nextToken = data.nextPageToken;

				do {
					let data1 = await getMore(url + "&pageToken=" + nextToken);
					for (let j = 0; j < data1.items.length; j++) {
						db[channelPlaylistIds[i]].items.push(data.items[j]);
					}
					if (data1.nextPageToken == undefined) {
						check = true;
					} else {
						nextToken = data1.nextPageToken;
					}
				} while (!check);
			}
			// ========== //
		}
		// ========== //

		if (db[channelPlaylistIds[i]].count != data.pageInfo.totalResults) {
			if (db[channelPlaylistIds[i]].count == 0) {
				db[channelPlaylistIds[i]].count = data.pageInfo.totalResults;
				await getAll();
				break;
			}
			if (db[channelPlaylistIds[i]].count < data.pageInfo.totalResults) {
				await getNew();
			} else {
				await getAll();
			}
			db[channelPlaylistIds[i]].count = data.pageInfo.totalResults;
		} else {
			console.log("Already have all Videos for " + channelPlaylistIds[i]);
		}
	}
	
	// Write to JSON [move out of Loop]
	writeJson(JSON.stringify(db));
	// ========== //

	// If everything is ready get Video from file
	if (str == "music") {
		getMusic(db);
	} else {
		getVideo(db);
	}
	
	// ========== //
}
// ========== //

// Export to use it in another js file
module.exports = {
	getmeme: function() {
		main();
	},
	getmusic: function() {
		main("music");
	}
};
// ========== //