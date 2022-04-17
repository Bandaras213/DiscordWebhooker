const playlist = require('./getPlaylist');
const util = require('./util/fileModify');
const webhook = require('./util/webhook');

/** 
 * Gets a VideoId from the PRovided data.json.
 * @param {JSON} db - Parsed data.json to use.
 * @param {string} playListId - Provided Id to get the right one from data.json.
 */
function getVideo(db, playListId) {
	let rdm = Math.floor(Math.random() * db[playListId].count);
	let link = `https://www.youtube.com/watch?v=${db[playListId].items[rdm].snippet.resourceId.videoId}`

	webhook.make(link);
}

/** 
 * Fetches the Provided playListId and checks if they already exists.
 * @param {JSON} db - Parsed data.json to use.
 * @param {string} playListId - Provided Id to get the right one from data.json.
 * @param {JSON} keys - Keys to check if they are in the data.json.
 */
async function get(db, playListId, appDir) {
	let data = await playlist.fetch(playListId);
	if (db[playListId].count != data.pageInfo.totalResults) {
		if (db[playListId].count < data.pageInfo.totalResults) {
			db = await playlist.getNew(db, playListId, data);
		} else {
			db = await playlist.getAll(db, playListId, data);
		}
	} else {
		console.log("Already have all Videos for " + playListId);
	}

	// Write to JSON
	await util.writeDB(JSON.stringify(db), appDir + "/data/data.json");
	// ========== //

	getVideo(db, playListId);
}

/** 
 * Gets all Videos from playlist.getAll and writes it with util.writeDB.
 * @param {JSON} db - Parsed data.json to use.
 * @param {string} playListId - Provided Id to get the right one from data.json.
 * @param {JSON} data - Fetched URL as JSON.
 */
async function getScratch(db, playListId, plType, newPlayListId, keys, appDir) {
	let data = await playlist.fetch(newPlayListId);

	if (!(keys.includes(newPlayListId))) {
		db[newPlayListId] = {
			kind: `${data.kind}`,
			etag: `${data.etag}`,
			count: 0,
			items: []
		}
		playListId[plType].push({
			"id": newPlayListId
		});
		db[newPlayListId].count = data.pageInfo.totalResults;
	} else {
		console.log("Id already in List getting video instead.");
		getVideo(db, newPlayListId);
		return;
	}

	db = await playlist.getAll(db, newPlayListId, data);

	await util.writeDB(JSON.stringify(db), appDir + "/data/data.json");
	await util.writeDB(JSON.stringify(playListId), appDir + "/data/ids.json");

	getVideo(db, newPlayListId);
}

// Export to use it in another js file
module.exports = {
	get: async function (db, playListId, appDir) {
		try {
			get(db, playListId, appDir);
		} catch (err) {
			console.log(err)
		}
	},
	getNew: async function (db, playListId, plType, newPlayListId, keys, appDir) {
		try {
			getScratch(db, playListId, plType, newPlayListId, keys, appDir);
		} catch (err) {
			console.log(err)
		}
	}
};
// ========== //