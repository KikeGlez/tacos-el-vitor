// ===== AJUSTES: P = número de WhatsApp (sin +, sin espacios); R = reseñas reales que rotan en el aviso flotante =====
var P='15106904457',ts=document.getElementById('ts'),R=[
['Annie A. · Fremont','<span class="es">“Alimentaron a ~100 invitados y nos sobró.”</span><span class="en">“Fed ~100 guests with leftovers.”</span>'],
['Angela T. · Oakland','<span class="es">“La birria estaba tierna y llena de sabor.”</span><span class="en">“The birria was so tender and flavorful.”</span>'],
['Ted A. · Alameda','<span class="es">“La comida estaba increíble.”</span><span class="en">“The food was amazing!”</span>']],ri=0;

// ===== CAMBIO DE IDIOMA (ES / EN) =====
function L(l){document.documentElement.setAttribute('data-l',l);document.documentElement.lang=l;C()}

// ===== CALCULADORA: precio × invitados (mínimo 25) + gasolina por ciudad; arma el mensaje de WhatsApp =====
function C(){var en=document.documentElement.dataset.l==='en',pk=document.getElementById('pk'),p=+pk.value,g=Math.max(25,+document.getElementById('gs').value||25),c=document.getElementById('ct'),o=c.value==='o',f=o?[0,0]:c.value.split(',').map(Number),city=o?(en?'another city (___)':'otra ciudad (___)'):c.options[c.selectedIndex].text,pn=pk.options[pk.selectedIndex].text.split(' /')[0].split(' $')[0],food=p*g,t=o?'$'+food.toLocaleString()+' + '+(en?'delivery':'entrega'):f[1]?'$'+(food+f[0]).toLocaleString()+'–$'+(food+f[1]).toLocaleString():'$'+food.toLocaleString();
document.getElementById('br').textContent=(en?'Food ':'Comida ')+'$'+food.toLocaleString()+' + '+(o?(en?'delivery (varies by city)':'entrega (según tu ciudad)'):(en?'delivery to ':'entrega a ')+city+': '+(f[1]?'$'+f[0]+'–$'+f[1]:(en?'free':'sin costo')))+' → '+(en?'Estimated total':'Total estimado');
document.getElementById('tt').textContent=t;
var m=en?'Hi Victor, I’d like to book: '+pn+' package, '+g+' guests, in '+city+' (estimate '+t+'). My date is ___.':'Hola Victor, quiero apartar mi fecha: paquete '+pn+', '+g+' personas, en '+city+' (estimado '+t+'). Mi fecha es ___.';
document.getElementById('qa').href='https://wa.me/'+P+'?text='+encodeURIComponent(m);
document.getElementById('qb').href='https://wa.me/'+P+'?text='+encodeURIComponent(en?'Hi Victor, I’d like a quote for my event.':'Hola Victor, quiero cotizar mi evento.')}

// ===== AMPLIAR EL MENÚ al tocarlo =====
document.querySelectorAll('.zoom').forEach(function(z){z.onclick=function(){var i=z.querySelector('img:not([style*=none])'),v=[].slice.call(z.querySelectorAll('img')).filter(function(x){return x.offsetParent})[0]||i;document.getElementById('li').src=v.src;document.getElementById('lb').classList.add('on')}});

// ===== AVISO FLOTANTE: muestra una reseña real cada cierto tiempo =====
function T(){var r=R[ri++%R.length];document.getElementById('tx').innerHTML='<span class="stars">★★★★★</span> <b>'+r[0]+'</b><br>'+r[1]+'<br><small style="color:var(--mut)">Yelp</small>';ts.classList.add('on');setTimeout(function(){ts.classList.remove('on')},6000);setTimeout(T,16000+Math.random()*14000)}
setTimeout(T,9000);

// ===== AL CARGAR: abre en inglés si el navegador está en inglés =====
try{if((navigator.language||'').toLowerCase().indexOf('en')===0)L('en');else C()}catch(e){C()}