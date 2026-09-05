// Houdt de app offline beschikbaar - hal 26 heeft geen betrouwbare wifi.
const CACHE='ifa2026-v1';
const FILES=['./','./index.html','./manifest.webmanifest'];
self.addEventListener('install',e=>{ self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES).catch(()=>{}))); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET') return; e.respondWith(caches.match(e.request).then(hit=>hit || fetch(e.request).then(r=>{ const copy=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{}); return r; }).catch(()=>caches.match('./index.html')))); });
