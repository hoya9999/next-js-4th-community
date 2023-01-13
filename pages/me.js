import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Layout from "./components/Layout";
import authAtom from "../stores/authAtom";
import {useAtom} from 'jotai';
import { useRouter } from "next/router";

export default function Me() {
    console.log('ME()');
    const [profile, setProfile] = useState(null);
    const [, setAuth] = useAtom(authAtom);
    const router = useRouter();

    useEffect(() => {
        axios.get(`${process.env.API_HOST}/me`)
             .then(res => {
                setProfile(res.data);
                setAuth({user: res.data, loaded:true});
            })
             .catch(error => console.warn(error))
        }, []);
    // const logout = useCallback(() => {
    //     const cookies = new Cookies();
    //     cookies.remove('token');
    //     setAuth(auth => ({...auth, token: null, user: null}) )
    //     delete axios.defaults.headers.common.Authorization;
    //     router.push('/');
    // },[])
    const logout = () => {
        const cookies = new Cookies();
        cookies.remove('token');
        setAuth(auth => ({...auth, token: null, user: null}) )
        delete axios.defaults.headers.common.Authorization;
        router.push('/');
    }

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

            <button className="btn btn-danger" onClick={logout}>로그아웃</button>
            {/* <button className="btn btn-danger" onClick={() => {
                                                const cookies = new Cookies();
                                                cookies.remove('token');
                                                setAuth(auth => ({...auth, token: null, user: null}) )
                                                delete axios.defaults.headers.common.Authorization;
                                                router.push('/');
                                                }} */}
            {/* >로그아웃</button>             */}
        </div>
        </Layout>        
        </>           
    );
}

// export const getServerSideProps11 = async context => {
export const getServerSideProps = async ({ req, res, resolvedUrl }) => {   //서버 사이드 쿠키    
    console.log('ME > getServerSideProps');
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