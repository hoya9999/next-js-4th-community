import ArticleView from "../../components/articles/ArticleView"
import Layout from "../../components/Layout"
import { useRouter } from 'next/router';
import { fetcher } from "../../hooks/useFetch";

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

export default function ViewPage(props) {    
    // console.log(props.id);
    const router = useRouter();
    return (
        <Layout>
            <ArticleView {...props} />
        </Layout>
    )
}

// export const getServerSideProps = context => {

// }

export const getServerSideProps = async ({params}) => {
    const id = params.id;
    //node-fetch
    //axios.get('...') //nodejs와 브라우저에서 동시에 동작 하는 Library이다.
    const article = await fetcher(`${process.env.API_HOST}/articles/${id}`)
    console.log('article', article);
    return {
        props: {
            id,
            article,
        }
    }
}