import HeaderBanner from "../components/top&bottom/headerBanner";
import { Navbar } from "./components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <>
      <HeaderBanner />
      <Navbar />
      {children}
    </>
  );
}

export default ProtectedLayout;