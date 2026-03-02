
self.addEventListener('install',e=>{
 e.waitUntil(
  caches.open('gadis-cache').then(cache=>{
   return cache.addAll(['./','./index.html','./css/style.css']);
  })
 );
});
