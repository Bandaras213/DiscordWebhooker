const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook(process.env['weebhookurl']);
const fetch = require("node-fetch");
const fs = require('fs');
const YOUTUBE_API_KEY = process.env['youtube-api-key'];

// Channel id's for easy looping
const channelPlaylistIds = ["UUjWsE9cjRu5gImk99yFhwVg", "UU4mvIQntW-fX27Ez-U-KDHw"];
// ========== //

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

// Main function
async function main() {
	//console.log("Ready to get Youtube data!");
	let db = await readDB();

	console.log(db[channelPlaylistIds[1]].items.length)
}

// Export to use it in another js file
module.exports = {
	go: function() {
		main();
	}
};
// ========== //