
c = open('index.html', encoding='utf-8').read()

# Fix 1: Remove S.level restriction in goTo
start_goto = c.find('function goTo(tab){')
if start_goto != -1:
    end_goto = c.find('curTab=tab;', start_goto)
    original_goto = c[start_goto:end_goto]
    # Replace the if statement completely
    c = c.replace(original_goto, "function goTo(tab){\n  ")

# Fix 2: Remove 'hidden' class from v-exam and v-threats
c = c.replace('id="v-exam" class="view hidden"', 'id="v-exam" class="view"')
c = c.replace('id="v-threats" class="view hidden"', 'id="v-threats" class="view"')

open('index.html', 'w', encoding='utf-8').write(c)
print("Applied fixes")
