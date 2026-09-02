
c = open('index.html', encoding='utf-8').read()

# Replace unescaped quotes inside <em>...</em>
# The strings look like: <em>"Some text"</em>
c = c.replace('<em>"', r'<em>\"')
c = c.replace('"</em>', r'\"</em>')

# Just to be safe, any other stray `" ` at the end of a question might also need escaping.
# e.g., question: "...?" 
# No, those were explicitly double quoted in the python string. The only inner quotes were in the <em> tags.

open('index.html', 'w', encoding='utf-8').write(c)
print("Quotes escaped.")
