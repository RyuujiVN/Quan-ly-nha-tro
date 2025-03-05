/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import { useForm } from "react-hook-form";
import formatHelper from "../../helpers/formatHelper";
import Loading from "../../components/Loading/Loading";
import serviceService from "../../service/serviceService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { editService } from "../../actions/serviceAction";

const EditModal = ({ setEditModal, service }) => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: service,
  });
  const { errors } = formState;
  const [formatPrice, setFormatPrice] = useState(service.price);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = async (data) => {
    setLoading(true);

    data.price = parseInt(formatHelper.parseNumber(data.price));
    console.log(data);

    const res = await serviceService.editService(data, service._id);

    dispatch(editService());
    setLoading(false);
    toast.success(res.data?.message);
  };

  const handleFormatPrice = (e) => {
    const number = formatHelper.parseNumber(e.target.value);
    const format = formatHelper.format(number);

    setFormatPrice(format);
  };

  if (loading) return <Loading />;

  return (
    <>
      <Modal>
        <div className="modal-title">Thông tin dịch vụ</div>
        <form
          className="service-form modal-form"
          onSubmit={handleSubmit(handleEdit)}
        >
          <div className="service-info">
            <div className="modal-input">
              <label htmlFor="name">Tên dịch vụ</label>
              <input
                type="text"
                name="name"
                id="name"
                {...register("name", {
                  required: "Vui lòng nhập tên dịch vụ!",
                })}
              />

              <p className="error">{errors?.name?.message}</p>
            </div>

            <div className="modal-input">
              <label htmlFor="price">Đơn giá</label>
              <input
                type="text"
                name="price"
                id="price"
                {...register("price", {
                  required: "Vui lòng nhập đơn giá!",
                })}
                onChange={handleFormatPrice}
                value={formatPrice}
              />

              <p className="error">{errors?.price?.message}</p>
            </div>

            <div className="modal-input">
              <label htmlFor="unit">Đơn vị tính</label>
              <input
                type="text"
                name="unit"
                id="unit"
                {...register("unit", {
                  required: "Vui lòng nhập đơn vị tính!",
                })}
              />

              <p className="error">{errors?.price?.message}</p>
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
