import Layout from "../../components/Layout";
import ArticleList from "../../components/articles/ArticleList";
import useFetch, {fetcher} from "../../hooks/useFetch";
import { SWRConfig } from 'swr';

export default function GeneralArticles({page, fallback}) {
    return(
        <SWRConfig value={{fallback}}>
            <Layout>
                <ArticleList title='일반 게시판' category='general' page={page}/>
            </Layout>            
        </SWRConfig>
    )
}

export const getServerSideProps = async ({query}) => {
    const page = query.page || 1;   //query.page가 존재시 해당 페이지 번호, 만약 페이지 번호 미존재시, 페이지 번호 값을 1로 세팅
    // console.log('page:', page);
    const url = `${process.env.API_HOST}/articles?category=general&page=${page}`;
    // const url = `${process.env.API_HOST}/articles?category=general`;
    const data = await fetcher(url);
    console.log('data:', data);
    return {
        props : {
            page,
            fallback: {
                [url] : data,
            }
        }
    }
} 