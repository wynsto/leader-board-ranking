
import React from 'react';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';

import './RankList.module.css';

import { selectRankList } from './rankListSlice';
import { RankItem } from './RankItem';
import { AddNewScore } from './AddNewScore';
import { Grid, Paper } from '@mui/material';

// player's score rank list
export function RankList() {
    const { list } = useSelector(selectRankList);
    return  <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
            <Paper>
            <List>
                {list.map(item => 
                    <RankItem username={item.username} key={item.id} id={item.id} score={item.score}/>
                )}
            </List>
            </Paper>
        </Grid>
        <Grid item xs={6} md={4}>
            <AddNewScore />
        </Grid>
    </Grid>
}