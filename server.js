const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const www = path.join(__dirname, 'e-commerce-web');
const dataDir = path.join(__dirname, 'e-commerce-web', 'data');
const ordersFile = path.join(__dirname, 'data', 'orders.json');

function sendJSON(res, obj, code=200){ res.writeHead(code, {'Content-Type':'application/json'}); res.end(JSON.stringify(obj)); }

function readProducts(){ try{ return JSON.parse(fs.readFileSync(path.join(dataDir,'products.json'),'utf8')); }catch(e){ return []; } }
function writeProducts(arr){ fs.writeFileSync(path.join(dataDir,'products.json'),JSON.stringify(arr,null,2)); }

const server = http.createServer((req,res)=>{
  const parsed = url.parse(req.url, true);
  const method = req.method;
  // API routes
  if(parsed.pathname.startsWith('/api')){
    if(parsed.pathname === '/api/products' && method === 'GET'){
      return sendJSON(res, readProducts());
    }
    if(parsed.pathname === '/api/products' && method === 'POST'){
      let body=''; req.on('data',c=>body+=c); req.on('end',()=>{ try{ const p=JSON.parse(body); const products = readProducts(); const id = products.reduce((m,i)=>Math.max(m,i.id),0)+1; const item = {id,...p}; products.push(item); writeProducts(products); sendJSON(res,item,201);}catch(e){sendJSON(res,{error:'bad'},400)}); return;
    }
    if(parsed.pathname.startsWith('/api/products/') && method === 'DELETE'){
      const id = Number(parsed.pathname.split('/').pop()); const products = readProducts(); const filtered = products.filter(p=>p.id!==id); writeProducts(filtered); return sendJSON(res,{ok:true});
    }
    if(parsed.pathname === '/api/orders' && method === 'POST'){
      let body=''; req.on('data',c=>body+=c); req.on('end',()=>{ try{ const order=JSON.parse(body); const orders = JSON.parse(fs.readFileSync(ordersFile,'utf8')||'[]'); orders.push(Object.assign({id:Date.now()},order)); fs.writeFileSync(ordersFile,JSON.stringify(orders,null,2)); sendJSON(res,{ok:true},201);}catch(e){sendJSON(res,{error:'bad'},400)}); return;
    }
    return sendJSON(res,{error:'not found'},404);
  }

  // Serve static files from e-commerce-web
  let filePath = path.join(www, parsed.pathname === '/' ? 'index.html' : decodeURIComponent(parsed.pathname.replace(/\?.*$/,'')));
  // prevent directory traversal
  if(!filePath.startsWith(www)) return res.writeHead(403) && res.end('Forbidden');
  fs.stat(filePath, (err,stat)=>{
    if(err){ res.writeHead(404); res.end('Not found'); return }
    if(stat.isDirectory()) filePath = path.join(filePath,'index.html');
    const ext = path.extname(filePath).toLowerCase();
    const map = {'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml'};
    res.writeHead(200, {'Content-Type': map[ext] || 'application/octet-stream'});
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, ()=>console.log('Server running on http://localhost:'+PORT));
