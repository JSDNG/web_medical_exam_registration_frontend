import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { MdFileUpload } from "react-icons/md";
import { postSpecialty, putSpecialty } from "../../../../services/apiService";
const ModalCreateAndUpdateSpecialty = (props) => {
    const { show, setShow, specialtyDetail } = props;
    const [specialtyName, setSpecialtyName] = useState("");
    const [description, setDescription] = useState("");
    const [previewImgURL, setPreviewImgURL] = useState("");
    const [imageBase64, setImageBase64] = useState("");
    const handleClose = () => {
        setShow(false);
        setSpecialtyName("");
        setDescription("");
        setImageBase64("");
        setPreviewImgURL("");
    };
    useEffect(() => {
        setDescription(specialtyDetail?.description);
        setSpecialtyName(specialtyDetail?.specialtyName);
        setPreviewImgURL(`data:image/jpeg;base64,${specialtyDetail?.image}`);
    }, [specialtyDetail]);
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

    const handleSubmit = async () => {
        if (!specialtyName || !description || !imageBase64) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
            return;
        }

        const data = {
            specialtyName: specialtyName,
            image: imageBase64.replace("data:image/png;base64,", ""),
            description: description,
        };

        if (specialtyDetail && Object.keys(specialtyDetail).length !== 0) {
            data.id = specialtyDetail.id;
        }

        try {
            let res =
                specialtyDetail && Object.keys(specialtyDetail).length !== 0
                    ? await putSpecialty(data)
                    : await postSpecialty(data);

            if (res && res.EC === 0) {
                toast.success(res.EM);
                handleClose();
                props.getData();
            } else if (res && res.EC !== 0) {
                toast.error(res.EM);
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại!");
            console.error(error);
        }
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
                size="md"
                backdrop="static"
                className="modal-specialty"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chuyên khoa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3" style={{ maxHeight: "500px", overflowY: "auto" }}>
                        <div className="col-md-12">
                            <input id="previewImg" type="file" hidden onChange={(event) => handleOnchangeImg(event)} />
                            <MdFileUpload />
                            <label className="lbl-upload-image" htmlFor="previewImg">
                                {" "}
                                Tải hình ảnh
                            </label>
                            <div className="preview-img" style={{ backgroundImage: `url(${previewImgURL})` }}></div>
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">Tên chuyên khoa</label>
                            <input
                                type="text"
                                className="form-control"
                                value={specialtyName}
                                onChange={(event) => setSpecialtyName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Mô tả</label>
                            <textarea
                                type="text"
                                className="form-control text-area-specialty-custom"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleSubmit()}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCreateAndUpdateSpecialty;
