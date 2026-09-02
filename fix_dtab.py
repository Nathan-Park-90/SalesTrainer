
c = open('index.html', encoding='utf-8').read()

c = c.replace(
    "onclick=\"sDTab('pitch')\"",
    "onclick=\"sDTab(\\'pitch\\')\""
)
c = c.replace(
    "onclick=\"sDTab('arch')\"",
    "onclick=\"sDTab(\\'arch\\')\""
)
c = c.replace(
    "onclick=\"sDTab('demo')\"",
    "onclick=\"sDTab(\\'demo\\')\""
)

# Any others? 
c = c.replace(
    "onclick=\"sSTab('exam')\"",
    "onclick=\"sSTab(\\'exam\\')\""
)
c = c.replace(
    "onclick=\"sSTab('threat')\"",
    "onclick=\"sSTab(\\'threat\\')\""
)

open('index.html', 'w', encoding='utf-8').write(c)
print("sDTab fixed")
