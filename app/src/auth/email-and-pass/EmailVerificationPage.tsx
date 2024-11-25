import { Link } from 'react-router-dom';
import { VerifyEmailForm } from 'wasp/client/auth';
import { Mail, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import '../../../../app/src/styles/global.css';

export function EmailVerificationPage() {
  const [pageText, setPageText] = useState({
    title: '',
    message: ''
  });

  useEffect(() => {
    // Catch and translate any text that contains "Email verification" or similar
    const translateText = (text: string) => {
      if (text.includes('Email verification')) {
        setPageText(prev => ({
          ...prev,
          title: 'Vérification de l\'email'
        }));
      }
      
      if (text.includes('Your email has been verified')) {
        setPageText(prev => ({
          ...prev,
          message: 'Votre email a été vérifié. Vous pouvez maintenant vous connecter.'
        }));
      }
    };

    // Initial translation
    translateText('Email verification');
    translateText('Your email has been verified. You can now log in.');

    // You could also listen to changes in the VerifyEmailForm component
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'characterData' || mutation.type === 'childList') {
          const text = (mutation.target as HTMLElement).textContent || '';
          translateText(text);
        }
      });
    });

    const formElement = document.querySelector('.custom-form');
    if (formElement) {
      observer.observe(formElement, {
        childList: true,
        characterData: true,
        subtree: true
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md px-4 sm:px-6">
        {/* Welcome Text Animation */}
        <div className="text-center mb-12 relative">
          <span className="absolute -top-24 left-1/2 transform -translate-x-1/2 text-5xl font-bold 
                         bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500
                         animate-gradient-x">
            Bienvenue!
          </span>
        </div>

        <div className="w-full">
          <Link 
            to="/login" 
            className="mb-8 text-gray-400 hover:text-white flex items-center gap-2 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à la connexion</span>
          </Link>

          <div className="mb-8">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 p-2.5
                          hover:scale-105 transform transition-all duration-300">
              <Mail className="w-full h-full text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent 
                         bg-gradient-to-r from-purple-400 to-pink-400">
            {pageText.title}
          </h2>
          
          <p className="mt-4 text-sm text-gray-400">
            {pageText.message}
          </p>

          <div className="mt-8">
            <div className="backdrop-blur-sm border border-gray-800 rounded-xl p-6 
                          hover:border-purple-500/50 transition-all duration-500
                          hover:shadow-lg hover:shadow-purple-500/10">
              <div className="custom-form">
                <VerifyEmailForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
