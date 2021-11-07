import { WebSocketServer } from 'ws';
import { v4 as uuid } from 'uuid';
import generateUserList from './userList.mjs';

const users = generateUserList()
const wss = new WebSocketServer({ port: 3001 });
const ranking = [...users].sort((a, b) => {
  return +b.score - +a.score
})

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
    data = JSON.parse(data)
    let message, user, index
    switch(data.action) {
      case 'add':
        user = data.payload
        user.score = +user.score
        user.id = uuid()
        ranking.push(user);
        ranking.sort((a, b) => {
          return +b.score - +a.score
        })
        message = {
          action: 'updateList',
          payload: {list: ranking.slice(0, 10)}
        }
        wss.clients.forEach((ws) => {
          ws.send(JSON.stringify(message));
        })
        break;
      case 'update':
        const {id, score} = data.payload
        console.log('case update', id, score)
        index = ranking.findIndex(item => {
          return item.id === id
        })
        if (index > -1 && ranking[index]) { 
          ranking[index].score = +score
          ranking.sort((a, b) => {
            return +b.score - +a.score
          })
          message = {
            action: 'updateList',
            payload: {list: ranking.slice(0, 10)}
          }
          wss.clients.forEach((ws) => {
            ws.send(JSON.stringify(message));
          })
        }
        break;
      case 'load':
        message = {
          action: 'updateList',
          payload: {list: ranking.slice(0, 10)}
        }
        console.log('send', JSON.stringify(message))
        ws.send(JSON.stringify(message));
        break
      case 'get':
        index = ranking.findIndex(item => {
          return item.id === id
        })
        const rankInfo = ranking[index]
        message = {
          action: 'updateInfo',
          payload: {rankInfo}
        }
        console.log('send', JSON.stringify(message))
        ws.send(JSON.stringify(message));
        break
    }
  });
});
