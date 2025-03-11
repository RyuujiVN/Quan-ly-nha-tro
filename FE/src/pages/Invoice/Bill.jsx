/* eslint-disable react/prop-types */
import Modal from "../../components/Modal/Modal";
import formatHelper from "../../helpers/formatHelper";

const Invoice = ({ item, setBill }) => {
  const newService = item?.services.map((service) => {
    if (service.name === "Nước") {
      return {
        ...service,
        new: item?.water?.new,
        old: item?.water?.old,
        use: item?.water?.new - item?.water?.old,
      };
    } else if (service.name === "Điện") {
      return {
        ...service,
        new: item?.electricity?.new,
        old: item?.electricity?.old,
        use: item?.electricity?.new - item?.electricity?.old,
      };
    } else {
      return service;
    }
  });

  return (
    <Modal>
      <div className="invoice-container">
        <div className="invoice-header">
          <h2>HÓA ĐƠN TIỀN NHÀ</h2>
          <p>{formatHelper.formatMonthWatch(new Date(item.month))}</p>
        </div>

        <div className="invoice-info">
          <p>
            <strong>Nhà:</strong> {item?.boardingHouse?.name}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {item?.boardingHouse?.address}
          </p>
          <p>
            <strong>Họ và tên:</strong> {item?.guest?.fullName}
          </p>
          <p>
            <strong>Phòng:</strong> {item?.room?.name}
          </p>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Khoản mục</th>
              <th>Chi tiết</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Tiền phòng</td>
              <td></td>
              <td>{`${formatHelper.format(item?.room.price)}đ`}</td>
            </tr>

            {newService.length > 0 &&
              newService.map((service, index) => (
                <tr key={service._id}>
                  <td>{index + 2}</td>
                  <td>{service.name}</td>
                  {service.name == "Điện" || service.name == "Nước" ? (
                    <>
                      <td>
                        {" "}
                        CS cũ: {service.old} - CS mới: {service.new} (SD:{" "}
                        {service.use})
                      </td>
                      <td>
                        {`${formatHelper.format(service.use * service.price)}đ`}
                      </td>
                    </>
                  ) : (
                    <>
                      <td></td>
                      <td>
                        {`${formatHelper.format(
                          service.price * service.quantity
                        )}đ`}
                      </td>
                    </>
                  )}
                </tr>
              ))}

            {item?.incurredCosts.length > 0 &&
              item?.incurredCosts.map((cost, index) => (
                <tr key={cost._id}>
                  <td>{index + 2 + newService.length}</td>
                  <td>{cost.description}</td>
                  <td>{cost.payBy}</td>
                  <td>{`${formatHelper.format(cost.price)}đ`}</td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="invoice-total">
          <strong>
            TỔNG CỘNG: {`${formatHelper.format(item.totalCost)}đ`}
          </strong>
        </div>

        <div className="invoice-footer">
          <p>
            <strong>Thông tin số tài khoản:</strong>
          </p>
          <p>
            <strong>Ngân hàng:</strong> Sacombank
          </p>
          <p>
            <strong>Số tài khoản:</strong> 07861212323114 - [ Nguyễn Bảo Long ]
          </p>
          <p>
            <strong>Số điện thoại liên hệ:</strong> 0777905219
          </p>
        </div>

        <div className="invoice-buttons">
          <button className="btn send">Gửi hóa đơn</button>
          <button className="btn close" onClick={() => setBill(false)}>
            Đóng
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Invoice;
