import React, { useEffect, Suspense } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { authCheckState } from './store/actions/index';
import './App.css';
import Spinner from './components/UI/Spinner/Spinner'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'))
const Orders = React.lazy(() => import('./containers/Orders/Orders'))
const Auth = React.lazy(() => import('./containers/Auth/Auth'))

const App = (props) => {
  const { onTryAutoSignup } = props;
  useEffect(() => {
    onTryAutoSignup()
  }, [onTryAutoSignup])

  let routes = (
    <Switch>
      <Route path="/auth" render={() => <Auth />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthed) {
    routes = (
      <Switch>
        <Route path="/checkout" render={() => <Checkout />} />
        <Route path="/orders" render={() => <Orders />} />
        <Route path="/auth" render={() => <Auth />} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<Spinner />}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthed: !!state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
