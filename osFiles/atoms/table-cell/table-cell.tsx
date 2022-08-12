import { ReactNode } from 'react';
import { ThemeColor } from '../../../enums';

export type TableCellProps = {
  userId?: string;
  children?: ReactNode;
  color?: ThemeColor;
};

export function TableCell(props: TableCellProps): JSX.Element {
  const { children, color } = props;

  function getThemeColor(badgeColor?: ThemeColor): string {
    switch (badgeColor) {
      case ThemeColor.SECONDARY:
        return 'bg-gray50';
      case ThemeColor.INFO:
        return 'bg-primary50';
      default:
        return 'bg-white';
    }
  }

  const themeColorClass = getThemeColor(color);

  return (
    <td className={`w-96 py-3 px-7 border-b border-gray200 ${themeColorClass}`}>
      {children}
    </td>
  );
}
