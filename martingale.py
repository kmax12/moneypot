"""
utility to calculate outcomes in a martingale betting scheme
"""

loss = 0
multiplier = 1.1

prob_reach = 1.0

count = 0
gain_per_win = 1000
bet = 1
while True:
	count += 1
	prob_reach *= 1-1/multiplier
	loss += bet

	bet = (loss+gain_per_win)/multiplier
	loss += bet

	if bet > 100000:
		break
	
	print bet, loss, count, 1/prob_reach



