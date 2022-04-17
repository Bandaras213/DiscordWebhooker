const util = require('../commands/util/fileModify.js');
const {
	dirname
} = require('path');
const fs = require('fs');
const appDir = dirname(require.main.filename);

// Channel id's for easy looping
const memeChannelPlaylistIds = ["UUjWsE9cjRu5gImk99yFhwVg", "UU4mvIQntW-fX27Ez-U-KDHw"];
const musicChannelPlaylistIds = ["UUPhVv8K3Z1t8e-EHb-FsnMQ"];
// ================================================== //

/** 
 * Function to test the Data.json reading.
 * @return {number} Returns the Number of all PlaylistIds.
 */
async function testReadDB() {
	let db = await util.readDB(appDir + "/tests/testdata.json");
	let ids = await util.readDB(appDir + "/data/ids.json");
	console.log(ids)
	return Object.keys(db).length;
}

/** 
 * Function to test the test.json writing.
 */
async function testWriteDB() {
	let db = await util.readDB(appDir + "/tests/testdata.json");
	let newPlaylistIds = memeChannelPlaylistIds.concat(musicChannelPlaylistIds);
	let rdm = Math.floor(Math.random() * newPlaylistIds.length);

	let content = {
		[newPlaylistIds[rdm]]: {
			kind: `${db[newPlaylistIds[rdm]].kind}`,
			etag: `${db[newPlaylistIds[rdm]].etag}`,
			count: 10,
			items: []
		}
	}

	for (let i = 0; i < 10; i++) {
		content[newPlaylistIds[rdm]].items.push(db[newPlaylistIds[rdm]].items[i]);
	}

	await util.writeDB(JSON.stringify(content), appDir + "/tests/test.json");
}

/** 
 * Test function to remove written file after Download.
 * @param {string} file - The File Path to the File that gets deleted.
 */
function testRemoveFile(file) {
	fs.unlink(file, function () {
		console.log("File was deleted") // Callback
	});
}

// Export to use it in another js file
module.exports = {
	testReadDB: async function () {
		let ret = await testReadDB();
		return ret;
	},
	testWriteDB: async function () {
		await testWriteDB();
	},
	testRemoveFile: function (file) {
		testRemoveFile(file);
	}
};
// ================================================== //