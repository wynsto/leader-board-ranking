
import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
// UI Components 
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { blueGrey } from '@mui/material/colors';
import TextField from '@mui/material/TextField';

import { selectRankList } from './rankListSlice';
import { WebSocketContext } from '../websocket/WebSocketProvider';


export const ScoreEditor = (props) =>  <TextField id="outlined-basic" variant="standard"
        value={props.score} name="score" onChange={props.updateScore}
        label="Score"
    />;
export const ScoreText = (props) => <span>{props.score}</span>;

// player's score rank item, child of rank list component
export const RankItem = (props) => {
    const ws = useContext(WebSocketContext);
    const { mode } = useSelector(selectRankList);

    const username = props.username;
    const id = props.id;
    const score = props.score;

    const [newScore, setNewScore] = useState(props.score);
    const [isEdit, setIsEdit] = useState(false);

    function updateScore(event) {
        setNewScore(event.target.value);
    }

    function triggerEdit() {
        if (isEdit) {
            ws.sendMessage({
                action: 'update',
                payload: {
                    id,
                    username,
                    score: newScore
                }
            });
        }
        setIsEdit(!isEdit);
    }

    let ScoreElem =  <ScoreText score={score}/>,
        ScoreButton = <Button variant="outlined" onClick={triggerEdit}>Edit</Button>;

    if (isEdit) {
        ScoreElem = <ScoreEditor updateScore={updateScore} score={newScore}/>;
        ScoreButton = <Button variant="contained" onClick={triggerEdit}>Save</Button>;
    }

    return (<>
            <ListItem key={id}>
                <ListItemAvatar>
                <Avatar
                    sx={{ bgcolor: blueGrey[500] }}
                    alt={username}
                    >
                    {username.slice(0, 2)}
                </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={username} 
                    >    
                </ListItemText>
                {ScoreElem}
                {mode === 'admin' ? ScoreButton : null}
            </ListItem>
        <Divider></Divider>
    </>);
}