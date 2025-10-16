
<script>
function startDateTime(id="localDateTime"){
  const el = document.getElementById(id);
  if(!el) return;
  function tick(){
    const now = new Date();
    const s = now.toLocaleString();
    el.textContent = s;
  }
  tick();
  setInterval(tick, 1000);
}

function initControls(){
  const fontSelect = document.getElementById('fontSizeSelect');
  const bgSelect = document.getElementById('bgColorSelect');
  if(fontSelect){
    fontSelect.addEventListener('change', e=>{
      const v = e.target.value;
      document.documentElement.style.setProperty('--main-font', v+'px');
    });
  }
  if(bgSelect){
    bgSelect.addEventListener('change', e=>{
      const v = e.target.value;
      document.documentElement.style.setProperty('--main-bg', v);
    });
  }
}


function parseYMD(s){
  if(!s) return null;
  const parts = s.split('-');
  if(parts.length!==3) return null;
  return new Date(Number(parts[0]), Number(parts[1])-1, Number(parts[2]));
}


function inDateRange(d, fromYMD, toYMD){
  const D = (d instanceof Date)? d : parseYMD(d);
  const from = parseYMD(fromYMD);
  const to = parseYMD(toYMD);
  if(!D || !from || !to) return false;

  return D.getTime() >= from.getTime() && D.getTime() <= to.getTime();
}

function showErrors(container, messages){
  container.innerHTML = '';
  messages.forEach(m=>{
    const p = document.createElement('div');
    p.className = 'error';
    p.textContent = m;
    container.appendChild(p);
  });
}


function showResult(container, html){
  container.innerHTML = '';
  const div = document.createElement('div');
  div.className = 'result';
  div.innerHTML = html;
  container.appendChild(div);
}


const allowedCities = {
  TX: ['Austin','Dallas','Houston','San Antonio','Fort Worth','El Paso'],
  CA: ['Los Angeles','San Francisco','San Diego','Sacramento','San Jose']
};


function isAllowedCity(city){
  if(!city) return false;
  city = city.trim();
  for(const st in allowedCities){
    if(allowedCities[st].some(c=>c.toLowerCase() === city.toLowerCase())) return true;
  }
  return false;
}

window.A2 = {
  startDateTime, initControls, parseYMD, inDateRange, showErrors, showResult, isAllowedCity
};
</script>
