import Footer from "../components/Footer.tsx";
import { Outlet } from "react-router-dom";
import Header from "../components/Header.tsx";

const DefaultLayout = () => {
  return (
    <div className={"h-dvh flex flex-col"}>
      <Header />
      <main className={"flex-1"}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
