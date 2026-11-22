// кэш оболочки: страница открывается мгновенно и без сети, свежая версия подтягивается в фоне
var C="dnevniki-22112026-0348";
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-180.png"])}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
  var r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
  e.respondWith(caches.open(C).then(function(c){return c.match(r,{ignoreSearch:true}).then(function(m){
    var n=fetch(r).then(function(x){if(x&&x.ok)c.put(r,x.clone());return x}).catch(function(){return m});
    return m||n;
  })}));
});
