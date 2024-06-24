import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSetWithPage } from "../../../services/apiService";
import "./GetSet.scss";
const GetSet = (props) => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        let res = await getSetWithPage(1, 3);
        if (res && res.EC === 0) {
            setData(res.DT.data);
        }
    };

    return (
        <div className="get-set-home-page">
            <div>
                <span className="title">Gần đây</span>
            </div>
            <div className="set-home-custom row row-cols-md-3 g-4">
                {data &&
                    data.length > 0 &&
                    data.map((item, index) => {
                        return (
                            <div className="col">
                                <div
                                    key={`${index}-set-home`}
                                    className="set-navigate card"
                                    onClick={() => {
                                        navigate(`/flash-cards/${item.id}`);
                                    }}
                                >
                                    <div className="set-home-card">
                                        <div className="set-home-a">
                                            <span className="set-home-a-title">{item.studySetName}</span>
                                        </div>
                                        <div className="set-home-b">
                                            <span className="card-text-set-home">{item.cards} thuật ngữ</span>
                                        </div>
                                        <div className="set-home-c">
                                            <img src={`data:image/jpeg;base64,${item?.userId?.image}`} />
                                            <span className="name-text">{item?.userId?.username}</span>
                                        </div>
                                    </div>
                                </div>

                                {data && data.length === 0 && <div></div>}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default GetSet;
