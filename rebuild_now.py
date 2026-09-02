
import re

v2_code = open(r'C:\Users\Nate\.gemini\antigravity\brain\8b93e753-88e2-4c26-8b52-9c2c2159a793\scratch\write_v2.py', encoding='utf-8').read()

start = v2_code.find('const DATA={')
end = v2_code.find('};\n  const fcs')
if end == -1: end = v2_code.find('};\n', start)

data_str = v2_code[start:end+1]

curric_script = open('inject_curriculum.py', encoding='utf-8').read()
new_flashcards = re.search(r'new_flashcards = """(.*?)"""', curric_script, re.DOTALL).group(1).strip()
fc_end = data_str.find(']', data_str.find('flashcards:['))
data_str = data_str[:fc_end] + ',\n' + new_flashcards + '\n' + data_str[fc_end:]

lessons_script = open('inject_lessons.py', encoding='utf-8').read()
lessons_str_match = re.search(r'new_lessons = """(.*?)"""', lessons_script, re.DOTALL)
lessons_str = lessons_str_match.group(1).strip()

more_lessons = open('add_more_lessons.py', encoding='utf-8').read()
more_lessons_match = re.search(r'new_lessons = """(.*?)"""', more_lessons, re.DOTALL)
more_lessons_str = more_lessons_match.group(1).strip()

final_brace = data_str.rfind('}')
data_str = data_str[:final_brace] + lessons_str + more_lessons_str + '\n' + data_str[final_brace:]

open('data.js', 'w', encoding='utf-8').write(data_str + ';\n')
print('Data completely rebuilt')
