import { useEffect, useState, useRef } from "react";
import { TextField } from "@mui/material";
import { useSDK } from "@metamask/sdk-react";
import axios from "axios";
import { toast } from "react-toastify";
import { setSignature, setSigned } from "@/features/signature/signatureSlice";
import { useAppDispatch } from "@/app/hooks";
import { setModal } from "@/features/modal/modalSlice";

const SignUpTab = () => {
  const dispatch = useAppDispatch();
  const { sdk, connecting, account, connected } = useSDK();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (connected && account) {
      axios(`/api/eth/nonce?wallet=${account}`)
        .then((res) => dispatch(setSignature({ type: "sign-up", ...res.data })))
        .catch((err) => {
          console.log(err);
          dispatch(setSignature(null));
        });
    }
  }, [connected, account]);

  const onConnectWallet = async () => {
    if (!username) {
      usernameRef.current?.focus();
      toast("Username is required!");
      return;
    }
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const onSignUp = async () => {
    if (!username) {
      usernameRef.current?.focus();
      toast("Username is required!");
      return;
    }
    if (!email) {
      emailRef.current?.focus();
      toast("E-mail address is required!");
      return;
    }
    if (!password) {
      passwordRef.current?.focus();
      toast("Password is required!");
      return;
    }
    try {
      const { data } = await axios.post("/api/auth/email/sign-up", {
        username,
        email,
        password,
      });
      dispatch(setSigned(data.signed));
      dispatch(setModal(null));
    } catch (error) {
      console.log(error);
      dispatch(setSigned(false));
    }
  };

  return (
    <>
      <TextField
        id="username"
        label="Username"
        variant="outlined"
        value={username}
        required
        onChange={(e) => setUsername(e.target.value)}
        inputRef={usernameRef}
      />
      <TextField
        id="email"
        label="E-mail"
        variant="outlined"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        inputRef={emailRef}
      />
      <TextField
        id="password"
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        inputRef={passwordRef}
      />
      <button onClick={onSignUp}>Sign up</button>
      <button disabled={connecting} onClick={onConnectWallet}>
        Connect wallet
      </button>
    </>
  );
};

export default SignUpTab;
