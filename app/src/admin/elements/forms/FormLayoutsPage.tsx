import { type AuthUser } from 'wasp/auth';
import Breadcrumb from '../../layout/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useRedirectHomeUnlessUserIsAdmin } from '../../useRedirectHomeUnlessUserIsAdmin';

const FormLayout = ({ user }: { user: AuthUser }) => {
  useRedirectHomeUnlessUserIsAdmin({ user });

  return (
    <DefaultLayout user={user}>
      <Breadcrumb pageName='FormLayout' />

      <div className='grid grid-cols-1 gap-9 sm:grid-cols-2'>
        <div className='flex flex-col gap-9'>
          {/* Contact Form */}
          <div className='backdrop-blur-sm bg-black/50 p-8 rounded-xl border-2 border-gray-800 hover:border-purple-500/50 transition-all duration-500 group'>
            <div className='border-b border-gray-800 pb-4 mb-6'>
              <h3 className='font-medium text-white'>Contact Form</h3>
            </div>
            <form action='#'>
              <div className='space-y-6'>
                <div className='flex flex-col gap-6 xl:flex-row'>
                  <div className='w-full xl:w-1/2'>
                    <label className='block text-sm font-medium text-gray-300 mb-2'>First name</label>
                    <input
                      type='text'
                      placeholder='Enter your first name'
                      className='w-full bg-gray-800/50 border-gray-700 rounded-lg px-4 py-2 text-white
                      focus:border-purple-500 focus:ring-purple-500/20 placeholder-gray-500 transition-all duration-300'
                    />
                  </div>

                  <div className='w-full xl:w-1/2'>
                    <label className='block text-sm font-medium text-gray-300 mb-2'>Last name</label>
                    <input
                      type='text'
                      placeholder='Enter your last name'
                      className='w-full bg-gray-800/50 border-gray-700 rounded-lg px-4 py-2 text-white
                      focus:border-purple-500 focus:ring-purple-500/20 placeholder-gray-500 transition-all duration-300'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>
                    Email <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='email'
                    placeholder='Enter your email address'
                    className='w-full bg-gray-800/50 border-gray-700 rounded-lg px-4 py-2 text-white
                    focus:border-purple-500 focus:ring-purple-500/20 placeholder-gray-500 transition-all duration-300'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Subject</label>
                  <select className='w-full bg-gray-800/50 border-gray-700 rounded-lg px-4 py-2 text-white
                    focus:border-purple-500 focus:ring-purple-500/20 placeholder-gray-500 transition-all duration-300'>
                    <option value='' className='bg-gray-800'>Select subject</option>
                    <option value='support' className='bg-gray-800'>Support</option>
                    <option value='sales' className='bg-gray-800'>Sales</option>
                    <option value='other' className='bg-gray-800'>Other</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Message</label>
                  <textarea
                    rows={6}
                    placeholder='Type your message'
                    className='w-full bg-gray-800/50 border-gray-700 rounded-lg px-4 py-2 text-white
                    focus:border-purple-500 focus:ring-purple-500/20 placeholder-gray-500 transition-all duration-300'
                  ></textarea>
                </div>

                <button className='w-full bg-gradient-to-r from-purple-600 to-blue-500 
                  hover:from-purple-700 hover:to-blue-600 text-white font-medium 
                  py-2.5 px-4 rounded-lg transition-all duration-300 transform 
                  hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 
                  active:scale-95 mt-6'>
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className='flex flex-col gap-9'>
          {/* Sign In Form */}
          <div className='backdrop-blur-sm bg-black/50 p-8 rounded-xl border-2 border-gray-800 hover:border-purple-500/50 transition-all duration-500 group'>
            <div className='border-b border-gray-800 pb-4 mb-6'>
              <h3 className='font-medium text-white'>Sign In Form</h3>
            </div>
            <form action='#'>
              <div className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium text-white mb-2'>Email</label>
                  <input
                    type='email'
                    placeholder='Enter your email address'
                    className='w-full bg-gray-800/50 border-gray-700 rounded-lg px-4 py-2 text-white
                    focus:border-purple-500 focus:ring-purple-500/20 placeholder-gray-500 transition-all duration-300'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-white mb-2'>Password</label>
                  <input
                    type='password'
                    placeholder='Enter password'
                    className='w-full bg-gray-800/50 border-gray-700 rounded-lg px-4 py-2 text-white
                    focus:border-purple-500 focus:ring-purple-500/20 placeholder-gray-500 transition-all duration-300'
                  />
                </div>

                <button className='w-full bg-purple-600 hover:bg-purple-700 text-white font-medium 
                  py-2.5 px-4 rounded-lg transition-all duration-300 transform 
                  hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95 mt-6'>
                  Sign In
                </button>
              </div>
            </form>
          </div>

          {/* Sign Up Form */}
          <div className='backdrop-blur-sm bg-black/50 p-8 rounded-xl border-2 border-gray-800 hover:border-purple-500/50 transition-all duration-500 group'>
            <div className='border-b border-gray-800 pb-4 mb-6'>
              <h3 className='font-medium text-white'>Sign Up Form</h3>
            </div>
            <form action='#'>
              <div className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Name</label>
                  <input
                    type='text'
                    placeholder='Enter your full name'
                    className='w-full bg-gray-800/50 border-gray-700 rounded-lg px-4 py-2 text-white
                    focus:border-purple-500 focus:ring-purple-500/20 placeholder-gray-500 transition-all duration-300'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Email</label>
                  <input
                    type='email'
                    placeholder='Enter your email address'
                    className='w-full bg-gray-800/50 border-gray-700 rounded-lg px-4 py-2 text-white
                    focus:border-purple-500 focus:ring-purple-500/20 placeholder-gray-500 transition-all duration-300'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Password</label>
                  <input
                    type='password'
                    placeholder='Enter password'
                    className='w-full bg-gray-800/50 border-gray-700 rounded-lg px-4 py-2 text-white
                    focus:border-purple-500 focus:ring-purple-500/20 placeholder-gray-500 transition-all duration-300'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>Re-type Password</label>
                  <input
                    type='password'
                    placeholder='Re-enter password'
                    className='w-full bg-gray-800/50 border-gray-700 rounded-lg px-4 py-2 text-white
                    focus:border-purple-500 focus:ring-purple-500/20 placeholder-gray-500 transition-all duration-300'
                  />
                </div>

                <button className='w-full bg-gradient-to-r from-purple-600 to-blue-500 
                  hover:from-purple-700 hover:to-blue-600 text-white font-medium 
                  py-2.5 px-4 rounded-lg transition-all duration-300 transform 
                  hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 
                  active:scale-95 mt-6'>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
