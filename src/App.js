import Home from './Components/Home/Home';
import Menu from './Components/Menu/Menu';

import AuthProvider from './Components/AuthContext/AuthProvider';
import { BrowserRouter , Routes , Route ,Navigate } from 'react-router-dom';
import SignIn from './Auth/SignIn';
import Register from './Auth/Register';
import Profile from './Auth/Pofile';
import { getToken } from './Components/Constants/Helpers';
import AppContext from './Utils/Context';
import CategoryDetails from './Components/Categories/CategoryDetails';
import SubCategories from './Components/Categories/SubCategories';
import AddBlog from './Components/Categories/AddBlog';

function App() {
 
  return (
    <>
       <BrowserRouter>
       <AppContext>
       <AuthProvider>
         <Menu />
         <Routes>
           <Route path='/' element={<Home />} />
           <Route path='/signin' element={<SignIn />} />
           <Route path='/signup' element={<Register />} />
           <Route
             path="/profile"
             element={getToken() ? <Profile /> : <Navigate to="/signin" />}
           />
           <Route path='/category/:id' element={ <CategoryDetails/> } />
           <Route path='/subcategry/:id' element={ <SubCategories/>}  />
         </Routes>
       </AuthProvider>
     </AppContext>
        </BrowserRouter>
        </>
  );
}

export default App;
