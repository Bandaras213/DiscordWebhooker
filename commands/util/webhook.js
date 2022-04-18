const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook(process.env['weebhookurl']);

/** 
 * Discord Hook sender.
 * @param {string} link - Youtube Link as String.
 */
function make(link) {
	hook.send(link);
}

// Export to use it in another js file
module.exports = {
	make: async function (link) {
		try {
			make(link);
		} catch (err) {
			console.log(err)
		}
	}
};
// ========== //