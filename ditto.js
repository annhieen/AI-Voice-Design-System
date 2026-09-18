(() => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const byId = (id) => document.getElementById(id);

  // Shared waveform generation
  document.querySelectorAll('[data-wave]').forEach((wave) => {
    const count = Number(wave.dataset.wave || 20);
    wave.innerHTML = '';
    for (let i = 0; i < count; i += 1) {
      const bar = document.createElement('i');
      const height = 9 + ((i * 17 + 11) % 31);
      bar.style.height = height + 'px';
      wave.appendChild(bar);
    }
  });

  // HERO DEMO A -------------------------------------------------------------
  const hero = {
    stage: byId('heroDemo'),
    sentence: byId('heroSentence'),
    toolbar: byId('heroToolbar'),
    hear: byId('heroHear'),
    shadow: byId('heroShadow'),
    playback: byId('heroPlayback'),
    selectNote: byId('heroSelectNote'),
    turnNote: byId('heroTurnNote'),
    againNote: byId('heroAgainNote'),
    cursor: byId('heroCursor')
  };

  const moveCursor = async (cursor, x, y, ms = 520) => {
    cursor.style.transitionDuration = ms + 'ms';
    cursor.style.transform = `translate(${x}px,${y}px)`;
    await sleep(ms + 20);
  };

  const clickCursor = async (cursor) => {
    cursor.classList.add('clicking');
    await sleep(180);
    cursor.classList.remove('clicking');
    await sleep(60);
  };

  const clearHero = () => {
    [...hero.sentence.querySelectorAll('span')].forEach((span) => span.classList.remove('selected'));
    hero.toolbar.classList.remove('visible');
    hero.playback.classList.remove('visible');
    hero.selectNote.classList.remove('visible');
    hero.turnNote.classList.remove('visible');
    hero.againNote.classList.remove('visible');
    hero.hear.classList.remove('pressed');
    hero.shadow.classList.remove('pressed');
    hero.cursor.classList.remove('clicking');
  };

  const heroLoop = async () => {
    if (!hero.stage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const words = [...hero.sentence.querySelectorAll('span')];

    while (document.body.contains(hero.stage)) {
      clearHero();
      await moveCursor(hero.cursor, 340, 34, 0);
      await sleep(520);

      await moveCursor(hero.cursor, 58, 78, 520);
      hero.selectNote.classList.add('visible');

      for (let i = 0; i < words.length; i += 1) {
        words[i].classList.add('selected');
        const progressX = 58 + i * 23;
        hero.cursor.style.transform = `translate(${Math.min(progressX, 335)}px,78px)`;
        await sleep(55);
      }

      await sleep(170);
      hero.toolbar.classList.add('visible');
      await sleep(260);

      await moveCursor(hero.cursor, 82, 166, 420);
      await clickCursor(hero.cursor);
      hero.hear.classList.add('pressed');
      hero.playback.classList.add('visible');
      await sleep(1500);

      hero.hear.classList.remove('pressed');
      await moveCursor(hero.cursor, 170, 166, 380);
      await clickCursor(hero.cursor);
      hero.shadow.classList.add('pressed');
      hero.turnNote.classList.add('visible');
      await sleep(900);

      hero.againNote.classList.add('visible');
      await sleep(650);
      await moveCursor(hero.cursor, 340, 34, 360);
      await sleep(350);
    }
  };

  // ONBOARDING DEMO B -------------------------------------------------------
  const demoB = {
    card: byId('onboardingDemo'),
    content: byId('onboardingDemoContent'),
    cursor: byId('onboardingCursor')
  };

  const demoBTemplates = {
    intro: () => `
      <div class="demo-b-state">
        <h3>Let's hear your better voice.</h3>
        <p>Read one short line. We'll play it back in a clearer version of your own voice.</p>
        <p style="font-size:.8rem">Nothing is saved without your say-so.</p>
        <p style="color:var(--progress);font-weight:700;font-size:.82rem;margin:18px 0">✓ Mic ready</p>
        <button class="demo-action primary" data-demo-target="intro">Let's go →</button>
      </div>`,
    read: () => `
      <div class="demo-b-state">
        <h3>Read this out loud.</h3>
        <p>Just speak naturally. No need to perform.</p>
        <div class="prompt-card"><p>“I really appreciate you taking the time to meet with me today.”</p></div>
        <button class="demo-action" data-demo-target="read">🎙 Tap to record</button>
      </div>`,
    recording: () => `
      <div class="demo-b-state">
        <h3>Read this out loud.</h3>
        <div class="prompt-card"><p>“I really appreciate you taking the time to meet with me today.”</p></div>
        <div class="recording-row">
          <span class="record-dot"></span>
          <strong style="color:var(--emphasis)">Recording…</strong>
          <span style="font-family:var(--font-note);color:var(--emphasis)">0:03</span>
        </div>
        <div class="wave blue animated-wave" data-wave="16"></div>
        <p class="note coral-note" style="margin-top:14px">Yep, we can hear you.</p>
      </div>`,
    reveal: () => `
      <div class="demo-b-state">
        <h3>Whoa. That's you.</h3>
        <p>Same voice. One step ahead.</p>
        <div class="preview-compare">
          <div>
            <small>Your voice</small>
            <div class="wave" data-wave="10"></div>
          </div>
          <div>
            <small style="color:var(--voice)">Your Ditto voice</small>
            <div class="wave blue animated-wave" data-wave="10"></div>
          </div>
        </div>
        <button class="demo-action" data-demo-target="reveal">▶ Play Ditto</button>
        <p class="note coral-note" style="margin-top:14px">wait… that's actually me?</p>
      </div>`,
    chrome: () => `
      <div class="demo-b-state">
        <h3>Want to take it with you?</h3>
        <p>Highlight anything you're reading and practise with your Ditto voice wherever you browse.</p>
        <button class="demo-action primary" data-demo-target="chrome">Add Ditto to Chrome</button>
        <p class="note green-note" style="margin-top:18px">take it anywhere →</p>
      </div>`
  };

  const hydrateWaves = (root) => {
    root.querySelectorAll('[data-wave]').forEach((wave) => {
      const count = Number(wave.dataset.wave || 14);
      wave.innerHTML = '';
      for (let i = 0; i < count; i += 1) {
        const bar = document.createElement('i');
        const height = 8 + ((i * 19 + 7) % 25);
        bar.style.height = height + 'px';
        wave.appendChild(bar);
      }
    });
  };

  const renderDemoB = (state) => {
    demoB.content.innerHTML = demoBTemplates[state]();
    hydrateWaves(demoB.content);
  };

  const demoBLoop = async () => {
    if (!demoB.card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    while (document.body.contains(demoB.card)) {
      renderDemoB('intro');
      await moveCursor(demoB.cursor, 500, 240, 0);
      await sleep(550);
      await moveCursor(demoB.cursor, 160, 232, 480);
      await clickCursor(demoB.cursor);

      renderDemoB('read');
      await sleep(300);
      await moveCursor(demoB.cursor, 144, 244, 460);
      await clickCursor(demoB.cursor);

      renderDemoB('recording');
      await sleep(1250);

      renderDemoB('reveal');
      await sleep(360);
      await moveCursor(demoB.cursor, 145, 272, 440);
      await clickCursor(demoB.cursor);
      await sleep(1800);

      renderDemoB('chrome');
      await sleep(350);
      await moveCursor(demoB.cursor, 170, 190, 440);
      await sleep(900);

      await moveCursor(demoB.cursor, 510, 260, 360);
      await sleep(500);
    }
  };

  // ACTUAL ONBOARDING -------------------------------------------------------
  const modal = byId('onboardingModal');
  const content = byId('actualOnboardingContent');
  const closeBtn = byId('closeOnboarding');
  const progressDots = byId('progressDots');
  let actualStep = 1;
  let recording = false;
  let recorded = false;
  let timer = 0;
  let timerId = null;

  const renderProgress = () => {
    progressDots.innerHTML = '';
    [1, 2, 3, 4].forEach((n) => {
      const dot = document.createElement('i');
      if (n <= actualStep) dot.classList.add('active');
      progressDots.appendChild(dot);
    });
  };

  const renderActual = () => {
    clearInterval(timerId);
    timerId = null;
    renderProgress();

    if (actualStep === 1) {
      content.innerHTML = `
        <h3>Let's hear your better voice.</h3>
        <p>Read one short line. We'll play it back in a clearer version of your own voice.</p>
        <p style="font-size:.85rem">Nothing is saved without your say-so.</p>
        <p style="color:var(--progress);font-weight:700;margin:24px 0">✓ Mic ready</p>
        <button class="btn btn-primary" id="actualNext1">Let's go →</button>`;
      byId('actualNext1').onclick = () => { actualStep = 2; renderActual(); };
      return;
    }

    if (actualStep === 2) {
      const status = recording
        ? 'Recording — tap to stop'
        : recorded
          ? 'Recorded ✓ — tap to redo'
          : 'Tap to record';
      const icon = recording ? '■' : recorded ? '↻' : '🎙';
      const subcopy = recording ? 'Recording… Yep, we can hear you.' : recorded ? 'Nice. Ready when you are.' : 'Just speak naturally. No need to perform.';
      content.innerHTML = `
        <h3>Read this out loud.</h3>
        <p>${subcopy}</p>
        <div class="actual-prompt"><p>“I really appreciate you taking the time to meet with me today.”</p></div>
        <div class="record-center">
          <button class="record-button" id="recordToggle">${icon}</button>
          <strong>${status}</strong>
          ${recording ? '<div class="wave blue animated-wave" data-wave="14"></div><span class="note coral-note" id="actualTimer">0:00</span>' : ''}
        </div>
        <button class="btn btn-primary" id="actualContinue" ${recorded ? '' : 'disabled'}>Continue →</button>`;
      hydrateWaves(content);

      byId('recordToggle').onclick = () => {
        if (recording) {
          clearInterval(timerId);
          recording = false;
          recorded = true;
          renderActual();
          return;
        }
        if (recorded) {
          recorded = false;
          timer = 0;
          renderActual();
          return;
        }
        recording = true;
        recorded = false;
        timer = 0;
        renderActual();
        timerId = setInterval(() => {
          timer += 1;
          const el = byId('actualTimer');
          if (el) el.textContent = '0:' + String(timer).padStart(2, '0');
          if (timer >= 12) {
            clearInterval(timerId);
            recording = false;
            recorded = true;
            renderActual();
          }
        }, 1000);
      };

      const continueBtn = byId('actualContinue');
      if (continueBtn) continueBtn.onclick = () => {
        if (!recorded) return;
        actualStep = 3;
        renderActual();
      };
      return;
    }

    if (actualStep === 3) {
      content.innerHTML = `
        <h3>Whoa. That's you.</h3>
        <p>Same voice. One step ahead.</p>
        <div class="voice-compare">
          <div class="voice-panel"><small>Your voice</small><div class="wave" data-wave="16"></div></div>
          <div class="voice-divider"></div>
          <div class="voice-panel"><small style="color:var(--voice)">Your Ditto voice</small><div class="wave blue" data-wave="16"></div></div>
        </div>
        <p class="note coral-note" style="margin:14px 0 18px">wait… that's actually me?</p>
        <div class="actual-actions">
          <button class="btn btn-ghost">▶ Play yours</button>
          <button class="btn btn-secondary">▶ Play Ditto</button>
        </div>
        <div style="margin-top:28px"><button class="btn btn-primary" id="actualNext3">Continue →</button></div>`;
      hydrateWaves(content);
      byId('actualNext3').onclick = () => { actualStep = 4; renderActual(); };
      return;
    }

    content.innerHTML = `
      <h3>Want to take it with you?</h3>
      <p>Highlight anything you're reading and practise with your Ditto voice wherever you browse.</p>
      <div class="actual-actions" style="margin-top:26px">
        <button class="btn btn-primary btn-lg" id="installDitto">Add Ditto to Chrome</button>
        <button class="btn btn-ghost btn-lg" id="tryAgain">Try another line</button>
      </div>`;
    byId('tryAgain').onclick = () => {
      actualStep = 2;
      recorded = false;
      recording = false;
      timer = 0;
      renderActual();
    };
    byId('installDitto').onclick = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
  };

  const openActual = () => {
    actualStep = 1;
    recording = false;
    recorded = false;
    timer = 0;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    renderActual();
  };

  document.querySelectorAll('[data-open-onboarding]').forEach((btn) => {
    btn.addEventListener('click', openActual);
  });

  closeBtn.addEventListener('click', () => {
    clearInterval(timerId);
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      clearInterval(timerId);
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });

  // Start demos after first paint.
  requestAnimationFrame(() => {
    heroLoop();
    demoBLoop();
  });
})();