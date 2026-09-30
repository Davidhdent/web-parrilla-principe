const L=h=>{const c=h.match(/\w\w/g).map(x=>parseInt(x,16)/255).map(v=>v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4);return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]};
const cr=(a,b)=>{const [x,y]=[L(a),L(b)].sort((p,q)=>q-p);return ((x+0.05)/(y+0.05)).toFixed(2)};
const pairs={
 A:[['F2E9DA','17120F','texto hueso / carbón'],['E8A25C','17120F','ámbar / carbón'],['C4552B','17120F','brasa / carbón (solo grande)'],['F2E9DA','5A3521','hueso / castaño'],['17120F','E8A25C','carbón sobre botón ámbar'],['17120F','F2E9DA','carbón / hueso (secciones claras)'],['9A3B1B','F2E9DA','brasa oscura / hueso']],
 B:[['231C17','F6F0E4','tinta / mantel'],['7B1E2B','F6F0E4','burdeos / mantel'],['1E3A2F','F6F0E4','verde botella / mantel'],['F6F0E4','7B1E2B','mantel sobre botón burdeos'],['F6F0E4','1E3A2F','mantel / verde botella'],['6B5E52','F6F0E4','gris cálido secundario / mantel']],
 C:[['1B2419','EEE9DC','tinta / lino'],['2F4A2C','EEE9DC','verde castaño / lino'],['A63A25','EEE9DC','tomate / lino'],['EEE9DC','2F4A2C','lino / verde castaño'],['EEE9DC','A63A25','lino sobre botón tomate'],['7A5A3A','EEE9DC','tierra / lino']]};
for(const k in pairs){console.log('== '+k);for(const [f,b,n] of pairs[k]){const r=cr(f,b);console.log(`${n.padEnd(36)} #${f} sobre #${b}: ${r}:1 ${r>=7?'AAA':r>=4.5?'AA':r>=3?'AA grande':'NO'}`)}}
