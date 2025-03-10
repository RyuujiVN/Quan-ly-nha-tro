import Table from "../../components/Table/Table";
import "./ElectricityMeter.css";
import { useEffect, useState } from "react";
import formatHelper from "../../helpers/formatHelper";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchElectricityMeter } from "../../actions/electricityMeterAction";
import ElectricityMeterItem from "./ElectricityMeterItem";

const ElectricityMeter = () => {
  const [time, setTime] = useState(formatHelper.formatMonthYear(new Date()));
  const [searchParams, setSearchParams] = useSearchParams();
  const list = useSelector((state) => state.electricityMeterReducer);
  const dispatch = useDispatch();

  const month = searchParams.get("month");

  const handleChangeMonth = (e) => {
    setTime(e.target.value);

    setSearchParams({
      month: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(fetchElectricityMeter(month));
  }, [month]);

  return (
    <>
      <div className="electricity">
        <div className="container">
          <div className="guest-inner">
            <div className="title">Chỉ số điện</div>
            <div className="filter-month">
              <label htmlFor="month">Tháng năm:</label>
              <input
                className="month"
                type="month"
                name="filter-month"
                id="filter-month"
                onChange={handleChangeMonth}
                value={time}
              />
            </div>

            <Table>
              <thead className="table-head">
                <tr>
                  <th>STT</th>
                  <th>Thời gian</th>
                  <th>Căn trọ</th>
                  <th>Phòng trọ</th>
                  <th>Chỉ số điện cũ</th>
                  <th>Chỉ số điện mới</th>
                  <th>Đã sử dụng</th>
                  <th>Tuỳ chỉnh</th>
                </tr>
              </thead>

              <tbody className="table-body">
                {list.length > 0 &&
                  list.map((item, index) => (
                    <ElectricityMeterItem
                      key={item._id}
                      item={item}
                      index={index}
                    />
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ElectricityMeter;
