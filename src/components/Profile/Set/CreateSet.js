import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CreateSet.scss";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { postCreateNewSet } from "../../../services/apiService";
import { toast } from "react-toastify";
const CreateSet = (props) => {
    const [cardIndex, SetCardIndex] = useState(0);
    const [title, setTitle] = useState("");
    const [arrCard, setArrCard] = useState([
        {
            id: uuidv4(),
            term: "",
            definition: "",
        },
    ]);

    const userId = useSelector((state) => state.user.account.user_id);
    const handleSubmit = async (event) => {
        let data = {
            studySetName: title,
            userId: userId,
            cards: arrCard,
        };
        data.cards.forEach((card) => {
            delete card.id;
        });

        let res = await postCreateNewSet(data);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        }
        if (res && +res.EC !== 0) {
            toast.error(res.EM);
        }
    };
    const handleAddDeleteCard = (type, id) => {
        if (type === "ADD") {
            let newCard = {
                id: uuidv4(),
                term: "",
                definition: "",
            };
            setArrCard([...arrCard, newCard]);
        }
        if (type == "DELETE") {
            let arrCardClone = _.cloneDeep(arrCard);
            arrCardClone = arrCardClone.filter((item) => item.id !== id);
            setArrCard(arrCardClone);
        }
    };
    const handelOnChange = (type, id, value) => {
        if (type === "term" || type === "definition") {
            let arrCardClone = _.cloneDeep(arrCard);
            let index = arrCardClone.findIndex((item) => item.id == id);
            if (index > -1) {
                arrCardClone[index][type] = value;
                setArrCard(arrCardClone);
            }
        }
    };
    return (
        <div className="create-set-container">
            <div className="set-header-container">
                <span> Tạo học phần mới</span>
                <button className="btn btn-light" onClick={() => handleSubmit()}>
                    Tạo
                </button>
            </div>
            <div className="set-header-tille-custom input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên tiêu đề"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>

            {arrCard &&
                arrCard.length > 0 &&
                arrCard.map((item, index) => {
                    return (
                        <div key={`${index}-card`} className="card card-main-container">
                            <div className="card-header-1 container">
                                <span>{index + 1}</span>
                                {arrCard.length > 1 && (
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleAddDeleteCard("DELETE", item.id)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                            <hr />

                            <div className="cards-content container">
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        className="form-control "
                                        placeholder="Thuật ngữ"
                                        value={item.term}
                                        onChange={(event) => handelOnChange("term", item.id, event.target.value)}
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        className="form-control "
                                        placeholder="Định nghĩa"
                                        value={item.definition}
                                        onChange={(event) => handelOnChange("definition", item.id, event.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}

            <div className="text-center">
                <button className="btn btn-primary text" onClick={() => handleAddDeleteCard("ADD", "")}>
                    Thêm thẻ
                </button>
            </div>
            <div className="create-set-footer">
                <button className="btn btn-light " onClick={() => handleSubmit()}>
                    Tạo
                </button>
            </div>
        </div>
    );
};

export default CreateSet;
