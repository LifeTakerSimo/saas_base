import { Link } from 'react-router-dom';
import { SignupForm } from 'wasp/client/auth';
import { AuthPageLayout } from './AuthPageLayout';
import { authAppearance } from './authConfig';
import '../styles/global.css';
import { useEffect } from 'react';

export function Signup() {
  useEffect(() => {
    const translateDefaultText = () => {
      const elements = document.querySelectorAll('h2, button');
      elements.forEach(element => {
        if (element.textContent === 'Create a new account') {
          element.textContent = 'Créer un nouveau compte';
        }
        // Add other translations if needed
        if (element.textContent === 'Sign up') {
          element.textContent = 'S\'inscrire';
        }
      });
    };

    translateDefaultText();
    const observer = new MutationObserver(translateDefaultText);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    return () => observer.disconnect();
  }, []);

  return (
    <AuthPageLayout>
      <div className="flex flex-col items-center space-y-8">
        {/* Logo et Titre */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Créez Votre Compte
            </span>
          </h1>
          <p className="text-white text-lg">
            Rejoignez-nous et commencez votre aventure dès aujourd'hui. Profitez d'un essai gratuit de 15 jours!
          </p>
        </div>
        <div className="w-full space-y-6 backdrop-blur-sm bg-black/50 p-8 rounded-xl border-2 border-gray-800 hover:border-purple-500/50 transition-all duration-500 group custom-form">
          <SignupForm appearance={authAppearance} socialLayout="vertical"/>
          
          <div className="space-y-4 text-center pt-4 border-t border-gray-800">
            <p className="text-white">
              Vous avez déjà un compte ?{' '}
              <Link 
                to="/login" 
                className="text-purple-500 hover:text-purple-400 transition-colors font-medium"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>

        {/* Pied de page */}
        <div className="text-center space-y-4">
          <p className="text-sm text-white">
            En créant un compte, vous acceptez nos{' '}
            <Link to="/terms" className="text-purple-500 hover:text-purple-400 transition-colors">
              Conditions d'Utilisation
            </Link>{' '}
            et notre{' '}
            <Link to="/privacy" className="text-purple-500 hover:text-purple-400 transition-colors">
              Politique de Confidentialité
            </Link>
          </p>
        </div>
      </div>
    </AuthPageLayout>
  );
}
