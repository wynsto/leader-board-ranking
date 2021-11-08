import React, { createContext } from 'react'
import { useDispatch } from 'react-redux';

import { WS_BASE } from './config';
import {connected, disconnected} from './websocketSlice'
import { updateList, updateDetail } from '../rank/rankListSlice'

const WebSocketContext = createContext(null);

export { WebSocketContext }

// WebSocket Context Provider, this provider wil wrap the root app component maintains all the operations (connect/disconnect, send message) with websocket backend. 
const WebSocketProvider = ({ children }) => {
    let socket;
    let ws;

    const dispatch = useDispatch();

    const sendMessage = (message) => {
        const payload = message;
        socket.send(JSON.stringify(payload));
    }

    const disconnect = () => {
        if (socket) {
            socket.close();
            socket = null;
            dispatch(connected());
        }
    }

    const connect = () => {
        if (socket) {
            socket.close();
        }
        socket = new WebSocket(WS_BASE);
        socket.onopen = () => {
            sendMessage({
                action: 'load',
                payload: {}
            });
            dispatch(connected());
        }

        socket.onmessage = (msg) => {
            const data = JSON.parse(msg.data)
            const { action, payload } = data
            switch(action) {
                // update the player score rank list
                case 'updateList':
                    dispatch(updateList(payload));
                    break;
                // update detail of single player
                case 'updateDetail':
                    dispatch(updateDetail(payload));
                    break;
                // websocket connected event
                case 'connected':
                    dispatch(connected(payload));
                    break;
                // websocket disconnected event
                case 'disconnected':
                    dispatch(disconnected(payload));
                    break
                default:
                    //
            }
        }

        socket.onclose = (msg) => {
            console.log('close', msg);
            dispatch(disconnected());
        }
    }

    connect();

    ws = {
        socket: socket,
        sendMessage,
        connect,
        disconnect
    }
    

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    );
}

export default WebSocketProvider