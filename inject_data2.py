
import re

text = open('v3_prompt.txt', encoding='utf-8').read()
blocks = re.findall(r'```(.*?)```', text, re.DOTALL)

aws_str = blocks[8].strip()
cyber_str = blocks[11].strip()

# Inject into index.html
c = open('index.html', encoding='utf-8').read()
idx = c.find('], \n arch:[')
if idx == -1:
    idx = c.find('],\narch:[')
if idx == -1:
    idx = c.find('],\n arch:[')
if idx == -1:
    idx = c.find('],\r\n arch:[')

if idx != -1:
    injection = ",\n" + aws_str + ",\n" + cyber_str + "\n"
    c = c[:idx] + injection + c[idx:]
    open('index.html', 'w', encoding='utf-8').write(c)
    print("Data injected")
else:
    print("Failed to find insertion point")
