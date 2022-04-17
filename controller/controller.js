const util = require('../commands/util/fileModify.js');
const getVideoFunctions = require('../commands/getVideoFunctions');
const {
	dirname
} = require('path');
const appDir = dirname(require.main.filename);

/** 
 * Function that gets a Meme from the PlaylistIds Array
 */
async function meme() {
	let db = await util.readDB(appDir + "/data/data.json");
	let ids = await util.readDB(appDir + "/data/ids.json");
	let rdm = Math.floor(Math.random() * ids.memeChannelPlaylistIds.length);

	getVideoFunctions.get(db, ids.memeChannelPlaylistIds[rdm].id, appDir);
}

/** 
 * Function that gets a Music Video from the PlaylistIds Array
 */
async function music() {
	let db = await util.readDB(appDir + "/data/data.json");
	let ids = await util.readDB(appDir + "/data/ids.json");
	let rdm = Math.floor(Math.random() * ids.musicChannelPlaylistIds.length);

	getVideoFunctions.get(db, ids.musicChannelPlaylistIds[rdm].id, appDir);
}

async function getNew(type, id) {
	let db = await util.readDB(appDir + "/data/data.json");
	let ids = await util.readDB(appDir + "/data/ids.json");
	let plType;
	if (type = "meme") {
		plType = "memeChannelPlaylistIds"
	}
	if (type == "music") {
		plType = "musicChannelPlaylistIds"
	}

	getVideoFunctions.getNew(db, ids, plType, id, Object.keys(db), appDir);
}

// Export to use it in another js file
module.exports = {
	meme: function () {
		try {
			meme();
		} catch (err) {
			console.log(err)
		}
	},
	music: function () {
		try {
			music();
		} catch (err) {
			console.log(err)
		}
	},
	new: function (type, id) {
		try {
			getNew(type, id);
		} catch (err) {
			console.log(err)
		}
	}
};
// ========== //