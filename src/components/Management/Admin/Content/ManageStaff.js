import { useState, useEffect } from "react";
import { getAllMedicalStaff } from "../../../../services/apiService";
import ModalCreateStaff from "./ModalCreactStaff";
const ManageStaff = (props) => {
    const [show, setShow] = useState(false);
    const [staffList, setStaffList] = useState([]);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let res = await getAllMedicalStaff("nhan-vien");
        if (res && res.EC === 0) {
            setStaffList(res.DT);
        }
    };
    return (
        <div className="manage-staff-container">
            <div className="title">Quản lý Nhân viên</div>
            <div className="btn-add-staff">
                <button className="btn btn-primary" onClick={() => setShow(true)}>
                    Thêm mới
                </button>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Họ tên</th>
                        <th scope="col">Email</th>
                        <th scope="col">Số điện thoại</th>
                        {/* <th width="257px">Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {staffList &&
                        staffList.length > 0 &&
                        staffList.map((item, index) => {
                            return (
                                <tr key={`table-user${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.fullName}</td>
                                    <td>{item.Account.email}</td>
                                    <td>{item.phone}</td>
                                    {/* <td>
                                        <button className="btn btn-success">View</button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => props.handleClickBtnDelete(item)}
                                        >
                                            Delete
                                        </button>
                                    </td> */}
                                </tr>
                            );
                        })}
                    {staffList && staffList.length === 0 && (
                        <tr>
                            <td colSpan={"5"}>Not found data</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ModalCreateStaff show={show} setShow={setShow} getData={getData} />
        </div>
    );
};

export default ManageStaff;
