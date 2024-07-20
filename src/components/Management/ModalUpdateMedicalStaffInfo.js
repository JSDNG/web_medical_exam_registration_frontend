import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { putMedicalStaff, getAllSpecialty, getAllPosition } from "../../services/apiService";
import { useEffect, useState } from "react";
import { MdFileUpload } from "react-icons/md";
import { render } from "nprogress";
import moment from "moment";
const ModalUpdateMedicalStaffInfo = (props) => {
    const { show, setShow, account } = props;
    const [specialtyList, setSpecialtyList] = useState([]);
    const [specialtyId, setSpecialtyId] = useState("");
    const [positionList, setPositionList] = useState([]);
    const [position, setPosition] = useState(account?.user?.Position?.positionName);
    const [positionId, setPositionId] = useState(account?.user?.Position?.id);
    const [fullName, setFullName] = useState(account?.user?.fullName);
    const [gender, setGender] = useState(account?.user?.gender);
    const [phone, setPhone] = useState(account?.user?.phone);
    const [price, setPrice] = useState(account?.user?.price);

    const [description, setDescription] = useState(account?.user?.description);
    const [previewImgURL, setPreviewImgURL] = useState(`data:image/jpeg;base64,${account?.user?.image}`);
    const [imageBase64, setImageBase64] = useState(account?.user?.image);
    const handleClose = () => {
        setShow(false);
    };
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let resSpecialty = await getAllSpecialty();
        let resPosition = await getAllPosition();
        if (resPosition && resPosition.EC === 0) {
            setPositionList(resPosition.DT);
        }
        if (resSpecialty && resSpecialty.EC === 0) {
            setSpecialtyList(resSpecialty.DT);
        }
        if (resSpecialty && resSpecialty.EC !== 0) {
            console.log("err");
        }
    };
    const formatNumber = (value) => {
        // Remove all non-digit characters
        value = value.replace(/\D/g, "");

        // Format the number with thousand separators
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleChangePrice = (price) => {
        const formattedValue = formatNumber(price);
        setPrice(formattedValue);
    };
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file); // Corrected this line
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleOnchangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = window.URL.createObjectURL(file);
            setPreviewImgURL(objectUrl);

            let base64 = await getBase64(file);
            setImageBase64(base64);
            // console.log(base64);
        }
    };
    const handleChangePhone = (phone) => {
        // Xóa tất cả các ký tự không phải là số
        const cleanedValue = phone.replace(/[^0-9]/g, "");

        // Giới hạn số ký tự nhập vào là 10
        if (cleanedValue.length <= 10) {
            setPhone(cleanedValue);
        }
    };
    const handleSubmitUpdate = async () => {
        if (!fullName || !phone || !gender || !price) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
            return;
        }
        let data = {
            id: account?.user?.id,
            fullName: fullName,
            image: imageBase64.replace("data:image/png;base64,", ""),
            gender: gender,
            phone: phone,
            description: description,
            price: price,
            positionId: positionId,
            //specialtyId: specialtyId,
            //specialty: [3, 4],
        };
        console.log(data);
        let res = await putMedicalStaff(data);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
                size="xl"
                backdrop="static"
                className="modal-add-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thông tin cá nhân</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3" style={{ maxHeight: "500px", overflowY: "auto" }}>
                        <div className="col-md-6" style={{ maxHeight: "300px", overflowY: "auto" }}>
                            <label className="form-label">Chức danh</label>
                            <select
                                className="form-select"
                                onChange={(event) => setPositionId(event.target.value)}
                                value={positionId}
                            >
                                {positionList &&
                                    positionList.length > 0 &&
                                    positionList.map((item, index) => (
                                        <option key={`${index}-m`} value={item?.id}>
                                            {item?.positionName}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Họ tên</label>
                            <input
                                type="text"
                                className="form-control"
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6" style={{ maxHeight: "300px", overflowY: "auto" }}>
                            <label className="form-label">Chuyên khoa</label>
                            <select
                                className="form-select"
                                onChange={(event) => setSpecialtyId(event.target.value)}
                                value={specialtyId}
                            >
                                {specialtyList &&
                                    specialtyList.length > 0 &&
                                    specialtyList.map((item, index) => (
                                        <option key={`${index}-m`} value={item?.id}>
                                            {item?.specialtyName}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Giới tính</label>
                            <select
                                className="form-select"
                                onChange={(event) => setGender(event.target.value)}
                                value={gender}
                            >
                                <option value="Nữ">Nữ</option>
                                <option value="Nam">Nam</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                value={phone}
                                onChange={(event) => handleChangePhone(event.target.value)}
                            />
                        </div>
                        {/* <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={account?.email} disabled />
                        </div> */}
                        <div className="col-md-6">
                            <label className="form-label">Giá khám</label>
                            <input
                                type="text"
                                className="form-control"
                                value={price}
                                onChange={(event) => handleChangePrice(event.target.value)}
                                placeholder="Ví dụ: 300.000 đ"
                            />
                        </div>
                        <div className="col-md-6">
                            <input id="previewImg" type="file" hidden onChange={(event) => handleOnchangeImg(event)} />
                            <MdFileUpload />
                            <label className="lbl-upload-image" htmlFor="previewImg">
                                {" "}
                                Tải hình ảnh
                            </label>
                            <div className="preview-img" style={{ backgroundImage: `url(${previewImgURL})` }}></div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Mô tả</label>
                            <textarea
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleSubmitUpdate()}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUpdateMedicalStaffInfo;
