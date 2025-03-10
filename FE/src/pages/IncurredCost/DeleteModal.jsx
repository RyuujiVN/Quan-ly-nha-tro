/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import Modal from "../../components/Modal/Modal";
import { deleteIncurredCost } from "../../actions/incurredCostAction";
import incurredCostService from "../../service/incurredCostService";
import { toast } from "react-toastify";

const DeleteModal = (props) => {
  const { title, content, setDeleteModal, id, setLoading } = props;
  const dispatch = useDispatch();

  const handleDelete = async () => {
    setLoading(true);

    const res = await incurredCostService.deleteIncurredCost(id);

    dispatch(deleteIncurredCost());
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
