import re
import codecs

with codecs.open('style.css', 'r', 'utf-8') as f:
    c = f.read()

replacement = """:root {
    --bg-base: #050810;
    --bg-card: #0d1324;
    --bg-card-hover: #131b31;
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --accent-primary: #38bdf8;
    --accent-secondary: #818cf8;
    --accent-success: #10b981;
    --accent-warning: #f59e0b;
    --accent-danger: #ef4444;
    --font-ui: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;"""

c = re.sub(r':root \{.*?--font-ui:.*?;', replacement, c, flags=re.DOTALL)

with codecs.open('style.css', 'w', 'utf-8') as f:
    f.write(c)

print("style.css root variables fixed!")
