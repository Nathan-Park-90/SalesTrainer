import codecs
import re

with codecs.open('index.html', 'r', 'utf-8') as f:
    html = f.read()

# Extract sections
def extract_section(id_str):
    pattern = rf'(<!--.*?-->\s*<section id="{id_str}".*?</section>)'
    match = re.search(pattern, html, re.DOTALL)
    return match.group(1) if match else ''

sec_hero = extract_section('hero')
sec_lessons = extract_section('lessons')
sec_core = extract_section('core-knowledge')
sec_arch = extract_section('architecture')
sec_scen = extract_section('scenarios')
sec_exam = extract_section('exam')
sec_threats = extract_section('threats')

# Base template
header = html[:html.find('<!-- Hero Section -->')]
# Update nav links to absolute HTML files
header = header.replace('href="#hero"', 'href="index.html"')
header = header.replace('href="#lessons"', 'href="curriculum.html"')
header = header.replace('href="#core-knowledge"', 'href="training.html"')
header = header.replace('href="#architecture"', 'href="training.html#architecture"')
header = header.replace('href="#scenarios"', 'href="exam.html#scenarios"')
header = header.replace('href="#exam"', 'href="exam.html"')
header = header.replace('href="#threats"', 'href="exam.html#threats"')

# Remove active class from all links
header = re.sub(r'class="active"', '', header)

footer = html[html.find('<!-- Scripts -->'):]

def write_page(filename, sections, active_href):
    # Set active class on the correct nav link
    page_header = header.replace(f'href="{active_href}"', f'href="{active_href}" class="active"')
    
    content = page_header
    for s in sections:
        # Remove view-active class if present
        s = s.replace('view-active', '')
        # Add view-active to all so they render
        s = s.replace('class="section"', 'class="section view-active"')
        content += s + '\n\n'
    content += footer
    
    with codecs.open(filename, 'w', 'utf-8') as f:
        f.write(content)

# Write index.html (Hub)
hub_html = '''
    <section id="hero" class="hero view-active">
        <h1>SalesTrainer Dashboard</h1>
        <p>A multi-environment training platform. Select your zone below.</p>
        <div style="display: flex; gap: 20px; justify-content: center; margin-top: 40px;">
            <button class="btn-primary" onclick="window.location.href='curriculum.html'">1. Library (Learn)</button>
            <button class="btn-primary" onclick="window.location.href='training.html'">2. Gym (Train)</button>
            <button class="btn-primary" onclick="window.location.href='exam.html'">3. Arena (Test)</button>
        </div>
    </section>
'''
write_page('index.html', [hub_html], 'index.html')

# Write curriculum.html
write_page('curriculum.html', [sec_lessons], 'curriculum.html')

# Write training.html
write_page('training.html', [sec_core, sec_arch], 'training.html')

# Write exam.html
write_page('exam.html', [sec_scen, sec_exam, sec_threats], 'exam.html')

print("Successfully split HTML into multiple pages.")
