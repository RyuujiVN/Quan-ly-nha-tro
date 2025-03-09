/* eslint-disable react/prop-types */
import Modal from "../../components/Modal/Modal";
import Table from "../../components/Table/Table";
import { useEffect, useRef, useState } from "react";
import serviceService from "../../service/serviceService";
import roomService from "../../service/roomService";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";

const ServiceModal = ({ setServiceModal, room }) => {
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState(room.service_id);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleSelect = (id) => {
    const indexSelected = selected.findIndex((item) => item === id);

    if (indexSelected !== -1) {
      const newSelected = selected.filter((item) => item !== id);
      setSelected(newSelected);
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    room.service_id = selected;
    const res = await roomService.editRoom(room, room._id);

    setLoading(false);
    toast.success(res.data?.message);
  };

  console.log(selected);

  useEffect(() => {
    const fetchService = async () => {
      const response = await serviceService.getService();

      setServices(response.data);
    };

    fetchService();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Modal>
        <div className="service-modal title">Dịch vụ phòng</div>

        <Table>
          <thead className="table-head">
            <tr>
              <th className="table-service"></th>
              <th className="table-service">Tên dịch vụ</th>
              <th className="table-service">Đơn giá</th>
              <th className="table-service">Đơn vị tính</th>
              <th className="table-service">Số lượng</th>
            </tr>
          </thead>

          <tbody className="table-body">
            {services.length > 0 &&
              services.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={() => handleSelect(item._id)}
                        value={item._id}
                        checked={selected.includes(item._id) ? true : false}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.price}đ</td>
                    <td>{item.unit}</td>
                    <td>{item.quantity}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        <div className="form-button modal-button">
          <div className="btn btn-close" onClick={() => setServiceModal(false)}>
            Thoát
          </div>

          <form action="" onSubmit={handleSubmit}>
            <input type="text" style={{ display: "none" }} ref={inputRef} />
            <button
              type="submit"
              className="btn btn-accept"
              style={{ width: "100%" }}
            >
              OK
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ServiceModal;
