import { useCallback, useMemo, useState } from "react"
import axios from 'axios'
import { useRouter } from "next/router";

export default function SignUp() {
//state
//form validation
// - 필수 필드 및 형식 체크( 프론트 및 서버단에서 체크 부분 구분 )
//ajax 통신
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [touchedEmail, setTouchedEmail] = useState(false);
    const [touchedPassword, setTouchedPassword] = useState(false);
    const [touchedName, setTouchedName] = useState(false);

    const errors = useMemo(() => {
        console.log('useMemo');
        const errors = {};
        if (!email) {
            errors.email = '이메일은 필수 입력 항목입니다.';
        } else if (!password) {
            errors.password = '비밀번호는 필수 입력 항목입니다.';
        } else if (!name) {
            errors.name = '이름은 필수 입력 항목입니다.';
        } else {
            //기타
        }    
        return errors;
    }, [email, password, name]);

    // submit = () => {
    //     return email + password + name;
    // }

    const submit = useCallback(evt => {
        evt.preventDefault();
        // console.log(`Object.keys(errors).length: ${Object.keys(errors).length}`)
        if (Object.keys(errors).length > 0) return;

        // axios.post('http://localhost:3333/auth/sign-up', {
        axios.post('http://127.0.0.1:3333/auth/sign-up', {            
            email,
            password,
            name
        })
        .then(() => {
            alert('회원 가입 완료')
            router.push('/auth/sign-in');   //해당 사이트로 이동
        })
        .catch(error => {
            alert('서버와 통신에 실패했습니다.');
            // alert(error.response.data.message);
            //error.message || '서버와 통신에 실패했습니다.'
        })

        // alert('submit');

    }, [email, password, name, errors])

    return (
        <>
        <div className="container">
            <h1>회원가입</h1>

            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emailInput" placeholder="name@example.com" 
                           value={email} 
                           onChange={evt => setEmail(evt.target.value)}
                           onFocus={() => setTouchedEmail(true)}
                    />
                    <p className="text-danger mt-2">{ errors.email && touchedEmail && errors.email }</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordInput"  placeholder="Password"
                           value={password}
                           onChange={evt => setPassword(evt.target.value)}
                           onFocus={() => setTouchedPassword(true)}
                    />
                    <p className="text-danger mt-2">{ errors.password && touchedPassword && errors.password }</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label">Name</label>
                    <input type="text" className="form-control" id="nameInput" placeholder="John Doe" 
                           value={name}
                           onChange={evt => setName(evt.target.value)}
                           onFocus={() => setTouchedName(true)}
                    />
                    <p className="text-danger mt-2">{ errors.name && touchedName && errors.name }</p>
                </div>
                <button className="btn btn-primary btn-lg">회원가입</button>
            </form>
        </div>            
        </>
    )
}