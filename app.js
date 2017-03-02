new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		haterHealth: 100,
		gameIsRunning: false,
		turns: []
	},
	methods: {
		startGame: function() {
			this.gameIsRunning = !this.gameIsRunning
			this.playerHealth = 100
			this.haterHealth = 100
			this.turns = []
		},

		attack: function() {
			var damage = this.calculateDamage(3,10)
			this.haterHealth -= damage
			this.turns.unshift({
				isPlayer: true,
				text: 'Player hits Hater  for ' + damage
			})

			if(this.checkWin()) {
				return
			}

			
			this.haterAttacks()


			this.checkWin()
		},


		specialAttack: function() {
			var damage = this.calculateDamage(10,20)
			this.haterHealth -= damage
			this.turns.unshift({
				isPlayer: true,
				text: 'Player hits Hater HARD for ' + damage
			})

			if(this.checkWin()) {
				return
			}

			this.haterAttacks()

			this.checkWin()
		},

		heal: function() {
			if(this.playerHealth <= 90) {
				this.playerHealth += 10
			} else {
				this.playerHealth = 100
			}
			this.turns.unshift({
				isPlayer: true,
				text: 'Player heals  for  10' 
			})
			this.haterAttacks()
		},

		giveUp: function() {
			this.gameIsRunning = false
		},

		haterAttacks: function() {
			var damage = this.calculateDamage(2,14)
			this.playerHealth -= damage
			this.turns.unshift({
				isPlayer: false,
				text: 'Hater hits Player for ' + damage
			})
		},

		calculateDamage: function(min, max) {
			return  Math.max(Math.floor(Math.random() * 10) + 1, min)
		},

		checkWin: function() {
			if(this.haterHealth <= 0 ) {
				if (confirm('You won!  New Game?')) {
					this.startGame();
				} else {
					this.gameIsRunning = false
				}
				return true;
			} else if(this.playerHealth <= 0) {
				if(confirm("You lost :-( , don't let the haters get you down!, new Game?")) {
					this.startGame()
				} else {
					this.gameIsRunning = false
				}
				return true
			}
			return false
		}
	}
})