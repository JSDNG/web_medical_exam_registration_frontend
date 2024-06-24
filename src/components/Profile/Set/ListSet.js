import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { getAllSet } from "../../../services/apiService";
import "./ListSet.scss";
const ListStudySet = (props) => {
    const [arrSet, setArrSet] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        let res = await getAllSet();
        if (res && res.EC === 0) {
            setArrSet(res.DT);
        }
    };
    return (
        <>
            <div className="set-header container">
                <div className="1"> Gần đây</div>
                <div className="search">
                    <Form className="d-flex">
                        <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                    </Form>
                </div>
            </div>
            <div className="list-set container">
                {arrSet &&
                    arrSet.length > 0 &&
                    arrSet.map((item, index) => {
                        return (
                            <div
                                key={`${index}-set`}
                                className="card-content card"
                                onClick={() => navigate(`/flash-cards/${item.id}`)}
                            >
                                <div className="card-header-text">
                                    <p>
                                        {item.cards} &#124; {item.userId.username} &#124;
                                    </p>
                                </div>
                                <div className="card-body-content">
                                    <p className="card-body-text">{item.studySetName}</p>
                                </div>
                            </div>
                        );
                    })}
                {arrSet && arrSet.length === 0 && <div> No Study Set</div>}
            </div>
        </>
    );
};

export default ListStudySet;
