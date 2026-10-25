(() => {
const IMG = 'assets/img/';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rand = (a, b) => a + Math.random() * (b - a);
const fine = matchMedia('(pointer:fine)').matches;
const toast = msg => { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 1900); };

/* ================= Avo mascot (SVG, gentle expressions) ================= */
const FACE = {
  smile: { m: '<path d="M52 77 Q60 83 68 77" fill="none" stroke="#1B3010" stroke-width="3.2" stroke-linecap="round"/>', b: '' },
  happy: { m: '<path d="M50 76 Q60 85 70 76" fill="none" stroke="#1B3010" stroke-width="3.4" stroke-linecap="round"/>', b: '' },
  meh: { m: '<path d="M53 79 Q57 76 60 79 Q63 82 67 79" fill="none" stroke="#1B3010" stroke-width="3" stroke-linecap="round"/>', b: '<path d="M40 52 L49 54 M80 52 L71 54" stroke="#1B3010" stroke-width="2.6" stroke-linecap="round"/>' },
  oops: { m: '<ellipse cx="60" cy="79" rx="4" ry="4.6" fill="none" stroke="#1B3010" stroke-width="3"/>', b: '<path d="M40 51 L49 54 M80 51 L71 54" stroke="#1B3010" stroke-width="2.6" stroke-linecap="round"/>' }
};
const EYES = '<ellipse class="eL" cx="47" cy="63" rx="4" ry="5" fill="#1B3010"/><ellipse class="eR" cx="73" cy="63" rx="4" ry="5" fill="#1B3010"/><circle cx="48.4" cy="61" r="1.4" fill="#fff"/><circle cx="74.4" cy="61" r="1.4" fill="#fff"/>';
const avoSVG = mood => `<svg class="avo-svg" viewBox="0 0 120 140" width="100%" style="overflow:visible;display:block">
 <path d="M60 4 C90 4 106 42 110 72 C115 114 92 137 60 137 C28 137 5 114 10 72 C14 42 30 4 60 4Z" fill="#3E7A22" stroke="#1B3010" stroke-width="4"/>
 <path d="M60 15 C83 15 96 46 99 73 C103 107 85 126 60 126 C35 126 17 107 21 73 C24 46 37 15 60 15Z" fill="#D2EE74"/>
 <circle cx="60" cy="104" r="15" fill="#8A5A2B" stroke="#1B3010" stroke-width="3"/><ellipse cx="55" cy="99" rx="4" ry="3" fill="#B98250"/>
 <ellipse cx="38" cy="73" rx="5.5" ry="3.4" fill="#FF9EB0" opacity=".7"/><ellipse cx="82" cy="73" rx="5.5" ry="3.4" fill="#FF9EB0" opacity=".7"/>
 <g class="eyes" data-m="${mood}">${EYES}</g><g class="brows">${FACE[mood].b}</g><g class="mouth">${FACE[mood].m}</g></svg>`;
const setMood = (host, mood) => { const e = $('.eyes', host); if (!e || e.dataset.m === mood) return; e.dataset.m = mood; $('.mouth', host).innerHTML = FACE[mood].m; $('.brows', host).innerHTML = FACE[mood].b;
  $('svg', host).animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-6px)' }, { transform: 'translateY(0)' }], { duration: 380, easing: 'ease-out' }); };
const blink = host => $$('.eL,.eR', host).forEach(el => el.animate([{ transform: 'scaleY(1)' }, { transform: 'scaleY(.1)' }, { transform: 'scaleY(1)' }], { duration: 260, easing: 'ease-in-out' }));
setInterval(() => $$('.avo-svg').forEach(s => { if (Math.random() < .5) blink(s); }), 3200);

/* ================= phone prototype ================= */
const SB = `<div class="sb"><span>9:41</span><span class="ic"><svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1" fill="#1F2A18"/><rect x="5" y="5" width="3" height="7" rx="1" fill="#1F2A18"/><rect x="10" y="2.5" width="3" height="9.5" rx="1" fill="#1F2A18"/><rect x="15" y="0" width="3" height="12" rx="1" fill="#1F2A18"/></svg><svg width="16" height="12" viewBox="0 0 16 12"><path d="M8 11.5 5.6 9a3.4 3.4 0 0 1 4.8 0L8 11.5Zm-4.3-4.4L2.3 5.6a8 8 0 0 1 11.4 0l-1.4 1.5a6 6 0 0 0-8.6 0ZM.9 4.2-.5 2.7a12 12 0 0 1 17 0l-1.4 1.5a10 10 0 0 0-14.2 0Z" fill="#1F2A18"/></svg><svg width="26" height="12" viewBox="0 0 26 12"><rect x=".5" y=".5" width="22" height="11" rx="3" fill="none" stroke="#1F2A18" opacity=".4"/><rect x="2" y="2" width="19" height="8" rx="1.8" fill="#1F2A18"/><rect x="24" y="4" width="1.6" height="4" rx=".8" fill="#1F2A18" opacity=".4"/></svg></span></div>`;
const searchIc = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="9" r="6.5"/><path d="m14 14 4 4" stroke-linecap="round"/></svg>`;
const backIc = `<svg width="22" height="20" viewBox="0 0 22 20" fill="none" style="stroke:var(--p-forest)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3 3 7l4 4"/><path d="M3 7h10a6 6 0 0 1 0 12H9"/></svg>`;
const TABS = [['Home', 'i-home', 'home'], ['Recipe', 'i-recipe', 'diy'], ['Punch', 'i-punch', 'punch'], ['Me', 'i-me', 'me']];
const tab = on => `<div class="tabbar">${TABS.map(([t, i, go]) => `<button data-go="${go}" class="${t === on ? 'on' : ''}"><img src="${IMG}${i}.png" alt="">${t}</button>`).join('')}</div>`;
const bar = (w, c, bg) => `<div style="height:5px;border-radius:3px;background:${bg};width:64px;margin-top:6px"><div style="height:100%;width:${w}%;border-radius:3px;background:${c}"></div></div>`;
const week = on => `<div style="display:flex;justify-content:space-around;padding:0 14px;margin-top:6px;font-size:12px;color:#555">${['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => d === on ? `<span style="background:var(--p-forest);color:#fff;border-radius:16px;padding:8px 5px 26px;position:relative">${d}<span style="position:absolute;left:50%;bottom:5px;transform:translateX(-50%);width:16px;height:16px;border-radius:50%;background:#fff"></span></span>` : `<span style="padding-top:8px">${d}</span>`).join('')}</div>`;
const PET = { m: ['var(--p-leaf)', '#DDE6D5'], c: ['var(--p-cal)', '#F1E6DA'], k: ['var(--p-carb)', '#DCE6EF'] };
const flower = (s, st = { m: 0, c: 1, k: 1 }) => `<svg class="flower" width="${s}" height="${s}" viewBox="0 0 120 120"><ellipse class="pm" cx="60" cy="34" rx="22" ry="28" style="fill:${PET.m[st.m ? 0 : 1]};transition:fill .4s"/><path class="pc" d="M60 60 C40 60 22 70 22 88 C22 104 42 106 52 92 Z" style="fill:${PET.c[st.c ? 0 : 1]};transition:fill .4s"/><path class="pk" d="M60 60 C80 60 98 70 98 88 C98 104 78 106 68 92 Z" style="fill:${PET.k[st.k ? 0 : 1]};transition:fill .4s"/><circle cx="60" cy="62" r="5" fill="#fff"/></svg>`;
const meal = (t, n, cal, min, img) => `<div class="ptap" data-go="dish" style="margin:0 20px 14px;background:#fff;border-radius:18px;height:128px;position:relative;padding:16px 18px;box-shadow:0 6px 20px -12px rgba(50,87,33,.3)">
 <div style="font:500 24px/1 -apple-system,sans-serif;color:var(--p-leaf)">${t}</div>
 <div style="font-size:12px;margin-top:10px;padding-bottom:8px;border-bottom:1px solid #EEF0EA;width:170px">${n}</div>
 <div style="display:flex;gap:30px;margin-top:10px"><div><div style="font-size:18px">${cal} <span style="font-size:10px">Cal</span></div><div style="font-size:8px;color:#888">Calories intake</div>${bar(40,'var(--p-leaf)','var(--p-mint2)')}</div><div><div style="font-size:18px">${min} <span style="font-size:10px">Min</span></div><div style="font-size:8px;color:#888">Time spent</div>${bar(40,'#F2C14E','#FBF0D4')}</div></div>
 <img src="${IMG}${img}.png" alt="" style="position:absolute;right:-14px;top:4px;width:122px;height:122px;border-radius:50%;box-shadow:0 0 0 6px #F8F9F5"></div>`;
const pod = (img, name, gi, h, n, dark) => `<div style="display:flex;flex-direction:column;align-items:center;width:96px"><img src="${IMG}g-${img}.png" alt="" style="width:58px;height:58px"><div style="font-size:12px;text-align:center;margin-top:6px;line-height:1.2;height:30px">${name}</div><div style="font-size:9px;color:#8A9482;margin-bottom:6px">GI:${gi}</div><div style="width:100%;height:${h}px;background:${dark ? 'var(--p-forest)' : 'var(--p-forest2)'};color:#fff;font:600 ${dark ? 30 : 22}px/1 -apple-system;display:flex;justify-content:center;padding-top:10px;border-radius:4px 4px 0 0">${n}</div></div>`;
const row = (img, n, gi) => `<div style="display:flex;align-items:center;gap:16px;padding:9px 0"><img src="${IMG}g-${img}.png" alt="" style="width:48px;height:48px"><span style="font-size:15px;flex:1">${n}</span><span style="font-size:14px;color:var(--p-leaf)">GI:${gi}</span></div>`;
const dish = (img, n, c) => `<div class="ptap" data-go="dish" style="background:#fff;border-radius:12px;padding:8px 6px;text-align:center;box-shadow:0 4px 14px -10px rgba(0,0,0,.3)"><img src="${IMG}${img}.png" alt="" style="width:62px;height:62px;margin:0 auto"><div style="font-size:9.5px;line-height:1.25;height:24px;margin-top:4px">${n}</div><div style="background:var(--p-leaf);color:#fff;font-size:8px;border-radius:6px;padding:2px 0;margin:4px 6px 0">${c}cal</div></div>`;
const day = (d, items) => `<div style="font:600 17px/1 -apple-system;color:var(--p-forest);margin:14px 22px 10px">Day${d}</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:0 20px">${items.map(x => dish(...x)).join('')}</div>`;
const task = (k, t, c, bg, w, done, ic) => `<div style="margin:0 20px 12px;background:${bg};border-radius:18px;height:66px;display:flex;align-items:center;padding:0 18px;gap:14px;transition:background .3s"><span style="font-size:22px">${ic}</span><div style="flex:1"><div style="font-size:13px">${t}</div><div style="height:7px;border-radius:4px;background:rgba(255,255,255,.8);margin-top:8px;width:150px"><div class="tbar" style="height:100%;width:${done ? 100 : w}%;border-radius:4px;background:${c};transition:width .5s"></div></div></div><button class="chk" data-task="${k}" data-w="${w}" aria-label="Toggle ${t}" style="width:36px;height:36px;border-radius:50%;background:${done ? c : '#fff'};display:flex;align-items:center;justify-content:center;transition:background .3s"><svg width="16" height="12" viewBox="0 0 16 12"><path d="M1.5 6 6 10.5 14.5 1.5" fill="none" stroke="${done ? '#fff' : '#D5DAD0'}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>`;
const TASKC = { m: 'var(--p-leaf)', c: 'var(--p-cal)', k: 'var(--p-carb)' };

const SCREENS = {
 home: () => `<div class="body">
  <button class="search fill" data-go="gi">GI value of food ${searchIc}</button>
  <div style="margin:18px 22px 10px;font-size:16px;color:var(--p-forest);display:flex;gap:8px;align-items:center"><svg width="18" height="16" fill="none" style="stroke:var(--p-forest)" stroke-width="1.6"><rect x="1" y="8" width="4" height="7"/><rect x="7" y="2" width="4" height="13"/><rect x="13" y="5" width="4" height="10"/></svg>GI Ranking</div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px 0;justify-items:center;padding:0 12px">${['carb','veg','meat','fruit','drink','snack'].map(n => `<img class="ptap" data-go="gi" src="${IMG}gi-${n}.png" alt="${n}" style="width:92px;height:92px">`).join('')}</div>
  <div style="margin:18px 22px 12px;font-size:16px;color:var(--p-forest)">My recipe for today</div>
  ${meal('Breakfast','Keto Croque Madame',885,25,'breakfast')}${meal('Lunch','Keto meatloaf muffins',283,30,'lunch')}
 </div>${tab('Home')}`,
 gi: () => `<div class="body">
  <div class="ttl"><button class="back" data-go="home" aria-label="Back">${backIc}</button>GI Ranking</div>
  <div style="display:flex;justify-content:center;align-items:flex-end;margin-top:14px">${pod('chickpea','Cooked chickpeas','30–35',40,2)}${pod('barley','Barley','28',62,1,1)}${pod('pasta3','Whole wheat pasta','42',30,3)}</div>
  <div style="background:var(--p-mint2);margin:0 18px;border-radius:22px;padding:10px 20px">${row('quinoa','Quinoa',53)}${row('buckwheat','Buckwheat',54)}${row('oats','Traditional rolled oats',55)}${row('whitepasta','White pasta','55–65')}${row('instant','Instant oats',58)}${row('corn','Boiled corn',60)}</div>
 </div>`,
 diy: () => { const cats = []; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) cats.push(`<img class="cat${(i + j) % 4 === 0 ? ' sel' : ''}" src="${IMG}c${i}${j}.png" alt="" style="width:86px;height:86px">`);
  return `<div class="body"><div class="ttl">My Recipe</div><div class="search line">search for recipe ${searchIc}</div>
  <div style="display:flex;gap:12px;margin:16px 20px 0"><span style="padding:7px 16px;border-radius:14px;background:#EEF2EA;font-size:13px">Recipes</span><span style="padding:7px 22px;border-radius:14px;background:var(--p-mint2);color:var(--p-forest);font-size:13px;font-weight:600">DIY</span></div>
  <div style="font-size:12px;color:#7E8777;margin:14px 22px">You can choose more than 1 answer</div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px 0;justify-items:center;padding:0 22px">${cats.join('')}</div>
  <div style="display:flex;justify-content:center;align-items:center;gap:30px;margin:22px 0 20px">
   <button class="dd" data-d="-1" aria-label="Fewer days" style="width:36px;height:36px;border-radius:50%;background:var(--p-mint2);color:var(--p-forest);font:600 24px/34px -apple-system">−</button>
   <div style="text-align:center"><div class="days" style="width:76px;height:42px;border-radius:12px;background:#F0F3EC;font:400 24px/42px -apple-system">7</div><div style="font-size:12px;margin-top:4px">Days</div></div>
   <button class="dd" data-d="1" aria-label="More days" style="width:36px;height:36px;border-radius:50%;background:var(--p-mint2);color:var(--p-forest);font:600 24px/34px -apple-system">+</button></div>
  <button class="pbtn" data-go="menu">Generate a dedicated menu</button></div>${tab('Recipe')}`; },
 menu: () => `<div class="body"><div class="ttl"><button class="back" data-go="diy" aria-label="Back">${backIc}</button>My Recipe</div>
  <div style="margin:0 20px;background:var(--p-mint2);border-radius:16px;display:flex;justify-content:space-around;padding:14px 0;text-align:center">
   <div><div style="font-size:11px;color:#7E8777">Protein</div><div style="font-size:16px;margin-top:6px">200 <span style="font-size:10px">g</span></div></div>
   <div><div style="font-size:11px;color:#7E8777">Total calories</div><div style="font-size:16px;margin-top:6px">1475 <span style="font-size:10px">kcal</span></div></div>
   <div><div style="font-size:11px;color:#7E8777">Days</div><div class="mdays" style="font-size:16px;margin-top:6px">7</div></div></div>
  ${day(1,[['d11','Egg cup',328],['d12','Keto peppers and tortillas',799],['d13','Grilled tuna with salad',348]])}
  ${day(2,[['d21','Spinach salmon egg',368],['d22','Low-carb cabbage casserole',872],['d23','Turkey salad',280]])}
  ${day(3,[['d31','Niçoise salad',380],['d32','Keto breakfast sandwich',354],['d33','Keto Italian meatloaf',741]])}
 </div>${tab('Recipe')}`,
 dish: () => `<div class="body"><div class="search line" style="margin-top:8px">search for recipe ${searchIc}</div>
  <div style="display:flex;gap:20px;margin:18px 22px 0;font-size:14px;color:#555;white-space:nowrap"><span>Recommended</span><span>My recipes</span><span style="color:#1F2A18;font-weight:600;border-bottom:2px solid var(--p-forest);padding-bottom:4px">Salad</span><span>Beef</span><span>Egg</span></div>
  <div style="position:relative;height:270px;margin-top:20px"><div style="position:absolute;left:-60px;top:55px;width:120px;height:160px;border-radius:50%;background:#EEF1EA"></div><div style="position:absolute;right:-60px;top:55px;width:120px;height:160px;border-radius:50%;background:#EEF1EA"></div>
   <img src="${IMG}salad.png" alt="" style="position:absolute;left:50%;top:0;margin-left:-125px;width:250px;height:250px;filter:drop-shadow(0 18px 24px rgba(0,0,0,.18))"></div>
  <div style="text-align:center;font-size:15px;padding:0 30px;line-height:1.4">Turkey salad dressed with lime vinaigrette</div>
  <div style="display:flex;gap:12px;justify-content:center;margin:26px 0 30px">${[['1 serving','M7 3v8a3 3 0 0 0 6 0V3M10 3v18'],['57 Min','M12 7v5l3 2'],['704 Cal','M8 14l3-3 3 3 3-3']].map(([t, p]) => `<div style="width:96px;height:96px;border-radius:18px;background:var(--p-mint2);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;font-size:13px"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" style="stroke:var(--p-forest)" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9" opacity=".35"/><path d="${p}"/></svg>${t}</div>`).join('')}</div>
  <button class="pbtn" data-act="add">Add to my menu</button></div>${tab('Recipe')}`,
 punch: () => `<div class="body">${week('WED')}
  <div class="ptap" data-go="cal" style="display:flex;align-items:center;gap:20px;padding:10px 30px 4px;background:radial-gradient(circle at 30% 50%,var(--p-mint2),transparent 60%)">${flower(150)}
   <div style="font-size:12px;line-height:2.3"><div><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--p-leaf);margin-right:8px"></span>Three meals</div><div><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--p-cal);margin-right:8px"></span>Calorie intake</div><div><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--p-carb);margin-right:8px"></span>Carbohydrate</div></div></div>
  <div style="font-size:15px;color:var(--p-forest);margin:10px 22px 10px">Record weight</div>
  <div style="margin:0 20px 16px;background:#EFF2EB;border-radius:18px;height:62px;display:flex;align-items:center;padding:0 16px;gap:14px"><span style="font-size:20px">⚖︎</span><span class="wt" style="background:#fff;border-radius:12px;padding:5px 12px;font-size:12px">60.5KG</span><button class="wplus" aria-label="Record weight" style="margin-left:auto;width:36px;height:36px;border-radius:50%;background:#fff;color:var(--p-forest);font:500 26px/34px -apple-system">+</button></div>
  <div style="font-size:15px;margin:0 22px 10px">Task list</div>
  ${task('m','Three meals a day',TASKC.m,'var(--p-mint2)',35,0,'🍽')}${task('c','Calorie intake',TASKC.c,'var(--p-cal-t)',60,1,'🔥')}${task('k','Carbohydrate intake',TASKC.k,'var(--p-carb-t)',60,1,'🌾')}
 </div>${tab('Punch')}`,
 cal: () => { const c = ['<span></span>', '<span></span>']; for (let d = 1; d <= 30; d++) c.push(d === 7 || d === 8 ? `<span>${flower(26, { m: 1, c: 1, k: 1 })}</span>` : `<span>${d}</span>`);
  return `<div class="body"><div style="display:flex;justify-content:space-between;padding:4px 18px 6px"><button data-go="punch" aria-label="Back" style="padding:4px">${backIc}</button><svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="stroke:var(--p-forest)" stroke-width="1.6"><circle cx="15" cy="4" r="2.4"/><circle cx="5" cy="10" r="2.4"/><circle cx="15" cy="16" r="2.4"/><path d="m7 9 6-4M7 11l6 4"/></svg></div>
  ${week('WED')}
  <div style="display:flex;align-items:center;gap:6px;padding:20px 26px 0"><img class="tint" src="${IMG}avo.png" alt="" style="width:82px;transform:rotate(-8deg)"><div style="background:var(--p-mint2);color:var(--p-leaf);border-radius:16px 16px 16px 4px;padding:12px 16px;font:600 14px/1.35 -apple-system">Two days in a row.<br>Keep going!</div></div>
  <div style="margin:16px 18px 0;background:#fff;border-radius:16px;border:1px solid #E6E9E2;padding:16px 14px 18px">
   <div style="display:flex;justify-content:space-between;font-size:18px;padding:0 4px">September 2024 › <span style="color:var(--p-forest)">‹ &nbsp;›</span></div>
   <div style="display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-size:9px;color:#9AA194;margin-top:10px">${['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => `<span>${d}</span>`).join('')}</div>
   <div style="display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-size:15px;row-gap:14px;margin-top:12px;align-items:center;justify-items:center">${c.join('')}</div>
   <div style="border-top:1px solid #EEF0EA;margin-top:16px;padding-top:12px;font-size:13px;color:#555">Continuous check-in</div>
   <div style="display:flex;align-items:center;margin-top:12px">${[1,1,0,0,0,0,0].map((v, i) => `${i ? '<span style="flex:1;height:1px;background:var(--p-leaf-t)"></span>' : ''}<span style="width:28px;height:28px;border-radius:${v ? '8px' : '50%'};background:${v ? 'var(--p-leaf)' : '#fff'};border:1.5px solid var(--p-leaf-t);display:flex;align-items:center;justify-content:center">${v ? '<svg width="14" height="10"><path d="M1.5 5 5 8.5 12.5 1.5" fill="none" stroke="#fff" stroke-width="2.2"/></svg>' : ''}</span>`).join('')}</div></div></div>`; },
 me: () => { const pts = [[0,59.9],[1,60.3],[2,60.6],[3,60.6],[4,60.5],[5,60.3],[6,60.8]]; const cx = i => 40 + i * 42, cy = v => 40 + (66 - v) / 14 * 130;
  return `<div class="body"><div style="position:absolute;right:24px;top:8px"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" style="stroke:var(--p-forest)" stroke-width="1.6"><path d="M12 2 20.7 7v10L12 22 3.3 17V7Z"/><circle cx="12" cy="12" r="3"/></svg></div>
  <div style="text-align:center;margin-top:6px"><img src="${IMG}avatar.png" alt="" style="width:82px;height:82px;margin:0 auto"><div style="font:600 22px/1 -apple-system;margin-top:12px">Hi wu!</div><div style="font-size:13px;margin-top:6px">Start your nice day!</div></div>
  <div style="margin:18px 20px 0;border:1.5px solid var(--p-leaf-t);border-radius:18px;padding:8px">
   <div style="background:var(--p-mint2);border-radius:12px;display:flex;justify-content:space-around;padding:12px 0;text-align:center"><div><div style="font-size:11px;color:#7E8777">Weight</div><div style="font-size:16px;margin-top:8px"><span class="wt2">60.5</span><span style="font-size:10px">KG</span></div></div><div><div style="font-size:11px;color:#7E8777">Height</div><div style="font-size:16px;margin-top:8px">168<span style="font-size:10px">cm</span></div></div><div><div style="font-size:11px;color:#7E8777">Basal metabolism</div><div style="font-size:16px;margin-top:8px">1459<span style="font-size:10px">kcal</span></div></div></div>
   <div style="display:flex;justify-content:space-between;font-size:12px;padding:12px 10px 6px"><span>BMI index</span><span>ideal</span></div>
   <div style="display:flex;gap:6px;padding:0 10px 4px;position:relative"><span style="flex:1;height:5px;border-radius:3px;background:#E8EEE2"></span><span style="flex:1;height:5px;border-radius:3px;background:var(--p-leaf-t)"></span><span style="flex:1;height:5px;border-radius:3px;background:#F7C68E"></span><span style="flex:1;height:5px;border-radius:3px;background:#F4B6B0"></span><span style="position:absolute;left:118px;top:-4px;width:12px;height:12px;border-radius:50%;background:#fff;border:2px solid var(--p-leaf)"></span></div>
   <div style="font-size:9px;color:#888;padding-left:114px">22.1</div></div>
  <div style="display:flex;align-items:center;gap:8px;margin:16px 22px 4px;font-size:14px"><span style="width:3px;height:14px;background:var(--p-leaf)"></span>Weight data</div>
  <div style="font-size:9px;color:#888;margin:0 22px 8px">Week 38 of 2024</div>
  <div style="margin:0 20px;background:#F0F2EE;border-radius:16px;height:206px"><svg width="335" height="206" viewBox="0 0 335 206">${[0,1,2,3].map(i => `<line x1="34" x2="320" y1="${30 + i * 48}" y2="${30 + i * 48}" stroke="#DADFD5"/><text x="10" y="${34 + i * 48}" font-size="8" fill="#999">${[72,66,58,52][i]}</text>`).join('')}
   <polyline fill="none" style="stroke:var(--p-leaf)" stroke-width="1.6" points="${pts.map(([i, v]) => `${cx(i)},${cy(v)}`).join(' ')}"/>${pts.map(([i, v]) => `<circle cx="${cx(i)}" cy="${cy(v)}" r="${i === 4 ? 4 : 2.6}" style="fill:${i === 4 ? 'var(--p-forest)' : 'var(--p-leaf)'}"/>`).join('')}
   ${['9/16','9/17','9/18','9/19','9/20','9/21','9/22'].map((d, i) => `<text x="${cx(i) - 9}" y="196" font-size="8" fill="${i === 4 ? '#1F2A18' : '#999'}">${d}</text>`).join('')}</svg></div></div>${tab('Me')}`; }
};
const STEPS = [
 ['home', 'Home', 'Know your food before you eat it.', 'GI search sits front and centre — the question keto dieters ask most. Six photo categories lead to ranked lists, and today\'s menu sits below as a reminder.', 'Tap the search bar or a food'],
 ['gi', 'Home · GI ranking', 'A podium for the lowest GI.', 'The top three low-GI foods get a podium; everything else is listed with its exact GI value, so choices are never a guess.', 'Tap back to return home'],
 ['diy', 'Recipe · DIY', 'Pick what you like, set the days.', 'Choose the ingredients you enjoy and how many days to plan. The app turns preferences into a dedicated keto menu.', 'Select foods, change days, Generate'],
 ['menu', 'Recipe · menu', 'A plan you can actually follow.', 'Day-by-day meals with calories per dish, plus protein and calorie totals for the whole plan.', 'Tap any dish to open it'],
 ['dish', 'Recipe · detail', 'Every dish, at a glance.', 'Servings, cooking time and calories up front — then add it straight to your menu.', 'Tap “Add to my menu”'],
 ['punch', 'Punch', 'Progress you can see bloom.', 'Meals, calories and carbs fill the petals of a three-colour flower. Logging weight is a single tap.', 'Tick the tasks, watch the flower'],
 ['cal', 'Punch · streak', 'Streaks with Avo.', 'Completed days bloom on the calendar while Avo, the mascot, cheers you on.', 'Tap back to the task list'],
 ['me', 'Me', 'Your body, in data.', 'Weight, height, basal metabolism and BMI, with a weekly curve to see the trend — not just the number.', 'Use the tab bar to jump anywhere']
];
function Proto(host, { onChange, only } = {}) {
  const keys = only ? [only] : Object.keys(SCREENS);
  host.innerHTML = `<div class="phone"><div class="island"></div><div class="scr">${SB}${keys.map(k => `<div class="screen" data-s="${k}">${SCREENS[k]()}</div>`).join('')}<div class="ptoast"></div><div class="homebar"></div></div></div>`;
  const scr = $('.scr', host);
  const st = { cur: null, tasks: { m: 0, c: 1, k: 1 }, days: 7, weight: 60.5 };
  const show = (k, silent) => { if (!SCREENS[k] || k === st.cur || !$(`.screen[data-s="${k}"]`, scr)) return;
    $$('.screen', scr).forEach(s => s.classList.toggle('on', s.dataset.s === k)); const b = $(`.screen[data-s="${k}"] .body`, scr); if (b) b.scrollTop = 0;
    st.cur = k; if (!silent && onChange) onChange(k); };
  const ptoast = m => { const t = $('.ptoast', scr); t.textContent = m; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 1500); };
  const paint = () => $$('.screen[data-s="punch"] .flower', scr).forEach(f => { f.querySelector('.pm').style.fill = PET.m[st.tasks.m ? 0 : 1]; f.querySelector('.pc').style.fill = PET.c[st.tasks.c ? 0 : 1]; f.querySelector('.pk').style.fill = PET.k[st.tasks.k ? 0 : 1]; });
  if (!only) scr.addEventListener('click', e => {
    const go = e.target.closest('[data-go]'), chk = e.target.closest('.chk'), cat = e.target.closest('.cat'), dd = e.target.closest('.dd'), act = e.target.closest('[data-act]'), wp = e.target.closest('.wplus');
    if (chk) { const k = chk.dataset.task, on = st.tasks[k] = st.tasks[k] ? 0 : 1;
      chk.style.background = on ? TASKC[k] : '#fff'; chk.querySelector('path').setAttribute('stroke', on ? '#fff' : '#D5DAD0');
      chk.parentElement.querySelector('.tbar').style.width = (on ? 100 : chk.dataset.w) + '%'; paint();
      if (st.tasks.m && st.tasks.c && st.tasks.k) ptoast('All three petals — day complete! 🌸'); return; }
    if (cat) { cat.classList.toggle('sel'); return; }
    if (dd) { st.days = Math.min(30, Math.max(1, st.days + +dd.dataset.d)); $$('.days, .mdays', scr).forEach(x => x.textContent = st.days); return; }
    if (wp) { st.weight = +(st.weight - 0.1).toFixed(1); $$('.wt', scr).forEach(x => x.textContent = st.weight + 'KG'); $$('.wt2', scr).forEach(x => x.textContent = st.weight); ptoast('Weight recorded: ' + st.weight + ' kg'); return; }
    if (act) { ptoast('Added to today\'s menu ✓'); setTimeout(() => show('home'), 900); return; }
    if (go) show(go.dataset.go);
  });
  show(keys[0], true);
  return { show };
}

/* ================= hero: keto basket ================= */
const ht = $('#heroTitle');
$$('span', ht).forEach(s => { s.innerHTML = [...s.textContent].map(c => `<span class="ch">${c}</span>`).join(''); });
$('#ticker').innerHTML = (t => t + t)(['High fat', 'Moderate protein', 'Almost no carbs', 'GI ranking', 'Custom menus', 'Punch-in flower', 'Research-led', 'Avo approved'].map(w => `<span>${w}</span>`).join(''));
// woven pattern on the basket front
$('.b-front g').innerHTML = [150, 182, 214, 246, 278].map((y, i) => `<path d="M0 ${y} Q200 ${y + 22} 400 ${y}"/>`).join('') + Array.from({ length: 13 }, (_, i) => `<path d="M${10 + i * 32} 120 L${30 + i * 28} 300"/>`).join('');
// name, net carbs per typical serving, keto?, serving note
const BASKET = {
  avocado: ['Avocado', 2, 1, 'half an avocado'], salmon: ['Salmon', 0, 1, 'a fillet'], eggs: ['Eggs', 1, 1, 'two eggs'], cheese: ['Cheese', 1, 1, 'a slice'],
  bacon: ['Bacon', 0, 1, 'three rashers'], broccoli: ['Broccoli', 4, 1, 'a cup'], steak: ['Steak', 0, 1, 'a steak'], butter: ['Butter', 0, 1, 'a tablespoon'],
  cauli: ['Cauliflower', 3, 1, 'a cup'], pepper: ['Bell pepper', 3, 1, 'half a pepper'], tomato: ['Tomato', 3, 1, 'one tomato'],
  bread: ['Bread', 24, 0, 'two slices'], banana: ['Banana', 24, 0, 'one banana'], potato: ['Potato', 30, 0, 'one potato'], corn: ['Corn', 17, 0, 'one cob'],
  croissant: ['Croissant', 26, 0, 'one croissant'], apple: ['Apple', 21, 0, 'one apple'], grapes: ['Grapes', 26, 0, 'a cup'], bagel: ['Bagel', 48, 0, 'one bagel'],
  cookie: ['Cookie', 20, 0, 'one large cookie'], cupcake: ['Cupcake', 30, 0, 'one cupcake'], pretzel: ['Pretzel', 45, 0, 'one soft pretzel'], pizza: ['Pizza', 33, 0, 'one slice'], noodles: ['Noodles', 40, 0, 'a cup, cooked']
};
// fixed arrangement on a grid of food "cells" around the basket: [food, column 0–5, row]
// rows: 0–1 above the basket, 's0'–'s2' beside it, 'b' below it
const LAYOUT = [
  ['pretzel', 0, 0, 4], ['grapes', 1, 0, -5], ['cupcake', 2, 0, 3], ['apple', 3, 0, -6], ['bread', 4, 0, 5], ['butter', 5, 0, -4],
  ['corn', 0, 1, -8], ['pepper', 1, 1, 6], ['croissant', 2, 1, -4], ['broccoli', 3, 1, 3], ['cauli', 4, 1, -5], ['banana', 5, 1, 6],
  ['salmon', 0, 's0', 5], ['pizza', 0, 's1', -6], ['steak', 0, 's2', 4],
  ['noodles', 5, 's0', -5], ['avocado', 5, 's1', 6], ['cheese', 5, 's2', -4],
  ['cookie', 0.5, 'b', 6], ['tomato', 1.5, 'b', -4], ['eggs', 2.5, 'b', 3], ['potato', 3.5, 'b', -5], ['bacon', 4.5, 'b', 5]
];
const hero = $('#hero'), fl = $('#floaters'), mob = () => innerWidth < 900, basket = $('#basket'), bzone = $('#bzone');
let tray = null, U = 0;
LAYOUT.forEach(([n, , , r]) => { const d = document.createElement('div'); d.className = 'float'; d.dataset.k = n; d.dataset.cursor = 'drag';
  d.innerHTML = `<img src="${IMG}foods/${n}.webp" alt="${BASKET[n][0]}"><span class="tagk">${BASKET[n][0]}</span>`; d._r0 = r; fl.append(d); });
const home = el => { el._x = 0; el._y = 0; el.style.transform = `rotate(${el._r}deg)`; };
const place = () => {
  const m = mob(); hero.classList.toggle('cluster', !m);
  if (m) {
    if (!tray) { tray = document.createElement('div'); tray.className = 'tray'; bzone.insertBefore(tray, basket); }
    basket.style.width = basket.style.marginBottom = bzone.style.paddingTop = '';
    $$('.float').forEach(el => { if (el.parentNode !== tray) tray.append(el); el.style.left = el.style.top = el.style.width = el.style.height = ''; el._r = el._r0 / 3; if (!el.classList.contains('gone')) home(el); });
    return;
  }
  const col = bzone.getBoundingClientRect().width; U = col / 6;
  const S = U * .9, bw = U * 3.8, bh = bw * .75;
  bzone.style.paddingTop = Math.round(2.08 * U) + 'px'; basket.style.width = bw + 'px'; basket.style.marginBottom = Math.round(1.12 * U) + 'px';
  const hr = hero.getBoundingClientRect(), zr = bzone.getBoundingClientRect(), x0 = zr.left - hr.left, y0 = zr.top - hr.top, bTop = y0 + 2.08 * U;
  LAYOUT.forEach(([n, c, row]) => { const el = $(`.float[data-k="${n}"]`); if (el.parentNode !== fl) fl.append(el);
    const y = row === 'b' ? bTop + bh + .58 * U : typeof row === 'string' ? bTop + (.48 + (+row[1]) * .95) * U : y0 + (row + .5) * U;
    const side = typeof row === 'string' && row[0] === 's';
    el.style.left = (x0 + (c + .5) * U) + 'px'; el.style.top = y + 'px'; el.style.width = el.style.height = (side ? U * .8 : S) + 'px'; el._r = side ? el._r0 / 2.5 : el._r0;
    if (!el.classList.contains('gone')) home(el); });
};
const inBasket = []; let hinted = false;
// generous drop zone: the whole basket (handle included) plus a margin, tested with the pointer or the food's centre
const nearBasket = (x, y) => { const r = basket.getBoundingClientRect(), m = r.width * .11; return x > r.left - m && x < r.right + m && y > r.top - m && y < r.bottom + m * .6; };
const overBasket = (x, y, el) => { if (nearBasket(x, y)) return true; if (!el) return false; const f = el.getBoundingClientRect(); return nearBasket(f.left + f.width / 2, f.top + f.height / 2); };
const renderBasket = (last, removed) => {
  const carbs = inBasket.reduce((t, k) => t + BASKET[k][1], 0), ok = inBasket.filter(k => BASKET[k][2]).length, no = inBasket.length - ok;
  $('#bCarb').textContent = `${carbs} / 20 g`; const f = $('#bFill'); f.style.width = Math.min(100, carbs / 20 * 100) + '%'; f.className = 'bfill' + (carbs > 20 ? ' over' : carbs > 14 ? ' warn' : '');
  $('#bOk').textContent = ok; $('#bNo').textContent = no; $('#bDrop').style.display = inBasket.length ? 'none' : '';
  const fb = $('#bFeed');
  const left = carbs > 20 ? ` <b>Basket total: ${carbs} g — over today's 20 g budget.</b>` : ` ${20 - carbs} g of today's budget left.`;
  if (removed) { fb.className = 'bfeed box'; fb.innerHTML = `<b>↩ ${BASKET[removed][0]} back on the shelf.</b>${inBasket.length ? left : ' The basket is empty.'}`; return; }
  if (!last) { fb.className = 'bfeed box'; fb.innerHTML = "<b>Is it keto?</b> Drag (or tap) a food into the basket — I'll check it against a 20 g daily carb budget. Drag it back out to change your mind."; return; }
  const [n, c, k, serv] = BASKET[last];
  fb.className = 'bfeed box ' + (k ? 'ok' : 'no');
  fb.innerHTML = k ? `<b>✓ ${n} — keto-friendly.</b> About ${c} g net carbs in ${serv}.${left}` : `<b>✗ ${n} — not keto.</b> About ${c} g net carbs in ${serv} — ${c > 20 ? 'more than a whole day\'s allowance on its own' : 'most of a day\'s allowance in one go'}.${left}`;
};
const layBasket = () => $$('#bItems img').forEach((im, i) => { im.style.left = `${20 + (i * 27) % 62}%`; im.style.bottom = `${Math.floor(i / 3) * 16 - 6}%`; im.style.zIndex = i + 1; });
const takeOut = k => { const i = inBasket.indexOf(k); if (i < 0) return; inBasket.splice(i, 1);
  const el = $(`.float[data-k="${k}"]`); el.classList.remove('gone'); home(el);
  el.animate([{ scale: .3, opacity: 0 }, { scale: 1.12, opacity: 1 }, { scale: 1 }], { duration: 420, easing: 'cubic-bezier(.34,1.56,.64,1)' });
  layBasket(); renderBasket(null, k); };
const dropIn = el => { const k = el.dataset.k; if (inBasket.includes(k)) return; inBasket.push(k);
  const br = basket.getBoundingClientRect(), er = el.getBoundingClientRect();
  el._x += br.left + br.width / 2 - (er.left + er.width / 2); el._y += br.top + br.height * .45 - (er.top + er.height / 2);
  el.classList.add('gone'); el.style.transform = `translate(${el._x}px,${el._y}px) rotate(${el._r}deg) scale(.3)`;
  const im = document.createElement('img'); im.src = `${IMG}foods/${k}.webp`; im.alt = BASKET[k][0]; im.dataset.k = k; im.dataset.cursor = 'drag out'; im.draggable = false;
  im.style.setProperty('--r', rand(-14, 14) + 'deg');
  // items already in the basket can be dragged back out (or tapped)
  let sx, sy, moved = false;
  im.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); im.setPointerCapture(e.pointerId); sx = e.clientX; sy = e.clientY; moved = false; im.classList.add('lift'); });
  im.addEventListener('pointermove', e => { if (sx == null) return; const dx = e.clientX - sx, dy = e.clientY - sy; if (Math.hypot(dx, dy) > 4) moved = true; im.style.translate = `${dx}px ${dy}px`; });
  const up = e => { if (sx == null) return; sx = null; im.classList.remove('lift'); im.style.translate = '';
    if (!moved || !nearBasket(e.clientX, e.clientY)) { im.remove(); takeOut(k); } };
  im.addEventListener('pointerup', up); im.addEventListener('pointercancel', () => { sx = null; im.classList.remove('lift'); im.style.translate = ''; });
  $('#bItems').append(im); layBasket(); basket.classList.remove('bump'); void basket.offsetWidth; basket.classList.add('bump'); renderBasket(k); };
const resetBasket = () => { inBasket.length = 0; $('#bItems').innerHTML = ''; $$('.float').forEach(el => el.classList.remove('gone')); place(); renderBasket(); };
$('#bReset').onclick = resetBasket;
$$('.float').forEach(el => {
  let sx, sy, ox, oy, moved = false;
  const set = () => el.style.transform = `translate(${el._x}px,${el._y}px) rotate(${el._r}deg)`;
  el.addEventListener('pointerdown', e => { e.preventDefault(); el.setPointerCapture(e.pointerId); el.classList.remove('back'); el.classList.add('grab'); sx = e.clientX; sy = e.clientY; ox = el._x; oy = el._y; moved = false;
    if (!hinted) { hinted = true; $('#dragHint').animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' }); } });
  let raf = 0, lx = 0, ly = 0;
  el.addEventListener('pointermove', e => { if (!el.classList.contains('grab')) return; lx = e.clientX; ly = e.clientY; if (Math.hypot(lx - sx, ly - sy) > 4) moved = true;
    if (!raf) raf = requestAnimationFrame(() => { raf = 0; el._x = ox + lx - sx; el._y = oy + ly - sy; set(); basket.classList.toggle('hot', overBasket(lx, ly, el)); }); });
  // missed the basket? glide back to its spot on the shelf
  const up = e => { if (!el.classList.contains('grab')) return; el.classList.remove('grab'); basket.classList.remove('hot');
    cancelAnimationFrame(raf); raf = 0; if (moved) { el._x = ox + e.clientX - sx; el._y = oy + e.clientY - sy; set(); }
    if (!moved || overBasket(e.clientX, e.clientY, el)) dropIn(el); else { el.classList.add('back'); home(el); } };
  el.addEventListener('pointerup', up);
  el.addEventListener('pointercancel', () => { el.classList.remove('grab'); basket.classList.remove('hot'); el.classList.add('back'); home(el); });
});
// always open on the composed arrangement — on load, on resize, and when coming back to the page
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(place, 150); });
addEventListener('pageshow', e => { if (e.persisted) resetBasket(); });
place(); renderBasket();
(document.fonts ? document.fonts.ready : Promise.resolve()).then(place);

/* ================= plate game ================= */
const FOODS = [
 ['avocado','Avocado',15,2,2],['salmon','Salmon',13,20,0],['eggs','Eggs',10,12,1],['cheese','Cheese',9,7,1],['butter','Butter',11.5,0,0],
 ['steak','Steak',21,25,0],['bacon','Bacon',10.5,9,.4],['broccoli','Broccoli',.4,2.8,4],['cauli','Cauliflower',.3,2,3],['pepper','Peppers',.3,1,4.5],
 ['tomato','Tomato',.2,1,3],['bread','Bread',2,8,24,1],['banana','Banana',.4,1.3,24,1],['potato','Potato',.2,4,30,1],['corn','Corn',1.5,3.5,17,1]];
const TB = ['#FFF3C4','#E4F5C8','#FFE0E8','#DDEFFF','#F1E8FF'];
const plate = [], tokEl = $('#tokens');
tokEl.innerHTML = FOODS.map(([k, n, , , , carb], i) => `<div class="tok${carb ? ' carb' : ''}" data-k="${k}" data-cursor="drag" style="--tb:${carb ? '#FFE3D1' : TB[i % 5]}" role="button" tabindex="0" aria-label="Add ${n}"><img src="${IMG}foods/${k}.webp" alt=""><span>${n}</span></div>`).join('');
$('#plateAvo').innerHTML = avoSVG('smile');
const pw = $('#plateWrap'), pl = $('#plate');
const overPlate = (x, y) => { const r = pw.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2; return Math.hypot(x - cx, y - cy) < r.width / 2 + 20; };
const renderPlate = () => {
  $$('.on-plate', pw).forEach(e => e.remove());
  plate.forEach((p, i) => { const f = FOODS.find(f => f[0] === p.k); const im = document.createElement('img'); im.className = 'on-plate'; im.src = IMG + 'foods/' + p.k + '.webp'; im.alt = f[1];
    im.style.cssText = `left:${p.x}%;top:${p.y}%;--rot:${p.r}deg;z-index:${i + 2}`; im.dataset.cursor = 'remove'; im.title = 'Remove ' + f[1];
    im.onclick = () => { plate.splice(plate.indexOf(p), 1); renderPlate(); }; pw.append(im); });
  $('#plateEmpty').style.display = plate.length ? 'none' : 'flex';
  $$('.tok').forEach(t => { const c = plate.filter(p => p.k === t.dataset.k).length; t.classList.toggle('used', c >= 2); let x = $('.x', t); if (c) { if (!x) { x = document.createElement('span'); x.className = 'x'; t.append(x); } x.textContent = '×' + c; } else if (x) x.remove(); });
  let F = 0, P = 0, C = 0; plate.forEach(p => { const f = FOODS.find(f => f[0] === p.k); F += f[2]; P += f[3]; C += f[4]; });
  const kF = F * 9, kP = P * 4, kC = C * 4, tot = kF + kP + kC || 1, pf = kF / tot * 100, pp = kP / tot * 100, pc = kC / tot * 100, has = plate.length > 0;
  $('#mF').style.width = (has ? pf : 0) + '%'; $('#mP').style.width = (has ? pp : 0) + '%'; $('#mC').style.width = (has ? pc : 0) + '%';
  $('#pF').textContent = Math.round(has ? pf : 0) + '%'; $('#pP').textContent = Math.round(has ? pp : 0) + '%'; $('#pC').textContent = Math.round(has ? pc : 0) + '%';
  $('#kcal').textContent = `${Math.round(has ? tot : 0)} kcal · ${Math.round(C * 10) / 10} g net carbs`;
  let mood = 'smile', t = 'An empty plate…', d = 'Avo is waiting. Add something tasty.';
  if (has) {
    if (pc > 20) { mood = 'oops'; t = 'Whoa — carb overload!'; d = `${Math.round(pc)}% of calories from carbs. That would knock you out of ketosis.`; }
    else if (pc > 10) { mood = 'meh'; t = 'Almost keto…'; d = `Carbs are ${Math.round(pc)}% — swap the starch for veg or fat to stay under 10%.`; }
    else if (pf < 55) { mood = 'meh'; t = 'Low-carb, not keto yet'; d = `Only ${Math.round(pf)}% fat. Add olive oil, butter or avocado to reach the keto ratio.`; }
    else { mood = 'happy'; t = 'Keto approved! 🎉'; d = `${Math.round(pf)}% fat, ${Math.round(pc)}% carbs — right in the ketogenic sweet spot.`; }
  }
  setMood($('#plateAvo'), mood); $('#vTitle').textContent = t; $('#vText').textContent = d;
};
const addFood = (k, x, y) => { if (plate.filter(p => p.k === k).length >= 2) { toast('Two of those is plenty 😉'); return; }
  if (x == null) { const a = rand(0, Math.PI * 2), r = rand(0, 26); x = 50 + Math.cos(a) * r; y = 50 + Math.sin(a) * r; }
  plate.push({ k, x, y, r: rand(-25, 25) }); renderPlate(); };
$$('.tok').forEach(t => {
  let ghost, moved, sx, sy;
  t.addEventListener('pointerdown', e => { e.preventDefault(); moved = false; sx = e.clientX; sy = e.clientY; t.setPointerCapture(e.pointerId); });
  t.addEventListener('pointermove', e => { if (sx == null) return; if (!moved && Math.hypot(e.clientX - sx, e.clientY - sy) > 6) { moved = true; ghost = $('img', t).cloneNode(); ghost.className = 'ghost-tok'; document.body.append(ghost); }
    if (moved) { ghost.style.left = e.clientX + 'px'; ghost.style.top = e.clientY + 'px'; pl.classList.toggle('hot', overPlate(e.clientX, e.clientY)); } });
  const end = e => { if (sx == null) return; const k = t.dataset.k;
    if (moved) { ghost.remove(); pl.classList.remove('hot'); if (overPlate(e.clientX, e.clientY)) { const r = pw.getBoundingClientRect(); let x = (e.clientX - r.left) / r.width * 100, y = (e.clientY - r.top) / r.height * 100; const dx = x - 50, dy = y - 50, dd = Math.hypot(dx, dy); if (dd > 28) { x = 50 + dx / dd * 28; y = 50 + dy / dd * 28; } addFood(k, x, y); } }
    else addFood(k); sx = null; };
  t.addEventListener('pointerup', end); t.addEventListener('pointercancel', () => { if (ghost) ghost.remove(); sx = null; pl.classList.remove('hot'); });
  t.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); addFood(t.dataset.k); } });
});
$('#plateReset').onclick = () => { plate.length = 0; renderPlate(); };
renderPlate();

/* ================= research bars ================= */
const DATA = [['Dietary recommendations & meal plans', 36.4, 'var(--butter)'], ['Personal keto records', 27.3, 'var(--leaf)'], ['Experiences with side effects', 13.6, 'var(--pink)'], ['Opinions on the keto diet', 9.1, 'var(--sky)'], ['Controversial topics', 6.4, 'var(--lilac)'], ['Product promotions', 4.5, 'var(--apricot)'], ['Academic discussions', 2.7, 'var(--lime)']];
$('#bars').innerHTML = DATA.map(([n, v, c]) => `<div class="bar"><span class="lbl">${n}</span><div class="trk"><div class="fill" data-w="${v / 36.4 * 100}" style="--c:${c}"></div></div><span class="v">${v}%</span></div>`).join('');

/* ================= diary chart ================= */
const DIARY = [['Prep · 2 days','Normal',4.9,6.0,'good','swimming','Stable'],['Keto day 1','Keto',4.9,5.2,'good','—','Hungry'],['Keto day 2','Keto',4.6,5.0,'good','—','—'],['Keto day 3','Keto',4.7,5.1,'good','walk','Mild constipation'],['Keto day 4','Keto',4.7,5.0,'worse','—','Hungry'],['Keto day 5','Keto',4.8,5.1,'moderate','swimming','High strung'],['Keto day 6','Keto',4.7,5.1,'good','—','Mild headache'],['Keto day 7','Keto',4.6,5.0,'poor','—','Low energy'],['Keto day 8','Keto',4.6,4.9,'good','walk','Hungry'],['Keto day 9','Keto',4.5,4.8,'moderate','—','—'],['Keto day 10','Keto',4.6,4.9,'good','walk','Constipation'],['Keto day 11','Keto',4.6,5.0,'poor','—','Stable'],['Keto day 12','Keto',4.5,4.9,'moderate','—','More focused'],['Keto day 13','Keto',4.7,5.0,'good','swimming','Clear focus'],['Keto day 14','Keto',4.6,4.9,'good','—','—'],['Post-keto · 2 days','Normal',4.6,6.0,'poor','walk','—']];
const SLEEP = { good: '😴 Good', moderate: '🙂 Moderate', poor: '😵 Poor', worse: '😣 Worse' }, EX = { swimming: '🏊 Swimming', walk: '🚶 Walk', '—': '🛋 Rest' };
(function diary() {
  const svg = $('#dchart'), W = 1000, H = 300, L = 54, R = 20, T = 24, B = 46, n = DIARY.length;
  const x = i => L + i * (W - L - R) / (n - 1), y = v => T + (6.3 - v) / (6.3 - 4.3) * (H - T - B);
  const line = j => DIARY.map((d, i) => `${i ? 'L' : 'M'}${x(i)},${y(d[j])}`).join(' ');
  svg.innerHTML = `<rect x="${x(.5)}" y="${T - 10}" width="${x(14.5) - x(.5)}" height="${H - T - B + 10}" fill="#E9F7C9" rx="12"/>
   <text x="${x(7.5)}" y="${T + 8}" text-anchor="middle" font-family="DM Mono" font-size="12" letter-spacing="2" fill="#2E5A1B">KETO · 14 DAYS</text>
   ${[4.5, 5, 5.5, 6].map(v => `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="rgba(27,48,16,.15)" stroke-dasharray="4 6"/><text x="${L - 12}" y="${y(v) + 4}" text-anchor="end" font-family="DM Mono" font-size="12" fill="#76816C">${v.toFixed(1)}</text>`).join('')}
   <path d="${line(3)}" fill="none" stroke="#FF9C5B" stroke-width="4" stroke-linejoin="round"/>
   <path d="${line(2)}" fill="none" stroke="#2E5A1B" stroke-width="4" stroke-linejoin="round"/>
   ${DIARY.map((d, i) => `<circle cx="${x(i)}" cy="${y(d[3])}" r="6" fill="#FFF" stroke="#FF9C5B" stroke-width="3"/><circle cx="${x(i)}" cy="${y(d[2])}" r="6" fill="#FFF" stroke="#2E5A1B" stroke-width="3"/><text x="${x(i)}" y="${H - 18}" text-anchor="middle" font-family="DM Mono" font-size="12" fill="#41503A">${i === 0 ? 'Prep' : i === n - 1 ? 'Post' : i}</text>`).join('')}
   <g id="dcur"><line y1="${T - 10}" y2="${H - B}" stroke="#1B3010" stroke-width="2.5"/><circle id="dc1" r="10" fill="#FFD84D" stroke="#1B3010" stroke-width="3"/><circle id="dc2" r="10" fill="#FFD84D" stroke="#1B3010" stroke-width="3"/></g>`;
  const rng = $('#drange'), card = $('#dcard');
  const set = i => { i = Math.max(0, Math.min(n - 1, i)); const d = DIARY[i]; rng.value = i;
    $('#dcur line').setAttribute('x1', x(i)); $('#dcur line').setAttribute('x2', x(i));
    $('#dc1').setAttribute('cx', x(i)); $('#dc1').setAttribute('cy', y(d[2])); $('#dc2').setAttribute('cx', x(i)); $('#dc2').setAttribute('cy', y(d[3]));
    card.innerHTML = `<div class="day"><span class="k">${d[1]} diet</span><b style="margin-top:8px">${d[0]}</b></div>
     <div><span class="k">Blood glucose</span><div class="v">${d[2].toFixed(1)} → ${d[3].toFixed(1)}</div><span class="small">fasting → post-meal</span></div>
     <div><span class="k">Sleep · exercise</span><div class="v">${SLEEP[d[4]]}</div><span class="small">${EX[d[5]]}</span></div>
     <div style="background:${/hungry|headache|energy|constipation|strung/i.test(d[6]) ? 'var(--pink)' : /focus/i.test(d[6]) ? 'var(--lime)' : '#fff'}"><span class="k">How I felt</span><div class="v">${d[6]}</div></div>`; };
  rng.oninput = () => set(+rng.value);
  const pick = e => { const r = svg.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width * W; set(Math.round((px - L) / ((W - L - R) / (n - 1)))); };
  svg.addEventListener('pointermove', e => { if (e.pointerType === 'mouse' || e.buttons) pick(e); });
  svg.addEventListener('pointerdown', pick);
  let tm; $('#dplay').onclick = () => { clearInterval(tm); let i = 0; set(0); $('#dplay').textContent = '■ Playing'; tm = setInterval(() => { i++; if (i >= n) { clearInterval(tm); $('#dplay').textContent = '▶ Replay'; return; } set(i); }, 650); };
  set(0);
})();

/* ================= journey ================= */
(function journey() {
  const cols = [['Need', ['I often lack energy at work', 'Worried about the health effects of excess weight'], 'Find an app for weight loss and energy', .55],
   ['Search', ['Weight-loss app recipes feel complex', 'Too many similar apps to choose from'], 'See positive reviews and high ratings', .4],
   ['Find', ['Search “keto diet”, “healthy diet”, “weight loss”', 'Clear function description and guide'], 'Easy to use', .9],
   ['Use · Learn', ['Clear, concise guide for beginners', 'Clear recipe categories and search'], 'Recipes based on preferences and health goals', .9],
   ['Use · Log', ['Recipes ignore personal taste and nutrition; steps complicated', 'Logging food is tedious'], 'Clear nutrient analysis and progress tracking', .3],
   ['After use', ['Frequent updates, but new features aren\'t practical', 'Nothing new in the recipes'], 'Regular, genuinely useful new features', .85]];
  const W = 1000, H = 220, cw = W / 6, px = i => cw * i + cw / 2 - 12, py = v => 30 + (1 - v) * (H - 60);
  const pts = cols.map((c, i) => [px(i), py(c[3])]); let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], mx = (x0 + x1) / 2; d += ` C${mx},${y0} ${mx},${y1} ${x1},${y1}`; }
  const face = (x, y, v) => { const c = v > .7 ? '#D2EE74' : v < .5 ? '#FFB8CB' : '#FFD84D', m = v > .7 ? `M${x - 8},${y + 4} Q${x},${y + 13} ${x + 8},${y + 4}` : v < .5 ? `M${x - 8},${y + 10} Q${x},${y + 2} ${x + 8},${y + 10}` : `M${x - 7},${y + 7} L${x + 7},${y + 7}`;
    return `<g class="face"><circle cx="${x}" cy="${y}" r="20" fill="${c}" stroke="#1B3010" stroke-width="3"/><circle cx="${x - 7}" cy="${y - 5}" r="2.6" fill="#1B3010"/><circle cx="${x + 7}" cy="${y - 5}" r="2.6" fill="#1B3010"/><path d="${m}" fill="none" stroke="#1B3010" stroke-width="3" stroke-linecap="round"/></g>`; };
  const svg = `<svg class="jsvg" viewBox="0 0 ${W} ${H}" width="100%" style="display:block;overflow:visible">${[.9, .5, .1].map(v => `<line x1="0" x2="${W}" y1="${py(v)}" y2="${py(v)}" stroke="rgba(27,48,16,.15)" stroke-dasharray="4 7"/>`).join('')}
   <path class="curve" d="${d}" fill="none" stroke="#1B3010" stroke-width="3.5"/>${pts.map(([x, y], i) => face(x, y, cols[i][3])).join('')}
   ${[[1, 'Too many choices'], [4, 'Logging is tedious']].map(([i, t]) => `<g transform="translate(${pts[i][0]},${pts[i][1] + 46}) rotate(-3)"><rect x="-74" y="-16" width="148" height="30" rx="15" fill="#FFB8CB" stroke="#1B3010" stroke-width="2.5"/><text text-anchor="middle" y="5" font-family="Bricolage Grotesque" font-weight="700" font-size="14" fill="#1B3010">${t}</text></g>`).join('')}</svg>`;
  const lab = (t, v) => `<div style="position:absolute;left:0;top:${py(v) / H * 100}%;transform:translateY(-50%);font:500 11px/1 var(--mono);letter-spacing:.1em;color:var(--muted)">${t}</div>`;
  $('#journey').innerHTML = `<div class="jcols"><div class="jk">Stage</div>${cols.map(c => `<div class="jst">${c[0]}</div>`).join('')}</div>
   <div class="jcols"><div style="position:relative">${lab('😀 HAPPY', .9)}${lab('😐 NEUTRAL', .5)}${lab('☹️ UNHAPPY', .1)}</div><div style="grid-column:2/-1;padding:10px 0 34px">${svg}</div></div>
   <div class="jcols jrow"><div class="jk">Experience</div>${cols.map(c => `<div class="jexp">${c[1].map(s => `<span>${s}</span>`).join('')}</div>`).join('')}</div>
   <div class="jcols jrow"><div class="jk">Expectation</div>${cols.map(c => `<div class="jwish">${c[2]}</div>`).join('')}</div>`;
})();

/* ================= flip cards ================= */
const FLIPS = [['The app interface is too complex', 'Clear, direct functions', 'Simplified home', 's-5911', 'var(--pink)'], ['“What should I eat?” — every single day', 'Targeted recipe recommendations', 'Custom recipes', 's-5879', 'var(--butter)'], ['Food GI information is rough', 'Keep sugar intake to a minimum', 'Punch-in & visualise', 's-5839', 'var(--sky)']];
$('#flips').innerHTML = FLIPS.map(([p, r, f, img, c], i) => `<div class="flip rv${i ? ' d' + i : ''}" data-cursor="flip" tabindex="0" role="button" aria-label="Flip card: ${p}"><div class="in3">
  <div class="face front" style="background:${c}"><span class="stamp">Pain point 0${i + 1}</span><b>${p}</b><span class="tap">↻ Tap to flip</span></div>
  <div class="face back"><span class="stamp">Requirement → feature</span><p class="req">${r}</p><b>${f}</b><img src="${IMG}${img}.png" alt=""></div></div></div>`).join('');
$$('.flip').forEach(f => { const t = () => f.classList.toggle('open'); f.onclick = t; f.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t(); } }; });
$('#flipAll').onclick = () => { const any = $$('.flip').some(f => !f.classList.contains('open')); $$('.flip').forEach((f, i) => setTimeout(() => f.classList.toggle('open', any), i * 140)); };

/* ================= GI game ================= */
const GI = [['barley','Barley',28,'28'],['chickpea','Cooked chickpeas',32,'30–35'],['pasta3','Whole wheat pasta',42,'42'],['quinoa','Quinoa',53,'53'],['buckwheat','Buckwheat',54,'54'],['oats','Rolled oats',55,'55'],['whitepasta','White pasta',60,'55–65'],['instant','Instant oats',58,'58'],['corn','Boiled corn',60,'60']];
let giPair, giLock = false, giScore = 0, giStreak = 0, giLast = '';
const giOk = (a, b) => a[2] !== b[2] && Math.abs(a[2] - b[2]) >= 2 && !(a[0] === 'whitepasta' && b[2] >= 55) && !(b[0] === 'whitepasta' && a[2] >= 55) && !(a[0] === 'chickpea' && b[0] === 'barley') && !(b[0] === 'chickpea' && a[0] === 'barley');
const giNew = () => { let a, b, key; do { a = GI[Math.floor(Math.random() * GI.length)]; b = GI[Math.floor(Math.random() * GI.length)]; key = [a[0], b[0]].sort().join(); } while (a === b || !giOk(a, b) || key === giLast); giLast = key;
  giPair = [a, b]; giLock = false; $('#giMsg').textContent = 'Pick one 👆';
  $$('.gi-opt').forEach((el, i) => { const f = giPair[i]; el.className = 'box gi-opt'; el.dataset.cursor = 'pick'; el.innerHTML = `<img src="${IMG}gi/${f[0]}.webp" alt="${f[1]}"><div><b>${f[1]}</b><div class="gv">GI ${f[3]}</div></div>`; }); };
$$('.gi-opt').forEach((el, i) => el.onclick = () => { if (giLock) return; giLock = true; const me = giPair[i], other = giPair[1 - i], ok = me[2] < other[2];
  $$('.gi-opt').forEach((o, j) => { o.classList.add('reveal'); if (giPair[j][2] < giPair[1 - j][2]) o.classList.add('right'); });
  if (!ok) el.classList.add('wrong');
  giScore += ok ? 1 : 0; giStreak = ok ? giStreak + 1 : 0; $('#giScore').textContent = giScore; $('#giStreak').textContent = giStreak;
  $('#giMsg').textContent = ok ? (giStreak >= 3 ? `🔥 ${giStreak} in a row — you'd ace the GI ranking!` : `Nice! ${me[1]} (GI ${me[3]}) beats ${other[1]} (GI ${other[3]}).`) : `Not quite — ${other[1]} is lower at GI ${other[3]}.`;
  const pair = giPair; setTimeout(() => { if (giPair === pair) giNew(); }, 2400); });
$('#giNext').onclick = giNew; giNew();

/* ================= IA, wall ================= */
const IA = [['Enter', 'ONBOARD', 'var(--paper)', [['Log in', []], ['Personal information', ['Weight & height', 'Gender & age', 'Goal']]]],
 ['Home', 'TAB 01', 'var(--lime)', [['Food GI ranking', []], ['My daily recipe', ['Breakfast', 'Lunch', 'Dinner']]]],
 ['Recipe', 'TAB 02', 'var(--butter)', [['Recommended menu', []], ['My recipes', ['Create a menu', 'DIY a recipe']]]],
 ['Punch', 'TAB 03', 'var(--sky)', [['Daily task', ['Three meals a day', 'Calorie intake', 'Carb intake']], ['Punching', []]]],
 ['Me', 'TAB 04', 'var(--pink)', [['Personal data', ['Data curve', 'Settings']]]]];
$('#ia').innerHTML = IA.map(([t, s, c, kids]) => `<div class="col"><div class="top" style="--s:${c}"><b>${t}</b><span>${s}</span></div>${kids.map(([k, g]) => `<div class="node"><b>${k}</b>${g.map(x => `<span>${x}</span>`).join('')}</div>`).join('')}</div>`).join('');
const SHOTS = [5883, 5907, 5895, 5887, 5919, 5911, 5939, 5903, 5879, 5851, 5899, 5891, 5847, 5843, 5839];
const imgs = a => a.map(s => `<img src="${IMG}s-${s}.png" alt="" loading="lazy">`).join('');
$('#t1').innerHTML = imgs(SHOTS.slice(0, 8)).repeat(2); $('#t2').innerHTML = imgs(SHOTS.slice(7)).repeat(2);

/* ================= prototypes ================= */
const stepsEl = $('#steps');
stepsEl.innerHTML = STEPS.map(([k, t, h, p, tr], i) => `<div class="step" data-k="${k}"><span class="tag" style="align-self:flex-start">${String(i + 1).padStart(2, '0')} · ${t}</span><h3>${h}</h3><p class="body">${p}</p><span class="try">👆 ${tr}</span></div>`).join('');
const markStep = k => $$('.step', stepsEl).forEach(s => s.classList.toggle('on', s.dataset.k === k));
const proto = Proto($('#proto'), { onChange: markStep }); markStep('home');
const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { proto.show(e.target.dataset.k, true); markStep(e.target.dataset.k); } }), { rootMargin: '-45% 0px -45% 0px' });
$$('.step', stepsEl).forEach(s => so.observe(s));
const cap = k => { const s = STEPS.find(x => x[0] === k); $('#mcap').innerHTML = `<span class="tag">${s[1]}</span><h3>${s[2]}</h3><p class="body">${s[3]}</p>`; $$('#mchips button').forEach(b => b.classList.toggle('on', b.dataset.k === k)); };
$('#mchips').innerHTML = STEPS.map(([k, t]) => `<button data-k="${k}">${t}</button>`).join('');
const mproto = Proto($('#mproto'), { onChange: cap });
$('#mchips').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { mproto.show(b.dataset.k, true); cap(b.dataset.k); b.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' }); } });
cap('home');
Proto($('#playPhone'));

/* ================= colour playground ================= */
const BASE_HUE = 96;
const SW = [['forest', 'Forest', '#325721'], ['leaf', 'Leaf', '#67AD3C'], ['mint', 'Mint', '#F0F7EB'], ['cal', 'Calorie', '#F2A65A'], ['carb', 'Carb', '#7DB8EA']];
const PRESETS = { Original: ['#325721', '#67AD3C', '#F0F7EB', '#F2A65A', '#7DB8EA'], Berry: ['#5B1E47', '#D04F8F', '#FCEFF5', '#FFB347', '#7FC8C2'], Ocean: ['#123E5A', '#2F8FCB', '#EAF5FC', '#FF9F68', '#7BD389'], Sunset: ['#6B2A12', '#E8743B', '#FFF2E8', '#F2C14E', '#9B8AE6'], Matcha: ['#2F3A2A', '#7C9A5E', '#F2F5EC', '#C8B27A', '#9DB4A0'] };
const hex2rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const hue = h => { const [r, g, b] = hex2rgb(h).map(v => v / 255), mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; if (!d) return BASE_HUE; let x = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; return (x * 60 + 360) % 360; };
const lum = h => { const c = hex2rgb(h).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]; };
const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
const hsl2hex = (h, s, l) => { s /= 100; l /= 100; const k = n => (n + h / 30) % 12, a = s * Math.min(l, 1 - l), f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))); return '#' + [f(0), f(8), f(4)].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join(''); };
const pal = {}; const root = document.documentElement.style;
$('#swatches').innerHTML = SW.map(([k, n, h]) => `<label class="sw" data-k="${k}" data-cursor="edit"><div class="chipc"></div><input type="color" value="${h}" aria-label="${n} colour"><b>${n}</b><span></span></label>`).join('');
$('#presets').innerHTML = Object.entries(PRESETS).map(([n, c]) => `<button class="preset" data-p="${n}"><span class="dots">${c.slice(0, 4).map(x => `<i style="background:${x}"></i>`).join('')}</span>&nbsp;${n}</button>`).join('') + `<button class="preset" id="shuffle">🎲 Shuffle</button>`;
const apply = (k, h, quiet) => { pal[k] = h; root.setProperty('--p-' + k, h); const sw = $(`.sw[data-k="${k}"]`); $('.chipc', sw).style.background = h; $('input', sw).value = h; $('span', sw).textContent = h.toUpperCase();
  if (k === 'leaf') root.setProperty('--p-hue', Math.round(hue(h) - BASE_HUE) + 'deg');
  if (k === 'forest') { const cr = contrast(h, '#ffffff'); $('#contrast').innerHTML = `<span class="demo">Button text</span><div><b>${cr.toFixed(1)}:1 ${cr >= 4.5 ? '✅ AA pass' : '⚠️ too low'}</b><br><span>${cr >= 4.5 ? 'White text on Forest is readable for everyone.' : 'Darken Forest — white text needs at least 4.5:1.'}</span></div>`; }
  if (!quiet) $$('.preset').forEach(p => p.classList.remove('on')); };
const applySet = (arr, name) => { SW.forEach(([k], i) => apply(k, arr[i], true)); $$('.preset').forEach(p => p.classList.toggle('on', p.dataset.p === name)); };
$$('.sw input').forEach(inp => inp.addEventListener('input', () => apply(inp.closest('.sw').dataset.k, inp.value)));
$('#presets').addEventListener('click', e => { const b = e.target.closest('.preset'); if (!b) return;
  if (b.id === 'shuffle') { const h = Math.floor(rand(0, 360)); applySet([hsl2hex(h, 48, 22), hsl2hex(h, 55, 46), hsl2hex(h, 60, 95), hsl2hex((h + 150) % 360, 85, 66), hsl2hex((h + 210) % 360, 72, 70)]); toast('New palette — hue ' + h + '°'); }
  else { applySet(PRESETS[b.dataset.p], b.dataset.p); toast(b.dataset.p + ' palette applied'); } });
applySet(PRESETS.Original, 'Original');

/* ================= footer Avo ================= */
$('#footAvo').innerHTML = avoSVG('smile');
const FACTS = ['36.4% of keto forum posts are about recipes & meal plans.', 'Barley tops the app\'s GI ranking at just 28.', 'I lost 2.6 kg in 14 keto days — and met the “keto flu”.', 'Most dieters interviewed stayed on keto for 6–12 months.', 'Keto isn\'t “low-carb” — it\'s close to no carb.', 'Women planned meals more carefully than men before starting.'];
let fi = 0;
$('#fAvo').onclick = () => { const b = $('#bubble'); b.textContent = FACTS[fi++ % FACTS.length]; b.classList.remove('show'); void b.offsetWidth; b.classList.add('show'); blink($('#footAvo'));
  $('#footAvo svg').animate([{ transform: 'rotate(0)' }, { transform: 'rotate(-5deg)' }, { transform: 'rotate(4deg)' }, { transform: 'rotate(0)' }], { duration: 500, easing: 'ease-in-out' });
  clearTimeout(b._t); b._t = setTimeout(() => b.classList.remove('show'), 3600); };
const CREDITS = [['Avocado','Ivar Leidus','CC BY-SA 4.0','Avocado_Hass_-_single_and_halved.jpg'],['Salmon','Tiia Monto','CC BY-SA 4.0','Baked_salmon_2.jpg'],['Cauliflower','Tiia Monto','CC BY-SA 4.0','Cauliflower_2.jpg'],['Red pepper','AntanO','CC BY-SA 4.0','Red_bell_pepper.jpg'],['Tomatoes','Softeis','CC BY-SA 3.0','Tomato_je.jpg'],['Steak','Ɱ','CC BY-SA 3.0','StripSteak.jpg'],['Bread','FranHogan','CC BY-SA 4.0','Fresh_made_bread_05.jpg'],['Bananas','Justus Blümer','CC BY 2.0','Bananas_(white_background).jpg'],['Egg','Paolo Neo','Public domain','Egg_on_white_background.jpg'],['Broccoli, bacon, cheese, butter','Renee Comet / NCI','Public domain','Cheese.jpg'],['Potato','ZooFari','Public domain','Potato_with_sprouts.jpg'],['Corn','Ocdp','CC0','Corn_001.jpg'],['Apple','Abhijit Tembhekar','CC BY 2.0','Red_Apple.jpg'],['Noodles','Tiia Monto','CC BY-SA 3.0','Noodles_2.png'],['Croissant','Petr Kratochvil','CC0','Croissant-Petr_Kratochvil.jpg'],['Pizza','Florian838','CC0','Pizza_Quattro_Stagioni_transparent.png'],['Bagel, cookie','Evan-Amos','Public domain','Bagel-Plain-Alt.jpg'],['Grapes, cupcake, pretzel','Renee Comet','Public domain','Grapes_(2).jpg'],['Barley','Johann Jaritz','CC BY-SA 3.0 AT','Graupen_lose_26022015_8674.jpg'],['Chickpeas','AlixSaz','CC BY-SA 4.0','Ordinary_chickpeas_in_a_ceramic_bowl.jpg'],['Whole wheat penne','Ragesoss','CC BY-SA 4.0','Whole_wheat_penne,_cooked_and_uncooked.jpg'],['Quinoa','Pom²','CC BY-SA 3.0','Quinoa_closeup.jpg'],['Buckwheat','Fumikas Sagisavas','CC0','Yunnan_buckwheat_rice.jpg'],['Rolled oats','Yonygg','CC BY-SA 4.0','Rolled_oats_2.jpg'],['Oatmeal','Bodhi Peace','CC BY-SA 4.0','Cooked_oatmeal_in_bowl_(low_angle).jpg'],['Fusilli','Luigi Chiesa','CC BY-SA 3.0','Fusilli_pasta.jpg']];
$('#credits').innerHTML = CREDITS.map(([f, a, l, file]) => `<a href="https://commons.wikimedia.org/wiki/File:${file}" target="_blank" rel="noopener">${f}</a> — ${a}, ${l}`).join(' · ') + '. All via Wikimedia Commons; backgrounds removed. Adapted CC BY-SA images are shared under the same licence.';

$('#copyMail').onclick = () => { const m = 'jasmingao7@outlook.com'; (navigator.clipboard ? navigator.clipboard.writeText(m) : Promise.reject()).then(() => toast('Email copied ✓'), () => toast(m)); };

/* ================= eyes follow cursor ================= */
addEventListener('pointermove', e => { $$('.avo-svg').forEach(s => { const r = s.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return; const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height * .45), d = Math.hypot(dx, dy) || 1, m = Math.min(4, d / 60); $('.eyes', s).setAttribute('transform', `translate(${dx / d * m},${dy / d * m})`); }); }, { passive: true });

/* ================= cursor ================= */
const cur = $('#cur');
if (fine) { let tx = 0, ty = 0, cx = 0, cy = 0;
  addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; cur.classList.add('show'); const t = e.target.closest('[data-cursor],a,button,.tok,.float,.sw,.flip,.gi-opt,.on-plate'); cur.classList.toggle('big', !!t); cur.textContent = t ? (t.dataset.cursor || '') : ''; }, { passive: true });
  document.addEventListener('pointerleave', () => cur.classList.remove('show'));
  const loop = () => { cx += (tx - cx) * .22; cy += (ty - cy) * .22; cur.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); }; loop(); }

/* ================= reveal, counters, nav ================= */
const countUp = el => { const to = +el.dataset.count, pre = el.dataset.prefix || '', t0 = performance.now(); const tick = t => { const p = Math.min(1, (t - t0) / 1500), e = 1 - Math.pow(1 - p, 3); el.textContent = pre + Math.round(to * e); if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); };
const io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; const el = e.target; el.classList.add('in'); $$('.mark', el).forEach(m => m.classList.add('in')); $$('[data-count]', el).forEach(countUp); $$('.fill', el).forEach(f => f.style.width = f.dataset.w + '%'); io.unobserve(el); }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
$$('.rv, .stats').forEach(el => io.observe(el));
const prog = $('#progress'); const onScroll = () => { prog.style.width = (scrollY / (document.documentElement.scrollHeight - innerHeight) * 100) + '%'; };
addEventListener('scroll', onScroll, { passive: true }); onScroll();
const links = $$('.links a');
const no = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-40% 0px -55% 0px' });
$$('main section[id]').forEach(s => no.observe(s));

/* in-page links: smooth scroll, with a guaranteed jump if the smooth scroll doesn't arrive */
document.addEventListener('click', e => { const a = e.target.closest('a[href^="#"]'); if (!a) return; const id = a.getAttribute('href');
  const t = id === '#top' ? document.body : document.querySelector(id); if (!t) return; e.preventDefault();
  const pad = id === '#top' ? 0 : (parseFloat(getComputedStyle(t).scrollMarginTop) || 80);
  const y = id === '#top' ? 0 : t.getBoundingClientRect().top + scrollY - pad;
  scrollTo({ top: y, behavior: 'smooth' }); history.replaceState(null, '', id);
  setTimeout(() => { if (Math.abs(scrollY - y) > 40) scrollTo({ top: y, behavior: 'instant' }); }, 900); });

/* drag-to-scroll */
$$('.drag').forEach(el => { let down = false, sx = 0, sl = 0;
  el.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; sx = e.clientX; sl = el.scrollLeft; });
  addEventListener('pointerup', () => down = false);
  el.addEventListener('pointermove', e => { if (down) el.scrollLeft = sl - (e.clientX - sx); });
  el.addEventListener('dragstart', e => e.preventDefault()); });
})();
