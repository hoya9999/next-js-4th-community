import ArticleView from "../../components/articles/ArticleView"
import Layout from "../../components/Layout"
import { useRouter } from 'next/router';
import { fetcher } from "../../hooks/useFetch";

// export default function ViewPage(props) {
//     console.log(props.id);
export default function ViewPage({id}) {
    console.log(id);
    const router = useRouter();
    return (
        <Layout>
            <ArticleView id={id} />
        </Layout>
    )
}

// export const getServerSideProps = context => {

// }

export const getServerSideProps = ({params}) => {
    return {
        props: {
            id: params.id,
        }
    }
}