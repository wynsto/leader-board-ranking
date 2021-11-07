import websocketReducer, {
    connected, disconnected
  } from './websocketSlice';
  
  describe('websocket reducer', () => {
    const initialState = {
        connected: false,
        message: ''
    }
    it('should handle initial state', () => {
        expect(websocketReducer(undefined, { type: 'unknown' })).toEqual({
            connected: false,
            message: ''
        });
    });
  
    it('should handle disconnect', () => {
        const actual = websocketReducer(initialState, connected());
        expect(actual.connected).toEqual(true);
    });
  
    it('should handle connect', () => {
        const actual = websocketReducer(initialState, disconnected());
        expect(actual.connected).toEqual(false);
    });
  
  });
  