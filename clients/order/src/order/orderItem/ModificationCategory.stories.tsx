import { Meta, Story } from '@storybook/react';
import {
  ModificationCategory,
  ModificationCategoryProps,
} from './ModificationCategory';

import { menuItemImage } from '@bb/order/fixtures/menu/menuItemImage';

const meta = {
  title: '4-Order/Components/Modification Category',
  argTypes: {
    imageUrl: {
      control: {
        type: 'select',
      },
      // @TODO - change this to modification images once they are available
      options: Object.values(menuItemImage).map((image) => image.name),
      mapping: Object.entries(menuItemImage).reduce((acc, curr) => ({
        ...acc,
        [curr[1].name]: curr[1].sourceUrl,
      })),
    },
  },
} as Meta;

export default meta;

export const Default: Story<ModificationCategoryProps & { image: string }> = (
  args,
) => <ModificationCategory {...args} />;

Default.args = {
  displayName: 'Milk',
  imageUrl: 'mocha',
  value: '',
  disabled: false,
  required: true,
};

Default.storyName = 'Modification Category';
