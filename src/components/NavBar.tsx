import { useSDK } from "@metamask/sdk-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setModal } from "@/features/modal/modalSlice";
import {
  selectSignature,
  setSignature,
  AuthModalType,
} from "@/features/signature/signatureSlice";
import styles from "./NavBar.module.css";

export const NavBar = () => {
  const dispatch = useAppDispatch();
  const signatureData = useAppSelector(selectSignature);
  const { sdk, account } = useSDK();

  useEffect(() => {
    if (signatureData.signature) {
      dispatch(setModal({ name: "prompt-sign" }));
    }
  }, [signatureData.signature]);

  const openAuthModal = (tab: AuthModalType) => {
    dispatch(setModal({ name: "auth", props: { tab } }));
  };

  const disconnect = () => {
    dispatch(setSignature(null));
    if (sdk) {
      sdk.terminate();
    }
  };

  return (
    <div className={styles.navbar}>
      {signatureData.signed ? (
        <div className={styles.account}>
          <h1>
            You&apos;re{" "}
            {signatureData.type === "sign-up" ? "signed up" : "signed in"}!
          </h1>
          {signatureData.signature && (
            <p>Signature: ${signatureData.signature}</p>
          )}
          {account && <p>Wallet: ${account}</p>}
          <button onClick={disconnect}>Sign out</button>
        </div>
      ) : (
        <div className={styles.buttons}>
          <button onClick={() => openAuthModal("sign-in")}>Sign in</button>
          <button onClick={() => openAuthModal("sign-up")}>Sign up</button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
