/* Finds hashtags on page and return stop three */

function addBio(array) {
	// finds the bio
	'use strict';
	let bio = document.getElementsByClassName('ProfileHeaderCard-bio')[0];

	// Different flow based on number of hashtags available
	try {
		if (array.length > 2) {
			bio.innerHTML += `<br><br>I'm using <a href="https://twitter.com/hashtag/${array[0][0]}?src=hash"><span style="color: blue">#${array[0][0]}</span></a>, <a href="https://twitter.com/hashtag/${array[1][0]}?src=hash"><span style="color: blue">#${array[1][0]}</span></a> and <a href="https://twitter.com/hashtag/${array[2][0]}?src=hash"><span style="color: blue">#${array[2][0]}</span></a>.`;
		} else {
			bio.innerHTML += `<br><br>I'm using <a href="https://twitter.com/hashtag/${array[0][0]}?src=hash"><span style="color: blue">#${array[0][0]}</span></a>.`;
		}
	} catch (err) {
		bio.innerHTML += "<br><br>Too little info.";
	}
}

function findTags () {

	// finds all hashtags on page
	'use strict';
	let hashtags = document.querySelectorAll('.twitter-hashtag');

	let pattern = /hashtag\/(.+)\?/;

	let matches = {};

	for (let one of hashtags.entries()) {

		// escape errors
		if (pattern.exec(one) !== null) {
	
			let word = pattern.exec(one)[1];

			// Test if in dict
			if (matches[`${word}`] === undefined) {

				// Trigger for new word
				matches[`${word}`]  = 1;
			} else {

				// Trigger for increasing count
				matches[`${word}`]++;
			}
		}
	}

	return matches;
}

function topThree(dict) {
	// sort dictionary by value
	'use strict';

	// Create array
	var array = Object.keys(dict).map(function(key) {
	  return [key, dict[key]];
	});

	// Sort the array based on the second element
	array.sort(function(first, second) {
	  return second[1] - first[1];
	});

	// return new array with only the first 3 items
	return array.slice(0, 3);
}

function main() {
	'use strict';

	let tag = findTags();

	let top = topThree(tag);

	// Debugging only
	// for (let each in top) {
	// 	console.log(top[each][0]);
	// }

	addBio(top);

}

main();