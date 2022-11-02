interface ICenteredContainerProps {
  children: React.ReactNode | React.ReactNode[];
}

const CenteredContainer = ({ children }: ICenteredContainerProps) => {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gray-800 font-bold text-white">
      {children}
    </main>
  );
};

export default CenteredContainer;
