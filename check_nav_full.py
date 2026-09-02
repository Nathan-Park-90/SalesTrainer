
c = open('index.html', encoding='utf-8').read()
nav_start = c.find('<nav id="nav">')
nav_end = c.find('</nav>')
print(c[nav_start:nav_end+6])
