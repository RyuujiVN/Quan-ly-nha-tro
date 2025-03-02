/* eslint-disable react/prop-types */
import Modal from "../../components/Modal/Modal";
import "./BoardingHouse.css";
import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import boardingHouseService from "../../service/boardingHouseService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { editBoardingHouse } from "../../actions/boardingHouseAction";
import Loading from "../../components/Loading/Loading";

const EditModal = ({ setEditModal, item }) => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: item,
  });

  const { errors } = formState;
  const [preview, setPreview] = useState(item.thumbnail);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const imageFile = useRef();

  const handleEdit = async (data) => {
    setLoading(true);

    if (image) {
      data.thumbnail = image;
    }

    const res = await boardingHouseService.edit(data, item._id);

    dispatch(editBoardingHouse());
    setLoading(false);
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

  if (loading) return <Loading />;

  return (
    <>
      <Modal setModal={setEditModal}>
        <h3 className="modal-title">Thông tin căn trọ</h3>
        <form className="modal-form" onSubmit={handleSubmit(handleEdit)}>
          <div className="modal-type">
            <div className="modal-upload" onClick={handleChooseImage}>
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
                <img src={preview} alt={item?.name} className="modal-preview" />
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
            <div className="btn btn-close" onClick={() => setEditModal(false)}>
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

export default EditModal;
