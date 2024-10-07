import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { client } from "../graphql/client";
import Layout from "./layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
