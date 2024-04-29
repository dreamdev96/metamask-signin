import { useEffect, useState } from "react";
import { Dialog, useTheme, useMediaQuery } from "@mui/material";
import AuthModal from "@/components/AuthModal";
import PromptSignModal from "@/components/PromptSignModal";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { selectModal, setModal } from "@/features/modal/modalSlice";

const Modals = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectModal);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (modal.name) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [modal.name]);

  const onClose = () => dispatch(setModal(null));

  return (
    <Dialog open={isOpen} onClose={onClose} fullScreen={fullScreen}>
      {modal.name === "auth" && <AuthModal {...modal.props} />}
      {modal.name === "prompt-sign" && <PromptSignModal {...modal.props} />}
    </Dialog>
  );
};

export default Modals;
