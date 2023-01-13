import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Layout from "./components/Layout";
import authAtom from "../stores/authAtom";
import {useAtom} from 'jotai';

export default function Me() {
    const [profile, setProfile] = useState(null);
    const [auth, setAuth] = useAtom(authAtom);

    useEffect(() => {
        axios.get(`${process.env.API_HOST}/me`)
             .then(res => {
                setProfile(res.data);
                setAuth({user: res.data, loaded:true});
            })
             .catch(error => console.warn(error))
        }, []);

    return (
        <>
        <Layout>
        <div className="container">
            {/* <h2>사용자 정보 표시!</h2> */}
            <dl> 
                <dt>이메일</dt>
                <dd>{profile?.email}</dd>
                <dt>이름</dt>
                <dd>{profile?.name}</dd>
                <dt>가입일시</dt>
                <dd>{profile?.created_at}</dd>
            </dl>
        </div>
        </Layout>        
        </>           
    );
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
                // destination: '/auth/sign-in?ref=' + '/auth/sign-up',                
                destination: '/auth/sign-in?ref=' + resolvedUrl,    //현재 페이지의 값 : /me             
                permanent : false,
            }
        }
    }
}