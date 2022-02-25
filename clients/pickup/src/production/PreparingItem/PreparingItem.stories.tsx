import { Meta, Story } from '@storybook/react';

import { PreparingItem } from './PreparingItem';

const meta = {
  title: '2B - Production/1 - ProductionPreparingItem',
  args: {
    count: 1,
    index: 1,
    productName: 'Latte',
    modificationName: 'Test',
  },
} as Meta;

export default meta;

export const Default: Story = (args) => {
  return (
    <PreparingItem
      count={args.count}
      index={args.index}
      productName={args.productName}
      modificationsName={args.modificationName}
    />
  );
};

Default.storyName = meta.title.split('/')[1];
