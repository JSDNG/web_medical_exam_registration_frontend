import ModalCreactUser from "./ModalCreactUser";
import "./ManageUser.scss";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers, getUserWithPage } from "../../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
const ManageUser = (props) => {
    const limitUsers = 4;
    const [showModalCreactUser, setShowModalCreactUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [listUser, setListUser] = useState([]);
    const [data, setData] = useState({});
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchListUsersWithPage(1);
    }, []);

    // const fetchListUsers = async () => {
    //     let res = await getAllUsers();
    //     if (res.EC === 0) {
    //         setListUser(res.DT);
    //     }
    // };

    const fetchListUsersWithPage = async (page) => {
        let res = await getUserWithPage(page, limitUsers);
        if (res.EC === 0) {
            setListUser(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    };

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setData(user);
    };

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setData(user);
    };

    return (
        <div className="manage-user-container">
            <div className="title">manage</div>
            <div className="user-content">
                <div className="btn-add-user">
                    <button className="btn btn-primary" onClick={() => setShowModalCreactUser(true)}>
                        Add user
                    </button>
                </div>
                <div className="table-user">
                    <TableUserPaginate
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPage={fetchListUsersWithPage}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreactUser
                    show={showModalCreactUser}
                    setShow={setShowModalCreactUser}
                    //fetchListUsers={fetchListUsers}
                    fetchListUsersWithPage={fetchListUsersWithPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={data}
                    setDataUpdate={setData}
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

export default ManageUser;
