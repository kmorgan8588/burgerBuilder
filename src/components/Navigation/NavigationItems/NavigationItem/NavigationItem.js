import React from 'react';
import styles from './NavigationItem.module.css';
import PropTypes from 'prop-types';

const navigationItem = (props) => {
    return (
        <li className={styles.NavigationItem}>
            <a
                href={props.link}
                className={props.active ? styles.active : null}
            >{props.children}</a>
        </li>
    )
}

navigationItem.propTypes = {
    link: PropTypes.string,
    active: PropTypes.bool
}

export default navigationItem;
