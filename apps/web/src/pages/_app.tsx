import { api } from "src/utils/api";
import "src/styles/globals.css";

function MyApp({ Component, pageProps }): JSX.Element {
  return <Component {...pageProps} />;
}

export default api.withTRPC(MyApp);
