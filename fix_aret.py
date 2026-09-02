
c = open('index.html', encoding='utf-8').read()

# The broken aRet is:
# onclick="aRet('+zi+','+ni+',''+name.replace(/'/g,"\'")+'')"
# It needs to be:
# onclick="aRet('+zi+','+ni+',\''+name.replace(/'/g,"\\'")+'\')"
# wait, actually, if it's inside an HTML string generated in JS:
# '<div class="pc" onclick="aRet('+zi+','+ni+',\''+name.replace(/'/g,"\\'")+'\')">'

# Let's just fix it.
bad_str = """onclick="aRet('+zi+','+ni+',''+name.replace(/'/g,"\'")+'')\""""
good_str = """onclick="aRet('+zi+','+ni+',\\''+name.replace(/'/g,"\\\\'")+'\\')\""""

c = c.replace(bad_str, good_str)
open('index.html', 'w', encoding='utf-8').write(c)
print("aRet fixed")
