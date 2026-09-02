
import re

v2_code = open(r'C:\Users\Nate\.gemini\antigravity\brain\8b93e753-88e2-4c26-8b52-9c2c2159a793\scratch\write_v2.py', encoding='utf-8').read()

start = v2_code.find('const DATA')
end = v2_code.find('};\n  const fcs', start)
data_str = v2_code[start:end+1]

if not data_str.startswith('const DATA'):
    print("FATAL ERROR")

# Clean up flashcards
curric = open('inject_curriculum.py', encoding='utf-8').read()
new_fc = re.search(r'new_flashcards = """(.*?)"""', curric, re.DOTALL).group(1).strip()
idx = data_str.find(']', data_str.find('flashcards:['))
data_str = data_str[:idx] + ',\n' + new_fc + '\n' + data_str[idx:]

open('data.js', 'w', encoding='utf-8').write(data_str + ';\n')
