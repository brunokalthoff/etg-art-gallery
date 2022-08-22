import Navbar from "./Navbar";
import React from "react";

type MyComponentProps = React.PropsWithChildren<{}>;

function Layout({ children }: MyComponentProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default Layout;
