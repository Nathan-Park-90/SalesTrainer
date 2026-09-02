
import re
c = open(r'C:\Users\Nate\.gemini\antigravity\brain\8b93e753-88e2-4c26-8b52-9c2c2159a793\scratch\enhance_v4.py', encoding='utf-8').read()
matches = re.findall(r'([A-Z_]+)\s*=\s*\"\"\"', c)
print(matches)
