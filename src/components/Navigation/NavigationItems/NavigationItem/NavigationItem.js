import React from 'react';
import styles from './NavigationItem.module.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const navigationItem = (props) => {
    return (
        <li className={styles.NavigationItem}>
            <Link
                to={props.link}
                className={props.active ? styles.active : null}
            >{props.children}</Link>
        </li>
    )
}

navigationItem.propTypes = {
    link: PropTypes.string,
    active: PropTypes.bool
}

export default navigationItem;
