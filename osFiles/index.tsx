/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PageHeader,
  Tab,
  TabPanel,
  Table,
  Progressbar,
  Badge,
  UserDetailSection,
} from '@symphos/core-web/components';
import { accomplishmentMenus } from '@symphos/core-web/config';
import { TabEnum, ThemeColor } from '@symphos/core-web/enums';
import { MainLayout } from '@symphos/core-web/layouts';
import { UserPhoto } from '@symphos/core-web/assets';
import { ReactElement, useEffect, useState } from 'react';

import { usersData, tableHeaderItems } from '../data/users.data';
import { getFullName } from '@symphos/core-web/utils';

export function Index() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getTableData();
  }, []);

  function getBadges(user: {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    photo: string;
    projects: string[];
    blocks: number;
    submittedBlock: number;
  }) {
    return user.projects.map((project: string) => {
      if (project === 'Cambridgeshare') {
        return (
          <Badge key={project} color={ThemeColor.SUCCESS}>
            {project}
          </Badge>
        );
      }

      if (project === 'Temasek COCWA') {
        return (
          <Badge key={project} color={ThemeColor.ERROR}>
            {project}
          </Badge>
        );
      }
      if (project === 'TCP') {
        return (
          <Badge key={project} color={ThemeColor.WARNING}>
            {project}
          </Badge>
        );
      }
      return <Badge key={project}>{project}</Badge>;
    });
  }

  function getTableData() {
    const tempData = [];
    usersData.forEach((user) => {
      tempData.push([
        {
          userId: user.id,
        },
        {
          children: (
            <UserDetailSection
              fullName={getFullName(user)}
              email={user.email}
              photo={UserPhoto}
            />
          ),
        },
        {
          children: <>{getBadges(user)}</>,
        },
        {
          children: (
            <Progressbar
              currentValue={user.submittedBlock}
              totalValue={user.blocks}
            />
          ),
        },
      ]);
    });
    setTableData(tempData);
  }

  return (
    <div className="mx-8 my-10">
      <PageHeader title="Accomplishments" subtitle="Let's deliver value!" />
      <div className="mt-4">
        <Tab
          defaultTab="1"
          tabItems={accomplishmentMenus}
          tabType={TabEnum.UNDERLINE}
        >
          <TabPanel value="1">
            Filter and Search Component
            <Table
              columns={tableHeaderItems}
              data={tableData}
              itemsPerPage={10}
            />
          </TabPanel>
          <TabPanel value="2">Projects Table</TabPanel>
        </Tab>
      </div>
    </div>
  );
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Index;
