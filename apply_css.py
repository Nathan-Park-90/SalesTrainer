
import re
import sys

# Load current working index.html
c = open('index.html', encoding='utf-8').read()

# Load NEW_CSS from enhance_v4.py
v4_script = open(r'C:\Users\Nate\.gemini\antigravity\brain\8b93e753-88e2-4c26-8b52-9c2c2159a793\scratch\enhance_v4.py', encoding='utf-8').read()
css_match = re.search(r'NEW_CSS\s*=\s*\"\"\"(.*?)\"\"\"', v4_script, re.DOTALL)
if not css_match:
    print("Could not find NEW_CSS")
    sys.exit(1)

new_css = css_match.group(1)

# FIX RESPONSIVENESS IN NEW_CSS
# Replace max-width:440px with max-width:1200px
new_css = new_css.replace('max-width:440px;', 'max-width:1200px;width:100%;')

# Add constraint to cscene so flashcards don't become 1200px wide
cscene_idx = new_css.find('.cscene{')
if cscene_idx != -1:
    new_css = new_css.replace('.cscene{width:100%', '.cscene{width:100%;max-width:600px;margin-left:auto;margin-right:auto')

# Now replace the <style>...</style> block in index.html
style_start = c.find('<style>')
style_end = c.find('</style>')
if style_start == -1 or style_end == -1:
    print("Could not find <style> block")
    sys.exit(1)

c = c[:style_start+7] + "\n" + new_css + "\n" + c[style_end:]

open('index.html', 'w', encoding='utf-8').write(c)
print("Applied responsive NEW_CSS successfully")
