import { Card, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

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
  return (
    <Card
      key={id}
      variant={active ? "elevation" : "outlined"}
      sx={{ p: 1, mb: 1, cursor: "pointer" }}
      onClick={() => navigate(`/note/${id}`)}
    >
      <Typography variant="body1">{title}</Typography>
      <Typography sx={{ fontSize: ".8rem", opacity: 0.5 }}>
        {dayjs(updated_at).format("DD/MM/YYYY h:MM:ssa")}
      </Typography>
    </Card>
  );
};
