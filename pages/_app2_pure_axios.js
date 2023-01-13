import '../styles/globals.css';
import Head from 'next/head';
import Cookies from 'universal-cookie';
import axios from 'axios';
import authAtom from '../stores/authAtom';
import {useAtom} from 'jotai';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
    console.log('kghhhhhhhhhhhhhhhhhhhhhh');
    // process.env.ALLUSERSPROFILE = 'C:\\ProgramData9999';  //기존 환경변수 값 수정
    // console.log('process.env1:', process.env.ALLUSERSPROFILE);      
    // console.log('process.env2:', process.env.school);
    // console.log('process.env3:', process.env.my);    
    // console.log('process.env4:', process.env.list);    
    // console.log('process.env5:', JSON.stringify(process.env));    
    // console.log('======================================================================================');
    const cookies = new Cookies();
    const token = cookies.get('token');
    // console.log('token : ', token);
    const [, setAuth] = useAtom(authAtom);
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    useEffect(() => {
      if (token) {
        setAuth( auth => ({...auth, token,}));
        axios.get(`${process.env.API_HOST}/me`)
             .then(res=> setAuth(auth => ({...auth, user:res.data})))
             .catch(() => {})
             .finally(() => setAuth(auth => ({...auth, loaded:true})))
        // console.log(`${process.env.API_HOST}/me`)        
      }
      else {
        setAuth(auth => ({...auth, loaded:true}))
      }
    }, []);

    return <>
          <Head>
            <link 
              href="https://unpkg.com/tailwindcss@^2.0/dist/tailwind.min.css" 
              rel="stylesheet"
            />
            <link 
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" 
              rel="stylesheet" 
              integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" 
              crossOrigin="anonymous"
            />
          </Head>
          <Component {...pageProps} />
         </>
}

export default MyApp
