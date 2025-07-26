export type TColumnType = "todo" | "inProgress" | "done";

export type TTask = {
  id: string;
  title: string;
  description: string;
  date: number;
  notes: string[];
  column: TColumnType;
};

export type TColumn = {
  title: TColumnType;
  tasks: TTask[];
};
