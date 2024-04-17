const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen flex flex-col justify-center items-center border-2">
      <div className="p-10 rounded-md w-1/3">{children}</div>
    </main>
  );
};

export default AuthLayout;
