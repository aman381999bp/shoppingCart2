import * as React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Card, CardActions, CardContent, CardMedia, Grid, styled } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const History = () => {
    let historicalData = JSON.parse(localStorage.getItem('myArray'));
    return (
        <>
            <div style={{ paddingTop: '15px' }}>
            <h2><u>Recently viewed</u> </h2>
                <Grid container spacing={2}>
                    {
                        historicalData && historicalData.map((elem, i) => {
                            return (

                                <Grid item xs={12} sm={4}>
                                    <Card style={{ height: '350px', border: '1px solid black' }}>
                                        <Img key={i} alt="complex" src={elem.message} style={{ height: '90%' }} />
                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <CardActions>
                                                <IconButton aria-label="add to favorites">
                                                    <FavoriteBorderIcon />
                                                </IconButton>
                                                <IconButton aria-label="share">
                                                    <ShareIcon />
                                                </IconButton>
                                            </CardActions>
                                        </div>

                                    </Card>

                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>
        </>
    )
}

export default History