let offlineMessage = document.querySelector('#internet-lost-message');

const handleConnectionChange = () => {
    const condition = navigator.onLine ? 'online' : 'offline';
    if (condition === 'online') {
        const webPing = setInterval(
            () => {
                fetch('//google.com', {
                    mode: 'no-cors',
                }).then(() => {
                    offlineMessage.classList.add('hidden');
                    clearInterval(webPing);
                    return;
                }).catch(() => {
                    offlineMessage.classList.add('hidden');
                    return;
                });
            }, 1);
    }

    offlineMessage.classList.remove('hidden');
    return;
}

window.addEventListener('load', () => {
    handleConnectionChange();
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);
});

window.addEventListener('unload', () => {
    window.removeEventListener('online', handleConnectionChange);
    window.removeEventListener('offline', handleConnectionChange);
});