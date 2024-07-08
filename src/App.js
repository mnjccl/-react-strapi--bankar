import "./App.css";
import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import SignUp from "./components/SighUp";
import Footer from "./components/Footer";
import Overlay from "./components/Overlay";
import LogIn from "./components/LogIn";
import BtnLogOut from "./components/BtnLogOut";
import HomePage from "./components/HomePage";
import Bankar from "./components/Bankar";

export default function App() {
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);
  const [user, setUser] = useState(null);

  const resetStates = function () {
    setIsOpenOverlay(false);
    setUser(null);
  };

  useEffect(
    function () {
      document.body.style.overflow = isOpenOverlay ? "hidden" : "visible";
    },
    [isOpenOverlay]
  );

  return (
    <>
      {isOpenOverlay && (
        <Overlay>
          <BtnLogOut resetStates={resetStates} />
          {user ? (
            <Bankar user={user} resetStates={resetStates} />
          ) : (
            <LogIn setUser={setUser} />
          )}
        </Overlay>
      )}

      <HomePage>
        <Hero setIsOpenOverlay={setIsOpenOverlay} />
        <About />
        <Features />
        <SignUp />
        <Footer setIsOpenOverlay={setIsOpenOverlay} />
      </HomePage>
    </>
  );
}
