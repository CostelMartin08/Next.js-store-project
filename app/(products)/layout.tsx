import Header from "../components/top&bottom/Header";
import HeaderBanner from "../components/top&bottom/headerBanner";


interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <>
      <HeaderBanner />
      <div className="sticky top-0 bg-white z-10">
        <Header />
      </div>
      {children}
    </>
  );
}

export default ProtectedLayout;