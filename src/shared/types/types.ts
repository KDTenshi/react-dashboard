export type TColumnType = "todo" | "inProgress" | "done";
export type TTaskPriority = "high" | "moderate" | "low";

export type TTask = {
  id: string;
  projectID: string;
  title: string;
  description: string;
  date: number;
  deadline: number;
  column: TColumnType;
  priority: TTaskPriority;
};

export type TColumn = {
  title: TColumnType;
  taskIDs: string[];
};

export type TProject = {
  id: string;
  title: string;
  columns: { [key in TColumnType]: TColumn };
};

export type TRecentProject = {
  id: string;
  title: string;
};
