/* Finds hashtags on page and return stop three */

function addBio(array) {
	// finds the bio
	let bio = document.getElementsByClassName('ProfileHeaderCard-bio')[0];

	// adds text
	let string = 
	
	bio.innerHTML += '<br>'.concat('<br>', 'I mostly use ', array[2], ', ', array[1], ', ', 'and ', array[0]);;
};

function findTags () {

	// finds all hashtags on page
	let hashtags = document.getElementsByClassName('twitter-hashtag');

	// extracts it into array 
	let pattern = RegExp('<b>(.+)</b>');

	let matches = [];

	for (one in hashtags) {

		matches.push(pattern.exec(hashtags[one].innerHTML));

	return matches;

	}
};

function sortByFrequency(array) {
	var frequency = {};
	// set all initial frequencies for each word to zero
	array.forEach(
		function(value) { frequency[value] = 0; });

	// create new array with words and their frequencies
	var uniques = array.filter(
		function(value) { return ++frequency[value] == 1; });

	// sort words by abc order
	return uniques.sort(
		function(a, b) { return frequency[b] - frequency[a]; });
};

function main() {

	let tags = findTags();

	sortByFrequency(tags);

	for (one in tags) {
		console.log(tags[one]);
	}
	
	addBio(tags);
};

main();