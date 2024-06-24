import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDataFolder } from "../../../services/apiService";
import ModalFolder from "./ModalFolder";
import "./DetailFolder.scss";
const DetailFolder = (props) => {
    const params = useParams();
    const id = params.id;
    const [detailFolder, setDetailFolder] = useState([]);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    //const [cardIndex, SetCardIndex] = useState(0);
    useEffect(() => {
        getData();
    }, [id]);
    const getData = async () => {
        let res = await getDataFolder(id);
        if (res && res.EC === 0) {
            setDetailFolder([res.DT]);
            //console.log(detailFolder[0]?.StudySets);
        }
    };
    return (
        <div className="detail-folder-main ">
            <div className="detail-folder-header">
                <div className="total-set">
                    <span>{detailFolder[0]?.StudySets?.length} học phần </span>
                </div>
                <div className="create-by-user">
                    <span>Tạo bởi </span>
                    <img
                        className="img-by-user-create"
                        src={`data:image/jpeg;base64,${detailFolder[0]?.userId?.image}`}
                    />
                    <span className="name-text">{detailFolder[0]?.userId?.username}</span>
                </div>
                <div className="action-folder">
                    <button className="btn btn-light" onClick={() => setShow(true)}>
                        Thêm
                    </button>
                    <ModalFolder show={show} setShow={setShow} />
                    <button className="btn btn-light">Sửa</button>
                    <button className="btn btn-light">Xóa</button>
                </div>
            </div>
            <div className="folder-name">
                <span className="folder-name-text">{detailFolder[0]?.folderName}</span>
            </div>
            <div className="list-set-folder ">
                {detailFolder[0]?.StudySets &&
                    detailFolder[0]?.StudySets.length > 0 &&
                    detailFolder[0]?.StudySets.map((item, index) => {
                        return (
                            <div
                                key={`${index}-set`}
                                className="set-content-folder card col-md-6"
                                onClick={() => navigate(`/flash-cards/${item.id}`)}
                            >
                                <div className="set-header-text-folder">
                                    <span className="folder-body-text">{item.studySetName}</span>
                                </div>
                                <div className="set-body-content-folder">
                                    <span>Tổng số thuật ngữ</span>
                                </div>
                                <div className="set-footer-content-folder">
                                    <img
                                        className="img-by-user-create"
                                        src={`data:image/jpeg;base64,${detailFolder[0]?.userId?.image}`}
                                    />
                                    <span className="name-text">{detailFolder[0]?.userId?.username}</span>
                                </div>
                            </div>
                        );
                    })}
                {detailFolder[0]?.StudySets && detailFolder[0]?.StudySets.length === 0 && <div> No Study Set</div>}
            </div>
        </div>
    );
};

export default DetailFolder;
