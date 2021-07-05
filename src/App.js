import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Code from "./pages/Code";

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact strict path="/">
            <Home />
          </Route>
          <Route exact strict path="/:urlCode">
            <Code />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
