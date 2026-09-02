
import re

c = open('data.js', encoding='utf-8').read()

# Remove the markdown lines completely
c = re.sub(r'```', '', c)
c = re.sub(r'###.*?\n', '', c)

open('data.js', 'w', encoding='utf-8').write(c)
print("Removed markdown junk")
