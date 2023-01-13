import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "universal-cookie";

let cnt = 0;
export default function Me() {
    const router = useRouter();

    useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get('token');

        axios.get(`${process.env.API_HOST}/me`)
             .then(res => console.log(res.data))
             .catch(error => console.warn(error))
        
        if (!token) {
            if(cnt == 0) {
                alert('다시 로그인 해야 합니다.');            
                router.push('/auth/sign-in');   //로그인 화면으로 이동
            }
            cnt++;
        }
        // if (!token) return <>로그인 필요</>
    }, [router]);

    return <>사용자 정보 표시</>
}