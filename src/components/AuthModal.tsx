import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SignInTab from "./SignInTab";
import SignUpTab from "./SignUpTab";
import { useAppDispatch } from "@/app/hooks";
import { setModal } from "@/features/modal/modalSlice";
import { AuthModalType } from "@/features/signature/signatureSlice";
import styles from "./Modals.module.css";

const AuthModal: React.FC<{
  tab: AuthModalType;
}> = ({ tab }) => {
  const [currentTab, setCurrentTab] = useState(tab);
  const dispatch = useAppDispatch();

  const handleTabChange = (
    e: React.SyntheticEvent,
    currentTab: AuthModalType
  ) => {
    e.preventDefault();
    setCurrentTab(currentTab);
  };

  const onClose = () => dispatch(setModal(null));

  return (
    <div className={styles.dialog}>
      <button className={styles.closeBtn} onClick={onClose} />
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        aria-label="basic tabs example"
        variant="fullWidth"
      >
        <Tab label="Sign in" value="sign-in" />
        <Tab label="Sign up" value="sign-up" />
      </Tabs>
      <div className={styles.content}>
        {currentTab === "sign-in" && <SignInTab />}
        {currentTab === "sign-up" && <SignUpTab />}
      </div>
    </div>
  );
};

export default AuthModal;
