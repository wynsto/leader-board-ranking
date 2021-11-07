import React, { createContext } from 'react'
import { WS_BASE } from './config';
import { useDispatch } from 'react-redux';
import {connected, disconnected} from './websocketSlice'
import { updateList, updateDetail } from '../rank/rankListSlice'

const WebSocketContext = createContext(null);

export { WebSocketContext }

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
                case 'updateList':
                    dispatch(updateList(payload));
                    break;
                case 'updateDetail':
                    dispatch(updateDetail(payload));
                    break;
                case 'connected':
                    dispatch(connected(payload));
                    break;
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