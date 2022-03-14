import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Feed.module.css";
import { useRouter } from "next/router";
import { Toolbar } from "../../components/toolbar";

export const Feed = ({ pageNumber, articles }) => {
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
          {articles.map((article, index) => (
            <div key={index} className={styles.post}>
              <h1 onClick={() => (window.location.href = article.url)}>
                {article.title}
              </h1>
              <p>{article.description}</p>
              {!!article.urlToImage && <Image src={article.urlToImage} alt='news image'/>}
            </div>
          ))}
        </div>
        <div className={styles.paginator}>
          <div
            onClick={() => {
              if (pageNumber > 1) {
                router
                  .push(`/feed/${pageNumber - 1}`)
                  .then(() => window.scrollTo(0, 0));
              }
            }}
            className={pageNumber === 1 ? styles.disabled : styles.active}
          >
            Previews page
          </div>
          <div>#{pageNumber}</div>
          <div
            onClick={() => {
              if (pageNumber < 5) {
                router
                  .push(`/feed/${pageNumber + 1}`)
                  .then(() => window.scrollTo(0, 0));
              }
            }}
            className={pageNumber === 5 ? styles.disabled : styles.active}
          >
            Next page ->
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageNumber = pageContext.query.slug;
  const apiKey = "30902281c1904d89bcc80306d1525f59";
  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }
  const apiRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  const apiJson = await apiRes.json();
  const { articles } = apiJson;
  return {
    props: { articles, pageNumber: Number.parseInt(pageNumber) },
  };
};
export default Feed;
