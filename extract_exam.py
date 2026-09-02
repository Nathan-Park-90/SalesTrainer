
import re
text = open('v3_prompt.txt', encoding='utf-8').read()
blocks = re.findall(r'```(.*?)```', text, re.DOTALL)

open('exam.txt', 'w', encoding='utf-8').write(blocks[17])
open('exam2.txt', 'w', encoding='utf-8').write(blocks[18])
open('threats.txt', 'w', encoding='utf-8').write(blocks[21])
print("Extracted")
