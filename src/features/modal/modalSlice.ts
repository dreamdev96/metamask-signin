import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "@/app/store";

interface ModalState {
  name: string;
  props?: any;
}

export const initialState: ModalState = {
  name: "",
  props: {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<ModalState | null>) => {
      if (action.payload) {
        const { name, props } = action.payload;
        state.name = name;
        state.props = props || {};
      } else {
        state.name = "";
        state.props = {};
      }
    },
  },
});

export const { setModal } = modalSlice.actions;

export const selectModal = (state: AppState) => state.modal;

export default modalSlice.reducer;
