import Home from './Components/Home/Home';
import Menu from './Components/Menu/Menu';
import './App.css';
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
import About from './Components/Pages/About';
import Categories from './Components/Categories/Categories';
import Contact from './Components/Pages/Contact';
import BlogDetails from './Components/Blogs/BlogDetails';
import Footer from './Components/Footer/Footer';

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
           <Route path='/subcategry/:id' element={ <AddBlog/>}  />
           <Route path='/about' element={<About/>} />
           <Route path='/categogy' element={<Categories/>} />
           <Route path='/contact' element={ <Contact/> } />
           <Route path= '/blogs/:id' element={ <BlogDetails/> } />
         </Routes>
         <Footer/>
       </AuthProvider>
     </AppContext>
        </BrowserRouter>
        </>
  );
}

export default App;
