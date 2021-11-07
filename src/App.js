import React from 'react';
import './App.css';
import WebSocketProvider from './features/websocket/WebSocketProvider';
import { RankList } from './features/rank/RankList'
import { WebSocket } from './features/websocket/WebSocket'

// root app
function App() {
  return (
    <div className="App">
      <WebSocketProvider>
        <h1>Leader Board</h1>
        <WebSocket />
        <RankList />
      </WebSocketProvider>
    </div>
  );
}

export default App;
