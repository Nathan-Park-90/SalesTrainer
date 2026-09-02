
c = open('index.html', encoding='utf-8').read()
old = """onclick="aRet('+zi+','+ni+',''+name.replace(/'/g,"\'")+'')" """
# The original has no space at the end? Let's just find `onclick="aRet` and replace the whole substring up to `)"`
import re
# Look for: onclick="aRet(...,'',name.replace(/'/g,"\'")+'')"
# or basically anything between onclick="aRet( and )"
# specifically, this exact line:
c = c.replace(
    "onclick=\"aRet('+zi+','+ni+',''+name.replace(/'/g,\"\\'\")+'')\"",
    "onclick=\"aRet('+zi+','+ni+',\\''+name.replace(/'/g,\"\\\\'\")+'\\')\""
)
open('index.html', 'w', encoding='utf-8').write(c)
