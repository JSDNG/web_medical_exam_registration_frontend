import { useState, useEffect } from "react";
import ModalAddMember from "./ModalAddMember";
import { useParams, useNavigate } from "react-router-dom";

import { getDataClass } from "../../../services/apiService";
import "./SetFromClass.scss";
const SetFromClass = (props) => {
    const [show, folderShow] = useState(false);
    const params = useParams();
    const id = params.id;
    const [detailClass, folderDetailClass] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getData();
    }, [id]);
    const getData = async () => {
        let res = await getDataClass(id);
        if (res && res.EC === 0) {
            folderDetailClass([res.DT]);
            //console.log(detailClass[0]?.Studyfolders);
        }
    };
    return (
        <>
            <div className="list-folder-class ">
                {detailClass[0]?.Folders &&
                    detailClass[0]?.Folders.length > 0 &&
                    detailClass[0]?.Folders.map((item, index) => {
                        return (
                            <div
                                key={`${index}-folder`}
                                className="folder-content-class card col-md-9"
                                onClick={() => navigate(`/folders/${item.id}`)}
                            >
                                <div className="folder-header-text-class">
                                    <span className="class-body-text"> Thư mục: {item.folderName}</span>
                                </div>
                                <div className="folder-body-content-class">
                                    <span>Tổng số thuật ngữ</span>
                                </div>
                                <div className="folder-footer-content-class">
                                    <img
                                        className="img-by-user-create"
                                        src={`data:image/jpeg;base64,${detailClass[0]?.userId?.image}`}
                                    />
                                    <span className="name-text">{detailClass[0]?.userId?.username}</span>
                                </div>
                            </div>
                        );
                    })}
                {detailClass[0]?.Folders && detailClass[0]?.Folders.length === 0 && <div> No Folder</div>}
            </div>

            {/* <div className="header-class">
                <button className="btn btn-primary">add studyfolder</button>
                <button className="btn btn-primary">add Class</button>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        folderShow(true);
                    }}
                >
                    add member
                </button>
                <button className="btn btn-primary">folderting</button>
            </div> */}
        </>
    );
};

export default SetFromClass;
