
c = open('index.html', encoding='utf-8').read()
idx = c.find('id="nav"')
print(c[idx:idx+500])
