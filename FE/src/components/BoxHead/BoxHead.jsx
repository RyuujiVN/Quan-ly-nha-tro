import { FaPlus } from "react-icons/fa";
import { IoIosRefresh } from "react-icons/io";
import "./BoxHead.css";

const BoxHead = (props) => {
  const { title, setAddModal, fetchApi } = props;
  return (
    <>
      <div className="box-head">
        <h1 className="title">{title}</h1>

        <div className="button">
          <button className="btn btn-refresh" onClick={() => fetchApi()}>
            <IoIosRefresh className="icon" />
          </button>

          <button className="btn btn-add" onClick={() => setAddModal(true)}>
            <FaPlus className="icon" />
          </button>
        </div>
      </div>
    </>
  );
};

export default BoxHead;
