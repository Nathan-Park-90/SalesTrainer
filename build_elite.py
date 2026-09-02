import json
import codecs
import re

# 1. Recover flashcards, arch, sales from recovered_data.js
# recovered_data.js looks like `const DATA={ flashcards:[...], arch:[...], sales:[...], demo:[...] }`
with codecs.open('recovered_data.js', 'r', 'utf-8') as f:
    c = f.read()

# Hacky but effective regex to extract arrays if it fails, we'll parse it via node later.
# Actually, it's easier to just write a Node script that requires everything and outputs the final JSON!
