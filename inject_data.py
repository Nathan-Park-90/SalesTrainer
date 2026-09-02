
import re
text = open('v3_prompt.txt', encoding='utf-8').read()
blocks = re.findall(r'```(.*?)```', text, re.DOTALL)

# Block 8: AWS
# Block 11: Cyber
aws_str = blocks[8].strip()
cyber_str = blocks[11].strip()

# Inject into index.html
c = open('index.html', encoding='utf-8').read()
# Find end of flashcards array: "],\n arch:["
idx = c.find('],\n arch:[')
if idx == -1:
    idx = c.find('],\narch:[')
if idx == -1:
    idx = c.find('], \n arch:[')

if idx != -1:
    # We append a comma before aws_str if needed
    # Look back for last '}'
    last_brace = c.rfind('}', 0, idx)
    if last_brace != -1:
        # Actually it's just putting them in before the bracket
        injection = ",\n" + aws_str + ",\n" + cyber_str + "\n"
        c = c[:idx] + injection + c[idx:]
        open('index.html', 'w', encoding='utf-8').write(c)
        print("Data injected")
    else:
        print("Failed to find last brace")
else:
    print("Failed to find insertion point")
