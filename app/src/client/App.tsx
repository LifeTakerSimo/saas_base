import { useAuth } from 'wasp/client/auth';
import { updateCurrentUser } from 'wasp/client/operations';
import './Main.css';
import AppNavBar from './components/AppNavBar';
import CookieConsentBanner from './components/cookie-consent/Banner';
import { useMemo, useEffect, ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { cn } from './cn';
/**
 * use this component to wrap all child components
 * this is useful for templates, themes, and context
 */

export default function App() {
  const location = useLocation();
  const { data: user } = useAuth();

  const shouldDisplayAppNavBar = useMemo(() => {
    return location.pathname !== '/' && location.pathname !== '/login' 
    && location.pathname !== '/signup' 
    && location.pathname !== '/password-reset' 
    && location.pathname !== '/request-password-reset';
  }, [location]);

  const isAdminDashboard = useMemo(() => {
    return location.pathname.startsWith('/admin');
  }, [location]);

  const isLandingPage = useMemo(() => {
    return location.pathname === '/';
  }, [location]);

  const isAuthPage = useMemo(() => {
    return ['/login', '/signup', '/request-password-reset', '/password-reset'].includes(location.pathname);
  }, [location]);

  useEffect(() => {
    if (user) {
      const lastSeenAt = new Date(user.lastActiveTimestamp);
      const today = new Date();
      if (today.getTime() - lastSeenAt.getTime() > 5 * 60 * 1000) {
        updateCurrentUser({ lastActiveTimestamp: today });
      }
    }
  }, [user]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [location]);

  return (
    <div>
      <div className='min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black font-space-grotesk relative'>
        {/* Add a subtle noise texture overlay */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay pointer-events-none" />
        
        {/* Add a subtle gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-blue-500/5" />
        
        {/* Main content */}
        {isAdminDashboard ? (
          <Outlet />
        ) : (
          <>
            {shouldDisplayAppNavBar && <AppNavBar />}
            <div 
              className={cn(
                'relative',
                isLandingPage || isAuthPage ? 'w-full' : 'w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'
              )}
            >
              {/* Enhanced radial gradient mask */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-transparent 
                            [mask-image:radial-gradient(ellipse_at_center,transparent_20%,gray-900)]
                            " />
              <Outlet />
            </div>
          </>
        )}
      </div>
      <CookieConsentBanner />
    </div>
  );
}
