import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const Layout = ({ children }) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ flexBasis: "12%" }}>
          <Sidebar />
        </div>

        <div style={{ flexBasis: "88%", border: "1px solid" }}>
          <Navbar />
          {children}
        </div>
      </div>
    </>
  );
};
