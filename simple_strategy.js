/**
Moneypot.com strategy
	- Bet FACTION_BALANCE of total balance every game
	- Cash out automatically at MAX_TIME
**/

var FACTION_BALANCE = .1;
var MAX_TIME = 200

var starting_balance = engine.getBalance();
engine.on('game_starting', function(info) {
    var wait = info.time_till_start - 500;
    console.log(' ')
    console.log(' ')
    console.log("Balance % change ", engine.getBalance()/starting_balance - 1)
    setTimeout(function(){
    	//set default bet
    	var bet = Math.round(engine.getBalance()/100*FACTION_BALANCE);
    	bet = Math.min(bet, 100000)
    	engine.placeBet(bet*100, MAX_TIME, false);

    	console.log("Betting ", bet);
    }, wait)
	
});