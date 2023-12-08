import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export const ChartCard = ({
  onClick,
  title,
  subtitle,
  imagePath,
  minWidth,
  maxWidth,
}) => {
  return (
    <Card
      sx={{
        minWidth: minWidth,
        maxWidth: maxWidth,
        margin: "1rem",
        "@media (max-width: 600px)": {
          minWidth: "100%", // Full width on small screens
        },
      }}
      onClick={onClick}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          alt="green iguana"
          src={imagePath}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
