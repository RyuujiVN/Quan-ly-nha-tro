/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "../../components/Modal/Modal";
import Loading from "../../components/Loading/Loading.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardingHouse } from "../../actions/boardingHouseAction.js";
import { fetchRoom } from "../../actions/roomAction.js";
import guestService from "../../service/guestService.js";
import { editGuest } from "../../actions/guestAction.js";

const EditModal = ({ setEditModal, guest }) => {
  const { register, handleSubmit, setValue, getValues, formState, watch } =
    useForm({
      defaultValues: guest,
    });
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const boardingHouseList = useSelector((state) => state.boardingHouseReducer);
  const roomList = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();
  watch("roomRent");

  const handleEdit = async (data) => {
    setLoading(true);
    console.log(data);
    const res = await guestService.editGuest(data, data._id);

    dispatch(editGuest());
    setLoading(false);
    toast.success(res.data?.message);
  };

  const handleChange = (e) => {
    const boardingHouseId = e.target.value;

    setValue("boardingHouseRent", boardingHouseId);

    dispatch(fetchRoom(boardingHouseId));
  };

  useEffect(() => {
    dispatch(fetchBoardingHouse());
    dispatch(fetchRoom(getValues("boardingHouseRent")));
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Modal>
        <div className="modal-title">Thông tin khách thuê</div>
        <form
          className="service-form modal-form"
          onSubmit={handleSubmit(handleEdit)}
        >
          <div className="guest-info">
            <div className="guest-left">
              <div className="modal-input">
                <label htmlFor="fullName">Họ và tên khách</label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  {...register("fullName", {
                    required: "Vui lòng nhập họ tên của khách!",
                    minLength: {
                      value: 6,
                      message: "Họ tên phải lớn hơn 6 kí tự",
                    },
                    maxLength: {
                      value: 50,
                      message: "Họ tên phải bé hơn 50 kí tự",
                    },
                  })}
                />

                <p className="error">{errors?.fullName?.message}</p>
              </div>

              <div className="modal-input">
                <label htmlFor="birthDate">Ngày sinh</label>
                <input
                  type="date"
                  name="birthDate"
                  id="birthDate"
                  {...register("birthDate", {
                    required: "Vui lòng nhập ngày sinh!",
                    max: {
                      value: new Date().toISOString().split("T")[0],
                      message: "Ngày sinh không được lớn hơn hôm nay!",
                    },
                  })}
                />

                <p className="error">{errors?.birthDate?.message}</p>
              </div>

              <div className="modal-input">
                <label htmlFor="identityCard">CCCD</label>
                <input
                  type="text"
                  name="identityCard"
                  id="identityCard"
                  {...register("identityCard", {
                    required: "Vui lòng nhập số CCCD!",
                    pattern: {
                      value: /^\d{12}$/,
                      message: "Số CCCD không chứa chữ và là 12 số",
                    },
                  })}
                />

                <p className="error">{errors?.identityCard?.message}</p>
              </div>

              <div className="modal-input">
                <label htmlFor="boardingHouseRent">Căn trọ thuê</label>
                <select
                  type="text"
                  name="boardingHouseRent"
                  id="boardingHouseRent"
                  {...register("boardingHouseRent", {
                    required: "Vui lòng chọn căn trọ",
                  })}
                  onChange={handleChange}
                  value={getValues("boardingHouseRent")}
                >
                  <option value="">
                    --------------------Căn trọ------------------
                  </option>
                  {boardingHouseList &&
                    boardingHouseList.map((item) => (
                      <option value={item._id} key={item._id}>
                        {item.name}
                      </option>
                    ))}
                </select>

                <p className="error">{errors?.boardingHouseRent?.message}</p>
              </div>

              <div className="modal-input">
                <label htmlFor="status">Tình trạng</label>
                <select
                  type="text"
                  name="status"
                  id="status"
                  {...register("status")}
                >
                  <option value="Đang thuê">Đang thuê</option>
                  <option value="Đã trả phòng">Đã trả phòng</option>
                </select>

                <p className="error">{errors?.status?.message}</p>
              </div>
            </div>

            <div className="guest-right">
              <div className="modal-input">
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  {...register("phone", {
                    required: "Vui lòng nhập số điện thoại!",
                    pattern: {
                      value: /\d{10}/,
                      message: "Số điện thoại chỉ chứa số và có 10 kí tự",
                    },
                  })}
                />

                <p className="error">{errors?.phone?.message}</p>
              </div>

              <div className="modal-input">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  {...register("email", {
                    required: "Vui lòng nhập email!",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9\\._+-]+@[a-zA-Z0-9\\._+-]+.[a-zA-Z0-9\\._+-]$/,
                      message: "Vui lòng nhập email đúng định dạng!",
                    },
                  })}
                />

                <p className="error">{errors?.email?.message}</p>
              </div>

              <div className="modal-input">
                <label htmlFor="dayOfIssue">Ngày cấp</label>
                <input
                  type="date"
                  name="dayOfIssue"
                  id="dayOfIssue"
                  {...register("dayOfIssue", {
                    required: "Vui lòng nhập ngày cấp!",
                    max: {
                      value: new Date().toISOString().split("T")[0],
                      message: "Ngày cấp không được lớn hơn hôm nay!",
                    },
                    min: {
                      value: getValues("birthDate"),
                      message: "Ngày cấp không được bé hơn ngày sinh",
                    },
                  })}
                />

                <p className="error">{errors?.dayOfIssue?.message}</p>
              </div>

              <div className="modal-input">
                <label htmlFor="roomRent">Phòng thuê</label>
                <select
                  type="text"
                  name="roomRent"
                  id="roomRent"
                  {...register("roomRent", {
                    required: "Vui lòng chọn phòng",
                  })}
                  value={getValues("roomRent")}
                >
                  <option value="">
                    --------------------Chọn phòng------------------
                  </option>

                  {roomList &&
                    roomList.map((item) => (
                      <option value={item._id} key={item._id}>
                        {item.name}
                      </option>
                    ))}
                </select>

                <p className="error">{errors?.roomRent?.message}</p>
              </div>

              <div className="modal-input">
                <label htmlFor="rentalDate">Ngày thuê</label>
                <input
                  type="date"
                  name="rentalDate"
                  id="rentalDate"
                  {...register("rentalDate", {
                    required: "Vui lòng nhập ngày thuê!",
                  })}
                />

                <p className="error">{errors?.rentalDate?.message}</p>
              </div>
            </div>
          </div>

          <div className="service-button modal-button">
            <div className="btn btn-close" onClick={() => setEditModal(false)}>
              Thoát
            </div>
            <button className="btn btn-accept">OK</button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditModal;
