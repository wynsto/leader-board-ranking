import rankListReducer, {
    updateList,
    updateMode
  } from './rankListSlice';
  
  describe('ranklist reducer', () => {
    const initialState = {
        list: [],
        current: null,
        mode: "gamer"
    };
    it('should handle initial state', () => {
        expect(rankListReducer(undefined, { type: 'unknown' })).toEqual({
            list: [],
            current: null,
            mode: "gamer"
        });
    });
  
    it('should handle update list', () => {
        const actual = rankListReducer(initialState, updateList({list: [{username: 'Alice', score: 100}]}));
        expect(actual.list).toEqual([{username: 'Alice', score: 100}]);
    });

    it('should handle update mode', () => {
        let actual = rankListReducer(initialState, updateMode({mode: 'admin'}));
        expect(actual.mode).toEqual('admin');
        actual = rankListReducer(initialState, updateMode({mode: 'gamer'}));
        expect(actual.mode).toEqual('gamer');
    });

  });
  