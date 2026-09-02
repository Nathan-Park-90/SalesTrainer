
lines = open('data.js', encoding='utf-8').read().split('\n')

# We want to replace everything from line 404 to 422 with the correct structure.
# Let's just find the start of arch array and rebuild it carefully.
c = open('data.js', encoding='utf-8').read()

start_idx = c.find(' arch:[\n  {id:1,title:"HA Dashboard"')
if start_idx == -1:
    start_idx = c.find(' arch:[')

end_idx = c.find('   {id:2,title:"Three-Tier App"')

correct_arch_1 = """ arch:[
  {id:1,title:"HA Dashboard",brief:"Mammoth Capital's trading dashboard runs on a single EC2 instance. One hardware fault during a MSTR catalyst event = full outage. Architect for 99.99% uptime.",
   draggables:["Application Load Balancer","EC2 Instance (AZ-a)","EC2 Instance (AZ-b)","Local NAS Backup"],
   zones:[{id:0,name:"Public Ingress Layer",correct:["Application Load Balancer"]},{id:1,name:"Availability Zone A (us-east-1a)",correct:["EC2 Instance (AZ-a)"]},{id:2,name:"Availability Zone B (us-east-1b)",correct:["EC2 Instance (AZ-b)"]}],
   dm:{"Local NAS Backup":"&#9888; A NAS is not an AWS component. For cloud persistent storage: S3 (objects) or EBS (block volumes attached to EC2)."},
   wm:"&#10003; Correct. ALB in front of two EC2 instances across separate AZs eliminates the single-point-of-failure. AWS automatically routes traffic away from an unhealthy instance. Minimum viable HA pattern for any production application."},
"""

c = c[:start_idx] + correct_arch_1 + c[end_idx:]

open('data.js', 'w', encoding='utf-8').write(c)
print("Arch array repaired")
