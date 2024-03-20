import Header from "../components/top&bottom/Header";
import HeaderBanner from "../components/top&bottom/headerBanner";


interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <>
      <HeaderBanner />
      <Header />
      {children}
    </>
  );
}

export default ProtectedLayout;