import React, {ChangeEvent} from 'react';

type PropsType = {
    title: string,
    callBack: () => void
    disabled?: boolean
}

const SuperButton = (props: PropsType) => {
    return (
        <button onClick={() => props.callBack()} disabled={props.disabled}>{props.title}</button>
    );
};

export default SuperButton;