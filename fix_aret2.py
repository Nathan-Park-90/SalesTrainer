
c = open('index.html', encoding='utf-8').read()

bad_str = r'''onclick="aRet('+zi+','+ni+',''+name.replace(/'/g,"\'")+'')\"'''
good_str = r'''onclick="aRet('+zi+','+ni+',\''+name.replace(/'/g,"\\'")+'\')\"'''

c = c.replace(bad_str, good_str)
open('index.html', 'w', encoding='utf-8').write(c)
print("aRet fixed properly")
