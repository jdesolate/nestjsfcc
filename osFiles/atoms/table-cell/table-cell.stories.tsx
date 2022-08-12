import { Meta, Story } from '@storybook/react';
import { TableCell, TableCellProps } from './table-cell';
import { ThemeColor } from '../../../enums/Theme.enum';

import { Badge } from '../badge/badge';
import { Checkbox } from '../checkbox/checkbox';
import { Progressbar } from '../progressbar/progressbar';
import { RadioButton } from '../radio-button/radio-button';
import { Toggle } from '../toggle/toggle';

export default {
  component: TableCell,
  title: 'Core Web/Atoms/TableCell',
} as Meta;

const Template: Story<TableCellProps> = (args) => <TableCell {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <p>Juril Digamon</p>
      <p>juril@symph.co</p>
    </>
  ),
  color: ThemeColor.PRIMARY,
};

export const WithButtons = Template.bind({});
WithButtons.args = {
  children: (
    <div className="flex">
      <div className="flex mt-4 mr-2">
        <Checkbox checked />
        <RadioButton checked /> <Toggle />
      </div>
      <div>
        <p>Juril Digamon</p>
        <p>juril@symph.co</p>
      </div>
    </div>
  ),
  color: ThemeColor.INFO,
};

export const WithProgress = Template.bind({});
WithProgress.args = {
  children: (
    <>
      <Progressbar currentValue={3} totalValue={10} />
    </>
  ),
  color: ThemeColor.PRIMARY,
};

export const WithBadges = Template.bind({});
WithBadges.args = {
  children: (
    <>
      <div>
        <Badge color={ThemeColor.ERROR}>Label</Badge>
      </div>
      <div>
        <Badge color={ThemeColor.ERROR}>Label</Badge>
      </div>
      <div>
        <Badge color={ThemeColor.ERROR}>Label</Badge>
      </div>
    </>
  ),
  color: ThemeColor.PRIMARY,
};
