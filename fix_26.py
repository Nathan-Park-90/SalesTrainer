
lines = open('data.js', encoding='utf-8').read().split('\n')

lines.insert(106, "  ,{id:26,cat:'Demo',")

open('data.js', 'w', encoding='utf-8').write('\n'.join(lines))
print("Fixed card 26")
