import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getClassWithPage } from "../../../services/apiService";
import "./GetClass.scss";
const GetClass = (props) => {
    const [data, classData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        let res = await getClassWithPage(1, 3);
        if (res && res.EC === 0) {
            classData(res.DT.data);
        }
    };

    return (
        <div className="get-class-home-page">
            <div>
                <span className="title">Lớp của bạn</span>
            </div>
            <div className="class-home-custom row row-cols-md-3 g-4">
                {data &&
                    data.length > 0 &&
                    data.map((item, index) => {
                        return (
                            <div className="col">
                                <div
                                    key={`${index}-class-home`}
                                    className="class-navigate card"
                                    onClick={() => {
                                        navigate(`/classes/${item.id}`);
                                    }}
                                >
                                    <div className="class-home-card">
                                        <div className="class-home-a">
                                            <div>
                                                <span className="class-home-a-title">{item.className}</span>
                                            </div>
                                            <div>
                                                <img
                                                    className="image-class-custom"
                                                    src={`data:image/jpeg;base64,${item?.userId?.image}`}
                                                />
                                            </div>
                                        </div>

                                        <div className="class-home-c">
                                            <span className="card-text-class-home">{item.member} thư mục</span>
                                            <span className="card-text-class-home">{item.member} thành viên</span>
                                            <span className="name-text">Tạo bởi {item?.userId?.username}</span>
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

export default GetClass;
