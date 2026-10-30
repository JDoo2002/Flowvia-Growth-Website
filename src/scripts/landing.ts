// Small native controllers replace the reference's React state and effects.
export function createChat(root: HTMLElement) {
  const messages = Array.from(root.querySelectorAll<HTMLElement>('[data-chat-message]'));
  const typing = root.querySelector<HTMLElement>('[data-chat-typing]')!;
  const booked = root.querySelector<HTMLElement>('[data-chat-booked]')!;
  const button = root.querySelector<HTMLButtonElement>('[data-chat-playback]')!;
  const stack = root.querySelector<HTMLElement>('[data-chat-stack]')!;
  let index = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let remaining = 0;
  let started = 0;
  let next: (() => void) | undefined;
  let allowed = false;
  let reduced = false;
  let manuallyPaused = false;
  let disposed = false;

  // Reserve the complete conversation's height: no scrolling, clipping or layout jumps.
  function measure() {
    const states = messages.map(message => message.hidden);
    const wasTyping = typing.hidden;
    messages.forEach(message => { message.hidden = false; });
    typing.hidden = true;
    stack.style.minHeight = '';
    stack.style.minHeight = `${Math.ceil(stack.getBoundingClientRect().height)}px`;
    messages.forEach((message, i) => { message.hidden = states[i]; });
    typing.hidden = wasTyping;
  }
  function running() { return allowed && !reduced && !manuallyPaused && !disposed; }
  function stop() {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;
      remaining = Math.max(0, remaining - (performance.now() - started));
    }
  }
  function resume() {
    if (!running() || timer !== undefined || !next) return;
    started = performance.now();
    timer = setTimeout(() => {
      timer = undefined;
      const action = next;
      next = undefined;
      action?.();
    }, remaining);
  }
  function schedule(action: () => void, delay: number) {
    next = action;
    remaining = delay;
    resume();
  }
  function showMessage() {
    typing.hidden = true;
    messages[index].hidden = false;
    messages[index].classList.add('animate-pop');
    index += 1;
    step();
  }
  function step() {
    if (index === messages.length) {
      booked.dataset.visible = 'true';
      schedule(reset, 4500);
    } else if (messages[index].dataset.me === 'true') {
      schedule(showMessage, 1400);
    } else {
      schedule(() => {
        typing.hidden = false;
        schedule(showMessage, 1600);
      }, 300);
    }
  }
  function reset() {
    index = 0;
    messages.forEach(message => { message.hidden = true; message.classList.remove('animate-pop'); });
    typing.hidden = true;
    booked.dataset.visible = 'false';
    step();
  }
  function pauseClick() {
    manuallyPaused = !manuallyPaused;
    button.setAttribute('aria-pressed', String(manuallyPaused));
    button.textContent = manuallyPaused ? 'Play conversation' : 'Pause conversation';
    if (running()) resume(); else stop();
  }
  measure();
  root.dataset.chatEnhanced = '';
  button.addEventListener('click', pauseClick);
  reset();
  return {
    measure,
    setAllowed(value: boolean) { allowed = value; if (running()) resume(); else stop(); },
    setReduced(value: boolean) {
      if (value === reduced) return;
      reduced = value;
      stop();
      button.hidden = value;
      if (value) {
        messages.forEach(message => { message.hidden = false; });
        typing.hidden = true;
        booked.dataset.visible = 'true';
      } else reset();
    },
    dispose() { disposed = true; stop(); button.removeEventListener('click', pauseClick); },
  };
}

export function initFaq(root: HTMLElement) {
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-faq-button]'));
  const setOpen = (button: HTMLButtonElement, open: boolean) => {
    button.setAttribute('aria-expanded', String(open));
    const answer = button.nextElementSibling as HTMLElement;
    answer.inert = !open;
    answer.setAttribute('aria-hidden', String(!open));
  };
  buttons.forEach((button, index) => {
    setOpen(button, index === 0);
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      buttons.forEach(other => setOpen(other, other === button && open));
    });
  });
  root.dataset.faqEnhanced = '';
}

export function initLanding() {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const html = document.documentElement;
  let paused = false;
  let visible = true;
  let scrollFrame = 0;
  let counterFrame = 0;
  let counterStarted = false;
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const photo = document.querySelector<HTMLElement>('[data-hero-parallax]');
  const counter = document.querySelector<HTMLElement>('[data-counter]');
  const race = document.querySelector<HTMLElement>('[data-race]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
  const chatRoot = document.querySelector<HTMLElement>('[data-live-chat]');
  const chat = chatRoot ? createChat(chatRoot) : undefined;
  const supportsObserver = 'IntersectionObserver' in window;
  let chatVisible = !supportsObserver;
  let counterVisible = !supportsObserver;

  const faq = document.querySelector<HTMLElement>('[data-faq]');
  if (faq) initFaq(faq);

  function updateScroll() {
    scrollFrame = 0;
    nav?.classList.toggle('shadow-soft', window.scrollY > 40);
    if (photo && hero) {
      const offset = motion.matches || paused ? 0 : Math.min(window.scrollY, hero.offsetHeight) * .3;
      photo.style.transform = `translateY(${offset}px)`;
    }
  }
  window.addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
  }, { passive: true });
  updateScroll();

  function animateCounter() {
    if (!counter || counterStarted || !counterVisible || paused || !visible) return;
    counterStarted = true;
    if (motion.matches) return;
    const start = performance.now();
    const tick = (now: number) => {
      if (motion.matches || paused || !visible) {
        counter.textContent = '$96,000';
        return;
      }
      const progress = Math.min((now - start) / 2200, 1);
      counter.textContent = `$${Math.round(96000 * (1 - (1 - progress) ** 4)).toLocaleString('en-AU')}`;
      if (progress < 1) counterFrame = requestAnimationFrame(tick);
    };
    counter.textContent = '$0';
    counterFrame = requestAnimationFrame(tick);
  }
  function syncMotion() {
    html.classList.toggle('motion-paused', paused || !visible);
    chat?.setReduced(motion.matches);
    chat?.setAllowed(chatVisible && visible && !paused);
    animateCounter();
    updateScroll();
  }
  if (supportsObserver) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: .15 });
    document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
    const sceneObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === chatRoot) chatVisible = entry.isIntersecting;
        if (entry.target.hasAttribute('data-counter-section') && entry.isIntersecting) {
          counterVisible = true;
          sceneObserver.unobserve(entry.target);
        }
        if (entry.target === race && entry.isIntersecting) {
          race.dataset.raceActive = '';
          sceneObserver.unobserve(race);
        }
      });
      syncMotion();
    }, { threshold: .4 });
    [chatRoot, document.querySelector('[data-counter-section]'), race].forEach(element => {
      if (element) sceneObserver.observe(element);
    });
    html.classList.add('motion-ready');
  } else if (race) race.dataset.raceActive = '';

  document.querySelectorAll<HTMLElement>('[data-spot]').forEach(spot => {
    spot.addEventListener('pointermove', event => {
      if (motion.matches || paused || event.pointerType === 'touch') return;
      const rect = spot.getBoundingClientRect();
      spot.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      spot.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
  toggle?.addEventListener('click', () => {
    paused = !paused;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = paused ? 'Resume animations' : 'Pause animations';
    syncMotion();
  });
  document.addEventListener('visibilitychange', () => {
    visible = !document.hidden;
    syncMotion();
  });
  motion.addEventListener('change', syncMotion);
  let resizeTimer: ReturnType<typeof setTimeout>;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => chat?.measure(), 150);
  });
  document.fonts.ready.then(() => chat?.measure());
  window.addEventListener('pagehide', () => {
    visible = false;
    syncMotion();
    cancelAnimationFrame(scrollFrame);
    cancelAnimationFrame(counterFrame);
  });
  window.addEventListener('pageshow', () => { visible = !document.hidden; syncMotion(); });
  syncMotion();
}

if (typeof document !== 'undefined') initLanding();
