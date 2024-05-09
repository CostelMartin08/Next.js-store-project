import HeaderBanner from "../components/top&bottom/headerBanner";
import { Navbar } from "./components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <>
      <HeaderBanner />
      <div style={{ backgroundColor: 'rgb(233 233 233)' }} className="sticky top-0 z-20">
        <Navbar />
      </div>
      {children}
    </>
  );
}

export default ProtectedLayout;