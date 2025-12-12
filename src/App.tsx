import { useState } from 'react';
import ParticleNetwork from './components/ParticleNetwork';
import UIControls from './components/UIControls';

function App() {
  const [text, setText] = useState('');

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      background: '#111',
      overflow: 'hidden'
    }}>
      <ParticleNetwork text={text} />
      <UIControls text={text} setText={setText} />
    </div>
  );
}

export default App;
