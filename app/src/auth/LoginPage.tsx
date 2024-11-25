import { Link } from 'react-router-dom';
import { LoginForm } from 'wasp/client/auth';
import { AuthPageLayout } from './AuthPageLayout';
import { authAppearance } from './authConfig';
import '../styles/global.css';
import { useEffect } from 'react';

export default function Login() {
  useEffect(() => {
    const translateDefaultText = () => {
      const elements = document.querySelectorAll('h2, button, label, input');
      elements.forEach(element => {
        if (element.textContent === 'Log in to your account') {
          element.textContent = 'Se connecter';
        }
        if (element.textContent === 'Password') {
          element.textContent = 'Mot de passe';
        }
        if (element.textContent === 'Email') {
          element.textContent = 'Adresse e-mail';
        }
        if (element.textContent === 'Log in') {
          element.textContent = 'Se connecter';
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
      <div className="flex flex-col items-center space-y-8 w-full">
        {/* Logo et Titre */}
        <div className="text-center space-y-4 w-full">
          <h1 className="text-3xl font-bold tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Bon Retour
            </span>
          </h1>
          <p className="text-white text-lg">
            Connectez-vous à votre compte pour continuer
          </p>
        </div>

        {/* Conteneur du Formulaire de Connexion */}
        <div className="w-full space-y-6 backdrop-blur-sm bg-black/50 p-8 rounded-xl border-2 border-gray-800 hover:border-purple-500/50 transition-all duration-500 group custom-form">
          <LoginForm appearance={authAppearance} socialLayout="vertical"/>
          
          <div className="space-y-4 text-center pt-4 border-t border-gray-800">
            <p className="text-sm text-white">
              Vous n'avez pas encore de compte ?{' '}
              <Link 
                to="/signup" 
                className="text-purple-500 hover:text-purple-400 transition-colors font-medium"
              >
                S'inscrire
              </Link>
            </p>
            
            <p className="text-center text-white">
              Mot de passe oublié ?{' '}
              <Link 
                to="/request-password-reset" 
                className="text-purple-500 hover:text-purple-400 transition-colors font-medium"
              >
                Réinitialiser
              </Link>
            </p>
          </div>
        </div>

        {/* Pied de page */}
        <div className="text-center space-y-4 w-full">
          <p className="text-sm text-white text-center">
            En continuant, vous acceptez nos{' '}
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
