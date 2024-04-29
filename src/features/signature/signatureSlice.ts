import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "@/app/store";

export type AuthModalType = "sign-in" | "sign-up";

interface SignatureState {
  signed: boolean;
  wallet: string;
  signature: string;
  type: AuthModalType | "";
}

export const initialState: SignatureState = {
  signed: false,
  wallet: "",
  signature: "",
  type: "",
};

export const signatureSlice = createSlice({
  name: "signature",
  initialState,
  reducers: {
    setSignature: (state, action: PayloadAction<SignatureState | null>) => {
      if (action.payload) {
        const { wallet, signature, type } = action.payload;
        state.wallet = wallet;
        state.signature = signature;
        state.type = type;
      } else {
        state.wallet = "";
        state.signature = "";
        state.type = "";
        state.signed = false;
      }
    },
    setSigned: (state, action: PayloadAction<boolean>) => {
      state.signed = action.payload;
    },
  },
});

export const { setSignature, setSigned } = signatureSlice.actions;

export const selectSignature = (state: AppState) => state.signature;

export default signatureSlice.reducer;
