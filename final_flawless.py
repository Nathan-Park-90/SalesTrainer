
import re

v2_code = open(r'C:\Users\Nate\.gemini\antigravity\brain\8b93e753-88e2-4c26-8b52-9c2c2159a793\scratch\write_v2.py', encoding='utf-8').read()

start = v2_code.find('const DATA={')
end = v2_code.find('function defS()', start)
data_str = v2_code[start:end].strip() # This contains const DATA={ ... };

# Drop the trailing semicolon if it has one
if data_str.endswith(';'): data_str = data_str[:-1]

curric = open('inject_curriculum.py', encoding='utf-8').read()
new_fc = re.search(r'new_flashcards = """(.*?)"""', curric, re.DOTALL).group(1).strip()
idx = data_str.find(']', data_str.find('flashcards:['))
data_str = data_str[:idx] + ',\n' + new_fc + '\n' + data_str[idx:]

# Since we stripped the trailing semicolon, data_str ends with }
# We just need to add the lessons array to the root level of the DATA object
# We can just insert it right before the final }
lessons_script = open('inject_lessons.py', encoding='utf-8').read()
lessons_str = re.search(r'lessons_str = """(.*?)"""', lessons_script, re.DOTALL).group(1).strip()
more_lessons = open('add_more_lessons.py', encoding='utf-8').read()
more_lessons_str = re.search(r'new_lessons = """(.*?)"""', more_lessons, re.DOTALL).group(1).strip()

final_brace = data_str.rfind('}')
data_str = data_str[:final_brace] + lessons_str + more_lessons_str + '\n' + data_str[final_brace:]

# One final fix because lessons_str is `,lessons: [ ... ]` and more_lessons_str is `,{ ... }`
# wait! more_lessons_str starts with `,{` but it needs to be INSIDE the `]` of lessons!
# This was my mistake earlier!
# I need to insert `more_lessons_str` inside `lessons_str`.
# Let's fix that string:
l_end = lessons_str.rfind(']')
combined_lessons = lessons_str[:l_end] + more_lessons_str + '\n  ]\n'

data_str = data_str[:final_brace] + combined_lessons + '\n' + data_str[final_brace:]

open('data.js', 'w', encoding='utf-8').write(data_str + ';\n')
print('DONE')
