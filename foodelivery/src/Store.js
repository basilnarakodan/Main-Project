import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import Reducers from './reducers';
import thunk from 'redux-thunk'

const Store = createStore(Reducers, applyMiddleware(thunk));

const getToken = () => Store?.getState()?.generalState?.token;
// const getUserData = () => Store?.getState()?.generalState?.userData
const getUserData = () => {
    return new Promise(resolve => {
      const intervalId = setInterval(() => {
        const userData = Store?.getState()?.generalState?.userData;
        if (userData) {
          clearInterval(intervalId);
          resolve(userData);
        }
      }, 100);
    });
  };
  

export { Store, getToken ,getUserData};