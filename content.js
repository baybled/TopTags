console.log('This test is working');
// object that fetches and tallies

function logic() {
	let bio = document.getElementsByClassName('ProfileHeaderCard-bio')[0];
	console.log(bio.innerHTML);
	bio.innerHTML += "<br><br>I mostly use these tags"
};

logic();