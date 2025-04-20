import { TextField, MenuItem } from "@mui/material";
import { IAsyncSelectProps } from "./types";

export const AsyncSelect = ({
  label,
  value,
  onChange,
  error = false,
  options,
  loading = false,
}: IAsyncSelectProps) => {
  return (
    <TextField
      select
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      error={error}
    >
      {loading && <MenuItem disabled>Загрузка...</MenuItem>}
      {!loading && options.length === 0 && (
        <MenuItem disabled>Нет доступных данных</MenuItem>
      )}
      {!loading &&
        options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.title}
          </MenuItem>
        ))}
    </TextField>
  );
};
