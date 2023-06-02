import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import {EditableSpan} from "../components/EditableSpan";
import {action} from "@storybook/addon-actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableSpan> = {
  title: 'SHOPLIST/EditableSpan',
  component: EditableSpan,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    oldTitle: {
      description: 'Start value is empty string. Set start value'
    },
    callback: {
      description: 'Set new value'
    }
  },
  args: {
    callback: action('Change editable span value'),
    oldTitle: 'Test'
  }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {};

