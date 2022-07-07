import AuthRoute from "components/Common/AuthRoute";
import PrivateRoute from "components/Common/PrivateRoute";
import Auth from "pages/Auth";
import Main from "pages/Main";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <AuthRoute path="/auth">
            <Auth />
          </AuthRoute>
          <PrivateRoute path="/">
            <Main />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
