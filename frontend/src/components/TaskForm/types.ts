import { UseFormReturn } from "react-hook-form";
import { IModalBoxFormInputs } from "../ModalBox/types";
import { IBoards, IUser } from "../../redux/types/types";

export interface ITaskFormProps {
  form: UseFormReturn<IModalBoxFormInputs>;
  users: IUser[];
  boards: IBoards[];
  usersLoading: boolean;
  boardsLoading: boolean;
  usersErr: string | undefined;
  boardsErr: string | undefined;
  taskBoardName?: string;
  isNewTaskLocal: boolean;
}
