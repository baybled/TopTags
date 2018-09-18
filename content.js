/* Finds hashtags on page and return stop three */

function addBio(array) {
	// finds the bio
	let bio = document.getElementsByClassName('ProfileHeaderCard-bio')[0];

	bio.innerHTML += '<br>'.concat('<br>', 'I mostly use ', array[2], ', ', array[1], ', ', 'and ', array[0]);;
};

function findTags () {

	// finds all hashtags on page
	let hashtags = document.getElementsByClassName('twitter-hashtag');

	// extracts it into array 
	let pattern = new RegExp('<b>(.+)</b>');

	let matches = [];

	for (one in hashtags) {

		matches.push(pattern.exec(hashtags[one].innerHTML));

	return matches;

	}
};

function wordsToFreqObjs(array) {
	// Arranges strings in array into array of objects, counting frequency of occurence

	let freqObjs = [];

	for (word of array) {
		// For each word, create a count of 1 and add to it, splicing duplicates out, and add it to final frequency array

		let freq = 1;
		for (num in array) {

			// trigger for increasing count
			if (array[num] == word) {
				count++;
				array.splice(num, 1);
			}

		freqObjs.push({word: word, count: freq})
	}

	return freqObjs;
}

function topThree(array) {
	// go through array, find top and eliminate it into a new array

	let routine = 3
	let topThree;

	while (routine != 0) {
		let top = 0;
		let pos = 0;

		for (obj in freqObjs) {

			// trigger for finding top one
			if (freqObj[obj].count > top) {
				top = obj.count;
				position = obj;
			}
		}

		// splicing
		topThree.push(freqObjs[pos].word)
		freqObjs.splice(pos, 1);
		routine--;
	}

	return topThree;
}

function main() {

	let tags = findTags();

	for (one of tags) {
		console.log(one);
	}
};

main();