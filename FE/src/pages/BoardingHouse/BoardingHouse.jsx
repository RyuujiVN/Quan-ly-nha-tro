/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import BoxHead from "../../components/BoxHead/BoxHead";
import AddModal from "./AddModal";
import boardingHouseService from "../../service/boardingHouseService";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const BoardingHouse = () => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await boardingHouseService.get();

      setData(res.data);
    };

    fetchApi();
  }, []);

  console.log(data);

  return (
    <>
      <div
        className={`boarding-house ${(data.length < 4) ? "full-height" : ""}`}
      >
        <div className="container">
          <div className="content">
            <BoxHead title="Tổng hợp căn trọ" setAddModal={setAddModal} />

            <div className="list-item">
              {data &&
                data.map((item) => (
                  <div className="item" key={item.id}>
                    <div className="item-image">
                      <img src={item.thumbnail} alt={item.name} />
                    </div>

                    <div className="item-info">
                      <div className="item-name">{item.name}</div>
                      <div className="item-action">
                        <button className="btn item-edit">
                          <FaRegEdit className="icon" />
                        </button>

                        <button className="btn item-delete">
                          <RiDeleteBin6Line className="icon" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {addModal && <AddModal setAddModal={setAddModal} />}
        </div>
      </div>
    </>
  );
};

export default BoardingHouse;
