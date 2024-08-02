import ModalCreactDoctor from "./ModalCreactDoctor";
import "./ManageDoctor.scss";
import TableDoctor from "./TableDoctor";
import { useEffect, useState } from "react";
import { getAllMedicalStaff } from "../../../../services/apiService";
const ManageDoctor = (props) => {
    const limitUsers = 4;
    const [showModalCreactUser, setShowModalCreactUser] = useState(false);
    const [doctorList, setDoctorList] = useState([]);
    const [data, setData] = useState({});
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        //fetchListUsersWithPage(1);
        fetchDoctorList();
    }, []);

    const fetchDoctorList = async () => {
        let res = await getAllMedicalStaff("bac-si",);
        if (res && res.EC === 0) {
            setDoctorList(res.DT);
        }
    };
    const fetchListUsersWithPage = async (page) => {
        // let res = await getUserWithPage(page, limitUsers);
        // if (res.EC === 0) {
        //     setListUser(res.DT.users);
        //     setPageCount(res.DT.totalPages);
        // }
    };

    return (
        <div className="manage-doctor-container">
            <div className="title">Quản lý bác sĩ</div>
            <div className="user-content">
                <div className="btn-add-user">
                    <button className="btn btn-primary" onClick={() => setShowModalCreactUser(true)}>
                        Thêm mới
                    </button>
                </div>
                <div className="table-user">
                    {/* <TableUserPaginate
                        doctorList={doctorList}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPage={fetchListUsersWithPage}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    /> */}
                    <TableDoctor
                        doctorList={doctorList}
                        fetchListUsersWithPage={fetchListUsersWithPage}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreactDoctor
                    show={showModalCreactUser}
                    setShow={setShowModalCreactUser}
                    fetchDoctorList={fetchDoctorList}
                />
            </div>
        </div>
    );
};

export default ManageDoctor;
