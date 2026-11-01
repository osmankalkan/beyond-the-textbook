import {marked} from './vendor/marked.js';
import {cooling, halfLife, targetTime, eulerCooling, building, buildingMetrics} from './models.js';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const fmt=(n,d=1)=>Number(n).toLocaleString('tr-TR',{minimumFractionDigits:d,maximumFractionDigits:d});
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let storageOK=true;
function readStore(key,fallback){try{return JSON.parse(localStorage.getItem('denklem-v1-'+key))??fallback;}catch{storageOK=false;return fallback;}}
function saveStore(key,value){try{localStorage.setItem('denklem-v1-'+key,JSON.stringify(value));return true;}catch{storageOK=false;return false;}}
let progress=readStore('progress',{lesson:false,solved:[]});
if(!progress || typeof progress!=='object' || !Array.isArray(progress.solved))progress={lesson:false,solved:[]};
progress.solved=progress.solved.filter(n=>Number.isInteger(n)&&n>=0&&n<4);
let mode='cooling',view='lab',time=20,playing=false,frame=0,lastStamp=0,showEuler=false;
let cp={ambient:20,initial:100,k:Math.log(2)/20,h:5};
let bp={tau:4,ratio:1,period:24,amplitude:12,setpoint:22};
const maxTime=()=>mode==='cooling'?120:72;
const unit=()=>mode==='cooling'?'dk':'sa';
const toast=message=>{clearTimeout(toast.timer);$('#toast').textContent=message;$('#toast').hidden=false;toast.timer=setTimeout(()=>$('#toast').hidden=true,4000);};
const icons={cup:`<svg viewBox="0 0 170 105" aria-hidden="true"><path d="M65 8q-7 8 0 15t0 15M83 2q-7 8 0 15t0 15M101 8q-7 8 0 15t0 15" fill="none" stroke="#c2cbb9" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="83" cy="89" rx="43" ry="5" fill="#e9ede1"/><path d="M112 49h10q15 0 11 14t-21 12" fill="none" stroke="#a8b998" stroke-width="4"/><path d="M49 45h65v25q0 17-21 17H70q-21 0-21-17Z" fill="#e0e9d8" stroke="#a8b998" stroke-width="1.4"/><ellipse cx="81.5" cy="45" rx="32.5" ry="6" fill="#f1e9db" stroke="#a8b998" stroke-width="1.3"/><ellipse cx="82" cy="45" rx="27" ry="3.5" fill="#a99878" opacity=".5"/><text id="physical-value" x="82" y="69" fill="#637e51" text-anchor="middle" font-size="11" font-family="Georgia">60 °C</text></svg>`,house:`<svg viewBox="0 0 170 105" aria-hidden="true"><ellipse cx="85" cy="92" rx="53" ry="4" fill="#e9ede1"/><path d="M40 48L85 13l45 35M50 42v47h70V42" fill="#e8eedf" stroke="#9eaf8c" stroke-width="2" stroke-linejoin="round"/><path d="M106 26V14h9v20" fill="#d4dfc5" stroke="#9eaf8c" stroke-width="1.5"/><rect x="61" y="50" width="17" height="17" rx="2" fill="#f3e4bd" stroke="#b7bd96"/><rect x="94" y="50" width="15" height="17" rx="2" fill="#f3e4bd" stroke="#b7bd96"/><text id="physical-value" x="85" y="83" fill="#637e51" text-anchor="middle" font-size="11" font-family="Georgia">22 °C</text></svg>`};
function control(id,label,min,max,step,value,suffix,digits=0){return `<div class="control" id="control-${id}"><label for="param-${id}">${label}<output id="output-${id}" for="param-${id}">${fmt(value,digits)} <small>${suffix}</small></output></label><input type="range" id="param-${id}" data-param="${id}" min="${min}" max="${max}" step="${step}" value="${value}" aria-label="${label}"><div class="range-ends"><span>${fmt(min,digits)} ${suffix}</span><span>${fmt(max,digits)} ${suffix}</span></div></div>`;}
const math=(inside)=>`<math xmlns="http://www.w3.org/1998/Math/MathML">${inside}</math>`;
function setupMode(){
  stop();$('#physical-illustration').innerHTML=icons[mode==='cooling'?'cup':'house'];
  $$('[data-mode]').forEach(b=>{b.classList.toggle('selected',b.dataset.mode===mode);b.setAttribute('aria-pressed',b.dataset.mode===mode);});
  $('#time').max=maxTime();$('#time').step=0.5;time=Math.min(time,maxTime());
  $('#lab-source').textContent=mode==='cooling'?'Örnek 3.1 · s.87–88':'Örnek 3.2 · s.88–90';
  $('#controls').innerHTML=mode==='cooling'?[
    control('initial','Başlangıç sıcaklığı',10,120,1,cp.initial,'°C'),control('ambient','Ortam sıcaklığı',0,40,1,cp.ambient,'°C'),
    control('k','Tepki katsayısı · k',0.005,0.12,0.0001,cp.k,'dk⁻¹',4),control('h','Euler adımı · h',0.5,10,0.5,cp.h,'dk',1)
  ].join(''):[control('ratio','Geri besleme · K₂/K₁',0,5,0.01,bp.ratio,'',2),control('tau','Isıl zaman · c/K₁',1,12,0.5,bp.tau,'sa',1),control('amplitude','Dış sıcaklık genliği',1,20,0.5,bp.amplitude,'°C',1),control('period','Dış sıcaklık periyodu',6,48,1,bp.period,'sa')].join('');
  if(mode==='cooling')$('#control-h').hidden=!showEuler;
  $('#euler-option').hidden=mode!=='cooling';
  $('#preset').textContent=mode==='cooling'?'↺ Kitaptaki örneği yükle':'↺ Kitaptaki sınır koşulu';
  $('#plot-kicker').textContent=mode==='cooling'?"NEWTON'UN SOĞUMA YASASI":'ENERJİ DENGESİ VE GERİ BESLEME';
  $('#plot-title').textContent=mode==='cooling'?'Sıcaklığın zamana yolculuğu':'Bir binanın ısıl tepkisi';
  $('#legend').innerHTML=mode==='cooling'?'<span><i></i> Cismin sıcaklığı</span><span class="ambient"><i></i> Ortam sıcaklığı</span><span class="euler" id="euler-legend"><i></i> Euler yaklaşımı</span>':'<span><i></i> Bina sıcaklığı</span><span class="euler"><i></i> Dış sıcaklık</span><span class="ambient"><i></i> Hedef: 22 °C</span>';
  if(mode==='cooling')$('#euler-legend').hidden=!showEuler;
  $('#equation').innerHTML=mode==='cooling'?math('<mfrac><mrow><mi>d</mi><mi>T</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>=</mo><mo>−</mo><mi>k</mi><mo>(</mo><mi>T</mi><mo>−</mo><msub><mi>T</mi><mi>m</mi></msub><mo>)</mo>'):math('<mi>τ</mi><mfrac><mrow><mi>d</mi><mi>θ</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>+</mo><mo>(</mo><mn>1</mn><mo>+</mo><mi>r</mi><mo>)</mo><mi>θ</mi><mo>=</mo><msub><mi>T</mi><mn>1</mn></msub><mi>sin</mi><mo>(</mo><mi>ω</mi><mi>t</mi><mo>)</mo>');
  $('#equation-explanation').textContent=mode==='cooling'?'Değişim hızı, ortamla aradaki sıcaklık farkıyla orantılıdır.':'θ = bina sıcaklığı − hedef sıcaklık; r = K₂/K₁, τ = c/K₁.';
  $('#discovery-question').textContent=mode==='cooling'?"k değerini iki katına çıkarırsan ne olur?":'Binanın sıcaklığını nasıl daha kararlı tutarsın?';
  $('#discovery-intro').textContent=mode==='cooling'?'Önce tahminini yap. Sonra sürgüyü değiştirip eğriyi izle.':'Geri besleme oranını artır. İç ve dış sıcaklıkların salınımını karşılaştır.';
  $('#discovery-hint').textContent=mode==='cooling'?'Sıcaklık farkı e⁻ᵏᵗ ile değişiyor. k iki katına çıkınca aynı azalma yarı zamanda olur. Denge sıcaklığı değişmez.':'Kalıcı genliğin paydasında (1+r)² var. Geri besleme arttıkça iç sıcaklığın salınımı küçülür. Isıl zaman sabiti de bu tepkiyi etkiler.';
  $('#discovery-details').open=false;
  $('#lab-footnote').textContent=mode==='cooling'?'Model: sabit ortam, sabit k ve cisim içinde tek sıcaklık. Hedef süre, başlangıçtan itibaren 30 °C’ye ilk erişimdir; ortam sıcaklığına tam erişim sonlu sürede gerçekleşmez.':'Model: sabit katsayılar ve doğrusal ısıtıcı tepkisi. Dış sıcaklık ortalaması 10 °C, hedef 22 °C; başlangıçta bina hedef sıcaklıktadır. Genlik ve gecikme kartları kalıcı rejimi gösterir.';
  renderLab();
}
function metric(label,value,suffix,description,symbol){return `<div class="metric"><p class="eyebrow">${label}</p><span class="metric-symbol">${symbol}</span><strong>${value}<small>${suffix}</small></strong><p>${description}</p></div>`;}
function renderLab(){
  $('#time').value=time;$('#time-output').textContent=fmt(time,1)+' '+unit();
  const value=mode==='cooling'?cooling(time,cp):building(time,bp);
  $('#physical-value').textContent=fmt(value,1)+' °C';
  if(mode==='cooling'){
    const target=targetTime(30,cp);
    $('#metrics').innerHTML=metric('ŞU ANKİ SICAKLIK',fmt(value,1),'°C',`t = ${fmt(time,1)} dakika`,'T')+metric('FARKIN YARILANMA SÜRESİ',fmt(halfLife(cp.k),1),'dk','Ortamla farkın yarıya inmesi','½')+metric('30 °C HEDEFİNE TOPLAM SÜRE',target===null?'—':fmt(target,1),target===null?'':'dk',target===null?'Bu başlangıçtan sonlu sürede erişilmez.':'Başlangıç anından itibaren','↘');
    $('#chart-note').textContent=showEuler?`Euler hatası: ${fmt(Math.abs(eulerCooling(time,cp,cp.h)-value),2)} °C`:'Kesin çözüm · sabit ortam';
  }else{
    const m=buildingMetrics(bp);
    $('#metrics').innerHTML=metric('ŞU ANKİ İÇ SICAKLIK',fmt(value,1),'°C',`t = ${fmt(time,1)} saat`,'T')+metric('KALICI SALINIM GENLİĞİ',fmt(m.amplitude,2),'°C',`Dış genlik: ${fmt(bp.amplitude,1)} °C`,'A')+metric('KALICI REJİMDE GECİKME',fmt(m.lag,2),'sa','İç sıcaklık, dış değişimi izler.','φ');
    $('#chart-note').textContent='Tam çözüm · geçici + kalıcı rejim';
  }
  renderChart();
}
function renderChart(){
  const compact=window.matchMedia('(max-width:680px)').matches;
  const W=compact?420:780,H=320,L=compact?42:53,R=compact?16:22,T=24,B=40,xMax=maxTime(),N=240;
  $('#chart').setAttribute('viewBox',`0 0 ${W} ${H}`);
  const series=Array.from({length:N+1},(_,i)=>{const t=i*xMax/N;return [t,mode==='cooling'?cooling(t,cp):building(t,bp)];});
  const outside=mode==='building'?series.map(([t])=>[t,10+bp.amplitude*Math.sin(2*Math.PI*t/bp.period)]):[];
  const eulerPoints=[];
  if(mode==='cooling'&&showEuler){for(let t=0;t<xMax+1e-7;t+=cp.h)eulerPoints.push([t,eulerCooling(t,cp,cp.h)]);if(eulerPoints.at(-1)[0]<xMax)eulerPoints.push([xMax,eulerCooling(xMax,cp,cp.h)]);}
  const vals=series.map(v=>v[1]).concat(outside.map(v=>v[1]),eulerPoints.map(v=>v[1]),mode==='cooling'?[cp.ambient]:[bp.setpoint]);
  const min=Math.min(...vals),max=Math.max(...vals),span=Math.max(10,max-min);
  const low=Math.floor((min-span*.09)/5)*5,high=Math.ceil((max+span*.09)/5)*5;
  const X=t=>L+t/xMax*(W-L-R),Y=v=>T+(high-v)/(high-low)*(H-T-B);
  const path=points=>points.map(([t,v],i)=>(i?'L':'M')+X(t).toFixed(2)+','+Y(v).toFixed(2)).join(' ');
  const mainPath=path(series),baseline=mode==='cooling'?cp.ambient:bp.setpoint;
  let out=`<title id="chart-title">${mode==='cooling'?'Cismin sıcaklığı':'Bina ve dış ortam sıcaklığı'} zamana göre</title><desc id="chart-description">${fmt(time,1)} ${unit()} sonra sıcaklık ${fmt(series[0][1],1)} başlangıç değerinden ${fmt(mode==='cooling'?cooling(time,cp):building(time,bp),1)} santigrat dereceye gelir. Yatay eksen zaman, düşey eksen sıcaklıktır.</desc><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7c9b61" stop-opacity=".13"/><stop offset="1" stop-color="#7c9b61" stop-opacity=".01"/></linearGradient><clipPath id="plotclip"><rect x="${L}" y="${T}" width="${W-L-R}" height="${H-T-B}"/></clipPath></defs>`;
  out+=`<text x="${L}" y="11" font-size="10" fill="#9fa893" font-family="sans-serif">Sıcaklık (°C)</text>`;
  for(let i=0;i<=4;i++){
    const val=low+(high-low)*i/4,y=Y(val);
    out+=`<line x1="${L}" y1="${y}" x2="${W-R}" y2="${y}" stroke="#edf0e7" stroke-dasharray="3 5"/><text x="${L-13}" y="${y+4}" text-anchor="end" font-size="10" fill="#a6ae9c" font-family="sans-serif">${fmt(val,0)}</text>`;
  }
  for(let i=0;i<=6;i++){
    const t=xMax*i/6,x=X(t);
    out+=`<line x1="${x}" y1="${T}" x2="${x}" y2="${H-B}" stroke="#f2f4ed"/><text x="${x}" y="${H-B+23}" text-anchor="middle" font-size="10" fill="#a6ae9c" font-family="sans-serif">${fmt(t,0)}</text>`;
  }
  out+=`<text x="${W-R}" y="${H-2}" text-anchor="end" font-size="10" fill="#a0aa91" font-family="sans-serif">Zaman (${mode==='cooling'?'dakika':'saat'})</text><g clip-path="url(#plotclip)">`;
  if(mode==='cooling')out+=`<path d="${mainPath} L${X(xMax)},${Y(baseline)} L${X(0)},${Y(baseline)} Z" fill="url(#fill)"/>`;
  out+=`<line x1="${L}" y1="${Y(baseline)}" x2="${W-R}" y2="${Y(baseline)}" stroke="#bdc5ad" stroke-width="1.3" stroke-dasharray="5 5"/>`;
  if(mode==='building')out+=`<path d="${path(outside)}" fill="none" stroke="#d9a17b" stroke-width="1.8" opacity=".85"/>`;
  if(mode==='cooling'&&showEuler){
    out+=`<path d="${path(eulerPoints)}" fill="none" stroke="#d99064" stroke-width="1.8" stroke-dasharray="5 4"/>`;
  }
  out+=`<path d="${mainPath}" fill="none" stroke="#477d55" stroke-width="2.8" stroke-linecap="round"/>`;
  const current=mode==='cooling'?cooling(time,cp):building(time,bp),cx=X(time),cy=Y(current);
  out+=`<line x1="${cx}" y1="${T}" x2="${cx}" y2="${H-B}" stroke="#9bb68a" stroke-width="1" stroke-dasharray="3 4"/><circle cx="${cx}" cy="${cy}" r="9" fill="#4b7d52" opacity=".12"/><circle cx="${cx}" cy="${cy}" r="4.5" fill="#477d55" stroke="white" stroke-width="2"/></g>`;
  const bx=Math.max(L+3,Math.min(cx-37,W-R-79)),by=Math.max(T+2,cy-40);
  out+=`<rect x="${bx}" y="${by}" width="76" height="27" rx="5" fill="#edf3e8" stroke="#dfe9d5"/><text x="${bx+38}" y="${by+18}" text-anchor="middle" font-size="12" fill="#547b46" font-family="sans-serif">${fmt(current,1)} °C</text>`;
  if(mode==='cooling')out+=`<text x="${W-R-5}" y="${Y(baseline)-7}" text-anchor="end" font-size="10" fill="#a1ab91" font-family="sans-serif">Tₘ = ${fmt(baseline,0)} °C</text>`;
  $('#chart').innerHTML=out;
}
function stop(){playing=false;cancelAnimationFrame(frame);$('#play').textContent='▶';$('#play').setAttribute('aria-label','Zamanı oynat');}
function animate(stamp){if(!playing)return;if(lastStamp)time=Math.min(maxTime(),time+(stamp-lastStamp)/1000*(mode==='cooling'?6:3));lastStamp=stamp;renderLab();if(time>=maxTime())stop();else frame=requestAnimationFrame(animate);}
$('#play').addEventListener('click',()=>{if(playing){stop();return;}if(time>=maxTime())time=0;playing=true;lastStamp=0;$('#play').textContent='Ⅱ';$('#play').setAttribute('aria-label','Zamanı durdur');frame=requestAnimationFrame(animate);});
$('#time').addEventListener('input',e=>{stop();time=Number(e.target.value);renderLab();});
$('#controls').addEventListener('input',e=>{
  const id=e.target.dataset.param;if(!id)return;
  (mode==='cooling'?cp:bp)[id]=Number(e.target.value);
  const digits=id==='k'?4: ['tau','amplitude','h'].includes(id)?1:id==='ratio'?2:0;
  const suffix={initial:'°C',ambient:'°C',k:'dk⁻¹',h:'dk',tau:'sa',period:'sa',amplitude:'°C',ratio:''}[id];
  $('#output-'+id).innerHTML=fmt(Number(e.target.value),digits)+` <small>${suffix}</small>`;renderLab();
});
$$('[data-mode]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.mode;time=mode==='cooling'?20:24;setupMode();}));
$('#show-euler').addEventListener('change',e=>{showEuler=e.target.checked;$('#control-h').hidden=!showEuler;$('#euler-legend').hidden=!showEuler;renderLab();});
$('#preset').addEventListener('click',()=>{if(mode==='cooling'){cp={ambient:20,initial:100,k:Math.log(2)/20,h:5};time=20;}else{bp={tau:4,ratio:Math.sqrt(16-(Math.PI/3)**2)-1,period:24,amplitude:12,setpoint:22};time=24;}setupMode();toast(mode==='cooling'?'Örnek 3.1: 20. dakikada 60 °C.':'Örnek 3.2: kalıcı salınım genliği 3 °C.');});
let dragging=false;
function seek(e){const rect=$('#chart').getBoundingClientRect(),W=$('#chart').viewBox.baseVal.width,L=W===420?42:53,R=W===420?16:22;time=Math.max(0,Math.min(maxTime(),((e.clientX-rect.left)/rect.width*W-L)/(W-L-R)*maxTime()));time=Math.round(time*2)/2;stop();renderLab();}
$('#chart').addEventListener('pointerdown',e=>{if(e.pointerType==='touch')return;dragging=true;$('#chart').setPointerCapture(e.pointerId);seek(e);});
$('#chart').addEventListener('pointermove',e=>{if(dragging)seek(e);});
$('#chart').addEventListener('pointerup',()=>dragging=false);
$('#chart').addEventListener('pointercancel',()=>dragging=false);
function download(name,text,type='text/plain;charset=utf-8'){const blob=new Blob([text],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('#export-svg').addEventListener('click',()=>{const svg=$('#chart').cloneNode(true);svg.setAttribute('xmlns','http://www.w3.org/2000/svg');svg.setAttribute('width','1170');svg.setAttribute('height','480');download(mode+'-grafik.svg',new XMLSerializer().serializeToString(svg),'image/svg+xml');toast('Grafik SVG olarak indiriliyor.');});
$('#export-csv').addEventListener('click',()=>{
  const lines=[mode==='cooling'?'zaman_dakika,analitik_sicaklik_C,euler_sicaklik_C,ortam_sicaklik_C':'zaman_saat,bina_sicaklik_C,dis_sicaklik_C'];
  for(let t=0;t<=maxTime();t+=0.5)lines.push(mode==='cooling'?[t,cooling(t,cp),eulerCooling(t,cp,cp.h),cp.ambient].map(n=>n.toFixed(6)).join(','):[t,building(t,bp),10+bp.amplitude*Math.sin(2*Math.PI*t/bp.period)].map(n=>n.toFixed(6)).join(','));
  download(mode+'-veriler.csv',lines.join('\n'),'text/csv;charset=utf-8');toast('Deney verileri CSV olarak indiriliyor.');
});
function updateProgress(){const count=Number(!!progress.lesson)+new Set(progress.solved).size;$('#progress-label').textContent=count+' / 5';$('#progress-bar').style.width=count*20+'%';$('#lesson-complete').checked=!!progress.lesson;}
$('#lesson-complete').addEventListener('change',e=>{progress.lesson=e.target.checked;saveStore('progress',progress);updateProgress();});
const questions=[
 {title:'Toplam süre mi, kalan süre mi?',tag:'ÖRNEK 3.1 İLE BAĞLANTI',text:'Ortam 20 °C. Cisim 100 °C’den 20 dakikada 60 °C’ye soğuyor. Bu gözlemden sonra 30 °C’ye inmesi için kaç dakika daha gerekir?',unit:'dakika',answer:40,tolerance:0.1,feedback:'Doğru. Sıcaklık farkı her 20 dakikada yarılanır: 80 → 40 → 20 → 10. Toplam 60, gözlemden sonra 40 dakika.',hints:['Sıcaklığın kendisini değil, 20 °C ortamla arasındaki farkı izle.','Fark ilk 20 dakikada 80’den 40’a düşüyor. 30 °C için farkın 10 olması gerekiyor.','40 → 20 → 10 için iki yarılanma daha gerekir. Her biri 20 dakikadır.']},
 {title:'Aynı denge, farklı hız',tag:'KAVRAM KONTROLÜ',text:'Başlangıç ve ortam sıcaklıkları sabitken k iki katına çıkarılıyor. Sıcaklık farkının yarılanma süresi nasıl değişir?',choices:['İki katına çıkar.','Yarıya iner.','Değişmez.'],answer:1,feedback:'Doğru. t½ = ln(2)/k olduğundan k iki katına çıkınca yarılanma süresi yarıya iner.',hints:['Yarılanma süresinin formülünde k’nın nerede durduğuna bak.','Süre k ile ters orantılıdır.']},
 {title:'Dengeye ne zaman ulaşılır?',tag:'MODELİ YORUMLA',text:'100 °C’den başlayan cisim 20 °C ortamda Newton yasasına göre soğuyor. Matematiksel modelde sıcaklığı tam 20 °C hangi sonlu anda olur?',choices:['Bir zaman sabiti sonra.','Yeterince büyük herhangi bir sonlu zamanda.','Hiçbir sonlu zamanda; asimptotik yaklaşır.'],answer:2,feedback:'Doğru. 80e⁻ᵏᵗ, sonlu t için pozitiftir. Cisim 20 °C’ye yaklaşır; modelde tam eşitlik sonlu zamanda oluşmaz.',hints:['T(t) − 20 ifadesini yaz.','e⁻ᵏᵗ, sonlu bir t için tam sıfır olabilir mi?']},
 {title:'Binanın sıcaklığını sınırla',tag:'ÖRNEK 3.2 İLE BAĞLANTI',text:'Dış sıcaklık genliği 12 °C, c/K₁ = 4 saat ve periyot 24 saat. Kalıcı iç sıcaklık genliği en fazla 3 °C olacaksa en küçük K₂/K₁ oranı yaklaşık kaçtır?',unit:'oran · 2 ondalık yeterli',answer:Math.sqrt(16-(Math.PI/3)**2)-1,tolerance:0.015,feedback:'Doğru. 12/√[(1+r)²+(π/3)²] ≤ 3 koşulu r ≥ 2,86049 verir. Bu sınır kalıcı rejim içindir.',hints:['ω = 2π/24 = π/12. Dolayısıyla τω = π/3.','Genlik formülünde A ≤ 3 yaz: 12/√[(1+r)²+(π/3)²] ≤ 3.','Payda en az 4 olmalı. (1+r)² ≥ 16 − (π/3)² eşitsizliğini çöz.']}
];
function renderExercises(){
  $('#exercises').innerHTML=questions.map((q,i)=>`<form class="panel exercise" data-question="${i}"><div class="exercise-top"><span>0${i+1} / ${q.tag}</span><span class="exercise-status ${progress.solved.includes(i)?'solved':''}">${progress.solved.includes(i)?'✓ Tamamlandı':'Henüz çözülmedi'}</span></div><h3>${q.title}</h3><p>${q.text}</p>${q.choices?`<div role="radiogroup" aria-label="${q.title}">${q.choices.map((c,j)=>`<label class="choice"><input type="radio" name="answer-${i}" value="${j}" required>${c}</label>`).join('')}</div><button class="button primary" type="submit">Cevabımı kontrol et</button>`:`<label for="answer-${i}">Cevabın (${q.unit})</label><div class="answer-line"><input id="answer-${i}" name="numeric" inputmode="decimal" placeholder="Sonucu yaz…" autocomplete="off" required aria-label="${q.title} için sayısal cevap"><button class="button primary" type="submit">Kontrol et</button></div>`}<p class="feedback" role="status" hidden></p><button class="text-button hint-button" type="button">＋ Bir ipucu aç</button><ol class="hint-list"></ol></form>`).join('');
}
$('#exercises').addEventListener('submit',e=>{
  e.preventDefault();const form=e.target,i=Number(form.dataset.question),q=questions[i];let answer;
  if(q.choices)answer=Number(form.querySelector('input[type=radio]:checked')?.value);
  else answer=Number(form.querySelector('input[name=numeric]').value.trim().replace(',','.'));
  const correct=Number.isFinite(answer)&&(q.choices?answer===q.answer:Math.abs(answer-q.answer)<=q.tolerance),feedback=form.querySelector('.feedback');
  feedback.hidden=false;feedback.classList.toggle('wrong',!correct);feedback.textContent=correct?q.feedback:'Henüz doğru değil. Birimlere ve başlangıç koşullarına tekrar bak; bir sonraki ipucu yardımcı olabilir.';
  if(correct){if(!progress.solved.includes(i))progress.solved.push(i);saveStore('progress',progress);form.querySelector('.exercise-status').textContent='✓ Tamamlandı';form.querySelector('.exercise-status').classList.add('solved');updateProgress();}
});
$('#exercises').addEventListener('click',e=>{if(!e.target.matches('.hint-button'))return;const form=e.target.closest('form'),q=questions[Number(form.dataset.question)],list=form.querySelector('.hint-list'),n=list.children.length;if(n<q.hints.length){const li=document.createElement('li');li.textContent=q.hints[n];list.append(li);}if(list.children.length===q.hints.length){e.target.textContent='Tüm ipuçları açık';e.target.disabled=true;}else e.target.textContent='＋ Sonraki ipucu';});
const storedNotes=readStore('notes','');$('#notes').value=typeof storedNotes==='string'?storedNotes:'';
$('#notes').addEventListener('input',()=>{$('#save-status').textContent=saveStore('notes',$('#notes').value)?'✓ Bu tarayıcıya kaydedildi.':'Tarayıcıya kaydedilemiyor. Notlarını indirerek yedekle.';});
$('#export-notes').addEventListener('click',()=>{download('calisma-notlarim.md','# §3.1 · Isınma ve soğuma\n\nKaynak: Wei-Chau Xie, basılı s.87–90.\n\n'+$('#notes').value);toast('Notların Markdown olarak indiriliyor.');});
const chapters=[
 ['Giriş','Introduction',1,'1.1 Motive edici örnekler · s.1|1.2 Genel kavramlar ve tanımlar · s.6'],
 ['Birinci mertebe ve basit yüksek mertebe denklemler','First-Order and Simple Higher-Order Differential Equations',16,'2.1 Değişkenlerin ayrılması · s.16|2.2 Değişken dönüşümleri · s.20|2.3 Tam denklemler ve integral çarpanları · s.31|2.4 Birinci mertebe doğrusal / Bernoulli denklemleri · s.55|2.5 Bağımlı veya bağımsız değişken için çözülebilen denklemler · s.61|2.6 Basit yüksek mertebe denklemler · s.68|2.7 Özet · s.74'],
 ['Birinci mertebe denklemlerin uygulamaları','Applications of First-Order and Simple Higher-Order Equations',87,'3.1 Isınma ve soğuma · s.87|3.2 Dirençli ortamda parçacık hareketi · s.91|3.3 Asılı kablolar · s.97|3.4 Elektrik devreleri · s.108|3.5 Akarsuda doğal arınma · s.114|3.6 Çeşitli uygulama problemleri · s.120'],
 ['Doğrusal diferansiyel denklemler','Linear Differential Equations',140,'4.1 Genel doğrusal adi denklemler · s.140|4.2 Homojen çözümler ve karakteristik denklem · s.143|4.3 Özel çözümler · s.153|4.4 Euler denklemleri · s.178|4.5 Özet · s.180'],
 ['Doğrusal denklemlerin uygulamaları','Applications of Linear Differential Equations',188,'5.1 Tek serbestlik dereceli sistemin titreşimi · s.188|5.2 Elektrik devreleri · s.209|5.3 Hız tümseğinden geçen araç · s.213|5.4 Kiriş-kolonlar · s.218|5.5 Çeşitli uygulama problemleri · s.223'],
 ['Laplace dönüşümü ve uygulamaları','The Laplace Transform and Its Applications',244,'6.1 Laplace dönüşümü · s.244|6.2 Heaviside basamak fonksiyonu · s.249|6.3 Dirac delta ve darbe fonksiyonları · s.254|6.4 Ters Laplace dönüşümü · s.257|6.5 Laplace ile denklem çözümü · s.263|6.6 Uygulamalar · s.268|6.7 Özet · s.289'],
 ['Doğrusal diferansiyel denklem sistemleri','Systems of Linear Differential Equations',300,'7.1 Giriş · s.300|7.2 Operatör yöntemi · s.304|7.3 Laplace dönüşümü yöntemi · s.318|7.4 Matris yöntemi · s.325|7.5 Özet · s.347'],
 ['Doğrusal sistemlerin uygulamaları','Applications of Systems of Linear Differential Equations',357,'8.1 Mekanik titreşimlerin modellenmesi · s.357|8.2 Ayarlı kütle sönümleyiciler · s.366|8.3 Elektrik devresi · s.372|8.4 İki katlı kesme binası · s.377'],
 ['Diferansiyel denklemlerin seri çözümleri','Series Solutions of Differential Equations',390,'9.1 Kuvvet serilerinin tekrarı · s.391|9.2 Adi nokta çevresinde seri çözümü · s.394|9.3 Düzenli tekil nokta ve Bessel denklemi · s.403|9.4 Özet · s.424'],
 ['Sayısal çözümler','Numerical Solutions of Differential Equations',431,'10.1 Birinci mertebe başlangıç değer problemleri: Euler ve Runge–Kutta · s.431|10.2 Denklem sistemlerinin sayısal çözümleri · s.445|10.3 Katı (stiff) denklemler · s.449|10.4 Özet · s.452'],
 ['Kısmi diferansiyel denklemler','Partial Differential Equations',457,'11.1 Basit kısmi denklemler · s.457|11.2 Değişkenlerin ayrılması · s.458|11.3 Kirişlerin eğilme titreşimi · s.465|11.4 Isı iletimi · s.473|11.5 Özet · s.492'],
 ['Maple ile adi diferansiyel denklem çözümü','Solving Ordinary Differential Equations Using Maple',498,'12.1 Kapalı biçimde çözümler · s.499|12.2 Seri çözümleri · s.512|12.3 Sayısal çözümler · s.517']
];
function renderMap(){const search=$('#chapter-search').value.toLocaleLowerCase('tr-TR').trim();let matches=0;$('#chapter-list').innerHTML=chapters.map((c,i)=>{if(!c.join(' ').toLocaleLowerCase('tr-TR').includes(search))return '';matches++;return `<details class="chapter-card" ${search||i===2?'open':''}><summary><span class="chapter-number">${String(i+1).padStart(2,'0')}</span><div><h3>${c[0]}</h3><small>Basılı s.${c[2]} · PDF s.${c[2]+18} ${i===2?'<span class="ready">3.1 HAZIR</span>':'· İçerik haritası'}</small></div><span class="chapter-arrow">＋</span></summary><ul>${c[3].split('|').map((s,j)=>`<li>${i===2&&j===0?`<a href="#lesson">${s} → Derse git</a>`:s}</li>`).join('')}</ul></details>`;}).join('');$('#no-chapters').hidden=matches>0;}
$('#chapter-search').addEventListener('input',renderMap);
let lessonLoaded=false;
async function loadLesson(){if(lessonLoaded)return;try{
  const [mdResponse,mathResponse]=await Promise.all([fetch('lesson.md'),fetch('math.json')]);
  if(!mdResponse.ok||!mathResponse.ok)throw Error('Ders dosyaları yüklenemedi.');
  const [md,formulaMap]=await Promise.all([mdResponse.text(),mathResponse.json()]);
  const prepared=md.replace(/\$\$\s*([\s\S]*?)\s*\$\$/g,(_,latex)=>{const m=formulaMap[latex.trim()];if(!m)throw Error('Formül eşlemesi bulunamadı.');return `<div class="formula">${m}<details><summary>LaTeX kaynağı</summary><code>${escape(latex.trim())}</code></details></div>`;});
  $('#lesson-content').innerHTML=marked.parse(prepared);lessonLoaded=true;
}catch(e){$('#lesson-content').innerHTML='<h2>Ders notu yüklenemedi.</h2><p>Uygulamayı bir HTTP sunucusundan açmalısın. <a href="lesson.md">Markdown dosyasını doğrudan açabilirsin.</a></p>';console.error(e);}}
function route(){const requested=location.hash.slice(1)||'lab';view=['lab','lesson','practice','notes','map','source'].includes(requested)?requested:'lab';$$('.view').forEach(el=>el.hidden=el.id!=='view-'+view);$$('[data-view]').forEach(a=>{a.classList.toggle('active',a.dataset.view===view);if(a.dataset.view===view)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});$('#sidebar').classList.remove('open');$('#menu').setAttribute('aria-expanded','false');if(view!=='lab')stop();if(view==='lesson')loadLesson();if(view==='map')renderMap();}
window.addEventListener('hashchange',()=>{route();window.scrollTo(0,0);});
$('#menu').addEventListener('click',()=>{const open=$('#sidebar').classList.toggle('open');$('#menu').setAttribute('aria-expanded',String(open));$('#menu').setAttribute('aria-label',open?'Menüyü kapat':'Menüyü aç');});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('#sidebar').classList.remove('open');$('#menu').setAttribute('aria-expanded','false');}if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();location.hash='map';setTimeout(()=>$('#chapter-search').focus(),20);}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
window.addEventListener('resize',()=>{if(view==='lab')renderChart();});
setupMode();renderExercises();updateProgress();route();
if(!storageOK)$('#save-status').textContent='Tarayıcı depolaması kullanılamıyor. Notlarını indirerek yedekle.';
