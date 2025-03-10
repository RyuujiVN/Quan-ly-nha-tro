/* eslint-disable react/prop-types */
import { useState } from "react";
import formatHelper from "../../helpers/formatHelper";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import waterMeterService from "../../service/waterMeterService";

const WaterMeterItem = ({ item, index }) => {
  const [indexOld, setIndexOld] = useState(item.old);
  const [indexNew, setIndexNew] = useState(item.new);
  const [use, setUse] = useState(indexNew - indexOld);
  const newDate = new Date(item.time);

  const handleSave = async () => {
    if (use < 0) {
      toast.error("Chỉ số mới không được bé hơn chỉ số cũ");
      return;
    }

    const data = {
      old: indexOld,
      new: indexNew,
      time: item.time,
      room: item?.room_info._id,
    };

    const res = await waterMeterService.updateWater(data, item._id);

    toast.success(res.data?.message);
  };

  const handleIndexOld = (e) => {
    setIndexOld(e.target.value);
    setUse(indexNew - e.target.value);
  };

  const handleIndexNew = (e) => {
    setIndexNew(e.target.value);
    setUse(e.target.value - indexOld);
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{formatHelper.formatMonthWatch(newDate)}</td>
        <td>{item?.boardingHouse_info?.name}</td>
        <td>{item?.room_info?.name}</td>
        <td>
          <input
            type="number"
            className="water-input"
            value={indexOld}
            onChange={handleIndexOld}
          />
        </td>
        <td>
          <input
            type="number"
            className="water-input"
            value={indexNew}
            onChange={handleIndexNew}
          />
        </td>

        <td>{use}</td>

        <td>
          <div className="table-action">
            <button className="btn table-edit water" onClick={handleSave}>
              <FaRegEdit className="icon" />
              Lưu
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default WaterMeterItem;
