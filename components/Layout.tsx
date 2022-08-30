import Nav from "./Nav";
import Footer from "./Footer";
import React from "react";

type MyComponentProps = React.PropsWithChildren<{}>;

function Layout({ children }: MyComponentProps) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
