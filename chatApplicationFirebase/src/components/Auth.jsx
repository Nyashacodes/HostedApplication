import {auth, provider} from '../firebase-config.js'
import {signInWithPopup} from 'firebase/auth'
import Cookies from 'universal-cookie';
const cookies = new Cookies()

export const Auth=(props)=>{
    const {setIsAuth} = props; //destruct

    const signInWithGoogle = async () =>{
        try{
        const result = await signInWithPopup(auth, provider);        
        console.log(result);
        cookies.set("auth-token", result.user.refreshToken)
        setIsAuth(true)
        }catch(err){
            console.log(err);
        }
    };

    return (
    <div className="auth">
        <p>Sign in with Google to Continue</p>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
    )
}