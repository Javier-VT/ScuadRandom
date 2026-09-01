(function(){
 const key=document.body.dataset.bossKey, data=window.SR_BOSS_DATA?.[key];
 if(!data)return;
 const q=s=>document.querySelector(s);
 const current=(typeof obtenerFaseActual==='function')?obtenerFaseActual():3;
 document.body.classList.add(`phase-tone-${data.phase}`); document.body.dataset.requiredPhase=data.phase;
 if(data.phase>current){
   const main=q('.site-main');
   if(main) main.innerHTML=`<section class="locked-boss-page phase-tone-${data.phase}"><span>EXPEDIENTE BLOQUEADO</span><h1>Contenido de Fase ${data.phase}</h1><p>Esta guía se revelará cuando el Evento alcance la fase correspondiente.</p><a class="hero-btn" href="enemigos.html">Volver a Amenazas</a></section>`;
   return;
 }
 document.title=`${data.name} - Archivo de Amenazas SR`;
 q('#boss-name').textContent=data.name; q('#boss-role').textContent=data.role; q('#boss-desc').textContent=data.desc;
 q('#boss-phase').textContent=`FASE ${data.phase}`; q('#boss-kind').textContent=data.kind.toUpperCase(); q('#boss-hp').textContent=data.hp; q('#boss-location').textContent=data.location;
 const img=q('#boss-icon'); if(data.inv){img.src=`img/items/${data.inv}`;img.alt=`Invocador de ${data.name}`;} else {img.hidden=true;q('#boss-monogram').hidden=false;q('#boss-monogram').textContent=data.name==='Dragona Ascendente'?'DA':'DC';}
 function card(a,i,desp=false){return `<article class="attack-guide ${desp?'is-desperate':''}"><div class="attack-index">${String(i+1).padStart(2,'0')}</div><div class="pattern-viz viz-${a[4]||'target'}" aria-label="Diagrama aproximado del patrón"><i></i><b></b><em></em></div><div class="attack-copy"><span class="attack-tier">${desp?'MODO DESESPERADO':'PATRÓN'}</span><h3>${a[0]}</h3><div class="dodge-call">${a[1]}</div><p><strong>Qué verás:</strong> ${a[2]}</p><p><strong>Qué hacer:</strong> ${a[3]}</p></div></article>`}
 q('#boss-attacks').innerHTML=data.attacks.map((a,i)=>card(a,i,false)).join('');
 const ds=q('#desesperado')||q('#desperate-section'); if(ds&&data.desperate_attacks?.length){ds.hidden=false;q('#desperate-attacks').innerHTML=data.desperate_attacks.map((a,i)=>card(a,i,true)).join('');}
 const nav=Object.entries(window.SR_BOSS_DATA).filter(([,b])=>b.phase<=current).map(([k,b])=>`<a href="boss-${k}.html" class="boss-mini-link ${k===key?'active':''}"><span>F${b.phase}</span>${b.name}</a>`).join(''); q('#boss-directory').innerHTML=nav;
})();
