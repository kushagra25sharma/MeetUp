import './App.css';
import Sidebar from "./Sidebar/Sidebar";
import Chat from "./Chat/Chat";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signin from "./Signin/Signin";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      { !user ? (
        <Signin />
      ) : (
        <div className="app__body">
          <Router>
            <Switch>
              <Route path="/rooms/:roomId" >
                <Sidebar />
                <Chat />
              </Route>
              <Route path="/" >
                <Sidebar />
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
