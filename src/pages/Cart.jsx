import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import CloseIcon from "@mui/icons-material/Close";
import { ButtonBase, ButtonGroup, Card, CardContent, Grid, IconButton, styled } from '@mui/material';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
};

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

function Cart({ iSopen, isClose }) {

    const [myCartData, setMyCartData] = useState(JSON.parse(localStorage.getItem('myArrayToCart')))

    useEffect(() => {
        const totalCount = myCartData.reduce((total, obj) => total + obj.count, 0);
        localStorage.setItem('itemsInCart', totalCount);

    }, [myCartData])


    const handleClose = () => isClose();

    const removeItem = (id) => {
        const updatedCartItems = myCartData.filter((item) => item.id !== id);
        setMyCartData(updatedCartItems);
        localStorage.setItem('myArrayToCart', JSON.stringify(updatedCartItems));
        const totalCount = updatedCartItems.reduce((total, obj) => total + obj.count, 0);
        localStorage.setItem('itemsInCart', totalCount);
    };

    const updateCount = (id, newCount) => {
        if (newCount < 1) {
            newCount = 1;
        }

        if (newCount > 4) {
            newCount = 4;
        }
        const updatedArray = myCartData.map((obj) => {
            if (obj.id === id) {
                return {
                    ...obj,
                    count: newCount,
                };
            }
            return obj;
        });

        setMyCartData(updatedArray);
        localStorage.setItem('myArrayToCart', JSON.stringify(updatedArray));
        const totalCount = updatedArray.reduce((total, obj) => total + obj.count, 0);
        localStorage.setItem('itemsInCart', totalCount);
    };

    return (
        <div>
            <Modal
                open={iSopen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Card style={{ maxHeight: '100%' }}>
                        <CardContent>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>Your Cart</h3>
                                <p>Total Item: {localStorage.getItem('itemsInCart')}</p>

                                <IconButton
                                    style={{
                                        marginBottom: '8px',
                                    }}
                                    onClick={handleClose}
                                >
                                    <CloseIcon size="small" />
                                </IconButton>
                            </div>
                            <div style={{ height: '428px', maxHeight: '428px', overflow: 'scroll' }}>
                                {
                                    myCartData && myCartData.map((elem, i) => {
                                        return (

                                            <Card style={{ paddingTop: '10px' }}>
                                                <div style={{ border: '2px solid black' }}>
                                                    <Grid container spacing={2}>
                                                        <Grid item >
                                                            <ButtonBase sx={{ width: 128, height: 128 }}>
                                                                <Img alt="complex" key={i} src={elem.message} />
                                                            </ButtonBase>
                                                        </Grid>
                                                        <Grid item xs={12} sm container>
                                                            <Grid item xs container direction="column" spacing={2}>
                                                                <Grid item xs>
                                                                    <Typography key={i} gutterBottom variant="subtitle1" component="div" style={{ paddingTop: '5px' }}>
                                                                        ID: {elem.id}
                                                                    </Typography>
                                                                    <Typography key={i} variant="body2" gutterBottom>
                                                                        ${elem.price}
                                                                    </Typography>
                                                                    <ButtonGroup size="small" aria-label="small outlined button group">
                                                                        <Button key={i} onClick={() => updateCount(elem.id, elem.count + 1)}>+</Button>
                                                                        <Button key={i}>{elem.count}</Button>
                                                                        <Button key={i} onClick={() => updateCount(elem.id, elem.count - 1)}>-</Button>
                                                                    </ButtonGroup>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                                                                <IconButton key={i} onClick={() => removeItem(elem.id)}>
                                                                    <DeleteIcon style={{ color: 'red' }} />
                                                                </IconButton>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </Card>
                                        )
                                    })
                                }
                            </div>
                            <Button style={{ marginTop: '10px' }} fullWidth variant='contained'>Proceed to Checkout</Button>
                        </CardContent>
                    </Card>
                </Box>
            </Modal>
        </div>
    );
}
export default Cart