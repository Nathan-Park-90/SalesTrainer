
lines = open('data.js', encoding='utf-8').read().split('\n')

# Line 98 is currently: materializes."},
# Let's verify line 98 ends with },
lines[97] = lines[97].replace('"}', '"},')

# Then remove any stray commas on line 99 and 100
for i in range(98, 105):
    if lines[i].strip() == '{id:25,cat:\'Demo\',' or lines[i].strip() == ',{id:25,cat:\'Demo\',':
        lines[i] = '' # delete these stray lines
        
# Then insert the proper line
lines.insert(98, "  ,{id:25,cat:'Demo',")

# Wait, let's just do a clean regex replacement for card 24 to card 25 transition
c = open('data.js', encoding='utf-8').read()

# Remove all weird card 25 starts
c = c.replace('   {id:25,cat:\'Demo\',\n', '')
c = c.replace('   ,{id:25,cat:\'Demo\',\n', '')
c = c.replace('    ,{id:25,cat:\'Demo\',\n', '')
c = c.replace('     front:"You have', '  ,{id:25,cat:\'Demo\',\n     front:"You have')

open('data.js', 'w', encoding='utf-8').write(c)
print("Cleaned up card 25 transition")
