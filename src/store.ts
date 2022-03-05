import { api } from "./stores/apiQuery";
import { offline } from "@redux-offline/redux-offline";
import offlineConfig from "@redux-offline/redux-offline/lib/defaults";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "./stores/contacts";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

export function setUpStore(testing = false) {
  const enhancer = testing
    ? composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
    : composeWithDevTools(
        //@ts-ignore
        offline(offlineConfig),
        applyMiddleware(thunk.withExtraArgument(api))
      );
  if (testing) {
  }
  const store = createStore(
    combineReducers({ api: api.reducer, contacts: reducer }),
    enhancer
  );
  return store;
}
const store = setUpStore(true);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
