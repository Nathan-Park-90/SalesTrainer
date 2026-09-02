
c = open('dump.txt', encoding='utf-16').read()

aws_start = c.find("{id:31, cat:'AWS'")
cyber_start = c.find("{id:51, cat:'Cyber'")

# But wait, dump.txt only contains the first 50 characters of each block!
# Because in my dump command I did: `print(f'Block {i}: {b[:50]}')`!!!
