if ('serviceWorker' in navigator) {
	
	window.addEventListener("load", () => {
		// Path che contiene il service worker
	 	navigator.serviceWorker
	 		.register('/service-worker.js')
	 			.then(registration => {
	   				console.log('Service worker installato correttamente, ecco lo scope:', registration.scope);

	 			})
	 			.catch(error => {

	   				console.log('Installazione service worker fallita:', error); 
	 			});

	 });

}