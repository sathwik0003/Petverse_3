
import { Routes, Route } from 'react-router-dom';
import Run from './pages/run';
import SellerLogin from './pages/SellerLogin';
import SellerSignup from './pages/SellerSignup';
import PetListingPage from './pages/PetListingPage';
import Header from './pages/Header';
import Reviews from './pages/Reviews';
import Salon from './pages/Salon';
import ProductsSingle from './pages/ProductsSingle';
import Saloons from './pages/Saloons';
import Grooming from './pages/grooming';
import SaloonSingle from './pages/SaloonSingle';
import PaymentForm from './pages/Payment';
import Ticket from './pages/ticket';
import Addproduct from './pages/AddProduct';
import Navbar from './pages/NavBar';
import Seller_Products from './pages/Seller_Products';
import DataComponent from './pages/data';
import BrandDashBoard from './pages/Seller_Account';
import LoginSignup from './pages/Login';
import SaloonList from './pages/salonList';
import AdminSalon from './pages/AdminSalon';
import MainUser from './pages/MainUser';
import Petparentmain from './pages/Petparentmain';
import Productpage from './pages/Productpage';
import Nostock from './pages/Nostock';
import AddtoCart from './pages/AddtoCart';
import UserDashBoard from './pages/UserDashBoard';
import WishlistPage from './pages/WishListPage';
import AddSalon from './pages/AddSalon';
import Editproduct from './pages/EditProduct';
import Logout from './pages/Logout';
import SalonPayment from './pages/SalonPayment';
import FrequentlyAskedQuestions from './pages/Faq';
import AdminViewLine from './pages/AdminViewLine';
import AdminDashBoard from './pages/AdminDashBoard';
import Complaints from './pages/complaints';
import AdminOrders from './pages/AdminOrders'
import AdminViewBar from './pages/AdminViewBar';
import AdminLogin from './pages/AdminLogin';
import Service from './pages/AdminServices';
import AdminProducts from './pages/AdminProducts';
import AdminLogout from './pages/AdminLogout';
import ComplaintsButton from './pages/Comp1';
import UserOrders from './pages/UserOrders';
import SuccessPage from './pages/final';
import DogBreeds from './pages/DogBreeds';
// import UserLogout from './pages/userLogout';
import Below699 from './pages/Below699';
import Below999 from './pages/Below999';
import Below1999 from './pages/Below1999';
import Below2499 from './pages/Below2499';
import Below2999 from './pages/Below2999';





const App = () => {
 

  return (
    <>
    <Routes>
    <Route path="/user/main" element={<MainUser />} />
      <Route path="/user/main/:userid" element={<MainUser />} />
      <Route path="/dogbreeds/:userid" element={<DogBreeds />} />
      <Route path="/user/dashboard/:userid" element={<UserDashBoard />} />
      <Route path="/user/wishlist/:userid" element={<WishlistPage />} />
      <Route path="/user/cart/:userid" element={<AddtoCart />} />
      <Route path="/user/parenting/:id/:userid" element={<Petparentmain />} />
    
      <Route path="/user/products/:userid?/:attribute/:division?" element={<Productpage />} />
      <Route path="/user/products/:userid?/699" element={<Below699 />} />
      <Route path="/user/products/:userid?/999" element={<Below999 />} />
      <Route path="/user/products/:userid?/1999" element={<Below1999 />} />
      <Route path="/user/products/:userid?/2499" element={<Below2499 />} />
      <Route path="/user/products/:userid?/2999" element={<Below2999 />} />
      <Route path="/user/outofstock" element={<Nostock />} />
      <Route path="/" element={<Run />} />
      <Route path="/NavBar" element={<Navbar />} />
      <Route path="/Sell/Login" element={<SellerLogin/>} />
     
      <Route path="/Sell/Signup" element={ <SellerSignup/>} />
      <Route path="/Sell/List" element={<PetListingPage/>} />
     
      <Route path="/Header" element={<Header/>} />
      <Route path="/product/:userid/:producttitle" element={<ProductsSingle/>} />
      <Route path="/review" element={<Reviews/>} />
      <Route path="/user/salon/:userid?" element={<Salon/>} />
      <Route path="/saloons" element={<Saloons/>} />
      <Route path="/grooming" element={<Grooming/>} />
      <Route path="/saloonsingle/:title/:userid" element={<SaloonSingle />} />
      <Route path="/user/payment/:userid" element={<PaymentForm/>} />
      <Route path="/user/orders/:userid" element={<UserOrders/>} />
      <Route path="/salon/payment/:userid" element={<SalonPayment/>} />
      <Route path="/ticket/:userid" element={<Ticket/>} />
      <Route path="/salons/:userid?/:location" element={<SaloonList/>} />
     
      <Route path="/data" element={<DataComponent
      />} />
    
      <Route path="/faq/:userid" element={<FrequentlyAskedQuestions
      />} />
      <Route path="/success/:userid" element={<SuccessPage
      />} />
    
      <Route path="/user/login" element={<LoginSignup
      />}/>
      <Route path="/final/:userid" element={<SuccessPage
      />}/>
      <Route path="/add/:bc" element={<Addproduct/>} />
      <Route path="/edit/:title/:bc" element={<Editproduct/>} />
      <Route path="/addsalon" element={<AddSalon/>} />
      <Route path="/logout/:bc" element={<Logout/>} />
    
     
      <Route path="/sell/products/:bc" element={<Seller_Products/>} />
      <Route path="/sell/account/:bc" element={<BrandDashBoard/>} />
      <Route path="/Admin/Login" element={<AdminLogin />} />
      <Route path="/admin/dashBoard" element={<AdminDashBoard />} />
      <Route path="/admin/dashBoard/Line" element={<AdminViewLine />} />
      <Route path="/admin/dashBoard/bar" element={<AdminViewBar />} />
      <Route path="/admin/complaints" element={<Complaints />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/services" element={<Service />} />
      <Route path="/admin/salon" element={<AdminSalon />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/logout" element={<AdminLogout />} />
      <Route path="/comp" element={<ComplaintsButton />} />
    
    </Routes>
   
    </>
  );
}

export default App;
