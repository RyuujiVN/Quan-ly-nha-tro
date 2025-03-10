/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal/Modal";
import Loading from "../../components/Loading/Loading";
import { fetchRoom } from "../../actions/roomAction";
import { fetchBoardingHouse } from "../../actions/boardingHouseAction";
import formatHelper from "../../helpers/formatHelper";
import incurredCostService from "../../service/incurredCostService";
import { toast } from "react-toastify";
import { addIncurredCost } from "../../actions/incurredCostAction";

const AddModal = ({ setAddModal }) => {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const [formatPrice, setFormatPrice] = useState("");
  const [time, setTime] = useState(formatHelper.formatMonthYear(new Date()));
  const boardingHouseList = useSelector((state) => state.boardingHouseReducer);
  const roomList = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();

  console.log(time);

  const handleFormatPrice = (e) => {
    const number = formatHelper.parseNumber(e.target.value);

    const format = formatHelper.format(number);

    setFormatPrice(format);
  };

  const handleChangeMonth = (e) => {
    setTime(e.target.value);
  };

  const handleAdd = async (data) => {
    setLoading(true);
    data.price = parseInt(formatHelper.parseNumber(data.price));
    delete data.boardingHouseRent;

    const res = await incurredCostService.addIncurredCost(data);
    dispatch(addIncurredCost());

    setLoading(false);
    reset();
    toast.success(res.data?.message);
  };

  const handleChange = (e) => {
    const boardingHouseId = e.target.value;

    dispatch(fetchRoom(boardingHouseId));
  };

  useEffect(() => {
    dispatch(fetchBoardingHouse());
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Modal setModal={setAddModal}>
        <h3 className="modal-title">Chi phí phát sinh</h3>
        <form className="modal-form" onSubmit={handleSubmit(handleAdd)}>
          <div className="modal-type">
            <div className="form-left">
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

              <div className="form-input modal-input">
                <label htmlFor="month">Thời gian:</label>
                <input
                  className="month"
                  type="month"
                  name="filter-month"
                  id="filter-month"
                  {...register("month")}
                  onChange={handleChangeMonth}
                  value={time}
                />
              </div>
            </div>

            <div className="form-right">
              <div className="form-input modal-input">
                <label htmlFor="roomId">Phòng thuê</label>
                <select
                  type="text"
                  name="roomId"
                  id="roomId"
                  {...register("roomId", {
                    required: "Vui lòng chọn phòng",
                  })}
                >
                  {roomList &&
                    roomList.map((item) => (
                      <option value={item._id} key={item._id}>
                        {item.name}
                      </option>
                    ))}
                </select>

                <p className="error">{errors?.roomId?.message}</p>
              </div>

              <div className="form-input modal-input">
                <label htmlFor="payBy">Địa chỉ</label>
                <select name="payBy" id="payBy" {...register("payBy")}>
                  <option value="Chủ nhà">Chủ nhà</option>
                  <option value="Khách thuê">Khách thuê</option>
                </select>

                <p className="error">{errors?.payBy?.message}</p>
              </div>
            </div>
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
                required: "Vui lòng nhập chi phí",
                onChange: (e) => {
                  handleFormatPrice(e);
                },
              })}
            />
            <p className="error">{errors?.price?.message}</p>
          </div>

          <div className="form-input modal-input">
            <label htmlFor="description">Ghi chú</label>
            <input
              type="text"
              name="description"
              id="description"
              className="modal-description"
              {...register("description")}
            />
            <p className="error">{errors?.description?.message}</p>
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
