import { useEffect, useState } from "react";
import BoxHead from "../../components/BoxHead/BoxHead";
import Loading from "../../components/Loading/Loading";
import { useParams, useSearchParams } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddModal from "./AddModal";
import EditModal from "../BoardingHouse/EditModal";
import DeleteModal from "./DeleteModal";
import roomService from "../../service/roomService";
import "./Room.css";
import { toast } from "react-toastify";

const Room = () => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [item, setItem] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const boardingHouseId = useParams().id;

  const keyword = searchParams.get("keyword");

  const fetchApi = async () => {
    setIsLoading(true);

    const res = await roomService.getRooms(boardingHouseId, keyword);

    setData(res.data.rooms);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchApi();
  }, [keyword]);

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
              <BoxHead
                title={`Danh sách phòng trọ`}
                setAddModal={setAddModal}
                fetchApi={fetchApi}
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

            {editModal && <EditModal setEditModal={setEditModal} item={item} />}

            {deleteModal && (
              <DeleteModal
                setDeleteModal={setDeleteModal}
                id={item._id}
                title="Xoá phòng trọ"
                content="Bạn xác nhận muốn xoá phòng này? Sau khi bạn xoá, mọi thông tin liên quan sẽ không thể khôi phục được nữa."
                setIsLoading={setIsLoading}
              />
            )}
          </div>
        </div>
      </>
    );
};

export default Room;
