
c = open('index.html', encoding='utf-8').read()

c = c.replace(r'\\"', r'\"')

open('index.html', 'w', encoding='utf-8').write(c)
print("Fixed double escapes")
