/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
import Cart from './modules/cart';
import products from './modules/products';

(function() {
'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  let cart = new Cart();

  // Your custom JavaScript goes here
  document.addEventListener('DOMContentLoaded', e => {
    let items = document.querySelector('#items');
    for (let product of products) {
      let item = document.createElement('template');
      item.innerHTML = `<div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
    <div class="mdl-card__media">
      <img class="article-image" src=" images/products/${product.image}" border="0" alt="">
    </div>
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">${product.title}</h2>
    </div>
    <div class="mdl-card__supporting-text">
      Enim labore aliqua consequat ut quis ad occaecat aliquip incididunt.
    </div>
    <div class="mdl-card__actions mdl-card--border">
      <span class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent add-to-cart">Add to Cart</span>
    </div>
    </div>`;
      item.content.querySelector('.add-to-cart').addEventListener('click', e => {
        cart.add(product);
        alert('Added '+product.title+' to the cart.');
      });
      items.appendChild(item.content);
    }
  });
})();
