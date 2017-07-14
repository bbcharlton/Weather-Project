export default class Timer {
	constructor(team, playerCount) {
		this.team        = team; // Set to team number
		this.paused      = true; // Initially paused
		this.playerCount = playerCount; // set to amount of players on team

		if (playerCount > 1) {
			this.time = (playerCount * 180); // 3 minutes (180 seconds) per player if more than 1 player
		} else {
			this.time = 240; // 4 minutes (240 seconds) for 1 player
		}
	}

	startTimer() { // Begins the timers countdown
		this.timer = setInterval(() => {
			if (!this.paused) { // Check if timer is paused before counting down
				this.time--;
			}
		},1000);
	}

	pauseTimer() {
		if (this.paused) {
			this.paused = false; // Unpause timer countdown
		} else {
			this.paused = true; // Pause timer countdown
		}
	}

	stopTimer() {
		clearInterval(this.timer);  // Stop timer countdown
	}
}