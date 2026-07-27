/* Mehndi Invitation — vanilla JS mirror of the React version */
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const isTouch = window.matchMedia("(pointer: coarse)").matches;

/* ------------------------- Cursor ------------------------- */
if (!isTouch) {
  const cursor = document.getElementById("cursor");
  const trail = document.getElementById("cursor-trail");
  let x = innerWidth/2, y = innerHeight/2, tx = x, ty = y;
  addEventListener("mousemove", e => { x = e.clientX; y = e.clientY; });
  const tick = () => {
    tx += (x - tx) * .18; ty += (y - ty) * .18;
    cursor.style.transform = `translate(${x}px, ${y}px)`;
    trail.style.transform = `translate(${tx}px, ${ty}px)`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ------------------------- Particles ------------------------- */
(function particles(){
  const root = document.getElementById("particles");
  for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    const s = 1 + Math.random() * 3;
    p.style.cssText = `position:absolute;width:${s}px;height:${s}px;border-radius:50%;background:oklch(0.9 0.12 80);box-shadow:0 0 ${6+s*2}px oklch(0.85 0.15 70);left:${Math.random()*100}%;top:${Math.random()*100}%;opacity:${0.3+Math.random()*0.6};pointer-events:none;`;
    root.appendChild(p);
    gsap.to(p, {
      y: `-=${100 + Math.random()*200}`,
      x: `+=${(Math.random()-.5)*100}`,
      opacity: 0,
      duration: 8 + Math.random()*8,
      repeat: -1,
      delay: Math.random()*8,
      ease: "sine.inOut",
      onRepeat: () => gsap.set(p, { y: 0, x: 0, opacity: 0.3 + Math.random()*0.6 }),
    });
  }
})();

/* ------------------------- Music toggle ------------------------- */
document.getElementById("music-toggle").addEventListener("click", (e) => {
  const b = e.currentTarget;
  const playing = b.classList.toggle("playing");
  b.querySelector(".mt-label").textContent = playing ? "on" : "off";
});

/* ------------------------- Opening ------------------------- */
document.documentElement.style.overflow = "hidden";
(function opening(){
  const tl = gsap.timeline({
    onComplete: () => {
      document.documentElement.style.overflow = "";
      ScrollTrigger.refresh();
      setTimeout(() => document.getElementById("opening").remove(), 800);
    }
  });
  tl.from(".seal-emblem", { scale: 0, rotate: -180, duration: 1.4, ease: "power3.out" }, 0.6)
    .from(".seal-ring", { scale: 0, opacity: 0, duration: 1, ease: "power2.out" }, 0.8)
    .to(".seal-hint", { opacity: 1, duration: 0.6 }, 1.6)
    .to(".seal-emblem", { scale: 1.15, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, 3.2)
    .to(".seal-crack", { opacity: 1, duration: 0.15 }, 3.8)
    .to(".seal-half-left", { x: -300, rotate: -25, opacity: 0, duration: 1.2, ease: "power3.in" }, 3.9)
    .to(".seal-half-right", { x: 300, rotate: 25, opacity: 0, duration: 1.2, ease: "power3.in" }, 3.9)
    .to(".fold-panel-l", { rotateY: -90, duration: 1.1, ease: "power3.inOut" }, 4.3)
    .to(".fold-panel-r", { rotateY: 90, duration: 1.1, ease: "power3.inOut" }, 4.3)
    .to(".opening-root", { opacity: 0, duration: 0.9, ease: "power2.inOut" }, 5.2);
})();

/* ------------------------- Scene 1 · Hero ------------------------- */
(function hero(){
  // fairy lights
  const wrap = document.getElementById("fairy-lights");
  for (let i = 0; i < 12; i++) {
    const el = document.createElement("div");
    el.className = "fairy-bulb";
    el.style.height = `${40 + (i%4)*20}px`;
    el.innerHTML = `<div class="string"></div><div class="bulb"><div class="bulb-glow"></div></div>`;
    wrap.appendChild(el);
    gsap.to(el, { rotate: 6, duration: 3 + (i%4)*.4, yoyo: true, repeat: -1, ease: "sine.inOut", transformOrigin: "top center" });
    gsap.to(el.querySelector(".bulb-glow"), { opacity: 0.5, duration: 1.2 + Math.random(), yoyo: true, repeat: -1, ease: "sine.inOut", delay: Math.random() });
  }
  const hero = document.getElementById("hero");
  gsap.to(".hero-bg", { scale: 1.12, yPercent: -8, scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero-veil", { opacity: .15, scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero-title", { yPercent: -60, opacity: 0, scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.5 } });
})();

/* ------------------------- Scene 2 · Vine ------------------------- */
(function vine(){
  const sec = document.getElementById("vine");
  const path = document.getElementById("vinePath");
  const len = path.getTotalLength();
  gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
  gsap.to(path, { strokeDashoffset: 0, scrollTrigger: { trigger: sec, start: "top center", end: "bottom center", scrub: 1 } });
  gsap.to(".gold-ring", {
    motionPath: { path: "#vinePath", align: "#vinePath", alignOrigin: [0.5, 0.5], autoRotate: true },
    scrollTrigger: { trigger: sec, start: "top center", end: "bottom center", scrub: 1 }
  });
  document.querySelectorAll(".vine-reveal").forEach(el => {
    gsap.from(el, { opacity: 0, y: 30, scrollTrigger: { trigger: el, start: "top 80%", end: "top 40%", scrub: 1 } });
  });
})();

/* ------------------------- Scene 3 · Bride ------------------------- */
(function bride(){
  const sec = document.getElementById("bride");
  const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: "top top", end: "+=200%", scrub: 1, pin: true } });
  tl.fromTo(".bride-img", { scale: 1.6, filter: "brightness(0.4) blur(6px)" }, { scale: 1, filter: "brightness(1) blur(0px)", duration: 1 }, 0)
    .fromTo(".bride-cap", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4 }, 0.5)
    .to(".bride-cap", { opacity: 0, duration: 0.3 }, 0.9)
    .to(".bride-img", { scale: 1.15, filter: "brightness(0.7)", duration: 1 }, 1);
})();

/* ------------------------- Scene 4 · Invitation handwritten ------------------------- */
(function invitation(){
  const sec = document.getElementById("invitation");
  const paths = sec.querySelectorAll(".hand-path");
  paths.forEach(p => { const l = p.getTotalLength(); gsap.set(p, { strokeDasharray: l, strokeDashoffset: l }); });
  gsap.to(paths, { strokeDashoffset: 0, stagger: 0.4, scrollTrigger: { trigger: sec, start: "top 70%", end: "bottom 30%", scrub: 1 } });
  // dust
  const dust = document.getElementById("dust");
  for (let i = 0; i < 20; i++) {
    const s = document.createElement("span");
    s.style.opacity = Math.random();
    dust.appendChild(s);
  }
  gsap.to(dust, { opacity: 1, scrollTrigger: { trigger: sec, start: "top 60%", end: "top 30%", scrub: 1 } });
})();

/* ------------------------- Scene 5 · Journey ------------------------- */
(function journey(){
  const wrap = document.getElementById("journey-wrap");
  const memories = [
    { t: "the first meeting", d: "a summer afternoon in Lahore, over cardamom chai and shy smiles." },
    { t: "the promise", d: "an evening on the rooftop, marigolds strung across the sky." },
    { t: "the celebration", d: "and now — the night we've been waiting for, together." },
  ];
  memories.forEach((m, i) => {
    const block = document.createElement("div");
    block.className = "memory-block";
    let fps = "";
    for (let k = 0; k < 5; k++) {
      fps += `<div class="footprint" style="transform:translateY(${k%2===0?-10:10}px) rotate(${k%2===0?-15:15}deg)">
        <svg width="28" height="40" viewBox="0 0 28 40">
          <ellipse cx="14" cy="24" rx="10" ry="14" fill="oklch(0.7 0.12 80 / 0.5)"/>
          <ellipse cx="14" cy="6" rx="4" ry="5" fill="oklch(0.7 0.12 80 / 0.5)"/>
        </svg></div>`;
    }
    block.innerHTML = `<div class="footprints">${fps}</div>
      <div class="memory-card" style="transform:rotate(${i%2?2:-1}deg)">
        <div class="t">${m.t}</div>
        <div class="d">${m.d}</div>
        <div class="m">— a memory</div>
      </div>`;
    wrap.appendChild(block);
  });
  document.querySelectorAll(".footprint").forEach((f, i) => {
    gsap.from(f, { opacity: 0, scale: .4, y: 20, duration: .6, delay: (i%2)*.15,
      scrollTrigger: { trigger: f, start: "top 85%", toggleActions: "play none none reverse" } });
  });
  document.querySelectorAll(".memory-card").forEach(c => {
    gsap.from(c, { opacity: 0, y: 60, rotate: -3, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: c, start: "top 80%", toggleActions: "play none none reverse" } });
  });
})();

/* ------------------------- Scene 6 · Polaroids ------------------------- */
(function polaroids(){
  const stage = document.getElementById("polaroid-stage");
  const items = [
    { r: -8, t: "10%", l: "8%",  label: "the dhol arrives", img: "https://i.pinimg.com/736x/1e/ce/ee/1eceee7e5a0352b31a45ad0f6a51caab.jpg" },
    { r: 6,  t: "18%", l: "62%", label: "her cousins",       img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsTBjeX2fF_q16hdbpa3DMRS2Stmyg90c-gdOzK-wwnNAh0YK1fLjdiTP4&s=10" },
    { r: -3, t: "45%", l: "30%", label: "mehndi hands",      img: "https://www.brides.com/thmb/4xqACtxVnorD7YLW6-AunDuctW8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Nav-AJ_13-6b9bfb51921a45ecacdef8fa79434702.jpg" },
    { r: 10, t: "35%", l: "70%", label: "the courtyard",     img: "https://i.pinimg.com/736x/fd/21/b6/fd21b63e471f32d43a16c420df7f05c9.jpg" },
    { r: -6, t: "62%", l: "12%", label: "candles lit",       img: "https://i.pinimg.com/736x/b3/c7/19/b3c71968e23eb0e819f4e35efbd84cd0.jpg" },
    { r: 4,  t: "70%", l: "55%", label: "the dance",         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfpo24XJj61xKEEvE28aEm9wYwAijrRc1Gk1I8EttfUmCcso1DlChzNP5u&s=10" },
  ];
  items.forEach(it => {
    const d = document.createElement("div");
    d.className = "polaroid";
    d.style.cssText = `top:${it.t};left:${it.l};transform:rotate(${it.r}deg)`;
    const imgTag = it.img ? `<img src="${it.img}" alt="${it.label}" loading="lazy" onerror="this.remove()" />` : "";
    d.innerHTML = `<div class="img">${imgTag}<div class="cap">${it.label}</div></div><div class="lbl">${it.label}</div>`;
    stage.appendChild(d);
  });
  const sec = document.getElementById("polaroids");
  document.querySelectorAll(".polaroid").forEach(p => {
    gsap.from(p, { opacity: 0, scale: .7, rotate: 0, duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: sec, start: "top 60%", toggleActions: "play none none reverse" } });
    gsap.to(p, { y: `+=${gsap.utils.random(-20,20)}`, duration: 3 + Math.random()*2, yoyo: true, repeat: -1, ease: "sine.inOut" });
  });
  document.querySelectorAll(".float-flower").forEach((f, i) => {
    gsap.to(f, { yPercent: -50 - i*10, scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: 1 } });
    gsap.to(f, { rotate: 360, duration: 40 + i*8, repeat: -1, ease: "none" });
  });
})();

/* ------------------------- Scene 7 · Countdown ------------------------- */
(function countdown(){
  const grid = document.getElementById("cd-grid");
  grid.innerHTML = `<div class="grid">
    ${["d","h","m","s"].map(k => `<div class="cd-cell"><div class="num" data-k="${k}">00</div><div class="lbl">${k==="d"?"days":k==="h"?"hrs":k==="m"?"min":"sec"}</div></div>`).join("")}
  </div>`;
  const target = new Date("2026-10-10T19:00:00").getTime();
  const tick = () => {
    const diff = Math.max(0, target - Date.now());
    const t = {
      d: Math.floor(diff/86400000),
      h: Math.floor((diff/3600000)%24),
      m: Math.floor((diff/60000)%60),
      s: Math.floor((diff/1000)%60),
    };
    grid.querySelectorAll(".num").forEach(el => el.textContent = String(t[el.dataset.k]).padStart(2,"0"));
  };
  tick(); setInterval(tick, 1000);
  const sec = document.getElementById("countdown");
  gsap.to(".lantern", { y: -20, scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: 1 } });
  gsap.to(".lantern-glow", { opacity: .55, duration: 1.4, yoyo: true, repeat: -1, ease: "sine.inOut" });
  gsap.to(".lantern", { rotate: 2, transformOrigin: "top center", duration: 4, yoyo: true, repeat: -1, ease: "sine.inOut" });
})();

/* ------------------------- Scene 8 · Venue map ------------------------- */
(function venue(){
  const gridG = document.getElementById("mapGrid");
  let g = "";
  for (let i = 0; i < 20; i++) g += `<line x1="${i*40}" y1="0" x2="${i*40}" y2="600" opacity=".4"/>`;
  for (let i = 0; i < 15; i++) g += `<line y1="${i*40}" x1="0" y2="${i*40}" x2="800" opacity=".4"/>`;
  gridG.innerHTML = g;
  const sec = document.getElementById("venue");
  const path = document.getElementById("mapPath");
  const len = path.getTotalLength();
  gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
  gsap.to(path, { strokeDashoffset: 0, scrollTrigger: { trigger: sec, start: "top 70%", end: "bottom 60%", scrub: 1 } });
  gsap.to(".map-svg", { scale: 1.2, scrollTrigger: { trigger: sec, start: "top top", end: "bottom top", scrub: 1 } });
})();

/* ------------------------- Scene 9 · Dress swatches ------------------------- */
(function dress(){
  const swatches = [
    { name: "emerald",     c: "oklch(0.32 0.09 155)" },
    { name: "ivory",       c: "oklch(0.94 0.03 85)" },
    { name: "champagne",   c: "oklch(0.82 0.09 82)" },
    { name: "burnt gold",  c: "oklch(0.65 0.14 65)" },
  ];
  const wrap = document.getElementById("swatches");
  swatches.forEach(s => {
    const col = document.createElement("div");
    col.className = "swatch-col";
    col.innerHTML = `<div class="swatch-dot"></div><div class="swatch-thread"></div>
      <div class="swatch" style="background:linear-gradient(180deg, ${s.c}, color-mix(in oklab, ${s.c} 70%, black))"></div>
      <div class="swatch-name">${s.name}</div>`;
    wrap.appendChild(col);
  });
  const sec = document.getElementById("dress");
  document.querySelectorAll(".swatch").forEach((s, i) => {
    gsap.to(s, { rotate: 3, y: 8, duration: 3 + i*.4, yoyo: true, repeat: -1, ease: "sine.inOut", transformOrigin: "top center", delay: i*.2 });
    gsap.from(s, { y: -100, opacity: 0, duration: 1.2, ease: "power2.out", delay: i*.15,
      scrollTrigger: { trigger: sec, start: "top 70%", toggleActions: "play none none reverse" } });
  });
})();

/* ------------------------- Scene 10 · RSVP ------------------------- */
(function rsvp(){
  const card = document.getElementById("rsvp-card");
  document.getElementById("flip-btn").addEventListener("click", () => card.classList.add("flipped"));
  const form = document.getElementById("rsvp-form");
  const thanks = document.getElementById("rsvp-thanks");
  const wrap = document.getElementById("rsvp-wrap");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.hidden = true; thanks.hidden = false;
    // confetti
    for (let i = 0; i < 60; i++) {
      const p = document.createElement("div");
      const s = 4 + Math.random()*6;
      p.style.cssText = `position:absolute;left:50%;top:50%;width:${s}px;height:${s}px;background:oklch(${0.7+Math.random()*0.25} 0.14 ${65+Math.random()*20});border-radius:${Math.random()>.5?"50%":"0"};pointer-events:none;z-index:50;`;
      wrap.appendChild(p);
      gsap.to(p, { x: (Math.random()-.5)*600, y: (Math.random()-.5)*600 - 100, rotate: Math.random()*720, opacity: 0, duration: 1.6 + Math.random(), ease: "power2.out", onComplete: () => p.remove() });
    }
  });
})();

/* ------------------------- Scene 11 · Closing ------------------------- */
(function closing(){
  const sec = document.getElementById("closing");
  gsap.from(".closing-text", { opacity: 0, y: 40, duration: 2, ease: "power2.out",
    scrollTrigger: { trigger: sec, start: "top 70%" } });
  gsap.from(".closing-seal", { scale: 0, rotate: -180, opacity: 0, duration: 1.6, ease: "power3.out",
    scrollTrigger: { trigger: sec, start: "top 60%" } });
})();
