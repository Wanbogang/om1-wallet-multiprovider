import { createRoot } from 'react-dom/client';
import { WalletConnectAdapter } from '../../../packages/walletconnect/src/index';

const pid = import.meta.env.VITE_WC_PROJECT_ID;
const chains = (import.meta.env.VITE_EIP155_CHAINS || 'eip155:11155111').split(','); // default: Sepolia
const wc = new WalletConnectAdapter({ projectId: pid, chains });

function setStatus(t:string){ const el=document.getElementById('status'); if(el) el.textContent=t; console.log('[STATUS]',t); }

async function onConnect(){
  try{ setStatus('Connecting...'); await wc.connect(); const addr=await wc.getAddress(); setStatus(`Connected: ${addr}`); }
  catch(e:any){ console.error(e); setStatus(`Connect error: ${e?.message||e}`); }
}

async function onSign(){
  try{ const sig=await wc.signMessage('hello from OM1 demo'); setStatus(`Signed: ${sig.slice(0,18)}…`); }
  catch(e:any){ console.error(e); setStatus(`Sign error: ${e?.message||e}`); }
}

async function onSendTx(){
  try{
    const addr=await wc.getAddress(); if(!addr) throw new Error('Not connected');
    const hash=await wc.sendTransaction({ to: addr, value: '0x0' }); // 0 ETH tx (tetap butuh gas di testnet)
    setStatus(`Tx: ${hash.slice(0,12)}…`);
  }catch(e:any){ console.error(e); setStatus(`Tx error: ${e?.message||e}`); }
}

function App(){
  const masked = pid ? (pid.slice(0,6)+'…'+pid.slice(-4)) : '(no PID)';
  return (
    <div style={{padding:16, fontFamily:'ui-sans-serif'}}>
      <h1>OM1 Multi-Wallet Demo</h1>
      <p>Render OK — jika ini terlihat, React jalan.</p>
      <div style={{display:'flex', gap:8}}>
        <button onClick={onConnect}>Connect</button>
        <button onClick={onSign}>Sign Msg</button>
        <button onClick={onSendTx}>Send Tx</button>
      </div>
      <div id="status" style={{marginTop:8}}>-</div>
      <small style={{opacity:.6}}>PID: {masked} | Chains: {chains.join(',')}</small>
    </div>
  );
}
createRoot(document.getElementById('root')!).render(<App/>);
