export type TColumnType = "todo" | "inProgress" | "done";
export type TTaskPriority = "high" | "moderate" | "low";

export type TTask = {
  id: string;
  title: string;
  description: string;
  date: number;
  notes: string[];
  column: TColumnType;
  priority: TTaskPriority;
};

export type TColumn = {
  title: TColumnType;
  tasks: TTask[];
};
