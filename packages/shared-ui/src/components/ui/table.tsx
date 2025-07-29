import * as React from "react";
import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableContainer,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
  Paper,
  TableProps as MuiTableProps
} from "@mui/material";
import { styled } from "@mui/system";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: 'hsl(var(--card))',
  borderRadius: '8px',
  border: '1px solid hsl(var(--border))',
}));

const StyledTable = styled(MuiTable)(({ theme }) => ({
  '& .MuiTableCell-root': {
    borderColor: 'hsl(var(--border))',
    color: 'hsl(var(--foreground))',
    fontSize: '0.875rem',
  },
}));

const StyledTableHead = styled(MuiTableHead)(({ theme }) => ({
  '& .MuiTableCell-root': {
    backgroundColor: 'hsl(var(--muted))',
    color: 'hsl(var(--muted-foreground))',
    fontWeight: 500,
    height: '48px',
    padding: '16px',
  },
}));

const StyledTableBody = styled(MuiTableBody)(({ theme }) => ({
  '& .MuiTableRow-root': {
    '&:hover': {
      backgroundColor: 'hsl(var(--muted) / 0.5)',
    },
    '&:last-child .MuiTableCell-root': {
      borderBottom: 'none',
    },
  },
  '& .MuiTableCell-root': {
    padding: '16px',
  },
}));

const StyledTableRow = styled(MuiTableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'hsl(var(--muted) / 0.5)',
  },
  transition: 'background-color 0.2s',
}));

const StyledTableCell = styled(MuiTableCell)(({ theme }) => ({
  padding: '16px',
  verticalAlign: 'middle',
}));

export interface TableProps extends MuiTableProps {
  container?: boolean;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ container = true, children, ...props }, ref) => {
    const table = (
      <StyledTable ref={ref} {...props}>
        {children}
      </StyledTable>
    );

    if (container) {
      return (
        <StyledTableContainer component={Paper} elevation={0}>
          {table}
        </StyledTableContainer>
      );
    }

    return table;
  }
);

Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ children, ...props }, ref) => (
    <StyledTableHead ref={ref} {...props}>
      {children}
    </StyledTableHead>
  )
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ children, ...props }, ref) => (
    <StyledTableBody ref={ref} {...props}>
      {children}
    </StyledTableBody>
  )
);
TableBody.displayName = "TableBody";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ children, ...props }, ref) => (
    <StyledTableRow ref={ref} {...props}>
      {children}
    </StyledTableRow>
  )
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ children, ...props }, ref) => (
    <StyledTableCell ref={ref} component="th" {...props}>
      {children}
    </StyledTableCell>
  )
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ children, ...props }, ref) => (
    <StyledTableCell ref={ref} {...props}>
      {children}
    </StyledTableCell>
  )
);
TableCell.displayName = "TableCell";

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
};