import Navbar from "./Navbar";
import Footer from "./Footer";
import React from "react";

type MyComponentProps = React.PropsWithChildren<{}>;

function Layout({ children }: MyComponentProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
