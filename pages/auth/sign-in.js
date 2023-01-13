import {Formik} from 'formik';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import {useAtom} from 'jotai';
import authAtom from "../../stores/authAtom";

// const emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
// const emailRegExp = /ghkwon@tccins.co.kr/i;
const pwdRegExp = /(?=.*\d)(?=.*[a-z]).{8,}/;
// const pwdRegExp = /\w/;

console.log('.env:', process.env.API_HOST);
// console.log('process.env2:', process.env.school);
// console.log('process.env3:', process.env.my);    
// console.log('process.env4:', process.env.list);    
// console.log('process.env5:', JSON.stringify(process.env));   

/*  axios Heades 전송 방식(get, post)
    // 요청시 헤더
    1. get
    axios.get('usr', {
        headers: {
            headers: {
                Authorization: 'Bearer TOKEN_HERE'
            }
        }
    })
    2. post
    axios.post('url', {...params}, {
        headers: {
            headers: {
                Authorization: 'Bearer TOKEN_HERE'
            }
        }        
    })
    3. 전역 헤더 설정
    axios.defaults.headers.common.Authorization = 'Bearer TOKEN_HERE';

    // 상태 
    useState()

    // 전역 상태
    ???
*/

export default function SignIn() {
    const router = useRouter();
    const [auth, setAuth] = useAtom(authAtom);
    return (
        <div className="container">
            <h1>로그인</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validate={ values => {
                    const errors = {};

                    if( !values.email) {
                        errors.email = "이메일은 필수 입력항목입니다.";
                    } 
                    else if(!emailRegExp.test(values.email)) {
                        errors.email = "이메일의 형식이 올바르지 않습니다.";
                    } 
                    else if (!values.password) {
                        errors.password = "비밀번호는 필수 입력항목입니다.";
                    } 
                    else if ( !pwdRegExp.test(values.password)) {
                        errors.password = "비밀번호의 형식이 올바르지 않습니다.(숫자,문자최소 1개이상, 전체 8 자리 이상)"
                    }

                    return errors;
                }}
                onSubmit={ (values, helpers) => {
                //     helpers.setSubmitting("전송중...");
                // onSubmit={ (values, {setSubmitting}) => {
                    setSubmitting(true);                

                    axios.post(process.env.API_HOST + '/auth/sign-in', values )
                    // axios.post('http://127.0.0.1:3333/auth/sign-in', values )                    
                        .then(res => {
                            // console.log(res.data)
                            const cookies = new Cookies();                            
                            const token = res.data.token.token;
                            //token 전역 설정
                            axios.defaults.headers.common.Authorization = `Bearer ${token}`;

                            // cookies.set('token',token, {path: '/auth/sign-in'}); // auth/sign-in 페이지에서만 cookie 사용                            
                            cookies.set('token', token, {path: '/'});             // root의 하위경로는 전부 cookie 사용
                            console.log(`router.query.ref: ${router.query.ref}`);
                            // setAuth({
                            //     token,
                            // });
                            // setAuth(state => {
                            //     return {
                            //         ...state,
                            //         token,
                            //     }
                            // });    
                            setAuth(auth => ({...auth, token}));
                            // axios.get(`${process.env.API_HOST}/me`)
                            //      .then(res => setAuth(auth => ({...auth,user:res.data })))
                            //      .catch(() => {})
                            router.push(router.query.ref ?? '/me'); //router.query.ref 의 값 으로 이동, 해당 값이 미 존재시 /me로 이동
                        })
                        .catch(err => {
                            console.log(process.env.API_HOST);
                            console.warn(err);                            
                            // alert(err.message == 'Network Error' ? '서버와 통신에 실패 했습니다.': err.message)
                            alert(err.response?.data?.message ?? err.message ?? '서버와 통신에 실패 했습니다!');
                            // alert(err.response?.data?.message ?? '서버와 통신에 실패 했습니다.' ?? err.message);
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }}
            >
                { ( {
                        values, 
                        errors, 
                        touched, 
                        handleChange,
                        handleBlur,
                        isSubmitting,
                        handleSubmit
                    } ) => (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="emailInput" placeholder="name@example.com" 
                                name="email"
                                value={values.email} 
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <p className="text-danger mt-2">{ errors.email && touched.email && errors.email}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordInput" className="form-label">Password</label>
                            <input type="password" className="form-control" id="passwordInput"  placeholder="Password"
                                name="password"
                                value={values.password} 
                                onChange={handleChange}
                                onBlur={handleBlur}                            
                            />
                            <p className="text-danger mt-2">{ errors.password && touched.password && errors.password }</p>
                        </div>
                        <div>
                            {/* <button type="submit" className="btn btn-primary btn-lg">
                            { isSubmitting ? '로그인 중...' : '로그인' }
                            </button> */}
                            <button type="submit" className="btn btn-primary btn-lg">
                                로그인
                            </button>                            
                            <p>
                                &nbsp;{ isSubmitting ? '로그인 중...' : ''}
                            </p>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}