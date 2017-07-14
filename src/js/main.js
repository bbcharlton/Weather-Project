import Timer from './timer.js'

var updateTimers;
var timer1 = new Timer(1, 1); // Team 1, 1 player
var timer2 = new Timer(2, 1); // Team 2, 1 player
var turn   = 0; // 0 = Chess not started. 1 = Team 1's turn. 2 = Team 2's turn.

const end       = document.getElementById('end');
const start     = document.getElementById('start');
const cover     = document.getElementById('cover');
const win       = document.getElementById('winner');
const team1Time = document.getElementById('team1-time');
const team2Time = document.getElementById('team2-time');
const resetBtns = document.getElementsByClassName('reset');
const swapBtns  = document.getElementsByClassName('swapBtn');


window.onload = () => {
	team1Time.innerHTML = getTime(timer1.time);
	team2Time.innerHTML = getTime(timer2.time);

	// Lazy but quick way of resetting everything
	Array.from(resetBtns).forEach(btn => {
		btn.addEventListener('click', () => {
			location.reload();
		});
	});

	// Starts the game of chess
	start.addEventListener('click', () => {
		timer1.pauseTimer();
		timer1.startTimer();
		timer2.startTimer();
		cover.classList.add('fadeOut');

		setTimeout(function() { // For fancy styling
			cover.style.zIndex = '-1';
		}, 1000);

		swapBtns[0].style.display = 'inline-block';
		turn++;

		updateTimers = setInterval(() => {
			if (timer1.time === 0) {
				reward('Team 2'); // Team 2 wins
			} else if (timer2.time === 0) {
				reward('Team 1'); // Team 1 wins
			} else if (turn === 1) {
				team1Time.innerHTML = getTime(timer1.time);
			} else if (turn === 2) {
				team2Time.innerHTML = getTime(timer2.time);
			}
		},1000);
	});

	Array.from(swapBtns).forEach(btn => {
		btn.addEventListener('click', () => {
			swapTurns();
		});
	});
}

function swapTurns() {
	if (turn === 1) {
		turn++;
		timer1.pauseTimer();
		timer2.pauseTimer();
		swapBtns[0].style.display = 'none';
		swapBtns[1].style.display = 'inline-block';
	} else {
		turn--;
		timer1.pauseTimer();
		timer2.pauseTimer();
		swapBtns[0].style.display = 'inline-block';
		swapBtns[1].style.display = 'none';
	}
}

function getTime(time) {
	var hours = Math.floor(time / 3600);
	time = time - hours * 3600;

	var minutes = Math.floor(time / 60);
	var seconds = time - minutes * 60;

	return hours + ' hour(s), ' + minutes + ' minutes, ' + seconds + ' seconds';
}

function reward(winner) {
	clearInterval(updateTimers);
	timer1.stopTimer();
	timer2.stopTimer();
	win.innerHTML     = winner + ' won!';
	end.style.display = 'block';
	end.style.zIndex  = '3';
}
