import "../styles/globals.css";
import Layout from "../components/Layout";
import { ContextProvider } from "../store/store";
import { ToastProvider } from "react-toast-notifications";

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider autoDismiss autoDismissTimeout={15000}>
      <ContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </ToastProvider>
  );
}

export default MyApp;
