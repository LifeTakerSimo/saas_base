import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from "../components/ui/button"
import { LanguageSelector } from './LanguageSelector'
import { useAuth } from 'wasp/client/auth'
import { Dialog } from '@headlessui/react'
import { HiBars3 } from 'react-icons/hi2'
import { AiFillCloseCircle } from 'react-icons/ai'
import DropdownUser from '../../user/DropdownUser'
import { motion } from 'framer-motion'

export default function Header() {
  const { data: user, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isAuthPage = ['/login', '/signup', '/request-password-reset', '/password-reset'].includes(location.pathname)

  const Logo = () => (
    <Link className="flex items-center justify-center" to="/">
      <span className="sr-only">ForsaImmo</span>
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
        ForsaImmo
      </span>
    </Link>
  )

  const navigation = [
    { name: 'Fonctionnalités', href: '#features' },
    { name: 'Simulateurs', href: '#simulate' },
    { name: 'Tarifs', href: '#pricing' }
  ]

  return (
    <>
      <div className="h-16" />
      <motion.header
        initial={{ y: 0 }}
        animate={{ 
          y: 0, 
          scale: isScrolled ? 0.98 : 1,
        }}
        transition={{ duration: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 
          ${isScrolled 
            ? 'mx-auto max-w-7xl mt-2 rounded-2xl border border-gray-800 bg-black shadow-lg shadow-purple-950/20' 
            : 'w-full bg-black border-b border-gray-800'
          }`}
      >
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left Section - Logo */}
            <div className="flex items-center">
              <Logo />
            </div>

            {/* Center Section - Navigation (Desktop) */}
            {!isAuthPage && (
              <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
                <div className="flex items-center justify-center space-x-12 w-full">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(item.href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-base font-medium text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                  {!isLoading && user && (
                    <Link
                      to="/demo-app"
                      className="text-base font-medium text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Tableau de bord
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Right Section - Auth Buttons/User Menu (Desktop) */}
            <div className="hidden lg:flex items-center space-x-4">
              {!isLoading && !user ? (
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="ghost" 
                    className="text-base font-medium text-gray-400 hover:text-white transition-colors"
                    onClick={() => navigate('/login')}
                  >
                    Se connecter
                  </Button>
                  <Button 
                    className="text-base bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                    onClick={() => navigate('/signup')}
                  >
                    Créer un compte
                  </Button>
                </div>
              ) : (
                <DropdownUser user={user} />
              )}
            </div>

            {/* Mobile Menu Button */}
            {!isAuthPage && (
              <div className="lg:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open main menu</span>
                  <HiBars3 className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black/95 backdrop-blur-lg px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              className="rounded-md p-2.5 text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <AiFillCloseCircle className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-3 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item.href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
                      setMobileMenuOpen(false);
                    }}
                    className="block px-3 py-2.5 text-lg font-medium text-gray-400 hover:text-white"
                  >
                    {item.name}
                  </a>
                ))}
                {!isLoading && user && (
                  <Link
                    to="/demo-app"
                    className="block px-3 py-2.5 text-lg font-medium text-purple-400 hover:text-purple-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Tableau de bord
                  </Link>
                )}
              </div>
              <div className="py-6">
                {!isLoading && !user ? (
                  <div className="space-y-4 mt-4">
                    <Button 
                      variant="ghost" 
                      className="w-full text-sm font-medium text-gray-400 hover:text-white"
                      onClick={() => {
                        navigate('/login');
                        setMobileMenuOpen(false);
                      }}
                    >
                      Se connecter
                    </Button>
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                      onClick={() => {
                        navigate('/signup');
                        setMobileMenuOpen(false);
                      }}
                    >
                      Créer un compte
                    </Button>
                  </div>
                ) : (
                  <div className="mt-4">
                    <DropdownUser user={user} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}
