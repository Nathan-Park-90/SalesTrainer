
import re

c = open('index.html', encoding='utf-8').read()
c = c.replace('<em>"What', '<em>\\"What')
c = c.replace('time?"</em>', 'time?\\"</em>')
open('index.html', 'w', encoding='utf-8').write(c)
