import { useEffect, useState } from "react";
import BoxHead from "../../components/BoxHead/BoxHead";
import Loading from "../../components/Loading/Loading";
import { useParams, useSearchParams } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import "./Room.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoom } from "../../actions/roomAction";
import formatHelper from "../../helpers/formatHelper";

const Room = () => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [item, setItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const data = useSelector((state) => state.roomReducer);
  const [searchParams] = useSearchParams();
  const boardingHouseId = useParams().id;
  const dispatch = useDispatch();

  const keyword = searchParams.get("keyword");

  useEffect(() => {
    setIsLoading(true);

    dispatch(fetchRoom(boardingHouseId, keyword));
    setIsLoading(false);
  }, [keyword]);

  const handleEdit = (item) => {
    item.price = formatHelper.format(item.price);
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
              <BoxHead
                title={`Danh sách phòng trọ`}
                setAddModal={setAddModal}
              />

              <div className="list-item">
                {data &&
                  data.map((item) => (
                    <div className="item room" key={item._id}>
                      <div className="item-image">
                        <img src={item.thumbnail} alt={item.name} />
                      </div>

                      <div className="item-info room-content">
                        <div className="room-description">
                          <div className="room-info">
                            <h4 className="item-name room-name">{item.name}</h4>
                            <p className="room-status">{item.status}</p>
                          </div>

                          <button
                            className="btn room-delete"
                            onClick={() => handleDelete(item)}
                          >
                            <RiDeleteBin6Line className="icon" />
                          </button>
                        </div>

                        <div className="item-action">
                          <button
                            className="btn room-edit"
                            onClick={() => handleEdit(item)}
                          >
                            Chỉnh sửa
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {addModal && (
              <AddModal
                setAddModal={setAddModal}
                boardingHouseId={boardingHouseId}
              />
            )}

            {editModal && <EditModal setEditModal={setEditModal} room={item} />}

            {deleteModal && (
              <DeleteModal
                setDeleteModal={setDeleteModal}
                id={item._id}
                title="Xoá phòng trọ"
                content="Bạn xác nhận muốn xoá phòng này? Sau khi bạn xoá, mọi thông tin liên quan sẽ không thể khôi phục được nữa."
                setIsLoading={setIsLoading}
                boardingHouseId={boardingHouseId}
              />
            )}
          </div>
        </div>
      </>
    );
};

export default Room;
