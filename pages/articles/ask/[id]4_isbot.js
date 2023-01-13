import ArticleView from "../../components/articles/ArticleView"
import Layout from "../../components/Layout"
import { useRouter } from 'next/router';
import { fetcher } from "../../hooks/useFetch";
import { SWRConfig } from 'swr';
import isbot from 'isbot';

// export default function ViewPage(props) {
//     console.log(props.id);
// export default function ViewPage({id}) {
// export default function ViewPage({id, article}) {    
//     console.log(id);
//     const router = useRouter();
//     return (
//         <Layout>
//             <ArticleView id={id} article={article} />
//         </Layout>
//     )
// }

export default function ViewPage({id, fallback}) {    
    // console.log(props.id);
    console.log('fallback',fallback)
    // console.log('fallback',fallback[url])    
    const router = useRouter();
    return (
        <SWRConfig value={{fallback}}>
            <Layout>
                <ArticleView id={id} />
            </Layout>
        </SWRConfig>
    )
}

// export const getServerSideProps = context => {

// }

export const getServerSideProps = async ({params}) => {
    const id = params.id;
    //node-fetch
    //axios.get('...') //nodejs와 브라우저에서 동시에 동작 하는 Library이다.
    const url = `${process.env.API_HOST}/articles/${id}`;
    // bot이 들어왔을 때 | 아닐때를 구분하여 작업
    // bot이 들어왔을 때는 SSR 반드시 필요
    // 아닐경우는 아래 fetcher부분 생략, 즉 const article = null; 로 수정하여 사용
    // const article = await fetcher(url); 
    const article = isbot(req.headers['user-agent']) ? await fetcher(url) : null;     
    //봇이 수행중일 경우와 그렇지 않은 경우를 구분하여 처리한 로직
    // const article = isbot ? await fetcher(url) : null; 

    console.log('article', article);    
    // console.log('article', url);
    // console.log({
    //     fallback: {
    //         [url]: article,
    //      }
    //     })
    return {
        props: {
            id,
            fallback: {
               [url]: article,
            },
        }
    }
}