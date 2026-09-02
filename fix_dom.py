
c = open('index.html', encoding='utf-8').read()

# Find the start of the malformed sections at the end
start_malformed = c.find('<section id="v-exam" class="view">')
if start_malformed != -1:
    malformed_sections = c[start_malformed:-1] # everything until the trailing ">"
    # Remove it from the end
    c = c[:start_malformed] + ">\n" # Restore the </html> closing tag
    
    # We should also fix the </html> tag which got split as </html ... >
    c = c.replace('</html\n>', '</html>\n')
    
    # Find the end of v-scene
    scene_start = c.find('id="v-scene"')
    if scene_start != -1:
        scene_end = c.find('</section>', scene_start) + 10
        # Insert the sections here
        c = c[:scene_end] + "\n" + malformed_sections + "\n" + c[scene_end:]
        
    open('index.html', 'w', encoding='utf-8').write(c)
    print("DOM fixed")
else:
    print("Malformed sections not found")
