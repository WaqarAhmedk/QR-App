import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import { NavbarItem } from './macros/NavBarItem';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import MobileNavbar from './MobileNavbar';
import classNames from 'classnames';
import Image from 'next/image';
import Button from './macros/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, verifyToken } from '@/store/auth/authActions';
import { getUserToDashBoard } from '@/utils/functions';

function NavBar() {
  const [helpActive, setHelpActive] = useState(false);
  const helpRef = useRef();
  const router = useRouter();
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useOnClickOutside(helpRef, () => setHelpActive(!helpActive));
  let authToken = localStorage.getItem('token');

  const isActive = (pathname) => {
    return router?.pathname === pathname ? 'text-primary' : '';
  };

  const NavClass = classNames(
    'padding-x flex text-center pt-4 pb-4 items-center justify-between layout-max w-full'
  );

  const logOutClickHandler = () => {
    dispatch(logOut());
    window.location.href = '/signin';
  };
  const handleNavigateToDashBoard = () => {
    getUserToDashBoard(user);
  };

  useEffect(() => {
    dispatch(verifyToken(authToken));
  }, []);

  return (
    <div className='text-[black]  layout-container w-full'>
      <nav className={NavClass}>
        <div
          className='text-2xl font-bold cursor-pointer'
          onClick={() => (window.location.href = '/')}
        >
          <Image
            src='/assets/svgs/logo.svg'
            width={140}
            height={140}
            alt='q1-box-logo'
            className='w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]'
          />
        </div>
        <MobileNavbar className='lg:hidden' />
        <div className=' hidden items-center lg:flex gap-10 text-base font-[500] '>
          <NavbarItem
            onClick={() => router.push('/')}
            text='Q1 Box'
            className={`${isActive('/')}`}
          />
          <NavbarItem
            onClick={() => router.push('/pricing')}
            text='Pricing'
            className={`${isActive('/pricing')}`}
          />
          <NavbarItem
            onClick={() => router.push('/blog')}
            text='Blog'
            className={`${isActive('/blog')}`}
          />

          <NavbarItem
            onClick={() => router.push('/contact-us')}
            text='Contact us'
            className={`${isActive('/contact-us')}`}
          />
          <NavbarItem
            text='Help'
            dropdown
            className={`${isActive('/help/support') || isActive('/help/faq')}`}
            helpRef={helpRef}
            setIsOpen={setHelpActive}
            helpActive={helpActive}
            onClick={() => {
              setHelpActive(!helpActive);
            }}
            menu={helpActive}
          />

          {authToken ? (
            <Button
              type='plain'
              className='font-medium'
              onClick={() => logOutClickHandler()}
              text='Sign Out'
            />
          ) : (
            <Button
              type='plain'
              className='font-medium'
              onClick={() => {
                router.push('/signup');
              }}
              text='Sign Up'
            />
          )}
          {authToken ? (
            <>
              <Button
                type='fill'
                onClick={handleNavigateToDashBoard}
                text='Dashboard'
              />
            </>
          ) : (
            <>
              <Button
                type='fill'
                className='font-medium'
                onClick={() => {
                  router.push('/signin');
                }}
                text='Sign In'
              />
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
