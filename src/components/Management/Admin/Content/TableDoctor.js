import { useState } from "react";
import ModalDoctorDetail from "./ModalDoctorDetail";
const TableDoctor = (props) => {
    const { doctorList } = props;
    const [show, setShow] = useState(false);
    const [doctorDetail, setDoctorDetail] = useState({});
    const handleView = (data) => {
        setShow(true);
        setDoctorDetail(data);
    };
    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Họ tên</th>
                        <th scope="col">Email</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Giá khám</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {doctorList &&
                        doctorList.length > 0 &&
                        doctorList.map((item, index) => {
                            return (
                                <tr key={`table-user${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.fullName}</td>
                                    <td>{item.Account.email}</td>
                                    <td>{item.phone}</td>
                                    {item.price !== null ? <td>{item.price} đ</td> : <td></td>}

                                    <td>
                                        <button className="btn btn-success" onClick={() => handleView(item)}>
                                            Xem chi tiết
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    {doctorList && doctorList.length === 0 && (
                        <tr>
                            <td colSpan={"6"}>Không có bác sĩ nào</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ModalDoctorDetail show={show} setShow={setShow} doctorDetail={doctorDetail} />
        </>
    );
};

export default TableDoctor;
