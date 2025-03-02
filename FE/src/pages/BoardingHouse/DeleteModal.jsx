/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import boardingHouseService from "../../service/boardingHouseService";
import Modal from "../../components/Modal/Modal";
import "../../components/Modal/Modal.css";
import { useDispatch } from "react-redux";
import { deleteBoardingHouse } from "../../actions/boardingHouseAction";

const DeleteModal = (props) => {
  const { title, content, setDeleteModal, id, setIsLoading } = props;
  const dispatch = useDispatch();

  const handleDelete = async () => {
    setIsLoading(true);

    const res = await boardingHouseService.deleteBoardingHouse(id);

    dispatch(deleteBoardingHouse());
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
