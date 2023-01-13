import axios from "axios";
import { useEffect } from "react";
import Cookies from "universal-cookie";

export default function Me() {
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
export const getServerSideProps = async ({ req, res, resolvedUrl }) => {   //서버 사이드 쿠키    
    const cookies = new Cookies( req.headers.cookie );
    const token = cookies.get('token');
    if ( token ) {
        return {
            props: {}
        }
    } else {
        return {
            redirect: {
                // destination: '/auth/sign-in',                
                destination: '/auth/sign-in?ref=' + resolvedUrl,
                permanent : false,
            }
        }
    }
}