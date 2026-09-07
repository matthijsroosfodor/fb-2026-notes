// Houdt de app offline beschikbaar - hal 26 heeft geen betrouwbare wifi.
// v3: pagina netwerk-eerst MET cache:'no-store', zodat de browsercache van
// GitHub Pages geen oude versie kan doorschuiven. Cache is het offline-vangnet.
const CACHE='ifa2026-v4';
const FILES=['./','./index.html','./manifest.webmanifest'];
self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES).catch(()=>{})));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const url=new URL(e.request.url);
  if(url.origin!==location.origin) return;
  const isPagina = e.request.mode==='navigate' || e.request.destination==='document';
  if(isPagina){
    e.respondWith(
      fetch(url.pathname,{cache:'no-store'}).then(r=>{
        if(!r||!r.ok) throw new Error('geen goede response');
        const copy=r.clone();
        caches.open(CACHE).then(c=>c.put('./index.html',copy)).catch(()=>{});
        return r;
      }).catch(()=>caches.match('./index.html').then(hit=>hit||caches.match(e.request)))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{
      const copy=r.clone();
      caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});
      return r;
    }).catch(()=>caches.match('./index.html')))
  );
});
// Houdt de app offline beschikbaar - hal 26 heeft geen betrouwbare wifi.
// v3: pagina netwerk-eerst MET cache:'no-store', zodat de browsercache van
// GitHub Pages geen oude versie kan doorschuiven. Cache is het offline-vangnet.
const CACHE='ifa2026-v3';
const FILES=['./','./index.html','./manifest.webmanifest'];
self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES).catch(()=>{})));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const url=new URL(e.request.url);
  if(url.origin!==location.origin) return;
  const isPagina = e.request.mode==='navigate' || e.request.destination==='document';
  if(isPagina){
    e.respondWith(
      fetch(url.pathname,{cache:'no-store'}).then(r=>{
        if(!r||!r.ok) throw new Error('geen goede response');
        const copy=r.clone();
        caches.open(CACHE).then(c=>c.put('./index.html',copy)).catch(()=>{});
        return r;
      }).catch(()=>caches.match('./index.html').then(hit=>hit||caches.match(e.request)))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{
      const copy=r.clone();
      caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});
      return r;
    }).catch(()=>caches.match('./index.html')))
  );
});
