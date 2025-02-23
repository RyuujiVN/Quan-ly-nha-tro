/* eslint-disable react/no-unknown-property */
import { useRef, useState } from "react";
import BoxHead from "../../components/BoxHead/BoxHead";
import Modal from "../../components/Modal/Modal";
import "./BoardingHouse.css";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import boardingHouseService from "../../service/boardingHouseService";

const BoardingHouse = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState("");
  const imageFile = useRef();

  const handleAdd = async (data) => {
    data.thumbnail = imageFile.current.value;
    console.log(data)
    const res = await boardingHouseService.add(data);

    console.log(res);
  };

  const handleChange = (e) => {
    const [file] = e.target.files;
    setImage(URL.createObjectURL(file));
  };

  const handleChooseImage = () => {
    imageFile.current.click();
  };

  return (
    <>
      <div className="boarding-house">
        <div className="container">
          <div className="content">
            <BoxHead title="Tổng hợp căn trọ" setModal={setModal} />
          </div>

          {modal && (
            <Modal setModal={setModal}>
              <h3 className="modal-title">Thông tin căn trọ</h3>
              <form
                className="modal-form"
                onSubmit={handleSubmit(handleAdd)}
              >
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
                    {image && (
                      <img src={image} alt="" className="modal-preview" />
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
                  <div
                    className="btn btn-close"
                    onClick={() => setModal(false)}
                  >
                    Thoát
                  </div>
                  <button type="submit" className="btn btn-accept">
                    OK
                  </button>
                </div>
              </form>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default BoardingHouse;
