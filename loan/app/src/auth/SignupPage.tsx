import { Link } from 'react-router-dom';
import { SignupForm } from 'wasp/client/auth';
import { AuthPageLayout } from './AuthPageLayout';
import { authAppearance } from './authConfig';
import '../styles/global.css';

export function Signup() {
  return (
    <AuthPageLayout>
      <div className="flex flex-col items-center space-y-8">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Create Your Account
            </span>
          </h1>
          <p className="text-white text-lg">
            Join us and start your journey today
          </p>
        </div>

        {/* Signup Form Container */}
        <div className="w-full space-y-6 backdrop-blur-sm bg-black/50 p-8 rounded-xl border-2 border-gray-800 hover:border-purple-500/50 transition-all duration-500 group custom-form">
          <SignupForm appearance={authAppearance} socialLayout="vertical"/>
          
          <div className="space-y-4 text-center pt-4 border-t border-gray-800">
            <p className="text-white">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-purple-500 hover:text-purple-400 transition-colors font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-4">
          <p className="text-sm text-white">
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="text-purple-500 hover:text-purple-400 transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-purple-500 hover:text-purple-400 transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </AuthPageLayout>
  );
}
