import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AddModal from "./AddModal";
import formatHelper from "../../helpers/formatHelper";
import "./IncurredCost.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchIncurredCost } from "../../actions/incurredCostAction";
import Table from "../../components/Table/Table";
import IncurredCostItem from "./IncurredCostItem";
import { EditModal } from "./EditModal";
import DeleteModal from "./DeleteModal";
import Loading from "../../components/Loading/Loading";

const IncurredCost = () => {
  const [time, setTime] = useState(formatHelper.formatMonthYear(new Date()));
  const [addModal, setAddmodal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState();
  const list = useSelector((state) => state.incurredCostReducer);
  const dispatch = useDispatch();

  const month = searchParams.get("month");

  const handleChangeMonth = (e) => {
    setTime(e.target.value);

    setSearchParams({
      month: e.target.value,
    });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(fetchIncurredCost(month));
    setLoading(false);
  }, [month]);

  if (loading) return <Loading />;

  return (
    <>
      <div className="cost">
        <div className="container">
          <div className="cost-inner">
            <div className="title">Chỉ số điện</div>
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

              <div className="btn btn-add" onClick={() => setAddmodal(true)}>
                + Thêm mới
              </div>
            </div>

            {addModal && <AddModal setAddModal={setAddmodal} />}
            {editModal && <EditModal setEditModal={setEditModal} item={item} />}
            {deleteModal && (
              <DeleteModal
                setDeleteModal={setDeleteModal}
                id={item._id}
                title="Xoá chi phí phát sinh"
                content="Bạn xác nhận muốn xoá chi phí này? Sau khi bạn xoá, mọi thông tin sẽ không thể khôi phục được nữa."
                setLoading={setLoading}
              />
            )}

            <Table>
              <thead className="table-head">
                <tr>
                  <th>STT</th>
                  <th>Thời gian</th>
                  <th>Căn trọ</th>
                  <th>Phòng trọ</th>
                  <th>Người chi trả</th>
                  <th>Số tiền</th>
                  <th>Ghi chú</th>
                  <th>Tuỳ chỉnh</th>
                </tr>
              </thead>

              <tbody className="table-body">
                {list.length > 0 &&
                  list.map((item, index) => (
                    <IncurredCostItem
                      key={item._id}
                      item={item}
                      index={index}
                      setItem={setItem}
                      setEditModal={setEditModal}
                      setDeleteModal={setDeleteModal}
                    />
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default IncurredCost;
