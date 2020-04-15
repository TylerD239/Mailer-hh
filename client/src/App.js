import React, {useEffect} from 'react'
import {Auth} from "./components/Auth";
import 'bootstrap/dist/css/bootstrap.min.css'
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/auth.hook";
import {Loader} from "./components/Loader";
import {useRoutes} from "./routes";
import NavBar from "./components/NavBar";
import {BrowserRouter as Router} from 'react-router-dom'



function App() {
const {ready, authenticated, login, checkAuth} = useAuth()
const routes = useRoutes();

    useEffect(()=> {
        checkAuth()
    },[])

    if (!ready) {
        return <Loader />
    }

  return (
      <AuthContext.Provider value={{login}}>
          {authenticated ?
              <Router>
                  <NavBar/>
                  {routes}
              </Router>
              : <Auth />
          }
      </AuthContext.Provider>
  )
}

export default App
