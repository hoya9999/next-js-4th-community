import Layout from "../../components/Layout";
import ArticleList from "../../components/articles/ArticleList";
import { fetcher } from "../../hooks/useFetch";
import { SWRConfig } from "swr";

export default function AskArticles({fallback}) {
    return(
        <SWRConfig value={{fallback}}>
            <Layout>
                <ArticleList title='질문 게시판' category='ask'/>
            </Layout>
        </SWRConfig>
    )
}

// 줄바꿈 \n 혹은 \n\r 형태(HTML은 엔터키를 공백으로 작성)
export const getServerSideProps = async ({params}) => {
    const url = `${process.env.API_HOST}/articles?category=ask`;
    const data = await fetcher(url);
    return {
        props : {
            fallback: {
                [url] : data,
            }
        }
    }
} 
