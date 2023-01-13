import Link from "next/link"
import authAtom from "../../stores/authAtom";
import {useAtom} from 'jotai';

export default function Layout({children}) {
// export default function Layout() {    
    const [auth, setAuth] = useAtom(authAtom);
    return (
        <div className="flex flex-col">
            <header className="container flex flex-row justify-between py-2">
                <Link href="/">
                    <a className="btn btn-link -ml-4">Codelab Community</a>
                </Link>
                <div className="flex flex-row -mr-4">
                    <Link href="/">
                        <a className="btn btn-link">홈</a>
                    </Link>
                    <Link href="/">
                        <a className="btn btn-link">일반 게시판</a>
                    </Link>
                    <Link href="/">
                        <a className="btn btn-link">질문 게시판</a>
                    </Link>
                    {console.log(`auth.loaded : ${auth.loaded}`) }
                    {console.log(`auth.user : ${auth.user}`) }
                    { !auth.loaded ? (
                        <>로딩중...</>
                    ) : (
                        auth.user ? (
                            <Link href="/me">
                                <a className="btn btn-link">내 정보</a>
                            </Link>
                        )
                        : (
                            <Link href="/auth/sign-in">
                                <a className="btn btn-link">로그인</a>
                            </Link>
                        )  
                    )}
                    {/* {
                        auth.loaded && auth.user ? (
                            <Link href="/me">
                                <a className="btn btn-link">내 정보</a>
                            </Link>
                        )
                        : (
                            <Link href="/auth/sign-in">
                                <a className="btn btn-link">로그인</a>
                            </Link>
                        )  
                    } */}
                </div>                    
            </header>
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}