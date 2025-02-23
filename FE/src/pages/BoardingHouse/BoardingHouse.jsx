/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import BoxHead from "../../components/BoxHead/BoxHead";
import AddModal from "./AddModal";
import boardingHouseService from "../../service/boardingHouseService";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditModal from "./EditModal";
import Loading from "../../components/Loading/Loading";
import { toast } from "react-toastify";

const BoardingHouse = () => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [item, setItem] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      setIsLoading(true);

      const res = await boardingHouseService.get();

      setData(res.data);
      setIsLoading(false);
    };

    fetchApi();
  }, []);

  const handleDelete = async (id) => {
    setIsLoading(true);

    const res = await boardingHouseService.deleteBoardingHouse(id);

    setIsLoading(false);
    toast.success(res.data?.message);
  };

  const handleEdit = (item) => {
    setItem(item);
    setEditModal(true);
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
                        <img src={item.thumbnail} alt={item.name} />
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
                            onClick={() => handleDelete(item._id)}
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
          </div>
        </div>
      </>
    );
};

export default BoardingHouse;
