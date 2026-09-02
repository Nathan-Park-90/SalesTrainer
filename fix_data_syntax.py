
import re

c = open('data.js', encoding='utf-8').read()

broken_str = "We're working with [Company\n  ,{id:101"
fixed_str = "We're working with [Company X] on this exact issue. We saved them $2M/yr by solving Y. Does that align with your current mandate?\"</em>\", analogy:\"Trading: Never pitch a complex options strategy to someone who only wants a high-yield savings account. Match the pitch to the altitude.\"}\n  ,{id:101"

c = c.replace(broken_str, fixed_str)

open('data.js', 'w', encoding='utf-8').write(c)
print("Card 25 fixed")
