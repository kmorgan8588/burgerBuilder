import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    console.log('navigation props', props)
    let orders = props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null;
    let auth = props.isAuthenticated ? <NavigationItem link="/logout">Logout</NavigationItem> : <NavigationItem link="/auth">Login</NavigationItem>
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link="/" exact>Burder Builder</NavigationItem>
            {orders}
            {auth}
        </ul>
    )
}

export default navigationItems;
