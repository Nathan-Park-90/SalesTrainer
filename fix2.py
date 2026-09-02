
import re

c = open('index.html', encoding='utf-8').read()
# Replace any <em>"..."</em> with escaped quotes
c = re.sub(r'<em>"([^"]*?)"</em>', r'<em>\"\\1\"</em>', c)
# And maybe other unescaped quotes if they exist. Let's see if this fixes the current one.
open('index.html', 'w', encoding='utf-8').write(c)
