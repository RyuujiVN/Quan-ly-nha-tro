import React from "react";

const Guest = () => {
  return (
    <div className="service full-height">
      <div className="container">
        <div className="service-inner">
          <BoxHead
            title="Danh sách các loại dịch vụ ở trọ"
            setAddModal={setAddModal}
          />

          <Table>
            <thead className="table-head">
              <tr>
                <th>Tên dịch vụ</th>
                <th>Đơn giá</th>
                <th>Đơn vị tính</th>
                <th>Tuỳ chỉnh</th>
              </tr>
            </thead>

            <tbody className="table-body">
              {services.length > 0 &&
                services.map((item) => {
                  item.price =
                    typeof item.price !== "string"
                      ? formatHelper.format(item.price)
                      : item.price;
                  return (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.price}đ</td>
                      <td>{item.unit}</td>
                      <td>
                        <div className="table-action">
                          <button
                            className="btn table-edit"
                            onClick={() => handleEdit(item)}
                          >
                            <FaRegEdit className="icon" />
                          </button>

                          <button
                            className="btn table-delete"
                            onClick={() => handleDelete(item)}
                          >
                            <RiDeleteBin6Line className="icon" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>

        {addModal && <AddModal setAddModal={setAddModal} />}
        {editModal && (
          <EditModal setEditModal={setEditModal} service={service} />
        )}

        {deleteModal && (
          <DeleteModal
            setDeleteModal={setDeleteModal}
            title="Xoá dịch vụ"
            content="Bạn xác nhận muốn xoá dịch vụ này? Sau khi bạn xoá, mọi thông tin sẽ không thể khôi phục được nữa."
            setLoading={setLoading}
            id={service._id}
          />
        )}
      </div>
    </div>
  );
};

export default Guest;
