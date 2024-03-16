import Header from "../components/top&bottom/Header";

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div>
      <Header />
      <section className="bg-slate-50 h-dvh">
        {children}
      </section>
    </div>
  );
}

export default ProtectedLayout;