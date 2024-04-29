import { useEffect, useRef } from "react";
import Head from "next/head";
import NavBar from "@/components/NavBar";
import Modals from "@/components/Modals";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const audioRef = useRef(
    typeof Audio !== "undefined" && new Audio("/click-sound.mp3")
  );
  useEffect(() => {
    document.body.addEventListener("click", (event: MouseEvent) => {
      const target = event.target as HTMLButtonElement;
      const audio = audioRef.current as HTMLAudioElement;
      if (target.nodeName === "BUTTON") {
        audio.play();
      }
    });
  }, []);

  return (
    <main>
      <Head>
        <title>Next MetaMask Sign-in</title>
        <meta
          name="description"
          content="An application aimed to test sign-in with MetaMask"
        />
      </Head>
      <NavBar />
      <Modals />
      <ToastContainer theme="dark" />
    </main>
  );
}
