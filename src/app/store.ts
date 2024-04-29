import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import modalReducer from "@/features/modal/modalSlice";
import signatureReducer from "@/features/signature/signatureSlice";

export function makeStore() {
  return configureStore({
    reducer: { modal: modalReducer, signature: signatureReducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
