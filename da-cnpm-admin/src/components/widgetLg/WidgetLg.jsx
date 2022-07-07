import { useSelector } from "react-redux";
import { statisticSelector } from "redux/selectors";
import { Chip } from "@material-ui/core";
import "./widgetLg.css";

export default function WidgetLg() {
  const { transactions } = useSelector(statisticSelector);

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh" style={{ textAlign: "center" }}>
            Date
          </th>
          <th className="widgetLgTh" style={{ textAlign: "center" }}>
            Amount
          </th>
          <th className="widgetLgTh" style={{ textAlign: "center" }}>
            Service Fee
          </th>
          <th className="widgetLgTh" style={{ textAlign: "center" }}>
            Status
          </th>
        </tr>
        {transactions?.map((item, index) => (
          <tr className="widgetLgTr" key={index}>
            <td className="widgetLgUser">
              <img src={item.shop.avatar} alt="" className="widgetLgImg" />
              <span className="widgetLgName">{item.shop.name}</span>
            </td>
            <td className="widgetLgDate" style={{ textAlign: "center" }}>
              {new Date(item?.createdAt).toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </td>
            <td className="widgetLgAmount" style={{ textAlign: "center" }}>
              ${item?.order?.amount}
            </td>
            <td className="widgetLgAmount" style={{ textAlign: "center" }}>
              $
              {(item?.order.amount * item?.order.serviceFeePercentage).toFixed(
                1
              )}
            </td>
            <td className="widgetLgStatus" style={{ textAlign: "center" }}>
              <Chip
                color="primary"
                label={item?.status}
                style={{
                  letterSpacing: 1.2,
                  fontSize: 14,
                  backgroundColor: (() => {
                    switch (item?.status) {
                      case "transfer":
                        return "#ffc107";
                      case "charge":
                        return "#28a745";
                      case "refund":
                        return "rgb(111 111 111)";
                      default:
                        return "#ffc107";
                    }
                  })(),
                }}
              />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
