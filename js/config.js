(function () {
  /* ============ مقادیر پیش‌فرض (تم و محتوای الهام‌گرفته از فرالینک) ============ */
  const DEFAULTS = {
    // برندینگ
    siteTitle: 'سایت‌ساز هوشمند | ساخت سایت حرفه‌ای و هوشمند در چند دقیقه',
    logoText: '✦ سایت‌ساز هوشمند',
    logoImage: '',
    footerText: 'ساده‌ترین راه برای ساخت سایت حرفه‌ای و هوشمند؛ بدون نیاز به دانش برنامه‌نویسی، وب‌سایت کسب‌وکار خود را در چند دقیقه ایجاد کنید.',

    // رنگ‌ها (سبزآبی تیره و زمردی فرالینک)
    colorPrimary: '#0d9488',
    colorSecondary: '#10b981',
    colorBg: '#060d0d',
    colorBg2: '#0b1616',
    colorCard: '#112222',
    colorText: '#f0fdfa',
    colorMuted: '#94a3b8',

    // Hero
    heroBadge: '✦ ساخت سایت هوشمند با کمک AI — ۱۴ روز فرصت تست هدیه',
    heroTitle: 'طراحی سایت پرهزینه، زمان‌بر و پیچیده نیست...<br><span class="grad-text">ایده‌ات را بگو، سایتت را تحویل بگیر</span>',
    heroDesc: 'حوزه فعالیتت رو مشخص کن، فرم رو با کمک هوش مصنوعی تکمیل کن و اطلاعاتت رو بنویس؛ در چند دقیقه وب‌سایت حرفه‌ای، سریع و بهینه برای گوگل تحویل بگیر.',
    heroBtn1: 'ساخت رایگان سایت',
    heroBtn2: 'مشاهده نمونه کارها',
    heroBgImage: '',

    // نمایش بخش‌ها
    showFeatures: true,
    showDemo: true,
    showShowcase: true,
    showSteps: true,
    showStats: true,
    showCTA: true,

    // تماس
    contactEmail: 'info@yoursite.com',
    contactPhone: '۰۲۱ - ۲۸۴۲ ۶۸۳۸',
    contactAddress: 'تهران، مرکز نوآوری و فناوری‌های دیجیتال، طبقه ۴',
    contactHours: '۷ روز هفته، از ۸ صبح تا ۱۲ شب (پشتیبانی آنلاین و تلفنی)',

    // آمار
    stat1Value: 14,    stat1Label: 'روز فرصت تست رایگان هدیه',
    stat2Value: 15,    stat2Label: 'سال تجربه و پشتوانه فنی',
    stat3Value: 38,    stat3Label: 'درصد رشد میانگین تبدیل مشتری',
    stat4Value: 100,   stat4Label: 'درصد پنل فارسی و واکنش‌گرا'
  };

  window.SITE_DEFAULTS = DEFAULTS;

  function loadSettings() {
    const saved = window.__SERVER_SETTINGS;
    if (saved && typeof saved === 'object') return Object.assign({}, DEFAULTS, saved);
    return Object.assign({}, DEFAULTS);
  }

  const settings = loadSettings();
  window.SITE_SETTINGS = settings;

  function applyCSSVars(s) {
    const r = document.documentElement.style;
    r.setProperty('--primary', s.colorPrimary);
    r.setProperty('--secondary', s.colorSecondary);
    r.setProperty('--bg', s.colorBg);
    r.setProperty('--bg2', s.colorBg2);
    r.setProperty('--card', s.colorCard);
    r.setProperty('--text', s.colorText);
    r.setProperty('--muted', s.colorMuted);
    r.setProperty('--grad', 'linear-gradient(135deg, ' + s.colorPrimary + ', ' + s.colorSecondary + ')');
  }
  applyCSSVars(settings);

  function escHTML(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }
  function safeTitle(v) {
    return escHTML(v)
      .replace(/&lt;br\s*\/?&gt;/gi, '<br>')
      .replace(/&lt;span class=&quot;grad-text&quot;&gt;/gi, '<span class="grad-text">')
      .replace(/&lt;\/span&gt;/gi, '</span>');
  }
  function safeUrl(v) {
    return String(v == null ? '' : v).replace(/["'\\()\s<>]/g, '');
  }

  function applyDOMChanges() {
    const s = loadSettings();

    if (s.siteTitle && document.body.dataset.page === 'home') document.title = s.siteTitle;

    document.querySelectorAll('.logo').forEach(function (el) {
      if (s.logoImage) {
        el.innerHTML = '<img src="' + escHTML(s.logoImage) + '" alt="logo" style="height:34px;vertical-align:middle;display:inline-block;">';
      } else if (s.logoText) {
        el.textContent = s.logoText;
      }
    });

    const fp = document.querySelector('footer p.footer-tagline');
    if (fp && s.footerText) fp.textContent = s.footerText;

    const badge = document.querySelector('.hero .badge');
    if (badge) badge.innerHTML = '<span class="dot"></span> ' + escHTML(s.heroBadge);

    const ht = document.querySelector('.hero .hero-title');
    if (ht) ht.innerHTML = safeTitle(s.heroTitle);

    const hd = document.querySelector('.hero .hero-desc');
    if (hd) hd.textContent = s.heroDesc;

    const hb = document.querySelector('.hero .hero-btns');
    if (hb) {
      const b1 = hb.querySelector('.btn-primary');
      const b2 = hb.querySelector('.btn-ghost');
      if (b1) b1.textContent = s.heroBtn1;
      if (b2) b2.textContent = s.heroBtn2;
    }

    const hero = document.querySelector('.hero');
    if (hero) {
      if (s.heroBgImage) {
        hero.style.backgroundImage = 'linear-gradient(rgba(6,13,13,0.82), rgba(6,13,13,0.88)), url("' + safeUrl(s.heroBgImage) + '")';
        hero.style.backgroundSize = 'cover';
        hero.style.backgroundPosition = 'center';
        hero.style.backgroundAttachment = 'fixed';
      } else {
        hero.style.backgroundImage = '';
      }
    }

    const sectionMap = {
      showFeatures: '.features',
      showDemo: '.demo-section',
      showShowcase: '.showcase',
      showSteps: '.steps',
      showStats: '.stats',
      showCTA: '.cta'
    };
    Object.keys(sectionMap).forEach(function (k) {
      document.querySelectorAll(sectionMap[k]).forEach(function (el) {
        el.style.display = s[k] ? '' : 'none';
      });
    });

    const cards = document.querySelectorAll('.contact-info .info-card');
    if (cards.length >= 4) {
      const setP = function (card, text) {
        const p = card.querySelector('p');
        if (p && text != null) p.textContent = text;
      };
      setP(cards[0], s.contactEmail);
      setP(cards[1], s.contactPhone);
      setP(cards[2], s.contactAddress);
      setP(cards[3], s.contactHours);
    }

    const stats = document.querySelectorAll('[data-count]');
    if (stats.length >= 4) {
      const setStat = function (el, v, l) {
        el.dataset.count = v;
        el.textContent = Number(v).toLocaleString('fa-IR');
        const lbl = el.parentElement.querySelector('.stat-label');
        if (lbl && l) lbl.textContent = l;
      };
      setStat(stats[0], s.stat1Value, s.stat1Label);
      setStat(stats[1], s.stat2Value, s.stat2Label);
      setStat(stats[2], s.stat3Value, s.stat3Label);
      setStat(stats[3], s.stat4Value, s.stat4Label);
    }
  }

  if (document.body) {
    applyDOMChanges();
  } else {
    document.addEventListener('DOMContentLoaded', applyDOMChanges);
  }
})();
