import axios from "../utils/axiosCustomize";
const postCreacteNewUser = (email, password, username, role, image) => {
    //call API
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);
    return axios.post("/api/v1/participant", data);
};

const getAllUsers = () => {
    return axios.get("/api/v1/participant/all");
};

const putUpdateUser = (id, username, role, image) => {
    //call API
    const data = new FormData();
    data.append("id", id);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);
    return axios.put("/api/v1/participant", data);
};
const deleteUser = (id) => {
    return axios.delete("/api/v1/participant", { data: { id } });
};
const getUserWithPage = (page, limit) => {
    return axios.get(`/api/v1/participant?page=${page}&limit=${limit}`);
};
const postLogin = (data) => {
    return axios.post("/api/v1/login", { ...data });
};
const postRegister = (email, password, username, groupId) => {
    return axios.post("/api/v1/register", { email, password, username, groupId });
};
const logout = (email, refresh_token) => {
    return axios.post("/api/v1/logout", { email, refresh_token });
};
const getAllTime = () => {
    return axios.get(`/api/v1/admin/time/all`);
};
const getAllDoctor = (data) => {
    return axios.get(`/api/v1/admin/medical-staff/all?medicalstaff=${data}`);
};
//Schedule
const postCreateSchedule = (data) => {
    return axios.post(`/api/v1/doctor/schedule`, { ...data });
};
const getAllChedule = (id) => {
    return axios.get(`/api/v1/doctor/${id}/schedule/all`);
};
export {
    postCreacteNewUser,
    getAllUsers,
    putUpdateUser,
    deleteUser,
    getUserWithPage,
    postLogin,
    postRegister,
    logout,
    getAllTime,
    getAllDoctor,
    postCreateSchedule,
    getAllChedule,
};
