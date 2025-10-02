import { createRoot } from 'react-dom/client';
function App(){
  return (
    <div style={{padding:16}}>
      <h1>OM1 Multi-Wallet Demo</h1>
      <button id="btn-connect">Connect</button>
      <div id="status" style={{marginTop:8}}>-</div>
    </div>
  );
}
createRoot(document.getElementById('root')!).render(<App/>);
