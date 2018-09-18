/* Finds hashtags on page and return stop three */

function addBio(word) {
	// finds the bio
	'use strict';
	let bio = document.getElementsByClassName('ProfileHeaderCard-bio')[0];

	// bio.innerHTML += '<br>'.concat('<br>', 'I mostly use ', array[2], ', ', array[1], ', ', 'and ', array[0]);

	bio.innerHTML += word
}

function findTags () {

	// finds all hashtags on page
	'use strict';
	let hashtags = document.querySelectorAll('.twitter-hashtag');

	// extracts it into array 
	let pattern = /hashtag\/(.+)\?/;

	let matches = [];

	for (let one of hashtags.entries()) {

		let word = pattern.exec(one)[1];

		if (matches.${word} !== undefined) {
			matches.${word}++;
		} else {
			matches.push({${word} : 1});
		}
	}

	return matches;
}

function wordsToFreqObjs(array) {
	// Arranges strings in array into array of objects, counting frequency of occurence
	'use strict';
	let freqObjs = [];

	for (let word of array) {
		// For each word, create a count of 1 and add to it, splicing duplicates out, and add it to final frequency array

		let freq = 1;
		for (let num in array) {

			// trigger for increasing count
			if (array[num] == word) {
				freq++;
				array.splice(num, 1);
			}

		freqObjs.push({word: word, count: freq});
	}

	}
	return freqObjs;
}

function topThree(array) {
	// go through array, find top and eliminate it into a new array
	'use strict';
	let routine = 3;
	let topThree;

	while (routine !== 0) {
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
		routine--;
	}

	return topThree;
}

function main() {
	'use strict';

	let tag = findTags();

	for (let one of tag) {
		console.log(one);
	}

}

main();