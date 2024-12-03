import { Link } from 'react-router-dom';
import { ResetPasswordForm } from 'wasp/client/auth';
import { AuthPageLayout } from '../AuthPageLayout';
import { authAppearance } from './../authConfig';
import '../../styles/global.css';
export function PasswordResetPage() {
  return (
    <AuthPageLayout>
      <div className="flex flex-col items-center space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Réinitialiser Votre Mot de Passe
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Entrez votre nouveau mot de passe ci-dessous
          </p>
        </div>

        <div className="w-full space-y-6 backdrop-blur-sm bg-black/50 p-8 rounded-xl border-2 border-gray-800 hover:border-purple-500/50 transition-all duration-500 group custom-form">
          <ResetPasswordForm appearance={authAppearance} />
          <div className="text-center pt-4 border-t border-gray-800">
            <span className='text-sm text-white'>
              Si tout est en ordre, {' '}
              <Link to='/login' className='text-purple-500 hover:text-purple-400 transition-colors'>
                retournez à la connexion
              </Link>
            </span>
          </div>
        </div>
      </div>
    </AuthPageLayout>
  );
}
