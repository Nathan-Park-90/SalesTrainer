
import re

# Load all original valid strings
v2 = open(r'C:\Users\Nate\.gemini\antigravity\brain\8b93e753-88e2-4c26-8b52-9c2c2159a793\scratch\write_v2.py', encoding='utf-8').read()
v4 = open(r'C:\Users\Nate\.gemini\antigravity\brain\8b93e753-88e2-4c26-8b52-9c2c2159a793\scratch\enhance_v4.py', encoding='utf-8').read()

all_src = v2 + v4

# find all <em>"..."</em> in original text
original_quotes = re.findall(r'<em>"(.*?)"</em>', all_src)

# Load corrupted index.html
c = open('index.html', encoding='utf-8').read()

# Replace all occurrences of <em>"\1"</em> or <em>\"\\1\"</em> or whatever they became
# Actually, let's just find where `\1` is in index.html.
# Wait, my script printed the corrupted lines, they look like: <em>"\1"</em> or <em>\"\1\"</em>
# Let's replace them sequentially. But wait, we need them in the correct order.
# Better idea: we can just find the text around `\1` and match it to the original text.

lines = c.split('\n')
for i, line in enumerate(lines):
    if r'\1' in line:
        # Find the text before and after \1
        match = re.search(r'(.{10})<em>\\?"\\1\\?"</em>(.{0,10})', line)
        if match:
            before = match.group(1)
            after = match.group(2)
            # Find this pattern in all_src
            # since all_src might not have the escaped quotes, search for before + <em>"..."</em> + after
            search_pattern = re.escape(before) + r'<em>"(.*?)"</em>' + re.escape(after)
            orig_match = re.search(search_pattern, all_src)
            if orig_match:
                orig_quote = orig_match.group(1)
                # Replace in line
                # Escape the quote for valid JS
                escaped_quote = orig_quote.replace('"', r'\"')
                new_line = re.sub(r'<em>\\?"\\1\\?"</em>', f'<em>\\"{escaped_quote}\\"</em>', line)
                lines[i] = new_line
            else:
                print(f"Could not find original for: {before} ... {after}")

c = '\n'.join(lines)
# Also need to fix any remaining <em>" that are not escaped in the file!
c = re.sub(r'<em>"([^"]*?)"</em>', r'<em>\"\1\"</em>', c)

open('index.html', 'w', encoding='utf-8').write(c)
print("Done repairing index.html")
