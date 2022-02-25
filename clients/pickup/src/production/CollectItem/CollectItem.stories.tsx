import { Meta, Story } from '@storybook/react';

import { CollectItem } from './CollectItem';

const meta = {
  title: '2B - Production/2 - ProductionCollectItem',
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
    <CollectItem
      count={args.count}
      index={args.index}
      productName={args.productName}
      modificationsName={args.modificationName}
    />
  );
};

Default.storyName = meta.title.split('/')[1];
