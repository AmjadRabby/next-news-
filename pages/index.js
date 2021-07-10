import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Toolbar } from "../components/toolbar";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        {" "}
        <title>Home page Next-News</title>
      </Head>
      <div className="page-container">
        <Toolbar />
        <div className={styles.main}>
          <h1>Next js News App</h1>
          <h3 onClick={() => router.push("/feed/1")}>
            Your one stop for the latest news articles -->
          </h3>
        </div>
      </div>
    </>
  );
}
