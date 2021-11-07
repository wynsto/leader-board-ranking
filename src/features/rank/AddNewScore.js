import React, { useState, useContext } from 'react';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { WebSocketContext } from '../websocket/WebSocketProvider';
import { Collapse, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { selectRankList, updateMode } from './rankListSlice';


export function AddNewScore() {
    const [username, setUsername] = useState('')
    const [score, setScore] = useState(0)
    const ws = useContext(WebSocketContext);
    const { mode } = useSelector(selectRankList);
    const dispatch = useDispatch()
    function addUserScore() {
        ws.sendMessage({
            action: 'add',
            payload: {
                username,
                score
            }
        })
    }

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handleScoreChange(event) {
        setScore(event.target.value)
    }

    function setAdminMode() {
        dispatch(updateMode({mode: 'admin'}))
    }

    function setGamerMode() {
        dispatch(updateMode({mode: 'gamer'}))
    }

    return <Paper>
        <Box sx={{ padding: '10px' }}>
        <Collapse in={mode === 'admin'}>
        <Stack spacing={2}>
            <TextField id="outlined-basic" variant="outlined"
            value={username} name="username" onChange={handleUsernameChange}
            label="User Name"
                />

            <TextField id="outlined-basic" variant="outlined"
            type="number" name="score" onChange={handleScoreChange}
            label="Score"
                />
            <Button variant="contained" onClick={addUserScore}>Add New Score</Button>
            <Button variant="outlined" color="warning" onClick={setGamerMode}>Exit Admin Mode</Button>
        </Stack>
        </Collapse>
        <Collapse in={mode === 'gamer'}>
            <Button variant="outlined" color="warning" onClick={setAdminMode}>Admin Mode</Button>
        </Collapse>
        </Box>
    </Paper>
}