/* Finds hashtags on page and return stop three */

function addBio(word) {
	// finds the bio
	'use strict';
	let bio = document.getElementsByClassName('ProfileHeaderCard-bio')[0];

	// bio.innerHTML += '<br>'.concat('<br>', 'I mostly use ', array[2], ', ', array[1], ', ', 'and ', array[0]);

	bio.innerHTML += word;
}

function findTags () {

	// finds all hashtags on page
	'use strict';
	let hashtags = document.querySelectorAll('.twitter-hashtag');

	let pattern = /hashtag\/(.+)\?/;

	let matches = {};

	for (let one of hashtags.entries()) {

		try {
		// extract word from pattern found
		let word = pattern.exec(one)[1];
	} catch (err) {
		let word = pattern.exec(one);
	}
		// Test if in dict
		if (matches[`${word}`] === undefined) {

			// Trigger for new word
			matches[`${word}`]  = 1;
		} else {

			// Trigger for increasing count
			matches[`${word}`]++;
		}
	}

	return matches;
}

function topThree(dict) {
	// go through array, find top and eliminate it into a new array
	'use strict';
	let routine = 3;
	let topThree;

	while (routine-- !== 0) {
		let top = 0;
		let pos = 0;

		for (let obj in array) {

			// trigger for finding top one
			if (array[obj].count > top) {
				top = obj.count;
				pos = obj;
			}
		}

		// splicing
		topThree.push(array[pos].word);
		array.splice(pos, 1);
	}

	return topThree;
}

function main() {
	'use strict';

	let tag = findTags();

	for (let key of Object.entries(tag)) {
		console.log(key);
	}

}

main();