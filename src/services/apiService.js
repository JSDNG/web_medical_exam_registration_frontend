import axios from "../utils/axiosCustomize";

const postLoginWithLocal = (data) => {
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
const getAllPosition = () => {
    return axios.get(`/api/v1/admin/position/all`);
};
// specialty
const getAllSpecialty = () => {
    return axios.get(`/api/v1/admin/specialty/all`);
};
const postSpecialty = (data) => {
    return axios.post(`/api/v1/admin/specialty`, { ...data });
};
const putSpecialty = (data) => {
    return axios.put(`/api/v1/admin/specialty`, { ...data });
};
// medication
const getAllMedication = () => {
    return axios.get(`/api/v1/admin/medication/all`);
};
const postMedication = (data) => {
    return axios.post(`/api/v1/admin/medication`, { ...data });
};
const putMedication = (data) => {
    return axios.put(`/api/v1/admin/medication`, { ...data });
};
const getAllMedicalStaff = (data) => {
    return axios.get(`/api/v1/admin/medical-staff/all?medicalstaff=${data}`);
};
const getListOfFamousDoctors = (data) => {
    return axios.get(`/api/v1/admin/list-of-famous-doctors`);
};

// Doctor
const getAllAppointmentFromDoctor = (doctorId, statusId) => {
    return axios.get(`/api/v1/doctor/appointment-from-one-doctor/all?doctorId=${doctorId}&statusId=${statusId}`);
};
const putExaminingDoctor = (data) => {
    return axios.put("/api/v1/doctor/examining-doctor", { ...data });
};
const postPrescription = (data) => {
    return axios.post(`/api/v1/doctor/prescription`, { ...data });
};
//Schedule
const postCreateSchedule = (data) => {
    return axios.post(`/api/v1/doctor/schedule`, { ...data });
};
const getAllSchedule = (id) => {
    return axios.get(`/api/v1/doctor/schedule/all?id=${id}`);
};
const deleteOneSchedule = (id) => {
    return axios.delete(`/api/v1/doctor/schedule/${id}`);
};
//Appointment
const postCreateAppointment = (data) => {
    return axios.post(`/api/v1/patient/appointment`, { ...data });
};

//Patient
const createQuickCheckUp = (data) => {
    return axios.post(`/api/v1/patient/quick-check-up`, { ...data });
};

const getPatientInfo = (id) => {
    return axios.get(`/api/v1/patient/information?id=${id}`);
};

const putUpdatePatient = (data) => {
    return axios.put(`/api/v1/patient/information`, { ...data });
};

const getAllRelative = (id) => {
    return axios.get(`/api/v1/relative/all?id=${id}`);
};
const getScheduleForPatient = (dateQuickCheckUp, specialty) => {
    return axios.get(
        `/api/v1/patient/find-the-right-schedule?dateQuickCheckUp=${dateQuickCheckUp}&specialty=${specialty}`
    );
};
const getAllMedicalRecordfromPatient = (patientId, statusId) => {
    return axios.get(`/api/v1/patient/medical-record/all?patientId=${patientId}&statusId=${statusId}`);
};
// staff
const getAllAppointmentById = (id) => {
    return axios.get(`/api/v1/appointment/all?id=${id}`);
};
const putAppointment = (data) => {
    return axios.put(`/api/v1/staff/appointment`, { ...data });
};
const deleteAppointment = (id) => {
    return axios.delete(`/api/v1/staff/appointment/${id}`);
};

// specialty
const getAllDoctorfromSpecialtyById = (id) => {
    return axios.get(`/api/v1/admin/all-doctor-specialty-by-id?id=${id}`);
};

const getOneMedicalStaff = (id) => {
    return axios.get(`/api/v1/medical-staff?id=${id}`);
};
const putMedicalStaff = (data) => {
    return axios.put(`/api/v1/medical-staff`, { ...data });
};

const postSendEmailInvoice = (data) => {
    console.log(data);
    return axios.post(`/api/v1/doctor/send-email-invoice`, { ...data });
};
const getAllInvoiceByDoctorId = (id) => {
    return axios.get(`/api/v1/doctor/invoice?id=${id}`);
};
export {
    postLoginWithLocal,
    postRegister,
    logout,
    getAllTime,
    getAllPosition,
    getAllSpecialty,
    postSpecialty,
    putSpecialty,
    getAllMedicalStaff,
    postCreateSchedule,
    getAllSchedule,
    deleteOneSchedule,
    postCreateAppointment,
    putUpdatePatient,
    getAllAppointmentFromDoctor,
    putExaminingDoctor,
    getAllRelative,
    createQuickCheckUp,
    getAllAppointmentById,
    putAppointment,
    deleteAppointment,
    getAllDoctorfromSpecialtyById,
    getAllMedicalRecordfromPatient,
    putMedicalStaff,
    getListOfFamousDoctors,
    getAllMedication,
    postMedication,
    putMedication,
    postPrescription,
    postSendEmailInvoice,
    getAllInvoiceByDoctorId,
    getOneMedicalStaff,
    getPatientInfo,
    getScheduleForPatient,
};
