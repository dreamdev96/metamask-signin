import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setModal } from "@/features/modal/modalSlice";
import {
  selectSignature,
  setSigned,
} from "@/features/signature/signatureSlice";
import styles from "./Modals.module.css";

const PromptSignModal = () => {
  const dispatch = useAppDispatch();
  const signatureData = useAppSelector(selectSignature);

  const onSign = async () => {
    try {
      const { data } = await axios.post("/api/auth/metamask/sign-in", {
        signature: signatureData.signature,
        wallet: signatureData.wallet,
      });
      dispatch(setSigned(data.signed));
      dispatch(setModal(null));
    } catch (error) {
      console.log(error);
      dispatch(setSigned(false));
    }
  };

  const onClose = () => dispatch(setModal(null));

  return (
    <div className={styles.dialog}>
      <button className={styles.closeBtn} onClick={onClose} />
      <div className={styles.content}>
        <p>
          Prompt:{" "}
          <span style={{ textTransform: "capitalize" }}>
            {signatureData.type}
          </span>{" "}
          to TEST_APP
        </p>
        <p>Signature: {signatureData.signature}</p>
        <p>Wallet: {signatureData.wallet}</p>
        <button onClick={onSign}>Sign</button>
      </div>
    </div>
  );
};

export default PromptSignModal;
