import Link from 'next/link';
import useFetch from '../../hooks/useFetch';
import Pagination from 'rc-pagination';
import { useRouter } from 'next/router';

export default function ArticleList({title, category, page}) {
    console.log('ArticleList');
    const {data, error} = useFetch(`${process.env.API_HOST}/articles?category=${category}&page=${page}`);
    const router = useRouter();
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

            <div className="flex justify-between">
                {/* <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </nav>   */}
                {data?.meta && (
                    <Pagination
                        current={data?.meta?.current_page}
                        total={data?.meta?.total}
                        pageSize={data?.meta?.per_page}
                        onChange={(page) => {
                            console.log(page);
                            router.push(`?page=${page}`);
                        }}
                    />
                )}
                <Link href={`/articles/${category}/create`}>
                    <a className="btn btn-primary">글 작성하기</a>
                </Link>
            </div>
        </div>
    )
}