if (navigator.serviceWorker) {
    window.addEventListener('load', (e) => {
        navigator.serviceWorker.register('../sw.js')
            .catch(e => console.log(e));
    });
}