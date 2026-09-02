
import re

# Load enhance_v4.py which contains FOUNDATION_CARDS
v4 = open(r'C:\Users\Nate\.gemini\antigravity\brain\8b93e753-88e2-4c26-8b52-9c2c2159a793\scratch\enhance_v4.py', encoding='utf-8').read()

# Extract the cards string
cards_match = re.search(r'FOUNDATION_CARDS = """(.*?)"""', v4, re.DOTALL)
if cards_match:
    cards_str = cards_match.group(1)
    
    # Load index.html
    c = open('index.html', encoding='utf-8').read()
    
    # Inject it before the end of flashcards list.
    # Look for:
    # 92: ..."}
    # ],
    # arch:[
    
    inject_point = c.find('],\n arch:')
    if inject_point != -1:
        c = c[:inject_point] + cards_str + c[inject_point:]
        open('index.html', 'w', encoding='utf-8').write(c)
        print("Injected foundation cards")
    else:
        # try without space
        inject_point = c.find('],\narch:')
        if inject_point != -1:
            c = c[:inject_point] + cards_str + c[inject_point:]
            open('index.html', 'w', encoding='utf-8').write(c)
            print("Injected foundation cards")
        else:
            print("Could not find injection point")
else:
    print("Could not extract cards")
