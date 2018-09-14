// object that fetches and tallies

function logic(your_text_here) {
	let bio = document.getElementsByClassName('ProfileHeaderCard-bio')[0];
	console.log(bio.innerHTML);
	bio.innerHTML += '<br><br>' + your_text_here;
};

let hashtags = document.getElementsByClassName('twitter-hashtag')

logic('<br><br>this test is working');

console.log(hashtags[0].innerHTML)