/* Finds hashtags on page and return stop three */

function addBio(your_text_here) {
	// finds the bio
	let bio = document.getElementsByClassName('ProfileHeaderCard-bio')[0];

	// adds text
	bio.innerHTML += '<br>' + your_text_here;
};

function findTags () {

	// finds all hashtags on page
	let hashtags = document.getElementsByClassName('twitter-hashtag');

	// extracts it into array 
	let pattern = RegExp('<b>(.+)</b>');

	let matches = [];

	for (one in hashtags) {

		match.push(pattern.exec(hashtags[one].innerHTML));

	return matches;

	}

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

	console.log(tags);

	addBio('I mostly use' + tags[2] + ', ' tags[1] + ', ' + 'and ' + tags[0])
}