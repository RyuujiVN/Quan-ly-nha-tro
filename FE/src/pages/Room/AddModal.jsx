/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "../../components/Modal/Modal";
import { FaPlus } from "react-icons/fa";
import roomService from "../../service/roomService";
import formatHelper from "../../helpers/formatHelper.js";
import Loading from "../../components/Loading/Loading.jsx";
import { useDispatch } from "react-redux";
import { addRoom } from "../../actions/roomAction.js";

const AddModal = ({ setAddModal, boardingHouseId }) => {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState("");
  const [formatPrice, setFormatPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const imageFile = useRef();

  const handleAdd = async (data) => {
    setIsLoading(true);

    data.thumbnail = image;
    data.boardingHouseId = boardingHouseId;
    data.price = parseInt(formatHelper.parseNumber(data.price));
    data.roomArea = parseInt(data.roomArea);

    const res = await roomService.addRoom(data);

    dispatch(addRoom(boardingHouseId));
    setFormatPrice("");
    reset();
    setPreview("");
    setIsLoading(false);
    toast.success(res.data?.message);
  };

  const handleFormatPrice = (e) => {
    const number = formatHelper.parseNumber(e.target.value);

    const format = formatHelper.format(number);

    setFormatPrice(format);
  };

  const handleChange = (e) => {
    const [file] = e.target.files;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleChooseImage = () => {
    imageFile.current.click();
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <div className={"add-modal"}>
        <Modal setModal={setAddModal}>
          <h3 className="modal-title">Thông tin phòng trọ</h3>
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
                  <label htmlFor="name">Mã phòng trọ</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    {...register("name", {
                      required: "Vui lòng nhập mã phòng.",
                      minLength: {
                        value: 3,
                        message: "Mã phòng chỉ được 3 kí tự",
                      },
                      pattern: {
                        value: /([A-Z])\d{2}/,
                        message: "Mã phòng chứa một kí tự in hoa và 2 số.d",
                      },
                    })}
                    placeholder="A01..."
                  />
                  <p className="error">{errors?.name?.message}</p>
                </div>

                <div className="form-input modal-input">
                  <label htmlFor="guest">Khách thuê</label>
                  <input
                    type="text"
                    name="guest"
                    id="guest"
                    readOnly
                    {...register("guest")}
                  />
                </div>

                <div className="form-input modal-input">
                  <label htmlFor="status">Trạng thái</label>
                  <select
                    name="status"
                    id="status"
                    {...register("status")}
                    defaultValue="empty"
                  >
                    <option value="Còn trống">Còn trống</option>
                    <option value="Đang thuê">Đang thuê</option>
                    <option value="Đã đặt dọc">Đã đặt cọc</option>
                  </select>
                </div>

                <div className="form-input modal-input">
                  <label htmlFor="price">Giá thuê phòng</label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="modal-price"
                    value={formatPrice}
                    {...register("price", {
                      required: "Vui lòng nhập giá thuê phòng",
                      onChange: (e) => {
                        handleFormatPrice(e);
                      },
                    })}
                  />
                  <p className="error">{errors?.price?.message}</p>
                </div>

                <div className="form-input modal-input">
                  <label htmlFor="roomArea">Diện tích phòng (m2)</label>
                  <input
                    type="text"
                    name="roomArea"
                    id="roomArea"
                    {...register("roomArea", {
                      required: "Vui lòng nhập diện tích phòng",
                    })}
                  />
                  <p className="error">{errors?.roomArea?.message}</p>
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
      </div>
    </>
  );
};

export default AddModal;
