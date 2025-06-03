import { Delete } from "@mui/icons-material";
import {
  Button,
  Card,
  IconButton,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteNoteMutation } from "../api";

interface Props {
  id: string;
  active: boolean;
  title: string;
  updated_at: string;
}

export const DrawerCard: React.FC<Props> = ({
  id,
  active,
  title,
  updated_at,
}) => {
  const navigate = useNavigate();
  const [deleteNote] = useDeleteNoteMutation();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent card navigation
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirmDelete = async () => {
    await deleteNote({ id }).unwrap();
    navigate("/");
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <Card
      key={id}
      variant={active ? "elevation" : "outlined"}
      sx={{ p: 1, mb: 1, cursor: "pointer" }}
      onClick={() => navigate(`/note/${id}`)}
    >
      <Typography variant="body1">{title}</Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={{ fontSize: ".8rem", opacity: 0.5 }}>
          {dayjs(updated_at).format("DD/MM/YYYY h:MM:ssa")}
        </Typography>
        <IconButton size="small" onClick={handleDeleteClick}>
          <Delete sx={{ width: "16px", height: "16px" }} />
        </IconButton>
      </Stack>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Stack sx={{ p: 2, textAlign: "center" }} spacing={1}>
          <Typography variant="body2" sx={{ pb: 1 }}>
            Delete this note?
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button size="small" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Popover>
    </Card>
  );
};
