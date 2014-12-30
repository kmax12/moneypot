Moneypot Bots
========

Collection of bot strategies for moneypot.com


==simple_strategy.js==
* Bet FACTION_BALANCE of total balance every game
* Cash out automatically at MAX_TIME


==threshold.js==
* Bet the equvielent to the max bet of previous game
* Cash out once THRESHOLD percent of total bets have been cashed out or MAX_TIME is reached.
* Ignore bets from users in IGNORE_USERS
* Prints out percent change before each game