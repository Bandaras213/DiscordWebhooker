const fs = require('fs');

/** 
 * Function to read the data.json file.
 * @param {string} dbstr - Takes the Path zto the data.json as String.
 * @return {retData} Returns the data.json as parsed JSON.
 */
function readDB(dbStr) {
	let retData;
	try {
		const data = fs.readFileSync(dbStr, 'utf8')
		let JSONdata = JSON.parse(data);
		retData = JSONdata;
	} catch (err) {
		console.error(err)
	}
	return retData;
}

/** 
 * Function to write the neuw data.json.
 * @param {JSON.stringify} content - Json Object stringify to String.
 * @param {string} file - Path as String to data.json.
 * @return {string} Returns a Status as string.
 */
async function writeDB(content, file) {
	let status;

	try {
		fs.writeFileSync(file, content)
		status = "OK";
	} catch (err) {
		console.error(err)
		status = "ERROR";
	}

	return status;
}

// Export to use it in another js file
module.exports = {
	readDB: async function (dbStr) {
		try {
			let db = await readDB(dbStr);
			return db;
		} catch (err) {
			console.log(err)
		}
	},
	writeDB: async function (content, file) {
		try {
			let write = await writeDB(content, file);
			return write;
		} catch (err) {
			console.log(err)
		}
	}
};
// ========== //