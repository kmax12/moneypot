/**
Moneypot.com strategy
	- Bet the equvielent to the max bet of previous game
	- Cash out once THRESHOLD percent of total bets have been cashed out or MAX_TIME is reached.
	- Ignore bets from users in IGNORE_USERS
	- Prints out percent change before each game
**/

var MAX_TIME = 200 * 100;
var THRESHOLD = .6
var IGNORE_USERS = [];

var starting_balance = engine.getBalance();

//starting values to be replaced after one
var total_money = 1000; 
var total_exit = 0;
var last_max = 1000;
var bets = {};
var playing = false;


engine.on('game_starting', function(info) {
    var wait = info.time_till_start - 500;
    console.log(' ')
    console.log(' ')
    console.log("Balance % change ", engine.getBalance()/starting_balance - 1)
    setTimeout(function(){
    	//set default bet
    	var bet = last_max;
    	bet = Math.min(bet, .1*(engine.getBalance()/100));
    	bet = Math.round(bet);
    	playing = true;
    	console.log("Betting ", bet);
    	engine.placeBet(bet*100, MAX_TIME, false);
    }, wait)
	
});

engine.on('game_started', function(data) {
		total_money = 0;
		total_exit = 0;
		last_max=0;

		//make list of players actually in game
		var players = [];
		for(var k in data) players.push(k);

		for (i=0; i<players.length; i++){
			u = players[i];

			//ignore some people for total
			if (IGNORE_USERS.indexOf(u) != -1) {
				continue;
			}

			bets[u] = data[u].bet/100;
			last_max = Math.max(bets[u], last_max);

			total_money += bets[u];
		}

		if (!playing){
			return;
		}

		// console.log("Total money: ", total_money)
	});


engine.on('cashed_out', function(resp) {
		if (!playing){
			return;
		}

		if (IGNORE_USERS.indexOf(resp.username) != -1) {
				return;
		}

		if (!bets[resp.username]){
			console.log("ERROR: someone cashed out who i didn't think was playing", resp)
			return
		}
	    total_exit += bets[resp.username];

	    if (total_exit/total_money >= THRESHOLD && playing){
	    	console.log("CASHOUT");
			engine.cashOut();
			playing=false;
	    }

	});