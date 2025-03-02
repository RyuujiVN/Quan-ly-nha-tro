/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import BoxHead from "../../components/BoxHead/BoxHead";
import AddModal from "./AddModal";
import boardingHouseService from "../../service/boardingHouseService";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditModal from "./EditModal";
import Loading from "../../components/Loading/Loading";
import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardingHouse } from "../../actions/boardingHouseAction";

const BoardingHouse = () => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [item, setItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.boardingHouseReducer);

  const navigate = useNavigate();

  const fetchApi = async () => {
    setIsLoading(true);

    dispatch(fetchBoardingHouse());

    setIsLoading(false);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleEdit = (item) => {
    setItem(item);
    setEditModal(true);
  };

  const handleDelete = (item) => {
    setItem(item);
    setDeleteModal(true);
  };

  if (isLoading) return <Loading />;
  else
    return (
      <>
        <div
          className={`boarding-house ${data.length < 4 ? "full-height" : ""}`}
        >
          <div className="container">
            <div className="content">
              <BoxHead title="Tổng hợp căn trọ" setAddModal={setAddModal} />

              <div className="list-item">
                {data &&
                  data.map((item) => (
                    <div className="item" key={item._id}>
                      <div className="item-image">
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          onClick={() => navigate(`/room/${item._id}`)}
                        />
                      </div>

                      <div className="item-info">
                        <div className="item-name">{item.name}</div>
                        <div className="item-action">
                          <button
                            className="btn item-edit"
                            onClick={() => handleEdit(item)}
                          >
                            <FaRegEdit className="icon" />
                          </button>

                          <button
                            className="btn item-delete"
                            onClick={() => handleDelete(item)}
                          >
                            <RiDeleteBin6Line className="icon" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {addModal && <AddModal setAddModal={setAddModal} />}

            {editModal && <EditModal setEditModal={setEditModal} item={item} />}

            {deleteModal && (
              <DeleteModal
                setDeleteModal={setDeleteModal}
                id={item._id}
                title="Xoá căn trọ"
                content="Bạn xác nhận muốn xoá căn trọ này? Sau khi bạn xoá, các phòng trọ trong căn trọ này sẽ mất toàn bộ dữ liệu. Vui lòng xem xét kỹ!"
                setIsLoading={setIsLoading}
              />
            )}
          </div>
        </div>
      </>
    );
};

export default BoardingHouse;
