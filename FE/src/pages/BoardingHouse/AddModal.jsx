import Modal from "../../components/Modal/Modal";
import "./BoardingHouse.css";
import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import boardingHouseService from "../../service/boardingHouseService";
import { toast } from "react-toastify";

const AddModal = ({ setAddModal }) => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState("");
  const imageFile = useRef();

  const handleAdd = async (data) => {
    data.thumbnail = image;
    const res = await boardingHouseService.add(data);

    console.log(res);
    toast.success(res.data?.message);
  };

  const handleChange = (e) => {
    const [file] = e.target.files;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleChooseImage = () => {
    imageFile.current.click();
  };

  return (
    <>
      <Modal setModal={setAddModal}>
        <h3 className="modal-title">Thông tin căn trọ</h3>
        <form className="modal-form" onSubmit={handleSubmit(handleAdd)}>
          <div className="modal-type">
            <div
              className="modal-upload"
              style={{}}
              onClick={handleChooseImage}
            >
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                className="modal-file"
                {...register("thumbnail")}
                onChange={handleChange}
                ref={(e) => {
                  imageFile.current = e;
                }}
                accept="image/*"
              />

              <FaPlus className="icon" />
              {preview && (
                <img src={preview} alt="" className="modal-preview" />
              )}
            </div>

            <div className="form-info">
              <div className="form-input modal-input">
                <label htmlFor="name">Tên căn trọ</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  {...register("name", {
                    required: "Vui lòng nhập tên căn trọ.",
                  })}
                />
                <p className="error">{errors?.name?.message}</p>
              </div>

              <div className="form-input modal-input">
                <label htmlFor="address">Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  {...register("address", {
                    required: "Vui lòng nhập địa chỉ căn trọ.",
                  })}
                />
                <p className="error">{errors?.address?.message}</p>
              </div>
            </div>
          </div>

          <div className="form-button modal-button">
            <div className="btn btn-close" onClick={() => setAddModal(false)}>
              Thoát
            </div>
            <button type="submit" className="btn btn-accept">
              OK
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddModal;
