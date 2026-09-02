
c = open('style.css', encoding='utf-8').read()

lesson_styles = """
/* ================== LESSON ENGINE ================== */
.lesson-layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 40px;
    align-items: start;
}

.lesson-sidebar {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 24px;
    backdrop-filter: blur(10px);
    position: sticky;
    top: 100px;
}

.toc-link {
    display: block;
    padding: 12px 16px;
    margin-bottom: 8px;
    border-radius: 8px;
    color: var(--text-muted);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    transition: var(--transition);
    border-left: 3px solid transparent;
}

.toc-link:hover {
    background: rgba(255, 255, 255, 0.03);
    color: var(--text-main);
}

.toc-link.active {
    background: rgba(56, 189, 248, 0.1);
    color: var(--accent-primary);
    border-left-color: var(--accent-primary);
}

.lesson-canvas {
    background: #0f172a;
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 50px;
    min-height: 600px;
}

.lesson-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: var(--text-muted);
    font-style: italic;
    font-size: 1.2rem;
}

.lesson-title {
    font-size: 2.5rem;
    font-weight: 900;
    margin-bottom: 40px;
    letter-spacing: -1px;
    color: #fff;
    border-bottom: 1px solid var(--glass-border);
    padding-bottom: 20px;
}

.lesson-prose {
    font-size: 1.15rem;
    line-height: 1.8;
    color: #e2e8f0;
}

.lesson-h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--accent-primary);
    margin: 40px 0 20px;
}

.lesson-prose p {
    margin-bottom: 20px;
}

.lesson-prose ul {
    margin-bottom: 20px;
    padding-left: 20px;
}

.lesson-prose li {
    margin-bottom: 10px;
}

.lesson-alert {
    background: rgba(245, 158, 11, 0.1);
    border-left: 4px solid var(--accent-warning);
    padding: 20px;
    border-radius: 8px;
    margin: 40px 0;
    font-style: italic;
    color: rgba(245, 158, 11, 0.9);
}

.lesson-alert code {
    background: rgba(0, 0, 0, 0.2);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
}
"""

c = c + "\n" + lesson_styles

open('style.css', 'w', encoding='utf-8').write(c)
print("style.css updated successfully")
