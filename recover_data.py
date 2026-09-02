
import re

# Read the enhance_v4.py script which contains the entire v4 HTML as a string
src = open(r"C:\Users\Nate\.gemini\antigravity\brain\8b93e753-88e2-4c26-8b52-9c2c2159a793\scratch\enhance_v4.py", encoding="utf-8").read()

# The v4 HTML is inside a string literal. We can just extract the DATA object.
start = src.find('const DATA = {')
end = src.find('let curTab')

if start != -1 and end != -1:
    data_str = src[start:end]
    
    # We need to make sure the data object is properly closed with a semicolon
    data_str = data_str.strip()
    if data_str.endswith(','):
        data_str = data_str[:-1]
    
    # Write to data.js
    open('data.js', 'w', encoding='utf-8').write(data_str + "\n};\n")
    print("Recovered DATA object from enhance_v4.py!")
else:
    print("Could not find DATA object in enhance_v4.py")
