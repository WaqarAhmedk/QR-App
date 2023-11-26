import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import { IBM_Plex_Sans, Open_Sans } from 'next/font/google';
import Layout from '@/components/Layout';
import { Provider } from 'react-redux';
import RHFProvider from '@/RHF/FormProvider';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store';
import { ContextProvider } from '@/context/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/macros/Loader';

const IBM = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const excludeRHFProviderPages = [
  '/signup',
  '/signin',
  '/forgotpassword',
  '/resetpassword',
];

export const OpenSans = Open_Sans({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

const pagesWithoutFooterAndNavbar = ['Display']; // List of page URLs where footer and navbar should not be included

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    window.name = 'qr_application';
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <Loader parentClass='h-screen' classNames='w-[40px] h-[50px]' />;
  }

  const showFooterAndNavbar = !pagesWithoutFooterAndNavbar.includes(
    router.pathname.replace('/', '')
  );

  return (
    <main className={IBM.className}>
      <Provider store={store}>
        <Layout showFooterAndNavbar={showFooterAndNavbar}>
          <ToastContainer
            toastClassName={() =>
              'text-primary  bg-white shadow-lg relative w-full font-medium flex px-2 py-3 min-h-10 rounded-md items-center justify-between overflow-hidden cursor-pointer font-Poppins '
            }
          />
          {/* <PersistGate loading={null} persistor={persistor}> */}
          {excludeRHFProviderPages.includes(router.pathname) ? (
            <ContextProvider>
              <Component {...pageProps} />
            </ContextProvider>
          ) : (
            <RHFProvider>
              <ContextProvider>
                <Component {...pageProps} />
              </ContextProvider>
            </RHFProvider>
          )}
          {/* </PersistGate> */}
        </Layout>
      </Provider>
    </main>
  );
}
