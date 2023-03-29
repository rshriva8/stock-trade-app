import React from 'react';
import { Route, Redirect, Switch, useHistory, BrowserRouter } from 'react-router-dom';
import './App.css';
import { CheckoutPage } from './layouts/CheckOutPage/CheckoutPage';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { Nav } from './layouts/NavbarAndFooter/Nav';
import { UserRegistrationForm } from './layouts/Registration/UserRegistrationForm';
import StockRegistrationForm from './layouts/AdminControls/StockRegistrationForm';
import SetMarketScheduleForm from './layouts/AdminControls/SetMarketSchedule';
import AdminHome from './layouts/AdminControls/AdminHome';
import { EditStock } from './layouts/AdminControls/EditStock';
import { ManageStocksPage } from './layouts/AdminControls/ManageStocksPage';
import LoginPage from './layouts/Login/LoginPage';
import { LandingPage } from './layouts/Landing/LandingPage';
import HomePage from './layouts/HomePage/HomePage';
import AccountInfo from './layouts/Account/AccountInfo'
import Deposit from './layouts/Account/Deposit';
import Withdraw from './layouts/Account/Withdraw';
import MyStocks from './layouts/Account/MyStocks';
import { SellStock } from './layouts/CheckOutPage/SellStock';
import AccountHistory from './layouts/Account/AccountHistory';
import StockData from './layouts/SearchStocksPage/StockData';
import LimitOrder, { LimitOrderBuy } from './layouts/CheckOutPage/LimitOrderBuy';
import MyLimitOrders from './layouts/Account/MyLimitOrders';
import CancelOrder from './layouts/CheckOutPage/CancelOrder';
import SetHoliday from './layouts/AdminControls/SetHoliday';
import RemoveStock from './layouts/AdminControls/RemoveStock';
import LimitOrderSell from './layouts/CheckOutPage/LimitOrderSell';

export const  App = () => {

  const customAuthHandler = () => {
    history.push('/login');
  }

  const history=useHistory();


  return (
    <div className='d-flex flex-column min-vh-100'>
      <Nav />
      <div className='d-flex-grow-1'>
        <BrowserRouter>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/landing' />
          </Route>

          <Route exact path="/landing">
            <LandingPage/>
            </Route>

          <Route exact path="/login">
            <LoginPage/>
            </Route>

          <Route path='/home'>
            <HomePage />
          </Route>

          <Route path='/account'>
            <AccountInfo/>
          </Route>
          <Route path='/deposit'>
            <Deposit/>
          </Route>
          <Route path='/withdraw'>
            <Withdraw/>
          </Route>
          <Route path='/myportfolio'>
            <MyStocks/>
          </Route>
          <Route path='/mylimitorders'>
            <MyLimitOrders/>
          </Route>
          <Route path='/myhistory'>
            <AccountHistory/>
          </Route>

          <Route path='/register'>
            <UserRegistrationForm/>
            </Route>

          <Route path='/admin' exact>
            <AdminHome/>
            </Route>

          <Route path='/admin/register-stock'>
            <StockRegistrationForm/>
          </Route>

          <Route path='/admin/set-market'>
            <SetMarketScheduleForm/>
          </Route>

          <Route path='/admin/manage-stocks' exact>
            <ManageStocksPage/>
          </Route>

          <Route path='/admin/edit-stock'>
            <EditStock/>
          </Route>
          <Route path='/admin/set-holidays'>
            <SetHoliday/>
          </Route>

          <Route path='/stocks' exact>
            <StockData />
          </Route>

          <Route path='/checkout/:stockId'>
            <CheckoutPage />
          </Route>
          <Route path='/remove/:stockId'>
            <RemoveStock />
          </Route>
          <Route path='/limitorderbuy/:stockId'>
            <LimitOrderBuy />
          </Route>
          <Route path='/limitordersell/:stockId'>
            <LimitOrderSell />
          </Route>
          <Route path='/sell-stock/:stockId'>
            <SellStock />
          </Route>
          <Route path='/cancel-order/:orderId'>
            <CancelOrder />
          </Route>
          
        </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
