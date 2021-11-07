import rankListReducer, {
    updateList
  } from './rankListSlice';
  
  describe('ranklist reducer', () => {
    const initialState = {
        list: [],
        currentScoreInfo: null
    };
    it('should handle initial state', () => {
        expect(rankListReducer(undefined, { type: 'unknown' })).toEqual({
            list: [],
            currentScoreInfo: null
        });
    });
  
    it('should handle decrement', () => {
      const actual = rankListReducer(initialState, updateList({list: [{username: 'Alice', score: 100}]}));
      expect(actual.list).toEqual([{username: 'Alice', score: 100}]);
    });
  });
  