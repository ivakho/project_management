import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { IModalBoxFormInputs } from "./types";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { TaskForm } from "../TaskForm";
import { defaultEmptyTaskValue } from "./constants";
import { useModalBox } from "./hooks";

export const ModalBox = () => {
  const {
    isNewTask,
    task,
    boardId,
    isOpen,
    closeModalBox,
    setIsNewTaskLocal,
    isNewTaskLocal,
    users,
    boards,
    usersLoading,
    boardsLoading,
    usersErr,
    boardsErr,
    isIssues,
    onBoardPageOpen,
    createTask,
    updateTask,
  } = useModalBox();

  const form = useForm<IModalBoxFormInputs>({
    defaultValues: defaultEmptyTaskValue,
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (!isNewTask && task && boardId) {
      reset({
        title: task.title,
        description: task.description,
        boardId: boardId,
        priority: task.priority,
        status: task.status,
        assigneeId: task.assignee.id,
      });
    } else {
      reset(defaultEmptyTaskValue);
    }
  }, [isNewTask, task, boardId]);

  const onSubmit: SubmitHandler<IModalBoxFormInputs> = async (data) => {
    if (isNewTask) {
      createTask(data);
    }

    if (!isNewTask && task.id) {
      updateTask(data);
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={closeModalBox}
        fullWidth
        slotProps={{
          transition: {
            onExited: () => {
              setIsNewTaskLocal(false);
            },
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            {isNewTaskLocal ? "Создание" : "Редактирование"} задачи
          </DialogTitle>
          <DialogContent>
            <TaskForm
              form={form}
              users={users}
              boards={boards}
              usersLoading={usersLoading}
              boardsLoading={boardsLoading}
              usersErr={usersErr}
              boardsErr={boardsErr}
              taskBoardName={task.boardName}
              isNewTaskLocal={isNewTaskLocal}
            />
          </DialogContent>
          <DialogActions>
            {isIssues && (
              <Button variant="contained" onClick={onBoardPageOpen}>
                Перейти на доску
              </Button>
            )}
            <Button variant="contained" type="submit">
              {isNewTaskLocal ? "Создать" : "Обновить"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
