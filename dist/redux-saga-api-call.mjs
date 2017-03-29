import _regeneratorRuntime from 'babel-runtime/regenerator';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import { call, put, select } from 'redux-saga/effects';

/**
 * Retrieves data from a passed selector and dispatch an START action with that information, then calls the api with the information merged with the payload, if the api call succedded, dispatches a SUCCESS action with the response on the payload, otherwise, dispatches a FAILURE action with the error
 * @param {function} apiMethod
 * @param {object} options
 * @return {function} generator function that receives the action from the saga
 */
function apiSaga(apiMethod) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var selectFromState = options.selectFromState,
      transformResponse = options.transformResponse,
      transformError = options.transformError;

  return _regeneratorRuntime.mark(function apiSagaResponse(action) {
    var selectedData, _ref, response, error;

    return _regeneratorRuntime.wrap(function apiSagaResponse$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!selectFromState) {
              _context.next = 6;
              break;
            }

            _context.next = 3;
            return select(selectFromState);

          case 3:
            _context.t0 = _context.sent;
            _context.next = 7;
            break;

          case 6:
            _context.t0 = {};

          case 7:
            selectedData = _context.t0;
            _context.next = 10;
            return put({
              type: action.type + '_START',
              payload: action.payload,
              selectedData: selectedData
            });

          case 10:
            _context.next = 12;
            return call(apiMethod, _Object$assign({}, {
              selectedData: selectedData
            }, {
              payload: action.payload
            }));

          case 12:
            _ref = _context.sent;
            response = _ref.response;
            error = _ref.error;

            if (!response) {
              _context.next = 20;
              break;
            }

            _context.next = 18;
            return put({
              type: action.type + '_SUCCESS',
              payload: transformResponse ? transformResponse(response) : response
            });

          case 18:
            _context.next = 22;
            break;

          case 20:
            _context.next = 22;
            return put({
              type: action.type + '_FAILURE',
              payload: transformError ? transformError(error) : error
            });

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, apiSagaResponse, this);
  });
}

export default apiSaga;
//# sourceMappingURL=redux-saga-api-call.mjs.map
