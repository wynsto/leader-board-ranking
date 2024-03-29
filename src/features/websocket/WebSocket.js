import React, { useContext, useState } from 'react';
import { useSelector } from "react-redux";
// UI Components 
import Button from '@mui/material/Button';
import { Alert, AlertTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';

import { selectWS } from "./websocketSlice";
import { WebSocketContext } from './WebSocketProvider';

// webscocket connected status child component 
const Connceted = (props) => {
    const [open, setOpen] = useState(true);

    return <Collapse in={open}>
    <Alert severity="success" 
        action={
            <>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>

            {/* <IconButton color="inherit" size="small" onClick={props.disconnect}>
                Disconnect
            </IconButton> */}
            </>
        }
    >
        <AlertTitle>WebSocket Connected</AlertTitle>
        
    </Alert>
</Collapse>
}

// webscocket disconnected status child component 
const Disconnceted = (props) => <>
    <Alert severity="error"
        action={
            <Button color="inherit" size="small" onClick={props.connect}>
                Connect
            </Button>
      }
    >
        <AlertTitle>WebSocket Disconnected</AlertTitle>
    </Alert>    
</>

// WebSocket status component
export function WebSocket() {
    const wsStatus = useSelector(selectWS);
    const ws = useContext(WebSocketContext);

    function disconnect() {
        ws.disconnect();
    }
    function connect() {
        ws.connect();
    }

    return <>{wsStatus.connected ? <Connceted disconnect={disconnect}/> : <Disconnceted connect={connect}/>}</>
}