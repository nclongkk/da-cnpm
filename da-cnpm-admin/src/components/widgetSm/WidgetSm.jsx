import "./widgetSm.css";
import { userSelector } from "redux/selectors";
import { useSelector } from "react-redux";
import { Avatar, Box } from "@material-ui/core";
export default function WidgetSm() {
  const { users } = useSelector(userSelector);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users?.map((user, index) => (
          <li className="widgetSmListItem" key={index}>
            <Box display="flex">
              <Avatar src={user.avatar} alt="" />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.name}</span>
                <span className="widgetSmUserTitle">{user.email}</span>
              </div>
            </Box>
          </li>
        ))}
      </ul>
    </div>
  );
}
