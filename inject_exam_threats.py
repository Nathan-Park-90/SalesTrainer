
import sys

c = open('index.html', encoding='utf-8').read()
exam = open('exam_data.js', encoding='utf-8').read()
threats = open('threats_data.js', encoding='utf-8').read()

idx = c.find('], \n arch:[')
if idx == -1: idx = c.find('],\narch:[')
if idx == -1: idx = c.find('],\n arch:[')

if idx != -1:
    # idx points to "],"
    # We want to insert exam and threats arrays right here
    # However, exam_data.js starts with "exam: ["
    # So we can just put a comma
    injection = ",\n" + exam + ",\n" + threats
    c = c[:idx+1] + injection + c[idx+1:]
    open('index.html', 'w', encoding='utf-8').write(c)
    print("Injected exam and threats")
else:
    print("Could not find insertion point")
