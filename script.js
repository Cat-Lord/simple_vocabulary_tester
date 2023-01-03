var slovicka = [];
var revertedTest = false;
var correct = 0;
var questionIndex = -1;

document.querySelector("#readFileButton").addEventListener('click', function () {
	if (document.querySelector("#fileInput").files.length == 0) {
		alert('Error : No file selected');
		return;
	}

	// first file selected by user
	var file = document.querySelector("#fileInput").files[0];
	document.querySelector("#resetTestButton").style.display = 'none';

	// perform validation on file type & size if required

	// read the file
	var reader = new FileReader();

	// file reading finished successfully
	reader.addEventListener('load', function (e) {
		// contents of file in variable     
		var text = e.target.result;

		text.split('\n').forEach(par => {
			var duo = par.split('~');
			if (duo.length != 2) {
				console.log("WTF DUDE ? " + duo);
				return;
			}
			slovicka.push(new Pair(duo[0], duo[1]));
		});

		console.log(slovicka);
		slovicka = shuffleArray(slovicka);
		revertedTest = document.querySelector("#revertedTest").checked;
		document.querySelector("#testBox").style.display = 'block';
		document.querySelector(".intro").style.display = 'none';
		nextQuestion();

		userInput.addEventListener('keypress', function (e) {
			if (e.keyCode == 13)
				if (document.querySelector("#checkButton").disabled == false)
					checkAnswer();
				else if (document.querySelector("#nextButton").disabled == false)
					nextQuestion();
		});
	});

	// file reading failed
	reader.addEventListener('error', function () {
		alert('Error : Failed to read file');
	});

	// read as text file
	text = reader.readAsText(file, "utf-8");

});

function switchButtons () {
	var value = document.querySelector("#nextButton").disabled;
	document.querySelector("#checkButton").disabled = value;
	document.querySelector("#nextButton").disabled = !value;
}

function checkAnswer () {
	if (slovicka[questionIndex].check() == true) {
		document.querySelector("#checkResponse").style.background = '#85ff99';
		correct++;
	}
	else {
		document.querySelector("#checkResponse").style.background = '#ff8585';
		document.querySelector("#correctAnswerBox").style.display = 'block';
		document.querySelector("#correctAnswer").innerHTML = slovicka[questionIndex].getCorrectAnswer();
	}

	switchButtons();
}

function nextQuestion () {
	document.querySelector("#checkResponse").style.background = 'none';
	document.querySelector("#userInput").value = '';
	document.querySelector("#correctAnswerBox").style.display = 'none';
	document.querySelector("#isTrennbar").style.display = 'none';
	document.querySelector("#trennbar").checked = false;

	if (Number(questionIndex) + 1 >= Number(slovicka.length)) {
		document.querySelector("#testResultBox").style.display = 'block';
		document.querySelector("#testResult").innerHTML = " " + ((correct / slovicka.length) * 100).toFixed(2) + "%";
		document.querySelector("#checkButton").disabled = true;
		document.querySelector("#nextButton").disabled = true;
		document.querySelector("#resetTestButton").style.display = 'block';
		return;
	}

	document.querySelector("#toTranslate").innerHTML = slovicka[++questionIndex].getQuestion();
	switchButtons();
}

//https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffleArray (a) {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}

function resetTest () {
	slovicka = shuffleArray(slovicka);
	questionIndex = -1;
	correct = 0;
	document.querySelector("#resetTestButton").style.display = 'none';
	nextQuestion();
}