/**
Moneypot.com strategy
	- Only enters when user TO_FOLLOW plays
    - Cashes out after that users cashes out
    - bets minimum of what that user bet in previous game or PERCENT_BALANCE percent of your balance
    - adds noise to bets and cash outs
**/

var MAX_TIME = 200;
var TO_FOLLOW = "ENTER USER TO FOLLOW"
var PERCENT_BALANCE = .35


var last = 0
var starting_balance = engine.getBalance();
engine.on('game_started', function(info) {
    if (info[TO_FOLLOW]){
        last = info[TO_FOLLOW].bet/100
    }
});

engine.on('player_bet', function(data) {
    if (data.username == TO_FOLLOW){
        var bet = Math.min(engine.getBalance()/100*PERCENT_BALANCE, last);
        bet += Math.random()*100;
        bet = Math.round(bet)
        engine.placeBet(bet*100,MAX_TIME, false);
    	console.log("Betting ", bet );
    }
});

engine.on('cashed_out', function(resp) { 
        if (resp.username == TO_FOLLOW){
            setTimeout(function(){
                engine.cashOut();
            }, Math.random()*100)
        }
});