
import re

lines = open('data.js', encoding='utf-8').read().split('\n')

# Find where the new flashcards start
start_idx = 101
end_idx = 105
remainder_line = 106
analogy_line = 107

# Construct the proper card 25
card_25_start = lines[100]
# We want to replace the end of card_25_start with the original text from line 106
# Currently line 100 ends with: "We're working with [Company X] on this exact issue. We saved them $2M/yr by solving Y. Does that align with your current mandate?\"</em>\", analogy:\"Trading: Never pitch a complex options strategy to someone who only wants a high-yield savings account. Match the pitch to the altitude.\"}"

# Let's just fix card 25 manually
fixed_card_25 = '   back:"Structure: <strong>1) Problem</strong> — specific, quantified pain relevant to their role. <strong>2) Quantified Impact</strong> — what it costs per month/quarter unresolved. <strong>3) Specific Solution Fit</strong> — one sentence on the mechanism, one on a comparable outcome. You cannot lead with the product. A CFO who arrived unintentionally doesn\'t care about your architecture. <em>\\"We\'re working with [Company] on a challenge I suspect you\'re familiar with — [pain]. Companies in your space lose [metric] per [period] due to this. We help resolve that. Customers typically see [outcome] within [timeframe].\\"</em> Then stop. The CFO\'s response tells you if this is a real conversation.",\n    analogy:"Kempo: Don\'t open with your strongest technique against an opponent who doesn\'t know they\'re sparring. Start with a controlled probe that reveals whether they\'re engaged. The CFO\'s response is your stance read."}'

# The new flashcards
new_flashcards = lines[101:105]

# Build the new lines array
new_lines = lines[:99] # keep up to line 98 (card 24)
new_lines.append("   {id:25,cat:'Demo',") # line 99
new_lines.append('    front:"You have 4 unscheduled minutes with a CFO who walked into a CTO meeting. Name the 3-part pitch structure and the one thing you absolutely cannot lead with.",')
new_lines.append(fixed_card_25)
new_lines.extend(new_flashcards)
new_lines.extend(lines[108:])

open('data.js', 'w', encoding='utf-8').write('\n'.join(new_lines))
print("Fixed completely")
