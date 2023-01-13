import ArticleView from "../../components/articles/ArticleView"
import Layout from "../../components/Layout"
import { useRouter } from 'next/router';
import { fetcher } from "../../hooks/useFetch";
import { SWRConfig } from 'swr'
import isbot from "isbot";

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

export const getServerSideProps = async ({req, params}) => {
    const id = params.id;
    //node-fetch
    //axios.get('...') //nodejs와 브라우저에서 동시에 동작 하는 Library이다.
    const url = `${process.env.API_HOST}/articles/${id}`;
    // console.log('user-agent : ', req.headers['user-agent']);
    // console.log('isbot : ', isbot(req.headers['user-agent']));
    const article = isbot(req.headers['user-agent']) ? await fetcher(url) : null; 
    // console.log('article', article);
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