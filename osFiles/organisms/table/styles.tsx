import styled from 'styled-components';

export const TableWrapper = styled.div.attrs({
  className: 'relative shadow-md sm:rounded-md',
})``;

export const Table = styled.table.attrs({
  className: 'w-full text-sm text-left text-gray500',
})``;

export const TableHeader = styled.thead.attrs({
  className: 'xs:hidden lg:table-header-group',
})``;

export const TableDesktopBody = styled.tbody.attrs({
  className: 'hidden lg:contents',
})``;

export const TableTabletBody = styled.tbody.attrs({
  className: 'hidden sm:contents lg:hidden',
})``;

export const TableMobileBody = styled.tbody.attrs({
  className: 'sm:hidden',
})``;

export const TabletDiv = styled.div.attrs({
  className: 'grid gap-2 grid-cols-2',
})``;

export const TabletDivRight = styled.div.attrs({
  className: 'grid grid-cols-1 gap-y-3',
})``;

export const MobileDiv = styled.div.attrs({
  className: 'grid gap-3',
})``;

export const Projects = styled.div.attrs({
  className: 'flex',
})``;

export const TablePagination = styled.div.attrs({
  className: 'hidden lg:contents',
})``;