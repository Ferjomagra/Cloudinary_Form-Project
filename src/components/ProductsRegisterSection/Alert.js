import React, { useState, useEffect } from 'react';

import {AlertMsg, BoxAlert} from './elements'

export default function Alert({ msg, type }) {
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (msg) {
            setShow(true);
            setInterval(() => {
                setShow(false);
            }, 5000);
        }
    }, [msg]);
    return <>{
        show &&
        <BoxAlert classNames="alert">
            <AlertMsg className={`alert alert-${type}`}>
                {msg}
            </AlertMsg>
        </BoxAlert>
    }</>;
}