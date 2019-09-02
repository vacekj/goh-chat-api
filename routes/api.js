const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");
const diacritics = require("diacritics");

router.get('/', function (req, res) {
	res.json({
		message: "GOH Chatbot API Running",
		status: 200
	});
});


router.post('/ucitel/', async function (req, res) {
	const prijmeni = diacritics.remove(req.body["prijmeni"]);
	const photoUrl = getPhotoUrl(prijmeni);
	return res.json(sendPhoto(photoUrl));
});

function getPhotoUrl(prijmeni) {
	return `https://www.gytool.cz/lide-foto/detail/${prijmeni}.jpg`;
}

function sendPhoto(url) {
	return {
		"messages": [
			{
				"attachment": {
					"type": "image",
					"payload": {
						"url": url
					}
				}
			}
		]
	};
}

module.exports = router;