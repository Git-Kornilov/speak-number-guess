"use strict";

const msgEl = document.getElementById("msg");

const getRandomNumber = () => Math.floor(Math.random() * 100) + 1;

const randomNum = getRandomNumber();
console.log("Number:", randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition
recognition.start();

//Write what the user spoken
const writeMessage = (msg) => {
  msgEl.innerHTML = `
	 <div>You said:</div>
      <span class="box">${msg}</span>
	`;
};

// Check a NAN for number
const checkNumber = (msg) => {
  const num = +msg;

  // Valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `
		<div>That is not a valid number</div>
	`;
    return;
  }

  // Check in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += `
		<div>Number must be between 1 - 100</div>
	`;
    return;
  }

  // Check a number
  if (num === randomNum) {
    document.body.innerHTML = `
		<h2>Congrats! You have guessed the number!
		<br>
		<br>
		It was ${num}!
		</h2>
		<br>
		<br>
		<button class='play-again' id="play-again">Play again</button>
	`;
  } else if (num > randomNum) {
    msgEl.innerHTML += `
		<div>GO LOWER</div>
	`;
  } else {
    msgEl.innerHTML += `
		<div>GO HIGHER</div>
	`;
  }
};

// Capture user speak
const onSpeak = (e) => {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
};

// Speak result
recognition.addEventListener("result", onSpeak);

// End SR service
recognition.addEventListener("end", () => recognition.start());

// Play again
document.body.addEventListener("click", (e) => {
  if (e.target.id == "play-again") {
    window.location.reload();
  }
});
