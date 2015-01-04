/**
Moneypot.com strategy
	- Play a martingale better strategy based on exiting at MULTIPLIER
	- Increases bet so that when a win happens, you will profit PROFIT_PER_WIN
    - Prints out other interesting stats such as the maximum amount lost and current loss streak
**/

var MULITPLIER = 4;
var loss = 0;
var my_username = "YOUR_USERNAME"
var max_loss = 0;
var PROFIT_PER_WIN = 2;
var num_bets = 0;
var amount_bet = 0;

var starting_balance = engine.getBalance();
engine.on('game_starting', function(info) {
    var wait = info.time_till_start - 2000;
    console.log(' ')
    console.log(' ')
    console.log("Balance % change ", engine.getBalance()/starting_balance - 1, " Average return: ", (engine.getBalance() - starting_balance)/100/amount_bet )
    setTimeout(function(){
    	
        //calculate better
        var noise = Math.round((Math.random() - .5) * 100) / 100
        var curr_multiplier = MULITPLIER + noise;
    	var bet = (loss+PROFIT_PER_WIN)/(curr_multiplier-1)
    	bet = Math.min(bet, 100000)
        bet = Math.ceil(bet);

    	engine.placeBet(bet*100, Math.round(curr_multiplier*100), false);

        amount_bet += bet;
        num_bets += 1

    	console.log("Betting ", bet, " Current loss: ", loss," Max Loss: ", max_loss, ' Profit per win: ', PROFIT_PER_WIN, " Multiplier: ", curr_multiplier);
        
        loss += bet;
        max_loss = Math.max(max_loss, loss);
    }, wait)
    
});

engine.on('cashed_out', function(resp) { 
        if (resp.username == my_username){
            loss = 0;
        }
    });