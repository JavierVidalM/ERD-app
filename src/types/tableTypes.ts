export interface tableColumns {
    id: number;
    tableId: string;
    isPrimaryKey?: boolean;
    isForeignKey?: boolean;
    columnName: string;
    columnType: "int"|"varchar"|"text"|"datetime"|"boolean"|"double";
}