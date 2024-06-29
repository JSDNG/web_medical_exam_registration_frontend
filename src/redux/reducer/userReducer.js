//import { INCREMENT, DECREMENT } from "../action/counterAction";
import { FETCH_USER_LOGIN_SECCESS, USER_LOGOUT_SECCESS } from "../action/userAction";

const INITIAL_STATE = {
    account: {
        access_token: "",
        refresh_token: "",
        user: "",
        email: "",
        role: "",
    },
    isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SECCESS:
            //console.log(action);
            return {
                ...state,
                account: {
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.refresh_token,
                    user: action?.payload?.DT?.user,
                    email: action?.payload?.DT?.email,
                    role: action?.payload?.DT?.role,
                },
                isAuthenticated: true,
            };

        case USER_LOGOUT_SECCESS:
            return {
                ...state,
                account: {
                    access_token: "",
                    refresh_token: "",
                    user: "",
                    email: "",
                    role: "",
                },
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default userReducer;
