import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { getAllClass } from "../../../services/apiService";
import "./ListClass.scss";
const ListClass = (props) => {
    const [arrClass, setArrClass] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        let res = await getAllClass();
        if (res && res.EC === 0) {
            setArrClass(res.DT);
        }
    };
    return (
        <div className="list-class-main container">
            <div className="class-header ">
                <div className="1"> Gần đây</div>
                <div className="search">
                    <Form className="d-flex">
                        <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                    </Form>
                </div>
            </div>
            <div className="list-class ">
                {arrClass &&
                    arrClass.length > 0 &&
                    arrClass.map((item, index) => {
                        return (
                            <div
                                key={`${index}-class`}
                                className="class-content card"
                                onClick={() =>
                                    navigate(`/classes/${item.id}`, {
                                        state: {
                                            data: item.className,
                                        },
                                    })
                                }
                            >
                                <div className="card-header-text-class">
                                    <span className="text">{item.member} thành viên </span>
                                    <span className="t">&#124;</span>
                                    <span className="text"> Tạo bởi {item?.userId?.username}</span>
                                </div>
                                <div className="card-body-content-class">
                                    <span className="card-body-text-class">{item.className}</span>
                                </div>
                            </div>
                        );
                    })}
                {arrClass && arrClass.length === 0 && <div> No Class</div>}
            </div>
        </div>
    );
};

export default ListClass;
