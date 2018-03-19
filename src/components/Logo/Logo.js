import React, { Component } from 'react'
import jobImg from './job.png';
import styles from './Logo.less'
export default class Logo extends Component {
    render() {
        return (
            <div className={styles.imgWrapper}>
                <img src={jobImg} alt="Logo" className={styles.img}/>
            </div>
        )
    }
}
