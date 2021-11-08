import React from 'react';
// websocket context provider
import WebSocketProvider from './features/websocket/WebSocketProvider';
// game player rank list component
import { RankList } from './features/rank/RankList'
// Websocket component status component
import { WebSocket } from './features/websocket/WebSocket'
// CSS
import './App.css';

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
