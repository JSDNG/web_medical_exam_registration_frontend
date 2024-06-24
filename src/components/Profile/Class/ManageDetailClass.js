import { useState, useEffect } from "react";
import ModalAddMember from "./ModalAddMember";

import ModalAddFolder from "./ModalAddFolder";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import HeaderClass from "./HeaderClass";
import { getDataClass } from "../../../services/apiService";
import { Outlet } from "react-router-dom";
import "./ManageDetailClass.scss";
import SetFromClass from "./SetFromClass";
const ManageDetailClass = (props) => {
    const [showMember, setShowMember] = useState(false);
    const [showFolder, setShowFolder] = useState(false);
    const location = useLocation();

    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    return (
        <div className="detail-class-main">
            <div className="detail-class-header">
                <div className="class-name">
                    <span className="class-name-text">{location?.state?.data} tên lớp</span>
                </div>
                <div className="action-class">
                    <button className="btn btn-light" onClick={() => setShowMember(true)}>
                        Thêm thành viên
                    </button>
                    <ModalAddMember showMember={showMember} setShowMember={setShowMember} />
                    <button className="btn btn-light" onClick={() => setShowFolder(true)}>
                        Thêm thư mục
                    </button>
                    <ModalAddFolder showFolder={showFolder} setShowFolder={setShowFolder} />
                </div>

                <div className="header-class-custom">
                    <HeaderClass />
                    <hr />
                </div>
                <div className="detail-class-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ManageDetailClass;
