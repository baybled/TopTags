// object that fetches and tallies

function logic(your_text_here) {
	let bio = document.getElementsByClassName('ProfileHeaderCard-bio')[0];
	console.log(bio.innerHTML);
	bio.innerHTML += '<br>' + your_text_here;
};

let hashtags = document.getElementsByClassName('twitter-hashtag');

let pattern = RegExp('<b>(.+)</b>')

for (one in hashtags) {

	let match = pattern.exec(hashtags[one].innerHTML)
	logic(match[0])
}