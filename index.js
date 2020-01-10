const SlackBot = require('slackbots');
const axios = require('axios');
const slackToken = require('./module');

const bot = new SlackBot({
	token : slackToken.slack_token,
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
	} else if (message.includes(' yomomma')) {
		yoMommaJoke();
	} else if (message.includes(' trivia')) {
		triviaQuestion();
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

// Tell a Yo Momma Joke

function yoMommaJoke () {
	axios.get('http://api.yomomma.info').then((res) => {
		const joke = res.data.joke;

		const params = {
			icon_emoji : ':laughing:'
		};

		bot.postMessageToChannel('general', `Yo Momma: ${joke}`, params);
	});
}

// Tell a Trivia Question

function triviaQuestion () {
	axios.get('http://trivia.propernerd.com/api/questions?limit=1&random=true').then((res) => {
		const question = res.data[0].question;

		const answer = res.data[0].answer;

		const params = {
			icon_emoji : ':bulb:'
		};

		bot.postMessageToChannel('general', `Trivia: ${question}`, params);

		// Provides Answer on a 5 second delay
		setTimeout(function () {
			bot.postMessageToChannel('general', `Answer: ${answer}`, params);
		}, 5000);
	});
}
