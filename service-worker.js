const cacheName= "v1";

// Gli asset che voglio tenere nella cache. Possono essere intere pagine o anche singoli file (JS, CSS,...)
const cacheAssets= [
    "index.html",
    "about.html",
    "js/scripts.js",
    "css/style.css"
];


// Installo il service worker. A questo punto inserisco i miei asset nella cache identificata con cacheName
self.addEventListener("install", e => {

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
               console.log("Cache dei file");
               cache.addAll(cacheAssets);
            })
            .then(()=> {
                self.skipWaiting();
            })

    );
});

// Attivazione del service worker.
self.addEventListener("activate", (event) => {
    console.log("Service worker attivato.");

    event.waitUntil(

        // pulisco le vecchie cache
        caches
            .keys()
            .then((cachesArray) => {
                return Promise.all(
                    cachesArray.map( (currentCacheName) => {

                        if(currentCacheName!==cacheName) {
                            console.log("Cancello la vecchia cache: "+currentCacheName);
                            return caches.delete(currentCacheName);
                        }
                    })
                );            
            }
        )
    );
    
});


// Qui gestisco le richieste delle risorse
self.addEventListener("fetch", event => {
    console.log("Fetch dei file");
    
    event.respondWith(fetch(event.request)
            .catch(() => caches.match(event.request)));
    
    /*
    event.respondWith(
        fetch(event.request)
            .catch( () => {
                //console.log("Risorsa offline ",event.request);
                return caches.match(event.request);
            })
    );
    */
    
});

/*

var p= (message, t) => { 
        return new Promise((resolve, reject) => { 
            setTimeout(() => {resolve(message)}, t); 
        }); 
}

p("ciao amico", 1000)
    .then((result) => {
        console.log("Hai scritto" +result);
        return result;
    })
    .then(function(result) {
        console.log("Formato da "+result.split(" ").length+" parole.")
    });
*/