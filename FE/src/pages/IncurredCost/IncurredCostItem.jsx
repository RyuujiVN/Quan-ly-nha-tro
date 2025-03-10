import formatHelper from "../../helpers/formatHelper";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

/* eslint-disable react/prop-types */
const IncurredCostItem = ({
  item,
  index,
  setEditModal,
  setDeleteModal,
  setItem,
}) => {
  const newDate = new Date(item.month);

  const handleEit = () => {
    setItem(item);

    setEditModal(true);
  };

  const handleDelete = () => {
    setItem(item);

    setDeleteModal(true);
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{formatHelper.formatMonthWatch(newDate)}</td>
        <td>{item?.boardingHouse_info?.name}</td>
        <td>{item?.room_info?.name}</td>
        <td>{item.payBy}</td>
        <td>{formatHelper.format(item.price) + "đ"}</td>

        <td>{item.description}</td>

        <td>
          <div className="table-action">
            <button className="btn table-edit" onClick={handleEit}>
              <FaRegEdit className="icon" />
            </button>

            <button className="btn table-delete" onClick={handleDelete}>
              <RiDeleteBin6Line className="icon" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default IncurredCostItem;
