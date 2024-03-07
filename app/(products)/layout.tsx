import Header from "../components/top&bottom/Header";

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default ProtectedLayout;