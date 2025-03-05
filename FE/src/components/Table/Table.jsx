/* eslint-disable react/prop-types */
import "./Table.css";
const Table = (props) => {
  return (
    <>
      <table className="table">{props.children}</table>
    </>
  );
};

export default Table;
