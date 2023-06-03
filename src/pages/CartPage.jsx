import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { ButtonBase, ButtonGroup, Card, CardContent, CardMedia, Grid, IconButton, styled } from '@mui/material';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

function CartPage() {

    const [myCartData, setMyCartData] = useState(JSON.parse(localStorage.getItem('myArrayToCart')))
    const [totalPrice, setTotalPrice] = useState();

    useEffect(() => {
        const totalCount = myCartData.reduce((total, obj) => total + obj.count, 0);
        localStorage.setItem('itemsInCart', totalCount);
        const totalPriceCount = myCartData.reduce((sum, obj) => {
            const { count, price } = obj;
            return sum + count * price;
        }, 0);
        setTotalPrice(totalPriceCount);
    }, [myCartData, totalPrice])

    const removeItem = (id) => {
        const updatedCartItems = myCartData.filter((item) => item.id !== id);
        setMyCartData(updatedCartItems);
        localStorage.setItem('myArrayToCart', JSON.stringify(updatedCartItems));
        const totalCount = updatedCartItems.reduce((total, obj) => total + obj.count, 0);
        localStorage.setItem('itemsInCart', totalCount);
        const totalPriceCount = updatedCartItems.reduce((sum, obj) => {
            const { count, price } = obj;
            return sum + count * price;
        }, 0);
        setTotalPrice(totalPriceCount);
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
        const totalPriceCount = updatedArray.reduce((sum, obj) => {
            const { count, price } = obj;
            return sum + count * price;
        }, 0);
        setTotalPrice(totalPriceCount);
    };

    return (
        <div>

            <Box >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={9}>
                        <Card style={{ maxHeight: '100%', height: '100%' }}>
                            <CardContent>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h3>Your Cart</h3>
                                    <p>Total Item: {localStorage.getItem('itemsInCart')}</p>
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
                                                                            <Button key={i} disabled>{elem.count}</Button>
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
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Card >
                            <CardContent>
                                <h3>Total Price:</h3>${totalPrice}
                                <div style={{ textAlign: 'left' }}>
                                    <p style={{marginBottom: '-17px'}}><b>Address:</b></p>
                                    <p>0362 Collins Drives, Oregon, Mumbai, 401101</p>

                                </div>
                                <Button style={{ marginTop: '10px' }} fullWidth variant='contained' endIcon={<ShoppingCartCheckoutIcon />}>Proceed to Checkout</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>


            </Box>
        </div>
    );
}

export default CartPage