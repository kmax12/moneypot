Moneypot Bots
========

Collection of bot strategies for moneypot.com


###simple_strategy.js
* Bet FACTION_BALANCE of total balance every game
* Cash out automatically at MAX_TIME
* Prints out percent change before each game


###threshold.js
* Bet the equvielent to the max bet of previous game
* Cash out once THRESHOLD percent of total bets have been cashed out or MAX_TIME is reached.
* Ignore bets from users in IGNORE_USERS
* Prints out percent change before each game


###martingale.js
* Play a martingale better strategy based on exiting at MULTIPLIER
* Increases bet so that when a win happens, you will profit PROFIT_PER_WIN
* Prints out other interesting stats such as the maximum amount lost and current loss streak