import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Button} from './Button';
import AddItemForm from "../components/AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import SuperInput from "../components/SuperInput";
import SuperButton from "../components/SuperButton";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
    title: 'SHOPLIST/AddItemForm',
    component: AddItemForm,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        callback: {
            description: 'Button clicked inside form',
            action: 'clicked',
        }
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AddItemFormStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        callback: action('Button clicked inside form')
    },
};

const AddItemWithHooks = (args: any) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean | string>('Title is required!')
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const addGoodsOnClickHandler = () => {
        if (title.trim() !== '') {
            if (title.split('').length < 15) {
                args.callback(title.trim())
            } else {
                setError('More than 15 symbols!')
            }
        } else {
            setError('Title is required!')
        }
        setTitle('')
    }

    const addGoodsOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            if (title.trim() !== '') {
                args.callback(title)
                setTitle('')
            } else {
                setError('Title is required!')
            }
        }
    }

    return (
        <div>
            <SuperInput title={title} callBack={onChangeInputHandler} onKeyDown={addGoodsOnKeyDownHandler}/>
            <SuperButton callBack={addGoodsOnClickHandler} title={'add'}
                         disabled={title.trim() === '' || title.length > 15}
            />
            {error && <div className={'error-message'}>{error}</div>}
            {title.length > 15 && <div>
                The length is more than 15 letters.<br/>
                Current length - <strong>{title.length}</strong>
            </div>}
        </div>
    );
};

export const AddItemFormErrorStory: Story = {
    render: () => <AddItemWithHooks/>
}