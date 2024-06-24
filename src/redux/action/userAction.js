export const FETCH_USER_LOGIN_SECCESS = "FETCH_USER_LOGIN_SECCESS";
export const USER_LOGOUT_SECCESS = "USER_LOGOUT_SECCESS";
export const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SECCESS,
        payload: data,
    };
};

export const doLogout = () => {
    return {
        type: USER_LOGOUT_SECCESS,
    };
};
