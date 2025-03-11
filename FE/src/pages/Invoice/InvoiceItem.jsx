/* eslint-disable react/prop-types */
import formatHelper from "../../helpers/formatHelper";
import { FaRegEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import invoiceService from "../../service/invoiceService";
import { fetchInvoice } from "../../actions/invoiceAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const InvoiceItem = ({ item, index, setBill, setItem, setLoading }) => {
  const newDate = new Date(item.month);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    setLoading(true);

    const res = await invoiceService.deleteInvoice(item._id);

    dispatch(fetchInvoice(item.month));

    setLoading(false);
    toast.success(res.data?.message);
  };

  const handleWatchBill = () => {
    setItem(item);

    setBill(true);
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{formatHelper.formatMonthWatch(newDate)}</td>
        <td>{item?.boardingHouse?.name}</td>
        <td>{item?.room?.name}</td>
        <td>{item?.guest?.fullName}</td>
        <td>{formatHelper.format(item.totalCost) + "đ"}</td>
        <td>{formatHelper.format(item.paid) + "đ"}</td>
        <td>{formatHelper.format(item.toalCost - item.paid) + "đ"}</td>

        <td>
          <div className="table-action">
            <button className="btn invoice" onClick={handleWatchBill}>
              <FaEye className="icon" />
            </button>

            <button className="btn invoice">
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

export default InvoiceItem;
