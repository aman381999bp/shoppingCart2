import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Button, Card, CardActions, FormControl, Grid, Input, TextField, Tooltip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import { v4 as uuidv4 } from 'uuid';
import Cart from './Cart';
import { useNavigate } from 'react-router-dom';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

function Home() {
    const [data, setData] = useState([]);
    const [openCart, setOpenCart] = useState(false);
    const [dataArray, setDataArray] = useState(() => {
        const existingData = localStorage.getItem('myArray');
        return existingData ? JSON.parse(existingData) : [];
    });

    const [dataToCart, setDataToCart] = useState(() => {
        const existingDataToCart = localStorage.getItem('myArrayToCart');
        return existingDataToCart ? JSON.parse(existingDataToCart) : [];
    });
    const [dataCurrent, setDataCurrent] = useState(() => {
        const existingCurentData= localStorage.getItem('currentData');
        return existingCurentData ? JSON.parse(existingCurentData) : [];
    });
    const [price, setPrice] = useState(100);
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();

    let historicalData = JSON.parse(localStorage.getItem('myArray'));

    function updateLocalStorage(data) {
        setDataArray(data);
        localStorage.setItem('myArray', JSON.stringify(data));
    };

    const fetchData = async () => {
        if(localStorage.getItem('myArrayToCart') != null || localStorage.getItem('myArrayToCart') != undefined){
            const totalCount = JSON.parse(localStorage.getItem('myArrayToCart')).reduce((total, obj) => total + obj.count, 0);
            localStorage.setItem('itemsInCart', totalCount);
        }
        
        await axios.get('https://dog.ceo/api/breeds/image/random')
            .then((response) => {
                const newData = { ...response.data, id: uuidv4() };

                let updatedDataArray;
                if (dataArray.length > 0) {
                    updatedDataArray = [...dataArray, newData];
                } else {
                    updatedDataArray = [newData];
                };
                updateLocalStorage(updatedDataArray);
                setDataCurrent(newData)
                localStorage.setItem('currentData', JSON.stringify(newData));
                setData(newData)
            })
    };

    function updateLocalStorageToCart(data) {
        setDataToCart(data);
        localStorage.setItem('myArrayToCart', JSON.stringify(data));
    };

    function findOcc(arr, key) {
        let arr2 = [];

        arr.forEach((x) => {
            if (arr2.some((val) => { return val[key] == x[key] })) {
                arr2.forEach((k) => {
                    if (k[key] === x[key]) {
                        k["count"]++;
                        Object.keys(x).forEach((objKey) => {
                            if (objKey !== key) {
                                k[objKey] = x[objKey];
                            }
                        });
                    }
                })

            } else {
                let a = {}
                a[key] = x[key]
                a["count"] = 1
                Object.keys(x).forEach((objKey) => {
                    if (objKey !== key) {
                        a[objKey] = x[objKey];
                    }
                });
                arr2.push(a);
            }
        })
        return arr2
    }

    const AddToCart = () => {
        window.location.reload()
        let newData = { ...data, price: price }
        let updatedDataArray;
        if (dataToCart.length > 0) {
            updatedDataArray = [...dataToCart, newData];
        } else {
            updatedDataArray = [newData];
        }
        let newUpdatedDataArray = findOcc(updatedDataArray, 'id');
        const totalCount = newUpdatedDataArray.reduce((total, obj) => total + obj.count, 0);
        localStorage.setItem('itemsInCart', totalCount);
        updateLocalStorageToCart(newUpdatedDataArray);
    };

    useEffect(() => {
        if(dataArray.length == 0 || localStorage.getItem('currentData') == null || localStorage.getItem('currentData') == undefined){
            fetchData();
        }
    }, []);

    useEffect(() => {
        if (price > 99) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [price]);

    const navigatePage = () => {
        navigate("/history");
    }

    return (
        <Box>
            {
                openCart ? <>
                    <Cart
                        iSopen={openCart}
                        isClose={() => setOpenCart(false)}
                    />
                </> : null
            }

            <h2><u>Find your pet!</u> </h2>
            <Grid container spacing={2} style={{ padding: '10px' }}>
                <Grid item xs={12} sm={6}>
                    <Card style={{ height: '400px', border: '1px solid black' }}>
                        <Img alt="complex" src={dataCurrent.message} style={{ height: '90%' }} />
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
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
                <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '80%' }}>
                        <div style={{ display: 'flex', }}>
                            <p style={{ paddingTop: '3px', paddingRight: '3px' }}>$</p>
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    id="outlined-adornment-password"
                                    type="number"
                                    variant='standard'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    label="Give a valid price"
                                    placeholder="Give a valid price"
                                />
                            </FormControl>
                        </div>
                        <Button size='large' variant="contained" color='secondary' onClick={fetchData} endIcon={<ArrowForwardRoundedIcon />}
                            style={{ width: '100%', marginBottom: '10px' }}>
                            Find Next
                        </Button>

                        <Button size='large' disabled={disabled} variant="contained" onClick={AddToCart} endIcon={<AddShoppingCartRoundedIcon />}
                            style={{ width: '100%' }}>
                            Add to cart
                        </Button>
                    </div>
                </Grid>
            </Grid>
            <div style={{ padding: '0 10px 0 10px' }} >
                <p style={{ width: "100%", backgroundColor: "#e5e5e5", height: '3px', }}></p>
            </div>
            <p><u>Recently viewed</u></p>

            <Grid container spacing={2} style={{ paddingBottom: '25px', padding: '10px' }}>

                {
                    historicalData && (historicalData.slice(-3).reverse()).map((elem, i) => {
                        return (
                            <Grid item xs={12} sm={3}>
                                <Card style={{ height: '250px', border: '1px solid black' }}>
                                    <Img alt="complex" key={i} src={elem.message} />
                                </Card>
                            </Grid>
                        )
                    })
                }

                <Grid item xs={12} sm={3}>
                    <Card style={{ height: '250px', cursor: 'pointer', border: '1px solid black' }} onClick={navigatePage}>
                        <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Tooltip title="View More">
                                <IconButton >
                                    <ControlPointOutlinedIcon style={{ fontSize: '100px' }} />
                                </IconButton>
                            </Tooltip>

                        </div>

                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
export default Home