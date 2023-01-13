import {Formik} from 'formik';
import axios from 'axios';

// const emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;
const emailRegExp = /ghkwon@tccins.co.kr/gi;
const pwdRegExp = /^[A-Za-z]\w{7,14}$/gi;


export default function SignIn() {
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
                    // else if ( !pwdRegExp.test(values.password)) {
                    //     errors.password = "비밀번호의 형식이 올바르지 않습니다."
                    // }

                    return errors;
                }}
                onSubmit={ values => {
                    console.log( values );
                    axios.post('http://127.0.0.1:3333/auth/sign-in', values )
                        .then(res => console.log(res.data))
                        .catch(errors => {
                            console.warn(errors);
                        })
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
                            <button type="submit" className="btn btn-primary btn-lg">로그인</button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}