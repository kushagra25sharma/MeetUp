import "./Signin.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

const Signin = () => {
    const dispatch = useStateValue()[1]; // obtaining the initial state and dispatch method from reducer

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                     // we will get the user from firebase when user signs in
                    user: result?.user,
                });
            })
            .catch((error) => alert(error.message));
    }

    return (
        <div className="signin" >
            <div className="signin__container" >
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk1eXy65qsgT3ghWdhPfljSa6dqTF_2uVBQQ&usqp=CAU" alt="meet up logo" />
                <div className="signin__text" >
                    <h1>Sign in to Meet Up</h1>
                </div>
                <Button onClick={signIn} >Sign in with Google</Button>
            </div>
        </div>
    );
}

export default Signin;