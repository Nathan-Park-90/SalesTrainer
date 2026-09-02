
c = open('index.html', encoding='utf-8').read()

# Remove scrolling from #main
c = c.replace('#main{flex:1;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch}', 
              '#main{overflow:visible;display:flex;flex-direction:column;gap:40px;}')

# Make the nav actually sticky correctly relative to the body
c = c.replace('#nav{position:sticky;top:0;z-index:40;display:flex;background:rgba(10,16,32,.95);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid var(--br1);padding:10px 0;margin-top:10px;}',
              '#nav{position:sticky;top:0;z-index:40;display:flex;background:rgba(10,16,32,.95);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid var(--br1);padding:10px 0;margin-bottom:20px;}')

# Check goTo logic
# Make sure goTo scrolls the window correctly
goto_fix = '''
function goTo(tab){
  curTab=tab;
  document.querySelectorAll('.nb').forEach(b=>b.classList.remove('active'));
  document.getElementById('nb-'+tab).classList.add('active');
  const section = document.getElementById('v-'+tab);
  if(section) {
    const navHeight = document.getElementById('nav').offsetHeight;
    const y = section.getBoundingClientRect().top + window.scrollY - navHeight - 20;
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
}
'''
start_goto = c.find('function goTo(tab){')
end_goto = c.find('}', start_goto) + 1
c = c[:start_goto] + goto_fix.strip() + c[end_goto:]

open('index.html', 'w', encoding='utf-8').write(c)
print("CSS and scrolling fixed")
