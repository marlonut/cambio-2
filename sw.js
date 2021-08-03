const STATIC__CACHE = "static-v1";
const DYNAMIC__CACHE = "dynamic-v1";
const IMMUTABLE__CACHE = "immutable-v1";

const APP_SHELL = [
  "./",
  "./index.html",
  "./js/app.js",
  "./css/style.css",
  "./img/avatars/hulk.jpg",
  "./img/avatars/ironman.jpg",
  "./img/avatars/spiderman.jpg",
  "./img/avatars/thor.jpg",
  "./img/avatars/wolverine.jpg",
  "./img/favicon.ico",
];
const APP_SHELL_IMMUTABLE = [
  "https://fonts.googleapis.com/css?family=Quicksand:300,400",
  "https://fonts.googleapis.com/css?family=Lato:400,300",
  "https://use.fontawesome.com/releases/v5.3.1/css/all.css",
  "./css/animate.css",
  "./js/libs/jquery.js",
];
self.addEventListener("install", (e) => {
  const cacheStatic = caches.open(STATIC__CACHE).then((cacheOp) => {
    return cacheOp.addAll(APP_SHELL);
  });
  const cacheImmutable = caches.open(IMMUTABLE__CACHE).then((cacheOp) => {
    return cacheOp.addAll(APP_SHELL_IMMUTABLE);
  });
  e.waitUntil(Promise.all([cacheStatic, cacheImmutable]));
});
