
import re

# Load v2 string
v2 = open(r'C:\Users\Nate\.gemini\antigravity\brain\8b93e753-88e2-4c26-8b52-9c2c2159a793\scratch\write_v2.py', encoding='utf-8').read()

# Load index.html
c = open('index.html', encoding='utf-8').read()

lines = c.split('\n')
for i, line in enumerate(lines):
    if r'\1' in line:
        # Find 10 chars before and after \1
        match = re.search(r'(.{10})<em>\\?"\\1\\?"</em>(.{0,10})', line)
        if match:
            before = match.group(1)
            after = match.group(2)
            # Find the original in v2
            orig_match = re.search(re.escape(before) + r'<em>"(.*?)"</em>' + re.escape(after), v2)
            if orig_match:
                orig_quote = orig_match.group(1)
                # properly escape for JS
                escaped = orig_quote.replace('"', r'\"')
                # replace in the line
                new_line = re.sub(r'<em>\\?"\\1\\?"</em>', f'<em>\\"{escaped}\\"</em>', line)
                lines[i] = new_line
            else:
                print(f"Could not find original for: {before} ... {after}")
        else:
            # Maybe it doesn't have the quotes around it?
            # E.g. <em>\1</em>
            match2 = re.search(r'(.{10})<em>\\1</em>(.{0,10})', line)
            if match2:
                before = match2.group(1)
                after = match2.group(2)
                orig_match2 = re.search(re.escape(before) + r'<em>"(.*?)"</em>' + re.escape(after), v2)
                if orig_match2:
                    orig_quote = orig_match2.group(1)
                    escaped = orig_quote.replace('"', r'\"')
                    new_line = re.sub(r'<em>\\1</em>', f'<em>\\"{escaped}\\"</em>', line)
                    lines[i] = new_line

c = '\n'.join(lines)

# Also fix any remaining <em>"..."</em> that are unescaped in index.html
def escape_em_quotes(m):
    inner = m.group(1)
    # if it doesn't already end in \", escape it
    # wait, if it's already \", it's fine.
    return f'<em>\\"{inner}\\"</em>'

# replace unescaped <em>"..."</em>
# Note: we need to be careful not to double escape
# find <em>" (not preceded by \)
c = re.sub(r'(?<!\\)<em>"([^"]*?)(?<!\\)"</em>', escape_em_quotes, c)

open('index.html', 'w', encoding='utf-8').write(c)
print("Finished repairing index.html")
