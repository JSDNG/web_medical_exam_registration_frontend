import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getAllMember } from "../../../services/apiService";
import "./Members.scss";
const Members = (props) => {
    const params = useParams();
    const id = params.id;
    const [members, setMembers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getData();
    }, [id]);
    const getData = async () => {
        let res = await getAllMember(id);
        if (res && res.EC === 0) {
            setMembers(res.DT);
        }
    };
    const hanldeDeleteMember = () => {
        alert("me");
    };
    return (
        <>
            <div className="list-member-class ">
                {members &&
                    members.length > 0 &&
                    members.map((item, index) => {
                        return (
                            <div
                                key={`${index}-member`}
                                className="member-content-class card col-md-9"
                                //onClick={() => navigate(`/folders/${item?.id}`)}
                            >
                                <div className="member-header-text-class">
                                    <img
                                        className="img-by-member-class"
                                        src={`data:image/jpeg;base64,${item?.Users?.image}`}
                                    />
                                </div>
                                <div className="member-body-content-class">
                                    <div>
                                        <span className="name-text-group">{item?.Users?.groupId?.name}</span>
                                    </div>
                                    <div>
                                        <span className="name-text">{item?.Users?.username}</span>
                                    </div>
                                </div>
                                <button className="btn btn-light" onClick={() => hanldeDeleteMember()}>
                                    Xóa
                                </button>
                            </div>
                        );
                    })}
                {members && members.length === 0 && <div> No Members</div>}
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

export default Members;
