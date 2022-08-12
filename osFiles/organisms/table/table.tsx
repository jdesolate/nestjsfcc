import { ReactNode, useEffect, useState } from 'react';
import { Pagination } from '../../molecules';
import { useRouter } from 'next/router';

import * as A from '../../atoms';
import * as S from './styles';

export type TableProps = {
  columns: A.TableHeaderProps[];
  data: A.TableCellProps[][];
  itemsPerPage: number;
};

export function Table(props: TableProps): JSX.Element {
  const { columns, data, itemsPerPage } = props;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPages, setMaxPages] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    if (data.length) {
      const pages = Math.ceil(data.length / itemsPerPage);
      setMaxPages(pages);
      setCurrentPage(1);
    }
  }, [data, itemsPerPage]);

  function getSlicedArray(): A.TableCellProps[][] {
    if (!data.length) return [];

    const startingIndex = (currentPage - 1) * itemsPerPage;
    const endingIndex = currentPage * itemsPerPage;

    return data.slice(startingIndex, endingIndex);
  }

  function onNextPage(): void {
    if (currentPage < maxPages) setCurrentPage(currentPage + 1);
  }

  function onPrevPage(): void {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  function showDetails(url: string | undefined): void {
    router.push('/accomplishments/' + url);
  }

  const slicedData = getSlicedArray();

  const renderHeaders = columns.map((header) => (
    <A.TableHeader {...header} key={header.id} />
  ));

  const renderAvatarGroup: ReactNode[] = slicedData.map((currentData) => currentData.at(1)?.children);
  const renderProjectsGroup: ReactNode[] = slicedData.map((currentData) => currentData.at(2)?.children);
  const renderBlocksGroup: ReactNode[] = slicedData.map((currentData) => currentData.at(3)?.children);

  const renderDesktopCells = slicedData.map((row, key) => (
    <tr
      className="hover:cursor-pointer"
      key={key}
      onClick={() => showDetails(row[0]?.userId)}
    >
      {row.map(
        (cell, indx) =>
          !cell.userId && (
            <A.TableCell key={indx} userId={cell.userId}>
              {cell.children}
            </A.TableCell>
          )
      )}
    </tr>
  ));

  const renderTabletCells = slicedData.map((row, key) => (
    <tr
      className="hover:cursor-pointer"
      key={key}
      onClick={() => showDetails(row[0]?.userId)}
    >
      <A.TableCell key={key}>
        <S.TabletDiv>
          {renderAvatarGroup.at(key)}
          <S.TabletDivRight>
            <S.Projects>{renderProjectsGroup.at(key)}</S.Projects>
            {renderBlocksGroup.at(key)}
          </S.TabletDivRight>
        </S.TabletDiv>
      </A.TableCell>
    </tr>
  ));

  const renderMobileCells = slicedData.map((row, key) => (
    <tr
      className="hover:cursor-pointer"
      key={key}
      onClick={() => showDetails(row[0]?.userId)}
    >
      <A.TableCell key={key}>
        <S.MobileDiv>
          {renderAvatarGroup.at(key)}
          <S.Projects>{renderProjectsGroup.at(key)}</S.Projects>
          {renderBlocksGroup.at(key)}
        </S.MobileDiv>
      </A.TableCell>
    </tr>
  ));

  return (
    <S.TableWrapper>
      <S.Table>
        <S.TableHeader><tr>{renderHeaders}</tr></S.TableHeader>
        <S.TableDesktopBody>{renderDesktopCells}</S.TableDesktopBody>
        <S.TableTabletBody>{renderTabletCells}</S.TableTabletBody>
        <S.TableMobileBody>{renderMobileCells}</S.TableMobileBody>
      </S.Table>
      <S.TablePagination>
        <Pagination
          currentPage={currentPage}
          totalPage={maxPages}
          onNext={onNextPage}
          onPrev={onPrevPage}
        />
      </S.TablePagination>
    </S.TableWrapper>
  );
}
