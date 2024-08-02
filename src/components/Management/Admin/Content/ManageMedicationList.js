import "./ManageMedicationList.scss";
import { useNavigate } from "react-router-dom";
import { getAllMedication } from "../../../../services/apiService";
import { useState, useEffect } from "react";
import ModalCreactAndUpdateMedication from "./ModalCreactAndUpdateMedication";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { GiMedicines } from "react-icons/gi";
import { IoIosPricetags } from "react-icons/io";
import { CgArrowLongRightR } from "react-icons/cg";
const ManageMedicationList = (props) => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [medicationList, setMedicationList] = useState([]);
    const [medicationDetail, setMedicationDetail] = useState({});
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let res = await getAllMedication();
        if (res && res.EC === 0) {
            setMedicationList(res.DT);
        }
        if (res && res.EC !== 0) {
            console.log("err");
        }
    };
    const handleClick = (data) => {
        setShow(true);

        if (data !== "add") {
            setMedicationDetail(data);
        }
    };
    return (
        <div className="manage-medication-list-container-client-custom">
            <div className="title-medication-list-header-manage-custom">
                <span className="title-custom">Quản lý thuốc</span>
            </div>
            <div className="btn-add-medication-manage-custom">
                <button className="btn btn-primary" onClick={() => handleClick("add")}>
                    Thêm mới
                </button>
                <ModalCreactAndUpdateMedication
                    show={show}
                    setShow={setShow}
                    getData={getData}
                    medicationDetail={medicationDetail}
                />
            </div>
            <div className="manage-medication-list-body-client">
                {medicationList &&
                    medicationList.length > 0 &&
                    medicationList.map((item, index) => {
                        return (
                            <>
                                <div
                                    key={`${index}`}
                                    className="manage-detail-medication-custom"
                                    onClick={() => handleClick(item)}
                                >
                                    <div className="manage-medication-name-custom">
                                        <span className="d-flex gap-2 align-items-center">
                                            <GiMedicines style={{ fontSize: "25px" }} />
                                            {item?.medicationName}{" "}
                                        </span>
                                        <span className="d-flex gap-2 align-items-center">
                                            <IoIosPricetags style={{ fontSize: "20px" }} /> {item?.price} đ
                                        </span>
                                    </div>
                                    <div>
                                        <span className="d-flex gap-2 align-items-center">
                                            {" "}
                                            <CgArrowLongRightR style={{ fontSize: "20px" }}/>
                                            Mô tả: {item?.description}{" "}
                                        </span>
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

export default ManageMedicationList;
