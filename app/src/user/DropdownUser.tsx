import { type User } from 'wasp/entities';
import { useEffect, useRef, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { UserMenuItems } from './UserMenuItems';
import { cn } from '../client/cn';

export function DropdownUser({ user }: { user: Partial<User> | null }) {
  if (!user) return null;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) {
        return;
      }
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className='relative'>
      <button
        ref={trigger}
        onClick={toggleDropdown}
        className='flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-300 ease-in-out bg-black/50 border border-gray-800 hover:border-purple-500/50 text-white group z-10'
      >
        <span className='hidden text-right lg:block'>
          <span className='block text-sm font-medium group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400'>
            {user.username || 'Utilisateur'}
          </span>
        </span>
        <CgProfile size='1.1rem' className='text-purple-500' />
        <svg
          className={cn('fill-current transition-transform duration-300', {
            'rotate-180': dropdownOpen,
          })}
          width='12'
          height='8'
          viewBox='0 0 12 8'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z'
          />
        </svg>
      </button>

      <div
        ref={dropdown}
        className={cn(
          'absolute right-0 mt-4 flex w-64 flex-col rounded-xl border border-gray-800 bg-black/90 shadow-xl text-white z-50',
          'transform transition-all duration-300 ease-in-out',
          {
            'opacity-0 scale-95 translate-y-2 pointer-events-none': !dropdownOpen,
            'opacity-100 scale-100 translate-y-0 pointer-events-auto': dropdownOpen,
          }
        )}
      >
        <div className='absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'></div>
        <div className="relative z-10 w-full">
          <UserMenuItems user={user} setMobileMenuOpen={toggleDropdown} />
        </div>
      </div>
    </div>
  );
};

export default DropdownUser;