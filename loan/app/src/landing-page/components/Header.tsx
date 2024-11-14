import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from "../components/ui/button"
import { LanguageSelector } from './LanguageSelector'
import { useAuth } from 'wasp/client/auth'


export default function Header() {
  const { data: user, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthPage = ['/login', '/signup', '/request-password-reset', '/password-reset'].includes(location.pathname)

  const Logo = () => (
    <Link className="flex items-center justify-center" to="/">
      <span className="sr-only">Loan Simulator</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-purple-500"
      >
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
      </svg>
      <span className="ml-2 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        LoanSim
      </span>
    </Link>
  )

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b border-gray-800 bg-black/50 backdrop-blur-sm fixed w-full z-50">
      {isAuthPage ? (
        <div className="w-full flex justify-center">
          <Logo />
        </div>
      ) : (
        <>
          <Logo />
          <div className="flex-1 flex justify-center">
            <nav className="flex items-center space-x-8 ml-12">
              <Link 
                to="#features" 
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Features
              </Link>
              <Link 
                to="#simulate" 
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('simulate')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Simulators
              </Link>          
              <Link 
                to="#pricing" 
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Pricing
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {!isLoading && !user ? (
              <>
                <Button 
                  variant="ghost" 
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                  onClick={() => navigate('/signup')}
                >
                  Create Account
                </Button>
              </>
            ) : (
              <Button 
                variant="ghost" 
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                onClick={() => {
                  // Add your logout logic here
                  // logout()
                }}
              >
                Logout
              </Button>
            )}
            
            <select className="bg-gray-800 text-gray-400 text-sm rounded-md px-2 py-1 border border-gray-700">
              <option value="en">EN</option>
              <option value="fr">FR</option>
            </select>
          </div>
        </>
      )}
    </header>
  )
}
