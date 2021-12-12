import "../styles/globals.css";

import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./contexts/auth";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </AuthContextProvider>
  );
}

export default MyApp;
