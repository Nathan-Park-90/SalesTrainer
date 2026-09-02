
c = open('v3_prompt.txt', encoding='utf-8').read()

exam_start = c.find("exam: [")
if exam_start != -1:
    exam_end = c.find("];", exam_start)
    if exam_end == -1: exam_end = c.find("]\n", exam_start)
    if exam_end == -1: exam_end = c.find("]\r\n", exam_start)
    
    exam_str = c[exam_start:exam_end+1].strip()
    open('exam_data.js', 'w', encoding='utf-8').write(exam_str)
else:
    print("exam: [ not found")

threats_start = c.find("threats: [")
if threats_start != -1:
    threats_end = c.find("];", threats_start)
    if threats_end == -1: threats_end = c.find("]\n", threats_start)
    if threats_end == -1: threats_end = c.find("]\r\n", threats_start)
    
    # Let's verify we got the right end by looking for the next markdown block
    next_md = c.find("```", threats_start)
    if next_md != -1 and next_md < threats_end:
        threats_end = next_md
        
    threats_str = c[threats_start:threats_end].strip()
    
    open('threats_data.js', 'w', encoding='utf-8').write(threats_str)
else:
    print("threats: [ not found")

print("Extraction complete")
