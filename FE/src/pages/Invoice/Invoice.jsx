import { useEffect, useState } from "react";
import formatHelper from "../../helpers/formatHelper";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoice } from "../../actions/invoiceAction";
import Table from "../../components/Table/Table";
import InvoiceItem from "./InvoiceItem";
import Bill from "./Bill";
import "./Invoice.css";
import invoiceService from "../../service/invoiceService";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";

const Invoice = () => {
  const [time, setTime] = useState(formatHelper.formatMonthYear(new Date()));
  const [searchParams, setSearchParams] = useSearchParams();
  const [bill, setBill] = useState(false);
  const [item, setItem] = useState(false);
  const [loading, setLoading] = useState(false);
  const list = useSelector((state) => state.invoiceReducer);
  const dispatch = useDispatch();

  const month = searchParams.get("month");

  const handleChangeMonth = (e) => {
    setTime(e.target.value);

    setSearchParams({
      month: e.target.value,
    });
  };

  const handleCreate = async () => {
    setLoading(true);

    const monthObj = {
      month: month || time,
    };

    const res = await invoiceService.createInvoice(monthObj);

    dispatch(fetchInvoice(month));

    setLoading(false);
    toast.success(res.data?.message);
  };

  useEffect(() => {
    dispatch(fetchInvoice(month));
  }, [month]);

  if (loading) return <Loading />;

  return (
    <>
      <div className="electricity">
        <div className="container">
          <div className="guest-inner">
            <div className="title">Hoá đơn</div>
            <div className="action">
              <div className="filter-month">
                <label htmlFor="month">Tháng năm:</label>
                <input
                  className="month"
                  type="month"
                  name="filter-month"
                  id="filter-month"
                  onChange={handleChangeMonth}
                  value={time}
                />
              </div>

              <div className="btn btn-add" onClick={handleCreate}>
                Tạo hoá đơn
              </div>
            </div>

            <Table>
              <thead className="table-head">
                <tr>
                  <th>STT</th>
                  <th>Thời gian</th>
                  <th>Căn trọ</th>
                  <th>Phòng trọ</th>
                  <th>Tên khách</th>
                  <th>Số tiền</th>
                  <th>Đã trả</th>
                  <th>Còn lại</th>
                  <th>Tuỳ chỉnh</th>
                </tr>
              </thead>

              <tbody className="table-body">
                {list.length > 0 &&
                  list.map((item, index) => (
                    <InvoiceItem
                      key={item._id}
                      item={item}
                      index={index}
                      setBill={setBill}
                      setItem={setItem}
                      setLoading={setLoading}
                    />
                  ))}
              </tbody>
            </Table>

            {bill && <Bill item={item} setBill={setBill} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
