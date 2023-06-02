import React, {ChangeEvent, useState, KeyboardEvent, memo} from 'react';
import SuperInput from "./SuperInput";

type EditableSpanPropsType = {
    oldTitle: string
    callback: (newTitle: string) => void
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {

    console.log("EditableSpan called")
    const [edit, setEdit] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(props.oldTitle)

    const onDoubleClickHandler = () => {
        setEdit(true)
    }

    const onBlurHandler = () => {
        setEdit(false)
        props.callback(newTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onBlurHandler()
        }
    }

    return (
        edit ?
            // <>
            //     <input value={newTitle}
            //            onBlur={onBlurHandler}
            //            onChange={onChangeHandler}
            //            onKeyDown={onKeyDownHandler}
            //            autoFocus/>
            //     <button >+</button>
            // </>
            <div onBlur={onBlurHandler}>
                <SuperInput title={newTitle} onKeyDown={onKeyDownHandler} callBack={onChangeHandler}/>
            </div>
            :
            <span onDoubleClick={onDoubleClickHandler}><strong>{props.oldTitle}</strong></span>
    );
});
