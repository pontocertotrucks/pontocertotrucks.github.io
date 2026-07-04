/**
 * Static vehicle deep-link landing for GitHub Pages.
 * URL pattern: /app/vehicle/{plate}
 * Plate is read from the path — no backend required.
 */
(function () {
  'use strict';

  var PLAY_STORE =
    'https://play.google.com/store/apps/details?id=br.com.sistemapontocerto.mobile';
  // Replace with numeric App Store ID when published (App Store Connect → Apple ID)
  var APP_STORE = 'https://apps.apple.com/br/search?term=ponto+certo+frotas';
  var PACKAGE = 'br.com.sistemapontocerto.mobile';
  var HOST = 'sistemapontocerto.com.br';

  function parsePlateFromPath() {
    var match = location.pathname.match(/^\/app\/vehicle\/([^/]+)\/?$/i);
    if (!match || !match[1]) return null;
    return decodeURIComponent(match[1]).trim().toUpperCase();
  }

  function isAndroid() {
    return /Android/i.test(navigator.userAgent || '');
  }

  function isIOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent || '');
  }

  window.PcVehicleLanding = {
    parsePlateFromPath: parsePlateFromPath,
    run: function () {
      var plate = parsePlateFromPath();
      if (!plate) return false;

      document.title = 'Veículo ' + plate + ' — Ponto Certo Frotas';

      var plateEl = document.getElementById('pc-plate');
      var messageEl = document.getElementById('pc-message');
      var fallbackEl = document.getElementById('pc-fallback');
      var storeLink = document.getElementById('pc-store-link');

      if (plateEl) plateEl.textContent = plate;

      function showFallback(url, label, message) {
        if (messageEl) messageEl.textContent = message;
        if (storeLink) {
          storeLink.href = url;
          storeLink.textContent = label;
        }
        if (fallbackEl) fallbackEl.hidden = false;
      }

      var defaultMessage =
        'Instale o app Ponto Certo Frotas para registrar o expediente do veículo ' +
        plate +
        '.';

      // With App Links / Universal Links, the native app opens before this script runs.
      if (isAndroid()) {
        var playEncoded = encodeURIComponent(PLAY_STORE);
        var intent =
          'intent://' +
          HOST +
          '/app/vehicle/' +
          encodeURIComponent(plate) +
          '#Intent;scheme=https;package=' +
          PACKAGE +
          ';S.browser_fallback_url=' +
          playEncoded +
          ';end';
        location.replace(intent);
        setTimeout(function () {
          showFallback(PLAY_STORE, 'Baixar na Google Play', defaultMessage);
        }, 2500);
        return true;
      }

      if (isIOS()) {
        location.replace(APP_STORE);
        setTimeout(function () {
          showFallback(APP_STORE, 'Baixar na App Store', defaultMessage);
        }, 2500);
        return true;
      }

      showFallback(
        PLAY_STORE,
        'Baixar na Google Play',
        'Abra o app Ponto Certo Frotas no celular para vincular o veículo ' + plate + '.',
      );
      return true;
    },
  };
})();
