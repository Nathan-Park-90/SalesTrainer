import codecs

with codecs.open('index.html', 'r', 'utf-8') as f:
    c = f.read()

c = c.replace('style="max-width: 800px; margin: 30px auto 0; display: none;"', 'style="max-width: 1200px; margin: 30px auto 0; display: none;"')

with codecs.open('index.html', 'w', 'utf-8') as f:
    f.write(c)
