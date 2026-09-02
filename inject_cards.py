
import sys

aws_str = open('aws.txt', encoding='utf-8').read().strip()
cyber_str = open('cyber.txt', encoding='utf-8').read().strip()

if aws_str.endswith(','): aws_str = aws_str[:-1]
if cyber_str.endswith(','): cyber_str = cyber_str[:-1]

c = open('index.html', encoding='utf-8').read()
idx = c.find('], \n arch:[')
if idx == -1: idx = c.find('],\narch:[')
if idx == -1: idx = c.find('],\n arch:[')
if idx == -1: idx = c.find('],\r\n arch:[')

if idx != -1:
    injection = ",\n" + aws_str + ",\n" + cyber_str + "\n"
    c = c[:idx] + injection + c[idx:]
    open('index.html', 'w', encoding='utf-8').write(c)
    print("Injected successfully")
else:
    print("Could not find insertion point")
