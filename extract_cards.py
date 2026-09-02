
import re
text = open('v3_prompt.txt', encoding='utf-8').read()
# Let's not use findall if it's acting weird. Let's use simple find!

aws_start = text.find("{id:31, cat:'AWS'")
cyber_start = text.find("{id:51, cat:'Cyber'")

aws_end = text.find("{id:51, cat:'Cyber'", aws_start)
cyber_end = text.find("```", cyber_start)

if aws_start != -1 and cyber_start != -1:
    aws_str = text[aws_start:aws_end].strip()
    # Cyber cards end before the next section
    cyber_str = text[cyber_start:cyber_end].strip()
    
    # Let's just output them
    open('aws.txt', 'w', encoding='utf-8').write(aws_str)
    open('cyber.txt', 'w', encoding='utf-8').write(cyber_str)
    print(f"Extracted. AWS len: {len(aws_str)}, Cyber len: {len(cyber_str)}")
else:
    print("Could not find start tokens")
