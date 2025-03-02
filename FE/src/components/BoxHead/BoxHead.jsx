/* eslint-disable react/prop-types */
import { FaPlus } from "react-icons/fa";
import "./BoxHead.css";
import Search from "../Search/Search";

const BoxHead = (props) => {
  const { title, setAddModal } = props;
  return (
    <>
      <div className="box-head">
        <h1 className="title">{title}</h1>

        <div className="button">
          <button className="btn btn-add" onClick={() => setAddModal(true)}>
            <FaPlus className="icon" />
          </button>

          <Search />
        </div>
      </div>
    </>
  );
};

export default BoxHead;
