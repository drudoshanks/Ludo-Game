
// Unit tests for: handleForwardThunk


import { playSound } from '../../../helpers/SoundUtility';
import { handleForwardThunk } from '../gameAction';
import { selectCurrentPositions, selectDiceNo } from '../gameSelectors';
import {
    announceWinner,
    disableTouch,
    updatePlayerChance,
    updatePlayerPieceValue
} from '../gameSlice';


// Mock dependencies
jest.mock("../gameSlice", () => ({
  updatePlayerPieceValue: jest.fn(),
  updatePlayerChance: jest.fn(),
  disableTouch: jest.fn(),
  unfreezeDice: jest.fn(),
  updateFireworks: jest.fn(),
  announceWinner: jest.fn(),
}));

jest.mock("../../../helpers/SoundUtility", () => ({
  playSound: jest.fn(),
}));

jest.mock("../gameSelectors", () => ({
  selectCurrentPositions: jest.fn(),
  selectDiceNo: jest.fn(),
}));

describe('handleForwardThunk() handleForwardThunk method', () => {
  let dispatch, getState;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  describe('Happy Path', () => {
    it('should move the player piece forward based on dice number', async () => {
      // Setup initial state
      const initialState = {
        game: {
          player1: [{ id: 'A1', pos: 0, travelCount: 0 }],
        },
      };
      getState.mockReturnValue(initialState);
      selectCurrentPositions.mockReturnValue([{ id: 'A1', pos: 0 }]);
      selectDiceNo.mockReturnValue(3);

      // Execute the thunk
      await handleForwardThunk(1, 'A1', 0)(dispatch, getState);

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith(disableTouch());
      expect(dispatch).toHaveBeenCalledWith(
        updatePlayerPieceValue({
          playerNo: 'player1',
          pieceId: 'A1',
          pos: 3,
          travelCount: 3,
        })
      );
      expect(playSound).toHaveBeenCalledWith('pile_move');
    });

    it('should announce winner when player meets winning criteria', async () => {
      // Setup initial state
      const initialState = {
        game: {
          player1: [{ id: 'A1', pos: 56, travelCount: 56 }],
        },
      };
      getState.mockReturnValue(initialState);
      selectCurrentPositions.mockReturnValue([{ id: 'A1', pos: 56 }]);
      selectDiceNo.mockReturnValue(1);

      // Execute the thunk
      await handleForwardThunk(1, 'A1', 56)(dispatch, getState);

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith(announceWinner(1));
      expect(playSound).toHaveBeenCalledWith('home_win');
      expect(playSound).toHaveBeenCalledWith('cheer', true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle collision with enemy piece', async () => {
      // Setup initial state
      const initialState = {
        game: {
          player1: [{ id: 'A1', pos: 0, travelCount: 0 }],
          player2: [{ id: 'B1', pos: 3, travelCount: 3 }],
        },
      };
      getState.mockReturnValue(initialState);
      selectCurrentPositions.mockReturnValue([
        { id: 'A1', pos: 0 },
        { id: 'B1', pos: 3 },
      ]);
      selectDiceNo.mockReturnValue(3);

      // Execute the thunk
      await handleForwardThunk(1, 'A1', 0)(dispatch, getState);

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith(disableTouch());
      expect(dispatch).toHaveBeenCalledWith(
        updatePlayerPieceValue({
          playerNo: 'player1',
          pieceId: 'A1',
          pos: 3,
          travelCount: 3,
        })
      );
      expect(playSound).toHaveBeenCalledWith('pile_move');
      expect(playSound).toHaveBeenCalledWith('collide');
    });

    it('should handle dice roll of six by giving another chance', async () => {
      // Setup initial state
      const initialState = {
        game: {
          player1: [{ id: 'A1', pos: 0, travelCount: 0 }],
        },
      };
      getState.mockReturnValue(initialState);
      selectCurrentPositions.mockReturnValue([{ id: 'A1', pos: 0 }]);
      selectDiceNo.mockReturnValue(6);

      // Execute the thunk
      await handleForwardThunk(1, 'A1', 0)(dispatch, getState);

      // Verify dispatch calls
      expect(dispatch).toHaveBeenCalledWith(disableTouch());
      expect(dispatch).toHaveBeenCalledWith(
        updatePlayerPieceValue({
          playerNo: 'player1',
          pieceId: 'A1',
          pos: 6,
          travelCount: 6,
        })
      );
      expect(dispatch).toHaveBeenCalledWith(
        updatePlayerChance({ chancePlayer: 1 })
      );
      expect(playSound).toHaveBeenCalledWith('pile_move');
    });
  });
});

// End of unit tests for: handleForwardThunk
