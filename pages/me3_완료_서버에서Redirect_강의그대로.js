import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "universal-cookie";

export default function Me() {
    const router = useRouter();

    useEffect(() => {
        axios.get(`${process.env.API_HOST}/me`)
             .then(res => console.log(res.data))
             .catch(error => console.warn(error))
        }, []);
    return <div className="container">
            사용자 정보 표시
           </div>
}

// export const getServerSideProps11 = async context => {
export const getServerSideProps = async ({ req }) => {   //서버 사이드 쿠키
    const cookies = new Cookies( req.headers.cookie );
    const token = cookies.get('token');
    if ( token ) {
        return {
            props: {}
        }
    } else {
        return {
            redirects: {
                destination: '/auth/sign-in',
                permanent : false,
            }
        }
    }
}