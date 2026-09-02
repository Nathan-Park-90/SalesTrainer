
c = open('index.html', encoding='utf-8').read()

c = c.replace(
    "onclick=\"sDTab('reframe')\"",
    "onclick=\"sDTab(\\'reframe\\')\""
)
c = c.replace(
    "onclick=\"pRet('+si+','+pi+',''+id+'')\"",
    "onclick=\"pRet('+si+','+pi+',\\''+id+'\\')\""
)
c = c.replace(
    "they're",
    "they\\'re"
) # Wait, is "they're" inside a JS string literal enclosed in single quotes? 
# "else{r.className='dr show err';r.innerHTML='&#10005; Not quite. The Economic Buyer must feel the pain before they're ready to hear your solution. ...'}"
# Yes! `they're` breaks the string!

# Fix they're
c = c.replace("before they're ready", "before they\\'re ready")

open('index.html', 'w', encoding='utf-8').write(c)
print("Fixed remaining")
