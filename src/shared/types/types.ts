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

export type TProject = {
  id: string;
  title: string;
  columns: { [key in TColumnType]: string[] };
};

export type TRecentProject = {
  id: string;
  title: string;
};
