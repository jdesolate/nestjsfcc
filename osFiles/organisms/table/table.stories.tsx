import { Table, TableProps } from './table';
import { Meta, Story } from '@storybook/react';

import { Progressbar, TableCellProps } from '../../atoms';

export default {
  component: Table,
  title: 'Core Web/Organisms/Table',
} as Meta;

const columns = [
  { label: 'Name', id: 'name' },
  { label: 'Email', id: 'email' },
  { label: 'Contact Number', id: 'contact' },
  { label: 'Project', id: 'project' },
  { label: 'Task Progress', id: 'progress' },
];

const projects = ['SymphOS 3.0', 'Zero Regression', 'Spayce'];
function generateData(): TableCellProps[][] {
  const dataCount = 10;
  const data = [];

  for (let x = 0; x < dataCount; x++) {
    const dataRow = [];

    const name = `Juril Digamo${x}`;
    dataRow.push({ children: name });

    const email = `juril_${x}@symph.co`;
    dataRow.push({ children: email });

    const contact = Math.floor(Math.random() * 9999999999) + 9562878578;
    dataRow.push({ children: `+63${contact}` });

    const project = Math.floor(Math.random() * 2);
    dataRow.push({
      children: projects[project],
    });

    const progress = Math.floor(Math.random() * 100);
    dataRow.push({
      children: <Progressbar currentValue={progress} totalValue={100} />,
    });

    data.push(dataRow);
  }

  return data;
}

const Template: Story<TableProps> = (args) => <Table {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  columns,
  data: generateData(),
  itemsPerPage: 5,
};
