import Link from 'next/link';
import useFetch from '../../hooks/useFetch';

export default function ArticleList({title, category}) {
    console.log('ArticleList');
    const {data, error} = useFetch(`${process.env.API_HOST}/articles?category=${category}`);
    if ( error ) {
        return <>데이터를 불러올 수 없습니다.</>
    }
    console.log(data);
    return (
        <div className="container">
            <h1>{title}</h1>

            <ul className='list-unstyled mx-2'>
                {data?.data.map(articles => (
                    <li key={articles.id} className='flex flex-row'>
                        <span className='mr-4'>{articles.id}</span>
                        <Link href={`/articles/${category}/${articles.id}`}>
                            <a>{articles.subject}</a>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="flex justify-end">
                <Link href={`/articles/${category}/create`}>
                    <a className="btn btn-primary">글 작성하기</a>
                </Link>
            </div>
        </div>
    )
}