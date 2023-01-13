import useFetch from "../../hooks/useFetch"

export default function ArticleView({id, article}) {
    // const { data, error } = useFetch(`${process.env.API_HOST}/articles/${id}`);
    // if (error) {
    //     return <>데이터 로드에 실패했습니다.</>
    // }
    return(
        <div className="container">
            <h1>{article?.subject}</h1>
            <hr/>
            <p>{article?.content}</p>
        </div>
    )
}