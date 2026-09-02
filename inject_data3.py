
import re
import sys

text = open('v3_prompt.txt', encoding='utf-8').read()
blocks = re.findall(r'```(.*?)```', text, re.DOTALL)

if len(blocks) <= 11:
    print(f"Error: only found {len(blocks)} blocks")
    sys.exit(1)

aws_str = blocks[8].strip()
cyber_str = blocks[11].strip()

# Clean up any potential syntax errors in the raw strings:
# Let's ensure they are completely valid JS. Since they came from a markdown code block, they are raw JS.
# We will just inject them safely.

c = open('index.html', encoding='utf-8').read()
idx = c.find('], \n arch:[')
if idx != -1:
    injection = ",\n" + aws_str + ",\n" + cyber_str + "\n"
    c = c[:idx] + injection + c[idx:]
    open('index.html', 'w', encoding='utf-8').write(c)
    print("Data injected")
else:
    print("Failed to find insertion point")
