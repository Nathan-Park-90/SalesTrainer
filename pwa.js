/**
 * Mammoth Academy — PWA registration
 * Loaded on every page (see the <script src="pwa.js"> tag) so the service
 * worker gets installed no matter which page a visitor lands on first.
 */
if ('serviceWorker' in navigator) {
    const registerSW = () => {
        navigator.serviceWorker.register('sw.js').catch((err) => {
            console.warn('[Mammoth Academy] Service worker registration failed:', err);
        });
    };
    // If this script runs after the page has already finished loading (a slow
    // script load, a cached/instant load, etc.), the 'load' event has already
    // fired and would never come again — register immediately in that case.
    if (document.readyState === 'complete') {
        registerSW();
    } else {
        window.addEventListener('load', registerSW);
    }
}
