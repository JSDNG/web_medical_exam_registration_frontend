import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDataSet } from "../../../services/apiService";
import DetailCard from "./DetailCard";
import "./DetailSet.scss";
const DetailSet = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const id = params.id;
    const [detailSet, setDetailSet] = useState([]);
    const [cardIndex, SetCardIndex] = useState(0);
    useEffect(() => {
        getData();
    }, [id]);
    const getData = async () => {
        let res = await getDataSet(id);
        if (res && res.EC === 0) {
            setDetailSet([res.DT]);
        }
    };
    const handlePrev = () => {
        if (cardIndex - 1 < 0) return;
        SetCardIndex(cardIndex - 1);
    };
    const handleNext = () => {
        if (detailSet[0]?.Cards && detailSet[0]?.Cards?.length > cardIndex + 1) SetCardIndex(cardIndex + 1);
    };
    return (
        <div key={`${detailSet[0]?.id}-set`} className="set-container ">
            <div className="header-content">
                <div className="set-name">
                    <p className="card-text">{detailSet[0]?.studySetName}</p>
                </div>
                <div className="text-1">
                    <span>Ôn tập trên lớp</span>
                </div>

                <div className="a">
                    <DetailCard
                        index={cardIndex}
                        card={
                            detailSet[0]?.Cards && detailSet[0]?.Cards.length > 0 ? detailSet[0]?.Cards[cardIndex] : []
                        }
                    />
                </div>
                <div className="b">
                    <button className="btn btn-secondary" onClick={() => handlePrev()}>
                        Prev
                    </button>
                    <button className="btn btn-primary" onClick={() => handleNext()}>
                        Next
                    </button>
                </div>
            </div>
            <hr />
            <div className="footer-card">
                <div className="info-text">
                    <img src={`data:image/jpeg;base64,${detailSet[0]?.userId?.image}`} />
                    <span className="name-text">{detailSet[0]?.userId?.username}</span>
                </div>
                <div className="title-text-cards">
                    <span>Thuật ngữ trong phần học này ({detailSet[0]?.Cards?.length}) </span>
                </div>
                <div className="list-card">
                    {detailSet[0]?.Cards &&
                        detailSet[0]?.Cards.length > 0 &&
                        detailSet[0]?.Cards.map((item, index) => {
                            return (
                                <div key={`${index}-card`} className="card">
                                    <div className="card-body">
                                        <span> {item.term}</span>
                                        <span>&#124; {item.definition}</span>
                                        <button className="btn btn-light"> update</button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div className="btn-update">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/edit-set/${detailSet[0]?.id}`, { state: { data: detailSet } })}
                    >
                        {" "}
                        Thêm hoặc xóa thuật ngữ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailSet;
