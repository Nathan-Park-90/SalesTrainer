import re
import codecs

with codecs.open(r'C:\Users\Nate\.gemini\antigravity\brain\8b93e753-88e2-4c26-8b52-9c2c2159a793\scratch\write_v2.py', 'r', 'utf-8') as f:
    c = f.read()

m = re.search(r'data_str\s*=\s*\"\"\"(.*?)\"\"\"', c, re.DOTALL)
if m:
    data_str = m.group(1)
    print('FOUND data_str length:', len(data_str))
    print('LAST 200 CHARS:')
    print(data_str[-200:])
else:
    print('NOT FOUND in data_str')
    
    # Try finding the open().write() call
    m2 = re.search(r'open\("data\.js", "w", encoding="utf-8"\)\.write\("""(.*?)"""\)', c, re.DOTALL)
    if m2:
        print('FOUND in open().write() length:', len(m2.group(1)))
        print(m2.group(1)[-200:])
    else:
        print("NOT FOUND ANYWHERE")
