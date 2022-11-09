import React from 'react';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ShowCard({data}) {
    console.log(data)
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={data.show.image.medium}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.show.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.show.summary}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.show.type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.show.language}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.show.genres}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.show.status}
        </Typography>
      </CardContent>
    </Card>
  );
}