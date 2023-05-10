import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import List from "./pages/list/jobList"
import AlumniList from "./pages/list/alumniList"
import New from "./pages/new/New"
import Single from "./pages/single/Single"
import { jobInputs, announcementInput } from "../src/formSource"
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import AnnouncementList from "./pages/list/announcementList"
import UserList from "./pages/list/userList"
import AnnouncementSingle from "./pages/single/AnnoucementSingle"
import UserSingle from "./pages/single/UserSingle"
import { useSelector } from "react-redux"

function App() {

  const name = useSelector(state => state.user.username);
  const tocken = useSelector(state => state.user.tocken);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          {!tocken || tocken === null || tocken === '' ?
            (<Route path="/">
              <Route index element={<Login />} />
            </Route>
            ) : (
              <>
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="alumni" element={<AlumniList />} />

                  <Route path="announcement">
                    <Route index element={<AnnouncementList />} />
                    <Route path=":announcementId" element={<AnnouncementSingle />} />
                    <Route path="new" element={<New inputs={announcementInput} title="Add new Announcement" id={0} />} />
                  </Route>


                  <Route path="users">
                    <Route index element={<UserList />} />
                    <Route path=":userId" element={<UserSingle />} />
                  </Route>
                  <Route path="job">
                    <Route index element={<List />} />
                    <Route path=":jobId" element={<Single />} />
                    <Route path="new" element={<New inputs={jobInputs} title="Add new Job" id={1} />} />
                  </Route>

                </Route>
              </>
            )}
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
