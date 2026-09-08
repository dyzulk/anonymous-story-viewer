import { useState } from 'react';
import logo from '@/assets/logo.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Anonymous Story Viewer logo" />
      </div>
      <h1>Anonymous Story Viewer</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Anonymous Story Viewer
      </p>
    </>
  );
}

export default App;
