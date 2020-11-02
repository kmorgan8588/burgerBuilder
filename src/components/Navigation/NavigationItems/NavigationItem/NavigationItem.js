import React from 'react';
import styles from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const navigationItem = (props) => {
    return (
        <li className={styles.NavigationItem}>
            <NavLink
                exact={props.exact}
                activeClassName={styles.active}
                to={props.link}
            >{props.children}</NavLink>
        </li>
    )
}

navigationItem.propTypes = {
    link: PropTypes.string,
    exact: PropTypes.bool
}

export default navigationItem;
