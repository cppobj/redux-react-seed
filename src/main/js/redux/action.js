import isFunction from 'lodash/isFunction';
import identity from 'lodash/identity';

export default function createAction(type, payloadCreator = identity, metaCreator) {
  const makePayload = isFunction(payloadCreator) ? payloadCreator : identity;

  return function actionF(...actionArgs) {
    const action = {
      type,
    };

    const payload = makePayload(...actionArgs);

    action.payload = payload;

    if (payload instanceof Error) {
      action.error = true;
    }

    if (isFunction(metaCreator)) {
      action.meta = metaCreator(...actionArgs);
    }

    return action;
  };
}
