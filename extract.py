import codecs
import json
import re

# 1. Recover flashcards, arch, sales, demo from recovered_data.js
with codecs.open('recovered_data.js', 'r', 'utf-8') as f:
    rec_c = f.read()
    
# Clean up recovered_data.js to valid JSON
rec_c = rec_c.replace('const DATA=', '')
rec_c = rec_c.strip()
if rec_c.endswith(';'): rec_c = rec_c[:-1]
# Some keys might not be quoted.
# Instead of regex parsing, I will just use Node in a shell call to extract to JSON files!
