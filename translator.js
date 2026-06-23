(function(){
  'use strict';

  var LANGS = {
    es: { label:'ES', icon:'🇨🇴', name:'Español'  },
    en: { label:'EN', icon:'🇺🇸', name:'English'  },
    pt: { label:'PT', icon:'🇧🇷', name:'Português' },
    fr: { label:'FR', icon:'🇫🇷', name:'Français'  },
    de: { label:'DE', icon:'🇩🇪', name:'Deutsch'   },
  };
  var STORAGE_KEY = 'eia_tr_lang';
  var currentLang = 'es';
  var isOpen = false;
  var gtReady = false;
  var pendingLang = null;

  var panel   = document.getElementById('eia-tr-panel');
  var btn     = document.getElementById('eia-tr-btn');
  var dot     = document.getElementById('eia-tr-lang-dot');
  var closeBtn= document.getElementById('eia-tr-close');
  var langBtns= document.querySelectorAll('#eia-tr-panel .eia-lang-btn');

  function togglePanel(forceClose){
    isOpen = forceClose ? false : !isOpen;
    if(panel) panel.classList.toggle('open', isOpen);
    if(btn) btn.setAttribute('aria-expanded', String(isOpen));
  }

  if(btn) {
    btn.addEventListener('click', function(e){ e.stopPropagation(); togglePanel(); });
  }
  if(closeBtn) {
    closeBtn.addEventListener('click', function(){ togglePanel(true); });
  }
  document.addEventListener('click', function(e){
    if(isOpen && document.getElementById('eia-tr') && !document.getElementById('eia-tr').contains(e.target)) togglePanel(true);
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && isOpen) togglePanel(true);
  });

  function updateUI(lang){
    currentLang = lang;
    if(langBtns) {
      langBtns.forEach(function(b){
        b.classList.toggle('active', b.dataset.lang === lang);
      });
    }
    if(dot) {
      if(lang === 'es'){ dot.style.display = 'none'; }
      else { dot.style.display = 'flex'; dot.textContent = LANGS[lang] ? LANGS[lang].label : lang.toUpperCase(); }
    }
    try{ localStorage.setItem(STORAGE_KEY, lang); }catch(e){}
  }

  function applyTranslationMain(lang){
    var sel = document.querySelector('.goog-te-combo');
    if(sel){
      sel.value = lang === 'es' ? '' : lang;
      try{ var evt = document.createEvent('HTMLEvents'); evt.initEvent('change', true, true); sel.dispatchEvent(evt); }catch(e){}
      updateUI(lang);
      return;
    }
    var domain = location.hostname.replace(/^www\./, '');
    var expires = new Date(Date.now() + 365*24*60*60*1000).toUTCString();
    if(lang === 'es'){
      document.cookie = 'googtrans=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
      document.cookie = 'googtrans=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=.' + domain;
    } else {
      var val = '/es/' + lang;
      document.cookie = 'googtrans=' + val + ';expires=' + expires + ';path=/';
      document.cookie = 'googtrans=' + val + ';expires=' + expires + ';path=/;domain=.' + domain;
    }
    updateUI(lang);
    setTimeout(function(){ location.reload(); }, 150);
  }

  function applyTranslationToIframe(iframe, lang){
    try{
      var doc = iframe.contentDocument || iframe.contentWindow.document;
      if (!doc) return;
      var sel = doc.querySelector('.goog-te-combo');
      if(sel){
        sel.value = lang === 'es' ? '' : lang;
        var evt = doc.createEvent('HTMLEvents');
        evt.initEvent('change', true, true);
        sel.dispatchEvent(evt);
      }
    }catch(e){}
  }

  function injectIntoIframes(){
    var iframes = document.querySelectorAll('iframe');
    iframes.forEach(function(iframe){
      try{
        var doc = iframe.contentDocument || iframe.contentWindow.document;
        if(!doc) return;
        if(doc.getElementById('eia-tr-iframe-setup')) return;
        
        // 1. Crear el contenedor del traductor dentro del iframe
        var setupDiv = doc.createElement('div');
        setupDiv.id = 'eia-tr-iframe-setup';
        setupDiv.style.display = 'none';
        doc.body.appendChild(setupDiv);
        
        var gtDiv = doc.createElement('div');
        gtDiv.id = 'google_translate_element';
        setupDiv.appendChild(gtDiv);

        // 2. Inyectar la hoja de estilos blindada (si no existe)
        if (!doc.querySelector('link[href*="translator.css"]')) {
          var link = doc.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://cdn.jsdelivr.net/gh/darenherrera303/website@main/translator.css';
          doc.head.appendChild(link);
        }

        // 3. Inyectar el motor de Google Translate (si no existe)
        if(!doc.querySelector('script[src*="translate.google.com/translate_a"]')){
          var script = doc.createElement('script');
          script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
          script.async = true;
          doc.head.appendChild(script);
        }

        // 4. Definir la función de inicialización (si no existe)
        if(!iframe.contentWindow.googleTranslateElementInit){
          iframe.contentWindow.googleTranslateElementInit = function(){
            new iframe.contentWindow.google.translate.TranslateElement({
              pageLanguage: 'es',
              includedLanguages: 'en,pt,fr,de',
              layout: iframe.contentWindow.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
              multilanguagePage: false
            }, 'google_translate_element');
          };
        }

        // 5. Inicializar el traductor
        if(iframe.contentWindow.google && iframe.contentWindow.google.translate && iframe.contentWindow.google.translate.TranslateElement){
          iframe.contentWindow.googleTranslateElementInit();
        } else {
          var checkExist = setInterval(function(){
            if(iframe.contentWindow.google && iframe.contentWindow.google.translate && iframe.contentWindow.google.translate.TranslateElement){
              clearInterval(checkExist);
              iframe.contentWindow.googleTranslateElementInit();
            }
          }, 200);
        }
      }catch(e){}
    });
  }

  function translateIframes(lang){
    var iframes = document.querySelectorAll('iframe');
    iframes.forEach(function(iframe){ applyTranslationToIframe(iframe, lang); });
  }

  function applyTranslation(lang){
    applyTranslationMain(lang);
    translateIframes(lang);
  }

  if(langBtns) {
    langBtns.forEach(function(b){
      b.addEventListener('click', function(){
        var lang = b.dataset.lang;
        if(lang === currentLang){ togglePanel(true); return; }
        if(!gtReady){ pendingLang = lang; updateUI(lang); togglePanel(true); return; }
        applyTranslation(lang);
        togglePanel(true);
      });
    });
  }

  function restoreSavedLang(){
    try{
      var saved = localStorage.getItem(STORAGE_KEY);
      if(saved && LANGS[saved] && saved !== 'es'){
        var cookie = document.cookie.match(/googtrans=\/es\/(\w+)/);
        if(cookie && cookie[1] === saved){ updateUI(saved); }
        else { updateUI('es'); localStorage.removeItem(STORAGE_KEY); }
      } else { updateUI('es'); }
    }catch(e){ updateUI('es'); }
  }

  window.googleTranslateElementInit = function(){
    try{
      new google.translate.TranslateElement({
        pageLanguage: 'es',
        includedLanguages: 'en,pt,fr,de',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
        multilanguagePage: false
      }, 'google_translate_element');
    }catch(e){}
    var tries = 0;
    var interval = setInterval(function(){
      var sel = document.querySelector('.goog-te-combo');
      if(sel || tries > 30){
        clearInterval(interval);
        gtReady = true;
        if(pendingLang && pendingLang !== 'es'){ applyTranslation(pendingLang); pendingLang = null; }
        injectIntoIframes();
      }
      tries++;
    }, 200);
  };

  function loadGT(){
    if(document.querySelector('script[src*="translate.google.com/translate_a"]')) return;
    var script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = function(){ console.warn('[EIATEC Translator] GT script failed to load.'); };
    document.head.appendChild(script);
  }

  function hideGTBar(){
    var frame = document.querySelector('.goog-te-banner-frame');
    if(frame){ frame.style.display = 'none'; }
    var body = document.body;
    if(body){ body.style.top = '0'; body.style.marginTop = '0'; }
  }

  var barObserver = new MutationObserver(function(){ hideGTBar(); });
  barObserver.observe(document.documentElement, { childList:true, subtree:true });

  function broadcastToIframes(lang){
    var frames = document.querySelectorAll('iframe');
    frames.forEach(function(f){
      try{ if(f.contentWindow){ f.contentWindow.postMessage({ type: 'EIA_TRANSLATE', lang: lang }, window.location.origin); } }catch(e){}
    });
  }

  window.addEventListener('message', function(e){
    if(e.data && e.data.type === 'EIA_TRANSLATE'){
      var lang = e.data.lang;
      if(LANGS[lang] && lang !== currentLang){ applyTranslation(lang); }
    }
  });

  var origApply = applyTranslation;
  applyTranslation = function(lang){ origApply(lang); broadcastToIframes(lang); };

  restoreSavedLang();
  hideGTBar();
  if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', loadGT); }
  else { setTimeout(loadGT, 300); }
})();