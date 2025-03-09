/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import { deleteGuest } from "../../actions/guestAction";
import Modal from "../../components/Modal/Modal";
import { useDispatch } from "react-redux";
import guestService from "../../service/guestService";

const DeleteModal = (props) => {
  const { title, content, setDeleteModal, id, setLoading } = props;
  const dispatch = useDispatch();

  const handleDelete = async () => {
    setLoading(true);

    const res = await guestService.deleteGuest(id);

    dispatch(deleteGuest());
    setLoading(false);
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
