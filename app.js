const PROCESS = window.__PROCESS__ || [];
const SYSTEMS = {
  "Engine Bay": {eyebrow:"ENGINEERING / RESPONSE", desc:"Clean layouts, thermal surfaces, intake paths, ECU maps and hardware — performance presented with the same visual control as exterior finish.",cards:[["ECU","Calibration, throttle and torque logic."],["THERMAL","Heat management and component protection."],["AIR","Intake path, filtration and flow."]]},
  "Brake System": {eyebrow:"MECHANICAL / CONTROL", desc:"Rotor, pad, caliper, fluid and wheel fitment are treated as one visible performance system.",cards:[["FRICTION","Pad and rotor pairing."],["FLUID","Temperature and pedal consistency."],["FITMENT","Wheel clearance and stance."]]},
  "Surface Stack": {eyebrow:"SURFACE / MATERIAL", desc:"Paint, correction, adhesive, PPF and coating form a layered system. The finish depends on how every layer below behaves.",cards:[["PAINT","Substrate and correction state."],["FILM","Coverage, stretch and edge finish."],["COATING","Hydrophobic and gloss layer."]]},
  "Wheel Lab": {eyebrow:"FITMENT / FORM", desc:"Wheel diameter, width, offset, finish and brake visibility change the entire visual balance of a build.",cards:[["STANCE","Ride height and visual weight."],["OFFSET","Arch relationship and clearance."],["FINISH","Gloss, satin, machined or forged."]]},
  "Tool Wall": {eyebrow:"TOOLS / CRAFT", desc:"A trusted studio exposes its process: inspection lighting, blades, squeegees, polishers, heat tools and measurement.",cards:[["INSPECT","Light reveals defects and edges."],["APPLY","Squeegee, slip, heat and technique."],["VERIFY","Repeatable final inspection."]]}
};
const WORLDS = {
  PPF:{eyebrow:"SURFACE PROTECTION",desc:"Paint protection film built around vehicle geometry: edges, curves, impact zones and a finish intended to read like paint rather than an added layer.",meta:[["FROM","₹65K"],["FINISH","Gloss / matte"],["SYSTEM","07 stages"]],subs:[["Full Body","Maximum coverage","Full body protection with wrapped edges wherever geometry allows."],["Front End","Impact focus","Bonnet, bumper, fenders, mirrors and high-impact areas."],["Custom","Panel strategy","Targeted protection and special finish planning."]],features:["Panel geometry mapped","Edge strategy confirmed","Finish inspection / handover"],img:"/assets/real-car-after.jpg"},
  Ceramic:{eyebrow:"FINISH / HYDROPHOBICS",desc:"Ceramic systems focus on gloss behavior, easier maintenance and surface character while keeping the underlying correction visible.",meta:[["FROM","₹25K"],["LAYERS","1–multi"],["CARE","maintenance"]],subs:[["Single Layer","Clean entry","A focused coating package for corrected, well-prepared paint."],["Multi Layer","Depth system","Layered protection and richer surface behavior."],["Maintenance","Keep it sharp","Decon, top-up and inspection for existing coating."]],features:["Paint correction pathway","Panel preparation","Coating / cure / final light"],img:"/assets/real-car-before.jpg"},
  Performance:{eyebrow:"RESPONSE / HARDWARE",desc:"Performance work is framed around measurable changes: mapping, intake, exhaust, braking and supporting hardware.",meta:[["MODE","ECU / hardware"],["OUTPUT","build sheet"],["PATH","staged"]],subs:[["ECU","Map response","Calibration, throttle logic and software-led changes."],["Hardware","Physical system","Intake, cooling, braking and supporting parts."],["Build Sheet","One record","A structured roadmap for the vehicle and future upgrades."]],features:["Baseline / goals recorded","Compatibility checked","Build sheet maintained"],img:"/assets/real-car-after.jpg"},
  Aesthetics:{eyebrow:"FORM / CHARACTER",desc:"Exterior, interior and lighting changes are coordinated as one design language rather than accumulated accessories.",meta:[["WORLD","exterior"],["WORLD","interior"],["WORLD","lighting"]],subs:[["Exterior","Stance / contrast","Trim, aero, wheel and finish choices."],["Interior","Touch / atmosphere","Materials, detailing, controls and cabin tone."],["Lighting","Night identity","Ambient and exterior lighting integration."]],features:["Visual direction first","Compatibility and fitment","Installation / finish control"],img:"/assets/real-car-before.jpg"}
};
const GARAGE = [
{id:"r8-studio-spec",name:"R8 Studio Spec",year:"2023",city:"Kochi",kind:"Listed",price:"Enquire",desc:"High-gloss black studio car prepared as a premium curated listing.",image:"/assets/real-car-after.jpg"},
{id:"black-surface-gt",name:"Black Surface GT",year:"2024",city:"Bengaluru",kind:"Build",price:"Build slot",desc:"A finish-first performance build with visual and protection work bundled.",image:"/assets/real-car-after.jpg"},
{id:"stealth-v10",name:"Stealth V10",year:"2022",city:"Chennai",kind:"Source",price:"On request",desc:"Source request for a dark-spec exotic with inspection and transport routing.",image:"/assets/real-car-before.jpg"},
{id:"studio-911",name:"Studio 911",year:"2025",city:"Kerala",kind:"Partner",price:"Partner lead",desc:"Collaborator-managed car entering the network for finish and media support.",image:"/assets/real-car-after.jpg"},
{id:"night-geometry",name:"Night Geometry",year:"2024",city:"Kochi",kind:"Build",price:"Enquire",desc:"A dark aesthetic package with wheel, light and surface direction.",image:"/assets/real-car-before.jpg"},
{id:"surface-archive-01",name:"Surface Archive 01",year:"2023",city:"India",kind:"Listed",price:"Curated",desc:"Prototype inventory card ready to be driven by a database record.",image:"/assets/real-car-after.jpg"}
];
function $(s){return document.querySelector(s)}
function $$(s){return [...document.querySelectorAll(s)]}

// Hero reveal
(function(){const layer=$('#revealLayer'); if(!layer)return; let target={x:innerWidth*.5,y:innerHeight*.61}, smooth={...target}; const set=(x,y)=>{target={x,y}}; addEventListener('mousemove',e=>set(e.clientX,e.clientY),{passive:true}); addEventListener('touchmove',e=>{const t=e.touches[0];if(t)set(t.clientX,t.clientY)},{passive:true}); const tick=()=>{smooth.x+=(target.x-smooth.x)*.1;smooth.y+=(target.y-smooth.y)*.1;layer.style.setProperty('--rx',smooth.x+'px');layer.style.setProperty('--ry',smooth.y+'px');requestAnimationFrame(tick)};tick()})();

// Mobile menu
(function(){const b=$('#menuButton'),m=$('#mobileMenu'); if(!b||!m)return;b.addEventListener('click',()=>{m.classList.toggle('open'); document.body.classList.toggle('lock',m.classList.contains('open')); b.textContent=m.classList.contains('open')?'×':'☰'}); m.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{m.classList.remove('open');document.body.classList.remove('lock');b.textContent='☰'}));})();

// Process stage
(function(){if(!PROCESS.length||!$('#stageImage'))return; let i=0; function paint(n){i=n; const s=PROCESS[n]; $('#stageImage').src=s.image;$('#stageImage').alt='7Theory '+s.name+' stage';$('#stageTag').textContent=s.name.toUpperCase()+' / '+s.small.toUpperCase();$('#stageIndex').textContent=String(n+1).padStart(2,'0')+' / 07';$('#stageName').textContent=s.name;$('#stageDesc').textContent=s.desc;$('#stageMetric').textContent=s.metric;$('#stageTransition').textContent=String(n+1).padStart(2,'0')+':07:00';$('#stageChips').innerHTML=s.tags.map((t,j)=>'<span class="chip '+(j===0?'active':'')+'">'+t+'</span>').join('');$('#stageMicro').innerHTML=s.micro.map(x=>'<div><strong>'+x[0]+'</strong><span>'+x[1]+'</span></div>').join(''); $$('.stage-btn').filter(x=>x.dataset.stage!==undefined).forEach((b,j)=>b.classList.toggle('active',j===n));} $$('.stage-btn[data-stage]').forEach((b)=>b.addEventListener('click',()=>paint(Number(b.dataset.stage)))); paint(0)})();

// Systems
(function(){const btns=$$('.system-btn'); if(!btns.length)return; function paint(name){const s=SYSTEMS[name];btns.forEach(b=>b.classList.toggle('active',b.dataset.system===name));$('#systemEyebrow').textContent=s.eyebrow;$('#systemName').textContent=name;$('#systemDesc').textContent=s.desc;$('#systemCards').innerHTML=s.cards.map(c=>'<div class="card"><b class="mono tiny">'+c[0]+'</b><p>'+c[1]+'</p></div>').join('')}btns.forEach(b=>b.addEventListener('click',()=>paint(b.dataset.system)));paint('Engine Bay')})();

// Service worlds
(function(){const btns=$$('.world-btn');if(!btns.length)return;function paint(name){const w=WORLDS[name];btns.forEach(b=>b.classList.toggle('active',b.dataset.world===name));$('#worldImage').src=w.img;$('#worldName').textContent=name;$('#worldEyebrow').textContent=w.eyebrow;$('#worldDesc').textContent=w.desc;$('#worldMeta').innerHTML=w.meta.map(x=>'<div>'+x[0]+'<b>'+x[1]+'</b></div>').join('');$('#subTabs').innerHTML=w.subs.map((x,i)=>'<button class="pill '+(i===0?'active':'')+'" data-sub="'+i+'">'+x[0]+'</button>').join('');$('#worldFeatures').innerHTML=w.features.map((x,i)=>'<div><b>0'+(i+1)+' '+x+'</b><span>7T / '+name+'</span></div>').join(''); function sub(i){const x=w.subs[i];$('#worldSubTitle').textContent=x[0]+' / '+x[1];$('#worldSubDesc').textContent=x[2];$$('#subTabs .pill').forEach((b,j)=>b.classList.toggle('active',j===i))} $$('#subTabs .pill').forEach(b=>b.addEventListener('click',()=>sub(Number(b.dataset.sub))));sub(0)} paint('PPF');btns.forEach(b=>b.addEventListener('click',()=>paint(b.dataset.world)))})();

// Garage
(function(){
  const grid=$('#garageGrid'), search=$('#garageSearch'), clear=$('#clearSearch'), filters=$$('#garageFilters .pill');
  if(!grid) return;
  let filter='All', query='';
  function render(){
    const rows=GARAGE.filter(c => (filter==='All'||c.kind===filter) && (`${c.name} ${c.year} ${c.city} ${c.kind}`).toLowerCase().includes(query.toLowerCase()));
    grid.innerHTML = rows.map((c,i)=>`
      <article class="garage-card">
        <div class="garage-image"><img src="${c.image}" alt="${c.name}"><span class="badge">${c.kind}</span></div>
        <div class="body">
          <div class="meta"><span>${c.year} / ${c.city}</span><span>0${i+1}</span></div>
          <h3>${c.name}</h3><p>${c.desc}</p>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:15px"><span class="eyebrow">${c.price}</span><button class="pill record" data-id="${c.id}" type="button">Open record ↗</button></div>
        </div>
      </article>`).join('') || '<div class="panel" style="padding:24px">No records match this filter.</div>';
    $$('.record').forEach(b=>b.addEventListener('click',()=>{
      const c=GARAGE.find(x=>x.id===b.dataset.id); if(!c) return;
      $('#recordTitle').textContent=c.name; $('#recordMeta').textContent=`${c.year} / ${c.city} / ${c.kind}`; $('#recordDesc').textContent=c.desc;
      $('#recordModal').classList.add('open');
    }));
  }
  filters.forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;filters.forEach(x=>x.classList.toggle('active',x===b));render()}));
  search.addEventListener('input',()=>{query=search.value;render()});
  clear.addEventListener('click',()=>{search.value='';query='';render()});
  render();
})();

// Quote calculator + submit
(function(){
  const form=$('#quoteForm'); if(!form) return;
  const total=$('#estimateTotal'), lines=$('#priceLines'), resp=$('#quoteResponse');
  const money=n=>'₹ '+Number(n).toLocaleString('en-IN');
  function calc(){
    let t=0; let html='';
    $$('#quoteForm input[type=checkbox][data-price]').forEach(b=>{
      const p=Number(b.dataset.price), on=b.checked; if(on) t+=p;
      html += `<div class="price-line"><span>${b.value}</span><b>${on?money(p):'—'}</b></div>`;
    });
    total.textContent=money(t); lines.innerHTML=html;
  }
  form.querySelectorAll('input[type=checkbox]').forEach(x=>x.addEventListener('change',calc));
  calc();
  form.addEventListener('submit',async e=>{
    e.preventDefault(); resp.className='response'; resp.textContent='Sending…';
    const data=Object.fromEntries(new FormData(form).entries());
    data.services=$$('input[name=services]:checked').map(x=>x.value);
    try{
      const r=await fetch('/api/quote',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(data)});
      const j=await r.json(); if(!r.ok||!j.ok) throw new Error(j.message||'Unable to route enquiry');
      resp.className='response ok'; resp.textContent='Enquiry received. '+(j.message||'The studio can now follow up from the structured brief.');
      form.reset(); calc();
    }catch(err){resp.className='response err'; resp.textContent=err.message||'Network error. Please call or WhatsApp the studio.';}
  });
})();
