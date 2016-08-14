import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware }             from 'react-router-redux';
import createLogger                     from 'redux-logger';
import thunkMiddleware                  from 'redux-thunk';
import reducers                         from '../reducers';

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

export default function configureStore(browserHistory) {
  const reduxRouterMiddleware = routerMiddleware(browserHistory)
  const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunkMiddleware, loggerMiddleware)(createStore);

  var store = createStoreWithMiddleware(reducers);

  // console.group("TBD");
  // console.log("TBD: Must be patched for ht reload replace reducers?");
  // console.log(["NODE_ENV = ", process.env.NODE_ENV]);
  // console.log(["MIX_ENV = ", process.env.MIX_ENV]);
  // console.log(["(module.hot)=", module.hot]);
  // console.groupEnd();

  // Hot reload reducers
  // TBD: Это нужно делать только в отладочной версии.
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
      }
    )
  }

  return store;
}

// console.log(["configureStore", configureStore]);
