import Header from '../landing-page/components/Header';

export function AuthPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-gray-800 to-black">
      <Header />
      <div className="container mx-auto pt-20">
        <div className="flex min-h-[calc(100vh-64px)] w-full items-center justify-center">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
