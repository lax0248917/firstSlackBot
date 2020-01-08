const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
	token : 'xoxb-862576157620-898260284484-4leNIOYhDgcFLzA6dnHlbAkr',
	name  : 'JokeBot'
});

// Start Handler
bot.on('start', () => {
	const params = {
		icon_emoji : ':joy:'
	};

	bot.postMessageToChannel('general', 'Get Reay To Laugh With @JokeBot!', params);
});

// Error Handler
bot.on('error', (err) => console.log(err));

// Message Handler
bot.on('message', (data) => {
	if (data.type !== 'message') {
		return;
	}
	handleMessage(data.text);
});

// Response to Data
function handleMessage (message) {
	if (message.includes(' chucknorris')) {
		chuckJoke();
	}
}

// Tell a Chuck Norris Joke

function chuckJoke () {
	axios.get('http://api.icndb.com/jokes/random').then((res) => {
		const joke = res.data.value.joke;

		const params = {
			icon_emoji : ':laughing:'
		};

		bot.postMessageToChannel('general', `Chuck Norris: ${joke}`, params);
	});
}
