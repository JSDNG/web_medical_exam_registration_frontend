import "./ManageSpecialtyList.scss";
import { useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { getAllSpecialty } from "../../../../services/apiService";
import { useState, useEffect } from "react";
import ModalCreactAndUpdateSpecialty from "./ModalCreactAndUpdateSpecialty";
const ManageSpecialtyList = (props) => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [specialtyList, setSpecialtyList] = useState([]);
    const [specialtyDetail, setSpecialtyDetail] = useState({});
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let res = await getAllSpecialty();
        if (res && res.EC === 0) {
            setSpecialtyList(res.DT);
        }
        if (res && res.EC !== 0) {
            console.log("err");
        }
    };
    const handleClick = (data) => {
        setShow(true);

        if (data !== "add") {
            setSpecialtyDetail(data);
        }
    };
    return (
        <div className="manage-specialty-list-container-client-custom">
            <div className="title-specialty-list-header-manage-custom">
                <span className="title-custom">Quản lý chuyên khoa</span>
            </div>
            <div className="btn-add-schedule-manage-custom">
                <button className="btn btn-primary" onClick={() => handleClick("add")}>
                    Thêm mới
                </button>
                <ModalCreactAndUpdateSpecialty
                    show={show}
                    setShow={setShow}
                    getData={getData}
                    specialtyDetail={specialtyDetail}
                />
            </div>
            <div className="manage-specialty-list-body-client">
                {specialtyList &&
                    specialtyList.length > 0 &&
                    specialtyList.map((item, index) => {
                        return (
                            <>
                                <div
                                    key={`${index}-1a`}
                                    className="manage-detail-specialty-custom"
                                    onClick={() => handleClick(item)}
                                >
                                    <div>
                                        <img
                                            className="manage-image-specialty-custom"
                                            src={`data:image/jpeg;base64,${item?.image}`}
                                        />
                                    </div>
                                    <div className="manage-info-specialty-custom">
                                        <div className="manage-specialty-name-custom">
                                            <span>{item?.specialtyName} </span>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </>
                        );
                    })}
            </div>
        </div>
    );
};

export default ManageSpecialtyList;
