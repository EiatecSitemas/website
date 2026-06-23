(function(){
  /* =============================================
     Kai · EIATEC · Motor profesional (v7.2)
     WhatsApp unificado: +57 316 482 0803
  ============================================= */
  const KAI_AVATAR = "https://static.wixstatic.com/media/2801d6_51ce4f450a744caeb76eeee572a36286~mv2.png";

  const CFG = {
    whatsapp: {
      comercial:       '573164820803',
      gestionhumana:   '573164820803',
      hseq:            '573164820803',
      gerenciatecnica: '573164820803',
      general:         '573164820803',
    },
    pages: {
      servicios: 'https://www.eiatec.com/servicios',
      proyectos: 'https://www.eiatec.com/proyectos',
      nosotros:  'https://www.eiatec.com/nosotros',
      contacto:  'https://www.eiatec.com/contacto',
      blog:      'https://www.eiatec.com/blog',
    },
    emails: {
      comercial:       'comercial@eiatec.com',
      gestionhumana:   'gestionhumana@eiatec.com',
      hseq:            'hseq@eiatec.com',
      gerenciatecnica: 'gerenciatecnica@eiatec.com',
      juridica:        'gestionjuridica@eiatec.com',
      compras:         'compras@eiatec.com',
      contabilidad:    'contabilidad@eiatec.com',
    }
  };

  const FLOWS = {
    inicio: {
      msg: '¡Hola! 👋 Soy <strong>Kai</strong>, el asistente virtual de <strong>EIATEC</strong>.<br>Estoy aquí para ayudarte con todo lo que necesites. ¿Por dónde empezamos?',
      opts: [
        {e:'📋',l:'Nuestros servicios',  n:'servicios'},
        {e:'🗂️',l:'Proyectos realizados', n:'proyectos'},
        {e:'🕐',l:'Horarios de atención', n:'horarios'},
        {e:'📩',l:'Hablar con un asesor', n:'asesor'},
        {e:'🌐',l:'Ir al sitio web',      n:'web'},
      ]
    },
    servicios: {
      msg: 'En <strong>EIATEC</strong> ofrecemos soluciones ambientales integrales:<br><br>🌿 Estudios de Impacto Ambiental (EIA)<br>🤝 Consulta Previa con comunidades<br>💧 Gestión de Recursos Hídricos<br>🦋 Flora, Fauna y Biodiversidad<br>☀️ Energía Renovable<br>🏛️ Arqueología y Patrimonio<br>♻️ Sostenibilidad Empresarial<br>🚚 Logística Ambiental<br><br>¿Te gustaría saber más?',
      opts: [
        {e:'🔗',l:'Ver todos los servicios', a:()=>window.open(CFG.pages.servicios,'_top')},
        {e:'📩',l:'Consultar un servicio',   n:'asesor'},
        {e:'🏠',l:'Volver al inicio',        n:'inicio'},
      ]
    },
    proyectos: {
      msg: 'Hemos realizado <strong>más de 30 proyectos</strong> exitosos en toda Colombia. 🇨🇴<br><br>EIAs, consultas previas, monitoreo de fauna, energía solar, compensaciones forestales y mucho más.',
      opts: [
        {e:'🔗',l:'Ver proyectos',  a:()=>window.open(CFG.pages.proyectos,'_top')},
        {e:'📩',l:'Contactar',      n:'asesor'},
        {e:'🏠',l:'Inicio',         n:'inicio'},
      ]
    },
    horarios: {
      msg: '🕐 <strong>Horarios de atención:</strong><br><br>📅 Lunes a Viernes<br>⏰ 8:00 a.m. – 6:00 p.m.<br><br>📞 <strong>(1) 704 2362</strong> / <strong>(1) 245 0961</strong><br>📍 Bogotá D.C. · Calle 45 C Bis #23-37<br><br>Fuera del horario, puedes escribirnos por WhatsApp o correo. Te respondemos lo antes posible. 😊',
      opts: [
        {e:'💬',l:'Escribir por WhatsApp', a:()=>window.open(`https://wa.me/${CFG.whatsapp.general}`,'_blank')},
        {e:'✉️',l:'Enviar correo',         a:()=>window.open(`mailto:${CFG.emails.comercial}`)},
        {e:'🏠',l:'Inicio',                n:'inicio'},
      ]
    },
    asesor: {
      msg: '¡Perfecto! Conectemos con el área indicada. ¿Sobre qué necesitas ayuda?',
      opts: [
        {e:'💼',l:'Comercial / Proyectos', n:'f_comercial'},
        {e:'🛡️',l:'HSEQ',                 n:'f_hseq'},
        {e:'🔧',l:'Gerencia Técnica',      n:'f_tecnica'},
        {e:'👥',l:'Gestión Humana',        n:'f_humana'},
        {e:'⚖️',l:'Gestión Jurídica',      n:'f_juridica'},
        {e:'🏠',l:'Volver',               n:'inicio'},
      ]
    },
    pqr: {
      msg: '📬 Para radicar una <strong>Petición, Queja, Reclamo o Sugerencia (PQRS)</strong>, lo más rápido es que nos escribas directamente al WhatsApp o al correo de la oficina.<br><br>Te responderemos en menos de 24 horas hábiles.',
      opts: [
        {e:'💬',l:'Enviar PQRS por WhatsApp', a:()=>window.open(`https://wa.me/${CFG.whatsapp.general}?text=Hola,%20quiero%20radicar%20una%20PQRS.`,'_blank')},
        {e:'✉️',l:'Enviar por correo',        a:()=>window.open(`mailto:${CFG.emails.comercial}?subject=Radicación PQRS`)},
        {e:'🏠',l:'Inicio',                   n:'inicio'},
      ]
    },
    cotizacion: {
      msg: '💰 Entendido. Para solicitarnos una <strong>cotización</strong>, cuéntanos un poco más sobre tu proyecto y te contactará un asesor.',
      opts: [
        {e:'💼',l:'Solicitar cotización (Comercial)', n:'f_comercial'},
        {e:'💬',l:'Escribir por WhatsApp',            a:()=>window.open(`https://wa.me/${CFG.whatsapp.comercial}`,'_blank')},
        {e:'🏠',l:'Volver al inicio',                 n:'inicio'},
      ]
    },
    empleo: {
      msg: '👥 ¡Qué bueno que quieras trabajar con nosotros! Para enviar tu hoja de vida o consultar vacantes, comunícate con <strong>Gestión Humana</strong>.',
      opts: [
        {e:'📩',l:'Enviar hoja de vida', n:'f_humana'},
        {e:'💬',l:'Escribir por WhatsApp', a:()=>window.open(`https://wa.me/${CFG.whatsapp.gestionhumana}`,'_blank')},
        {e:'✉️',l:'Correo a Gestión Humana', a:()=>window.open(`mailto:${CFG.emails.gestionhumana}?subject=Hoja de vida`)},
        {e:'🏠',l:'Inicio', n:'inicio'},
      ]
    },
    sobre_nosotros: {
      msg: '🌱 <strong>EIATEC S.A.S.</strong> es una empresa colombiana especializada en soluciones ambientales integrales.<br>Con más de 30 proyectos exitosos, trabajamos con los más altos estándares de calidad y sostenibilidad.',
      opts: [
        {e:'🔗',l:'Conoce más en nuestro sitio', a:()=>window.open(CFG.pages.nosotros,'_top')},
        {e:'📩',l:'Hablar con un asesor', n:'asesor'},
        {e:'🏠',l:'Inicio', n:'inicio'},
      ]
    },
    f_comercial:{ type:'form', area:'comercial', label:'Comercial',        wa:CFG.whatsapp.comercial,     mail:'comercial' },
    f_hseq:     { type:'form', area:'hseq',      label:'HSEQ',             wa:CFG.whatsapp.hseq,          mail:'hseq' },
    f_tecnica:  { type:'form', area:'tecnica',   label:'Gerencia Técnica', wa:CFG.whatsapp.gerenciatecnica, mail:'gerenciatecnica' },
    f_humana:   { type:'form', area:'humana',    label:'Gestión Humana',   wa:CFG.whatsapp.gestionhumana, mail:'gestionhumana' },
    f_juridica: { type:'form', area:'juridica',  label:'Gestión Jurídica', wa:CFG.whatsapp.general,       mail:'juridica' },
    web: {
      msg: '¿A qué sección quieres ir? 🌐',
      opts: [
        {e:'⚙️',l:'Servicios', a:()=>window.open(CFG.pages.servicios,'_top')},
        {e:'📁',l:'Proyectos', a:()=>window.open(CFG.pages.proyectos,'_top')},
        {e:'🏢',l:'Nosotros',  a:()=>window.open(CFG.pages.nosotros,'_top')},
        {e:'✉️',l:'Contacto',  a:()=>window.open(CFG.pages.contacto,'_top')},
        {e:'📰',l:'Blog',      a:()=>window.open(CFG.pages.blog,'_top')},
        {e:'🏠',l:'Volver',   n:'inicio'},
      ]
    },
  };

  const INTENTS = [
    { pattern: /\b(pqr|petición|queja|reclamo|radicar|sugerencia)\b/i, flow: 'pqr' },
    { pattern: /\b(cotización|cotizar|propuesta|presupuesto|tarifa|precio|valor)\b/i, flow: 'cotizacion' },
    { pattern: /\b(empleo|trabajo|vacante|hoja de vida|cargo|reclutamiento|contratación)\b/i, flow: 'empleo' },
    { pattern: /\b(servicio|eia|impacto ambiental|consultoría|asesoría|estudio ambiental)\b/i, flow: 'servicios' },
    { pattern: /\b(proyecto|portafolio|experiencia|cliente)\b/i, flow: 'proyectos' },
    { pattern: /\b(horario|hora|atencion|abierto|cuándo)\b/i, flow: 'horarios' },
    { pattern: /\b(contacto|asesor|hablar|ayuda|comunicar|correo|whatsapp)\b/i, flow: 'asesor' },
    { pattern: /\b(web|página|sitio|internet|online)\b/i, flow: 'web' },
    { pattern: /\b(nosotros|empresa|historia|quién|misión|visión|información)\b/i, flow: 'sobre_nosotros' },
    { pattern: /\b(hola|buenos días|buenas tardes|saludos|hey|hello)\b/i, flow: 'inicio' },
  ];

  function onReady(){
    const chat   = document.getElementById('eiabot-chat');
    const minBtn = document.getElementById('eiabot-min');
    const notif  = document.getElementById('eiabot-notif');
    const msgs   = document.getElementById('eiabot-msgs');
    const inp    = document.getElementById('eiabot-inp');
    if (!chat || !minBtn) return;

    let started = false;
    chat.classList.add('minimized');
    minBtn.style.display = 'flex';
    if (notif) notif.style.display = 'none';

    setTimeout(() => {
      if (!started && notif) {
        notif.style.display = 'flex';
        notif.textContent = '1';
      }
    }, 4000);

    function scroll(){ setTimeout(()=>msgs.scrollTop=msgs.scrollHeight,80); }

    function addBot(html){
      const el = document.createElement('div');
      el.className = 'eiabot-bm';
      el.innerHTML = `<div class="eiabot-bm-av"><img src="${KAI_AVATAR}" alt="Kai"></div><div class="eiabot-bm-bub">${html}</div>`;
      msgs.appendChild(el);
      scroll();
    }

    function addUser(text){
      const el = document.createElement('div');
      el.className = 'eiabot-um';
      el.innerHTML = `<div class="eiabot-um-bub">${text}</div>`;
      msgs.appendChild(el);
      scroll();
    }

    function addOpts(opts){
      const el = document.createElement('div');
      el.className = 'eiabot-opts';
      opts.forEach(o => {
        const b = document.createElement('button');
        b.className = 'eiabot-opt';
        b.innerHTML = (o.e ? `<span>${o.e}</span> ` : '') + o.l;
        b.onclick = () => {
          el.querySelectorAll('.eiabot-opt').forEach(x => { x.disabled = true; x.style.opacity = '.4'; });
          addUser((o.e||'') + ' ' + o.l);
          if (o.a) { setTimeout(o.a, 180); setTimeout(askAgain, 800); }
          else if (o.n) showTyping(() => goFlow(o.n));
        };
        el.appendChild(b);
      });
      msgs.appendChild(el);
      scroll();
    }

    function showTyping(cb){
      const el = document.createElement('div');
      el.className = 'eiabot-typing';
      el.innerHTML = `<div class="eiabot-bm-av"><img src="${KAI_AVATAR}" alt="Kai"></div><div class="eiabot-typing-bub"><div class="eiabot-td"></div><div class="eiabot-td"></div><div class="eiabot-td"></div></div>`;
      msgs.appendChild(el);
      scroll();
      setTimeout(() => { el.remove(); cb(); }, 820);
    }

    function addSys(text){
      const el = document.createElement('div');
      el.className = 'eiabot-sys';
      el.textContent = text;
      msgs.appendChild(el);
      scroll();
    }

    function goFlow(key){
      const f = FLOWS[key];
      if (!f) {
        addBot('Vaya, todavía no tengo información sobre eso. Pero no te preocupes, te llevo al menú principal para que podamos ayudarte mejor.');
        setTimeout(() => goFlow('inicio'), 1200);
        return;
      }
      if (f.type === 'form') {
        showForm(f);
        return;
      }
      addBot(f.msg);
      setTimeout(() => addOpts(f.opts), 220);
    }

    function showForm(f){
      const subj = `Consulta ${f.label} · EIATEC`;
      const el = document.createElement('div');
      el.className = 'eiabot-form';
      el.innerHTML = `
        <div class="eiabot-form-ttl"><i class="fas fa-paper-plane"></i>Cuéntanos tu consulta</div>
        <div class="eiabot-fg">
          <label>Nombre *</label>
          <div class="eiabot-fi-wrap"><i class="fas fa-user"></i><input id="kfn" type="text" placeholder="Tu nombre" autocomplete="name"></div>
        </div>
        <div class="eiabot-fg">
          <label>Correo (opcional)</label>
          <div class="eiabot-fi-wrap"><i class="fas fa-envelope"></i><input id="kfe" type="email" placeholder="correo@empresa.com"></div>
        </div>
        <div class="eiabot-fg">
          <label>Teléfono (opcional)</label>
          <div class="eiabot-fi-wrap"><i class="fas fa-phone"></i><input id="kft" type="tel" placeholder="+57 300 000 0000"></div>
        </div>
        <div class="eiabot-fg">
          <label>Mensaje (opcional)</label>
          <div class="eiabot-fi-wrap ta-wrap"><i class="fas fa-comment"></i><textarea id="kfm" placeholder="Cuéntanos brevemente tu consulta…"></textarea></div>
        </div>
        <div class="eiabot-div"><span>¿Cómo prefieres continuar?</span></div>
        <div class="eiabot-form-btns">
          <button class="eiabot-btn eiabot-btn-wa" id="kfwa"><i class="fab fa-whatsapp"></i>WhatsApp</button>
          <button class="eiabot-btn eiabot-btn-em" id="kfem"><i class="fas fa-envelope"></i>Correo</button>
        </div>
        <div class="eiabot-form-hint">Solo tu nombre es obligatorio</div>
      `;
      msgs.appendChild(el);
      scroll();

      function getData(){
        return {
          name: (document.getElementById('kfn')?.value || '').trim(),
          email: (document.getElementById('kfe')?.value || '').trim(),
          phone: (document.getElementById('kft')?.value || '').trim(),
          msg: (document.getElementById('kfm')?.value || '').trim()
        };
      }

      document.getElementById('kfwa').onclick = () => {
        const d = getData();
        if (!d.name) { document.getElementById('kfn').focus(); return; }
        const body = `Hola Kai, soy ${d.name}.${d.phone ? ' Tel: '+d.phone+'.' : ''}${d.email ? ' Email: '+d.email+'.' : ''} Consulta ${f.label}.${d.msg ? ' '+d.msg : ''}`;
        window.open(`https://wa.me/${f.wa}?text=${encodeURIComponent(body)}`, '_blank');
        el.remove();
        addBot('¡Listo! <span class="eiabot-react">🚀</span> Abrí WhatsApp con tu consulta. Solo envía el mensaje y te contactaremos pronto.');
        askAgain();
      };

      document.getElementById('kfem').onclick = () => {
        const d = getData();
        if (!d.name) { document.getElementById('kfn').focus(); return; }
        const to = CFG.emails[f.mail] || CFG.emails.comercial;
        const subject = encodeURIComponent(subj);
        const body = encodeURIComponent(`Hola,\n\nSoy ${d.name}.${d.phone ? '\nTeléfono: '+d.phone : ''}${d.email ? '\nCorreo: '+d.email : ''}\n\n${d.msg || 'Quisiera recibir información sobre los servicios de EIATEC.'}\n\nSaludos.`);
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
        el.remove();
        addBot('¡Perfecto! <span class="eiabot-react">✉️</span> Abrí tu cliente de correo con todo listo.');
        askAgain();
      };
    }

    function askAgain(){
      setTimeout(() => {
        addSys('─────────────────');
        addBot('¿Puedo ayudarte con algo más? 😊');
        setTimeout(() => addOpts([
          {e:'✅',l:'Sí, tengo otra consulta', n:'inicio'},
          {e:'👋',l:'No, gracias', a:() => {
            addBot('¡Fue un placer! Recuerda que puedes escribirme cuando quieras. 🌿<br>¡Hasta pronto!');
            setTimeout(() => minimize(), 2800);
          }}
        ]), 250);
      }, 900);
    }

    function handleInput(){
      const v = inp.value.trim();
      if (!v) return;
      inp.value = '';
      addUser(v);
      const lv = v.toLowerCase();
      const matched = INTENTS.find(item => item.pattern.test(lv));
      if (matched) {
        showTyping(() => goFlow(matched.flow));
      } else {
        showTyping(() => {
          addBot('Entiendo tu consulta. 🤔 Te conecto con un asesor que podrá ayudarte mejor.');
          setTimeout(() => goFlow('asesor'), 200);
        });
      }
    }

    function minimize(){
      chat.classList.add('minimized');
      minBtn.style.display = 'flex';
      if (notif) notif.style.display = 'none';
    }

    function expand(){
      chat.classList.remove('minimized');
      minBtn.style.display = 'none';
      if (notif) notif.style.display = 'none';
      if (!started) {
        started = true;
        setTimeout(() => goFlow('inicio'), 400);
      }
      inp.focus();
    }

    window.eiabot = { minimize, expand, handleInput };
    minBtn.addEventListener('click', expand);
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') handleInput(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();