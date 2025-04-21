import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { GlobalProvider } from '@/context/GlobalContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/styles/globals.css';
import 'photoswipe/dist/photoswipe.css';


export const metadata = {
  title: "Lokalads",
  keywords: "property, rental, real estate",
  description: "Find the perfect property",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <AuthProvider> {/* ✅ Wrap inside body */}
        <GlobalProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
          </GlobalProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
