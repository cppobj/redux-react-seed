import createReducer from 'redux/reducer';

describe('createReducer helper', () => {
  it('should return reducer function', () => {
    const reducer = createReducer();

    expect(typeof reducer === 'function').toBeTruthy();
  });

  it('should return default initialState when reducer couldn\'t find proper action handler', () => {
    const initialState = {};
    const reducer = createReducer(initialState, {
      test: function test() {},
    });

    expect(reducer(undefined, {})).toBe(initialState);
  });

  it('should invoke action handler', () => {
    const initialState = {
      seed: 1,
      counter: 1,
    };

    const ActionType = {
      INCREMENT_COUNTER: 'INCREMENT_COUNTER',
      INCREMENT_SEED: 'INCREMENT_SEED',
    };

    const incrementCounterAction = { type: ActionType.INCREMENT_COUNTER };
    const incrementSeedAction = { type: ActionType.INCREMENT_SEED };

    const incrementCounterActionHandler = jest.fn();
    const incrementSeedActionHandler = jest.fn();

    const reducer = createReducer(initialState, {
      [ActionType.INCREMENT_COUNTER]: incrementCounterActionHandler,
      [ActionType.INCREMENT_SEED]: incrementSeedActionHandler,
    });

    reducer(initialState, incrementCounterAction);
    reducer(initialState, incrementSeedAction);

    expect(incrementCounterActionHandler).toBeCalledWith(initialState, incrementCounterAction);
    expect(incrementSeedActionHandler).toBeCalledWith(initialState, incrementSeedAction);
  });
});
