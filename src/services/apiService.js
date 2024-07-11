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
const postRegister = (data) => {
    return axios.post("/api/v1/register", { ...data });
};
const logout = (email, refresh_token) => {
    return axios.post("/api/v1/logout", { email, refresh_token });
};
const getAllTime = () => {
    return axios.get(`/api/v1/admin/time/all`);
};
const getAllSpecialty = () => {
    return axios.get(`/api/v1/admin/specialty/all`);
};
const getAllDoctor = (data) => {
    return axios.get(`/api/v1/admin/medical-staff/all?medicalstaff=${data}`);
};
// Doctor
const getAllAppointmentFromDoctor = (id) => {
    return axios.get(`/api/v1/doctor/appointment-from-doctor/all?id=${id}`);
};
const putExaminingDoctor = (data) => {
    return axios.put("/api/v1/doctor/examining-doctor", { ...data });
};
//Schedule
const postCreateSchedule = (data) => {
    return axios.post(`/api/v1/doctor/schedule`, { ...data });
};
const getAllSchedule = (id) => {
    return axios.get(`/api/v1/doctor/${id}/schedule/all`);
};
const deleteOneSchedule = (id) => {
    return axios.delete(`/api/v1/doctor/schedule/${id}`);
};
//Appointment
const postCreateAppointment = (data) => {
    console.log(data);
    return axios.post(`/api/v1/patient/appointment`, { ...data });
};

//Patient
const putUpdatePatient = (data) => {
    return axios.put(`/api/v1/patient/information`, { ...data });
};

const getAllRelative = (id) => {
    return axios.get(`/api/v1/relative/all?id=${id}`);
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
    getAllSpecialty,
    getAllDoctor,
    postCreateSchedule,
    getAllSchedule,
    deleteOneSchedule,
    postCreateAppointment,
    putUpdatePatient,
    getAllAppointmentFromDoctor,
    putExaminingDoctor,
    getAllRelative,
};
