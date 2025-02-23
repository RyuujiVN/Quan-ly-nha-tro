import { FaPlus } from "react-icons/fa";
import "./BoxHead.css";

const BoxHead = (props) => {
  const { title, setModal } = props;
  return (
    <>
      <div className="box-head">
        <h1 className="title">{title}</h1>

        <div className="=button" onClick={() => setModal(true)}>
          <button className="btn btn-add">
            <FaPlus className="icon" />
          </button>
        </div>
      </div>
    </>
  );
};

export default BoxHead;
