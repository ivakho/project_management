import { Box, TextField, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";
import { AsyncSelect } from "../AsyncSelect";
import { ITaskFormProps } from "./types";

export const TaskForm = ({
  form,
  users,
  boards,
  usersLoading,
  boardsLoading,
  usersErr,
  boardsErr,
  taskBoardName,
  isNewTaskLocal,
}: ITaskFormProps) => {
  const { control, register } = form;

  return (
    <Box display="flex" flexDirection="column" gap={2} sx={{ width: "100%" }}>
      <TextField
        autoFocus
        margin="dense"
        label="Название"
        fullWidth
        {...register("title")}
      />
      <TextField
        label="Описание"
        multiline
        rows={4}
        fullWidth
        {...register("description")}
      />
      {taskBoardName ? (
        <TextField
          label="Проект"
          fullWidth
          value={taskBoardName}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
      ) : (
        <Controller
          control={control}
          name="boardId"
          render={({ field, fieldState }) => (
            <AsyncSelect
              label="Проект"
              value={field.value}
              onChange={field.onChange}
              error={!!fieldState.error}
              loading={boardsLoading}
              options={boards.map((board) => ({
                title: board.name,
                value: board.id,
              }))}
            />
          )}
        />
      )}
      {boardsErr && <p style={{ color: "red" }}>{boardsErr}</p>}
      <Controller
        control={control}
        name="priority"
        render={({ field }) => (
          <TextField select label="Приоритет" fullWidth {...field}>
            <MenuItem value="Low">Низкий</MenuItem>
            <MenuItem value="Medium">Средний</MenuItem>
            <MenuItem value="High">Высокий</MenuItem>
          </TextField>
        )}
      />
      {!isNewTaskLocal && (
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <TextField select label="Статус" fullWidth {...field}>
              <MenuItem value="Backlog">To do</MenuItem>
              <MenuItem value="InProgress">In progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </TextField>
          )}
        />
      )}
      <Controller
        control={control}
        name="assigneeId"
        render={({ field, fieldState }) => (
          <AsyncSelect
            label="Исполнитель"
            value={field.value}
            onChange={field.onChange}
            error={!!fieldState.error}
            loading={usersLoading}
            options={users.map((user) => ({
              title: user.fullName,
              value: user.id,
            }))}
          />
        )}
      />
      {usersErr && <p style={{ color: "red" }}>{usersErr}</p>}
    </Box>
  );
};
