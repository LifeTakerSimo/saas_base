import { Link } from 'react-router-dom';
import { LoginForm } from 'wasp/client/auth';
import { AuthPageLayout } from './AuthPageLayout';
import { authAppearance } from './authConfig';
import '../styles/global.css';

export default function Login() {
  return (
    <AuthPageLayout>
      <div className="flex flex-col items-center space-y-8 w-full">
        {/* Logo and Title */}
        <div className="text-center space-y-4 w-full">
          <h1 className="text-3xl font-bold tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Welcome Back
            </span>
          </h1>
          <p className="text-white text-lg">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Form Container */}
        <div className="w-full space-y-6 backdrop-blur-sm bg-black/50 p-8 rounded-xl border-2 border-gray-800 hover:border-purple-500/50 transition-all duration-500 group custom-form">
          <LoginForm appearance={authAppearance} socialLayout="vertical"/>
          
          <div className="space-y-4 text-center pt-4 border-t border-gray-800">
            <p className="text-sm text-white">
              Don't have an account yet?{' '}
              <Link 
                to="/signup" 
                className="text-purple-500 hover:text-purple-400 transition-colors font-medium"
              >
                Sign up
              </Link>
            </p>
            
            <p className="text-center text-white">
              Forgot your password ?{' '}
              <Link 
                to="/request-password-reset" 
                className="text-purple-500 hover:text-purple-400 transition-colors font-medium"
              >
                Reset it
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-4 w-full">
          <p className="text-sm text-white text-center">
            By continuing, you agree to our{' '}
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
