
c = open('index.html', encoding='utf-8').read()

# Add initializers if they aren't there
if 'startExam();' not in c[-1000:]:
    js_end = c.rfind('</script>')
    c = c[:js_end] + "\n// Force Initialization\nif(typeof renderFlash==='function') renderFlash();\nif(typeof renderArch==='function') renderArch();\nif(typeof renderScene==='function') renderScene();\nif(typeof startExam==='function') startExam();\nif(typeof renderThreats==='function') renderThreats();\n" + c[js_end:]
    open('index.html', 'w', encoding='utf-8').write(c)
    print("Initializers added")
else:
    print("Already initialized")
