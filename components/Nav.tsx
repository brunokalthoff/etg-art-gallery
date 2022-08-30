import Navbar from "./Navbar";
import NavSide from "./NavSide";
import { useState, useEffect } from "react";

function Nav() {
  const [width, setwidth] = useState(0);

  useEffect(() => {
    setwidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setwidth(window.innerWidth);
      console.log(window.innerWidth);
    });
  }, []);

  if (width < 900) return <NavSide />;
  else return <Navbar />;
}

export default Nav;
