import { useEffect, useState } from "react";
import BoxHead from "../../components/BoxHead/BoxHead";
import Table from "../../components/Table/Table";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import "./Guest.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchGuest } from "../../actions/guestAction";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import formatHelper from "../../helpers/formatHelper";

const Guest = () => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [guest, setGuest] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchKeyword] = useSearchParams();
  const guestList = useSelector((state) => state.guestReducer);
  const dispatch = useDispatch();
  const keyword = searchKeyword.get("keyword");

  const handleEdit = (item) => {
    setGuest(item);
    setEditModal(true);

    const rentalDate = new Date(item.rentalDate);
    item.rentalDate = formatHelper.formatDate(rentalDate);

    const birthDate = new Date(item.birthDate);
    item.birthDate = formatHelper.formatDate(birthDate);

    const dayOfIssue = new Date(item.dayOfIssue);
    item.dayOfIssue = formatHelper.formatDate(dayOfIssue);

    item.boardingHouseRent = item.boardingHouseRent._id;
    item.roomRent = item.roomRent._id;
  };

  const handleDelete = (item) => {
    setGuest(item);
    setDeleteModal(true);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(fetchGuest(keyword));
    setLoading(false);
  }, [keyword]);

  if (loading) return <Loading />;

  return (
    <div className={"guest" + (guestList.length <= 5 ? " full-height" : "")}>
      <div className="container">
        <div className="guest-inner">
          <BoxHead title="Danh sách khách thuê" setAddModal={setAddModal} />

          <Table>
            <thead className="table-head">
              <tr>
                <th>Họ và tên</th>
                <th>Số điện thoại</th>
                <th>Ngày thuê</th>
                <th>Căn trọ thuê</th>
                <th>Phòng thuê</th>
                <th>Email</th>
                <th>Trạng thái</th>
                <th>Tuỳ chỉnh</th>
              </tr>
            </thead>

            <tbody className="table-body">
              {guestList.length > 0 &&
                guestList.map((item) => {
                  const newDate = new Date(item.rentalDate);

                  return (
                    <tr key={item._id}>
                      <td>{item.fullName}</td>
                      <td>{item.phone}</td>
                      <td>{formatHelper.formatDateWatch(newDate)}</td>
                      <td>{item?.boardingHouseRent?.name}</td>
                      <td>{item?.roomRent?.name}</td>
                      <td>{item.email}</td>
                      <td>
                        <span
                          className={
                            "status" +
                            (item.status === "Đang thuê"
                              ? " status-green"
                              : " status-red")
                          }
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <div className="table-action">
                          <button
                            className="btn table-edit"
                            onClick={() => handleEdit(item)}
                          >
                            <FaRegEdit className="icon" />
                          </button>

                          <button
                            className="btn table-delete"
                            onClick={() => handleDelete(item)}
                          >
                            <RiDeleteBin6Line className="icon" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>

        {addModal && <AddModal setAddModal={setAddModal} />}
        {editModal && <EditModal setEditModal={setEditModal} guest={guest} />}

        {deleteModal && (
          <DeleteModal
            setDeleteModal={setDeleteModal}
            title="Xoá khách thuê"
            content="Bạn xác nhận muốn xoá khách thuê này? Sau khi bạn xoá, mọi thông tin sẽ không thể khôi phục được nữa."
            setLoading={setLoading}
            id={guest._id}
          />
        )}
      </div>
    </div>
  );
};

export default Guest;
