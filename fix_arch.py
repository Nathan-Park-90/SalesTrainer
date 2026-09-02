
import re

c = open('data.js', encoding='utf-8').read()

broken_str = 'draggables:["Application Load Balancer","EC2 Instance (AZ-a)","EC2 Instance (AZ-b)","Local NAS Backup"\n  ,{'
fixed_str = 'draggables:["Application Load Balancer","EC2 Instance (AZ-a)","EC2 Instance (AZ-b)","Local NAS Backup"]}\n  ,{'

c = c.replace(broken_str, fixed_str)
open('data.js', 'w', encoding='utf-8').write(c)
print("Fixed arch array syntax bug")
