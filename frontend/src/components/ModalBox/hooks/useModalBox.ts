import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createRequest } from "../../../functions/createRequest";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { getBoards } from "../../../redux/slices/boardsSlice";
import { getBoardTasks } from "../../../redux/slices/boardTasksSlice";
import { closeModal } from "../../../redux/slices/modalSlice";
import { clearTask } from "../../../redux/slices/taskSlice";
import { getTasks } from "../../../redux/slices/tasksSlice";
import { getUsers } from "../../../redux/slices/usersSlice";
import { IModalBoxFormInputs } from "../types";

export const useModalBox = () => {
  const { users, usersLoading, usersErr } = useAppSelector(
    (state) => state.users
  );
  const { boards, boardsLoading, boardsErr } = useAppSelector(
    (state) => state.boards
  );
  const { isOpen, isNewTask, isIssues, boardId } = useAppSelector(
    (state) => state.modal.modal
  );
  const { task } = useAppSelector((state) => state.task);

  const [isNewTaskLocal, setIsNewTaskLocal] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      dispatch(getUsers());
      dispatch(getBoards());
    }

    if (isNewTask) {
      setIsNewTaskLocal(true);
    }
  }, [isOpen]);

  const createTask = async (data: IModalBoxFormInputs) => {
    const { status, ...updateData } = data;
    const response = await createRequest(`/tasks/create`, {
      method: "POST",
      body: JSON.stringify(updateData),
    });

    if (response.ok) {
      dispatch(getTasks());
      dispatch(getBoardTasks(Number(data.boardId)));
      closeModalBox();
    }
  };

  const updateTask = async (data: IModalBoxFormInputs) => {
    const { boardId, ...updateData } = data;
    const response = await createRequest(`/tasks/update/${task.id}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    });

    if (response.ok) {
      dispatch(getTasks());
      dispatch(getBoardTasks(Number(boardId)));
      closeModalBox();
    }
  };

  const closeModalBox = () => {
    dispatch(closeModal());
    dispatch(clearTask());
  };

  const onBoardPageOpen = () => {
    if (boardId) {
      const name = task.boardName;
      navigate(`/boards/${boardId}`, {
        state: { name },
      });
    }
  };

  return {
    users,
    usersLoading,
    usersErr,
    boards,
    boardsLoading,
    boardsErr,
    isNewTaskLocal,
    createTask,
    updateTask,
    onBoardPageOpen,
    isIssues,
    isOpen,
    isNewTask,
    boardId,
    closeModalBox,
    setIsNewTaskLocal,
    task,
  };
};
