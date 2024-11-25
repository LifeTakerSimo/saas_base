import { ForgotPasswordForm } from 'wasp/client/auth';
import { AuthPageLayout } from '../AuthPageLayout';
import { authAppearance } from './../authConfig';
import { Link } from 'wasp/client/router';
import '../../styles/global.css';

export function RequestPasswordResetPage() {
  return (
    <AuthPageLayout>
      <div className="flex flex-col items-center space-y-8">
        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Reset Your Password
            </span>
          </h1>
          <p className="text-white text-lg">
            Enter your email to reset your password
          </p>
        </div>

        <div className="w-full space-y-6 backdrop-blur-sm bg-black/50 p-8 rounded-xl border-2 border-gray-800 hover:border-purple-500/50 transition-all duration-500 group custom-form">
          <ForgotPasswordForm appearance={authAppearance} />
          <div className="text-center pt-4 border-t border-gray-800">
            <span className='text-white'>
              Remember your password? {' '}
              <Link to='/login' className='text-purple-500 hover:text-purple-400 transition-colors'>
                Sign in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </AuthPageLayout>
  );
}
