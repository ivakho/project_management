import { IBoardProps } from "./types";
import styles from "./BoardItem.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const BoardItem = ({ id, name }: IBoardProps) => {
  const navigate = useNavigate();

  const onBoardPageOpen = () => {
    navigate(`/boards/${id}`, {
      state: { name },
    });
  };

  return (
    <div className={styles.board}>
      <div>{name}</div>
      <Button onClick={onBoardPageOpen}>Перейти к доске</Button>
    </div>
  );
};
