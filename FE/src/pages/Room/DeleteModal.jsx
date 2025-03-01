/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import "../../components/Modal/Modal.css";
import Modal from "../../components/Modal/Modal";
import roomController from "../../../../BE/src/api/v1/controller/room.controller";

const DeleteModal = (props) => {
  const { title, content, setDeleteModal, id, setIsLoading } = props;

  const handleDelete = async () => {
    setIsLoading(true);

    const res = await roomController.deleteRoom(id);

    setIsLoading(false);
    toast.success(res.data?.message);
    setDeleteModal(false);
  };

  return (
    <Modal>
      <div className="modal-title modal-delete">{title}</div>
      <div className="modal-action">
        <div className="modal-warning">{content}</div>
        <div className="modal-button">
          <button
            className="btn btn-cancel"
            onClick={() => setDeleteModal(false)}
          >
            Thoát
          </button>
          <button className="btn btn-delete" onClick={handleDelete}>
            OK
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
