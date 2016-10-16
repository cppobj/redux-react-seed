import createAction from 'redux/action';
import { isFSA, isError } from 'flux-standard-action';

describe('createAction() helper', () => {
  it('should return action function', () => {
    const action = createAction('type');

    expect(typeof action === 'function').toBeTruthy();
  });

  it('should fit FSA convention', () => {
    const action = createAction('type');

    expect(isFSA(action(1))).toBeTruthy();
    expect(isFSA(action({ data: 'some data' }))).toBeTruthy();
    expect(isFSA(action(new Error()))).toBeTruthy();
  });

  it('should create payload', () => {
    const action = createAction('payload_type', (data) => {
      return { data, num: 1 };
    });

    const actionObject = action({ test: true });

    expect(isFSA(actionObject)).toBeTruthy();
    expect(actionObject.type).toBe('payload_type');
    expect(actionObject.payload).toEqual({ data: { test: true }, num: 1 });
  });

  it('should create meta', () => {
    const action = createAction('meta_type',
      ({ text }) => {
        return { description: text };
      },
      ({ page, offset }) => {
        return { page, offset };
      }
    );

    const actionObject = action({ text: 'test', page: 3, offset: 200 });

    expect(isFSA(actionObject)).toBeTruthy();
    expect(actionObject.type).toBe('meta_type');
    expect(actionObject.payload).toEqual({ description: 'test' });
    expect(actionObject.meta).toEqual({ page: 3, offset: 200 });
  });

  it('should set error true when payload is Error', () => {
    const MyError = function MyErrorConstructor() {};

    MyError.prototype = Object.create(Error.prototype);

    const action = createAction('error_type');

    const errorAction = action(new Error());
    const myErrorAction = action(new MyError());

    expect(isFSA(errorAction)).toBeTruthy();
    expect(isFSA(myErrorAction)).toBeTruthy();
    expect(isError(errorAction)).toBeTruthy();
    expect(isError(myErrorAction)).toBeTruthy();

    expect(errorAction.type).toBe('error_type');
    expect(myErrorAction.type).toBe('error_type');

    expect(errorAction.error).toBeTruthy();
    expect(myErrorAction.error).toBeTruthy();

    expect(errorAction.payload).toBeInstanceOf(Error);
    expect(myErrorAction.payload).toBeInstanceOf(MyError);
  });

  it('should use identity function for payload creation when payloadCreator isn\'t function', () => {
    const action = createAction('identity_payload', {});

    const actionObject = action(1);
    const otherActionObject = action({ test: 'test' });

    expect(actionObject.type).toBe('identity_payload');
    expect(actionObject.payload).toBe(1);

    expect(otherActionObject.type).toBe('identity_payload');
    expect(otherActionObject.payload).toEqual({ test: 'test' });
  });
});
