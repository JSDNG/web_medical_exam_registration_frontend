import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { putMedicalStaff, getAllSpecialty, getAllPosition, getOneMedicalStaff } from "../../services/apiService";
import { useEffect, useState } from "react";
import { MdFileUpload } from "react-icons/md";
import { doLogin } from "../../redux/action/userAction";
import { useDispatch } from "react-redux";
const ModalUpdateMedicalStaffInfo = (props) => {
    const { show, setShow, account } = props;
    const [specialtyList, setSpecialtyList] = useState([]);
    const [specialtyIdList, setSpecialtyIdList] = useState([]);
    const [positionList, setPositionList] = useState([]);
    const [positionId, setPositionId] = useState(account?.user?.Position?.id ? account?.user?.Position?.id : 1);
    const [fullName, setFullName] = useState(account?.user?.fullName);
    const [gender, setGender] = useState(account.user.gender ? account?.user?.gender : "Nữ");
    const [phone, setPhone] = useState(account?.user?.phone);
    const [price, setPrice] = useState(account?.user?.price);
    const dispatch = useDispatch();
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
        if (account?.role === "Bác sĩ") {
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
        }
    };
    const refreshData = async () => {
        let res = await getOneMedicalStaff(account?.user?.id);
        if (res && res.EC === 0) {
            dispatch(doLogin(res));
        }
    };
    const handleChooseSpecialty = (event) => {
        const selectedValues = Array.from(event.target.selectedOptions, (option) => Number(option.value));
        console.log(selectedValues);
        setSpecialtyIdList(selectedValues);
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
    const replaceImagePrefix = (imageBase64) => {
        const prefixPatterns = [
            /^data:image\/png;base64,/,
            /^data:image\/jpg;base64,/,
            /^data:image\/jpeg;base64,/,
            /^data:image\/gif;base64,/,
            // Thêm các định dạng khác nếu cần
        ];

        for (const pattern of prefixPatterns) {
            if (pattern.test(imageBase64)) {
                return imageBase64.replace(pattern, "");
            }
        }

        // Trả về chuỗi gốc nếu không tìm thấy tiền tố nào phù hợp
        return imageBase64;
    };

    const handleSubmitUpdate = async () => {
        if (!fullName || !gender) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
            return;
        }
        let data = {
            id: account?.user?.id,
            fullName: fullName,
            image: replaceImagePrefix(imageBase64),
            gender: gender,
            phone: phone,
            description: description,
            price: price,
            positionId: positionId,
            specialty: specialtyIdList,
        };
        let res = await putMedicalStaff(data);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            refreshData();
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
                size="lg"
                backdrop="static"
                className="modal-update-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thông tin cá nhân</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3" style={{ maxHeight: "500px", overflowY: "auto" }}>
                        {account?.role === "Bác sĩ" ? (
                            <>
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

                                <div className="col-md-6 " style={{ maxHeight: "300px", overflowY: "auto" }}>
                                    <label className="form-label">Chuyên khoa</label>
                                    <select
                                        className="form-select"
                                        onChange={(event) => handleChooseSpecialty(event)}
                                        value={specialtyIdList}
                                        multiple
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
                                    <label className="form-label">Giá khám</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={price}
                                        onChange={(event) => handleChangePrice(event.target.value)}
                                        placeholder="Ví dụ: 300.000 đ"
                                    />
                                </div>
                            </>
                        ) : (
                            <></>
                        )}

                        <div className="col-md-6">
                            <label className="form-label">Họ tên</label>
                            <input
                                type="text"
                                className="form-control"
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                            />
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
