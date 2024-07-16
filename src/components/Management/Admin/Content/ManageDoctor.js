import ModalCreactDoctor from "./ModalCreactDoctor";
import "./ManageUser.scss";
import TableDoctor from "./TableDoctor";
import { useEffect, useState } from "react";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
import { getAllDoctor } from "../../../../services/apiService";
const ManageDoctor = (props) => {
    const limitUsers = 4;
    const [showModalCreactUser, setShowModalCreactUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [doctorList, setDoctorList] = useState([]);
    const [data, setData] = useState({});
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        //fetchListUsersWithPage(1);
        fetchDoctorList();
    }, []);

    const fetchDoctorList = async () => {
        let res = await getAllDoctor("bac-si");
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

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setData(user);
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
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPage={fetchListUsersWithPage}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreactDoctor
                    show={showModalCreactUser}
                    setShow={setShowModalCreactUser}
                    //fetchListUsers={fetchListUsers}
                    fetchListUsersWithPage={fetchListUsersWithPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={data}
                    setDataDelete={setData}
                    //fetchListUsers={fetchListUsers}
                    fetchListUsersWithPage={fetchListUsersWithPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default ManageDoctor;
