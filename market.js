const L=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}},$=s=>document.querySelector(s);
let D=L('mrk',{s:0,i:[{id:1,n:'Süt 1 L',a:60,m:20,f:38},{id:2,n:'Ekmek',a:15,m:30,f:12},{id:3,n:'Yumurta 15’li',a:34,m:12,f:95},{id:4,n:'Zeytinyağı 1 L',a:9,m:10,f:420},{id:5,n:'Makarna',a:70,m:20,f:28}]}),C={};
const sv=()=>{try{localStorage.setItem('mrk',JSON.stringify(D))}catch(e){}},g=i=>D.i.find(x=>x.id==i),e=s=>String(s).replace(/</g,'&lt;');
function R(){const q=$('#q').value.toLowerCase();
$('#st').textContent=D.i.filter(x=>x.a<=x.m).length+' kritik ürün · Ciro '+D.s.toLocaleString('tr-TR')+' ₺';
$('#gr').innerHTML=D.i.filter(x=>x.n.toLowerCase().includes(q)).map(x=>`<div class="p ${x.a<=x.m?'lo':''}" onclick="ad(${x.id})"><b>${e(x.n)}</b><div class="f">${x.f} ₺</div><div class="bar"><i style="width:${Math.min(100,x.a/(x.m*3)*100)}%"></i></div>Stok: ${x.a}${x.a<=x.m?' ⚠':''}<br><button onclick="event.stopPropagation();D.i.find(y=>y.id==${x.id}).a+=10;sv();R()">+10</button> <button onclick="event.stopPropagation();sil(${x.id})">Sil</button></div>`).join('');
let t=0;$('#sp').innerHTML=Object.keys(C).map(i=>{const x=g(i);t+=x.f*C[i];return `<div class="l"><span>${e(x.n)} ×${C[i]}</span><b>${x.f*C[i]} ₺</b></div>`}).join('')||'<small>Ürün kutusuna tıkla.</small>';$('#tt').textContent=t+' ₺'}
function ad(i){if((C[i]||0)>=g(i).a)return alert('Stok yetersiz');C[i]=(C[i]||0)+1;R()}
function pay(){const k=Object.keys(C);if(!k.length)return;k.forEach(i=>{const x=g(i);x.a-=C[i];D.s+=x.f*C[i]});C={};sv();R()}
function sil(i){D.i=D.i.filter(x=>x.id!=i);delete C[i];sv();R()}
function add(){const n=$('#n').value.trim(),f=+$('#f').value;if(!n||!f)return alert('Ad ve fiyat gerekli');D.i.push({id:Date.now(),n,a:+$('#a').value||0,m:+$('#m').value||10,f});['n','a','m','f'].forEach(i=>$('#'+i).value='');sv();R()}
R();