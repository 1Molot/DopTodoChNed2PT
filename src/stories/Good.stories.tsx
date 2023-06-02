import type {Meta, StoryObj} from '@storybook/react';

import {Button} from './Button';
import {Good} from "../components/Good";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Good> = {
    title: 'SHOPLIST/Good',
    component: Good,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        inCart: false,
        title: 'JS',
        expectedPrice: '$10',
        realPrice: '$10',
        id: '1',
        shopListId: '10'
    },
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof Good>;

// export const GoodIsNotInCart: Story = {
//     render: () => <Provider store={store}><Good id={'1'} title={'hjjh'} expectedPrice={'$10'} realPrice={'$20'} inCart={false} shopListId={'1'}/></Provider>
// };
//
// export const GoodIsInCart: Story = {
//     render: () => <Provider store={store}><Good id={'1'} title={'hjjh'} expectedPrice={'$10'} realPrice={'$20'} inCart={true} shopListId={'1'}/></Provider>
// };


export const GoodIsNotInCart: Story = {};

export const GoodIsInCart: Story = {
    args: {
        inCart: true
    }
};


