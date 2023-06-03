import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Cart from './Cart';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Alert, Avatar, Snackbar, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
}));

const Sidebar = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [count, setCount] = useState();
    const [dataToCart, setDataToCart] = useState(() => {
        const existingDataToCart = localStorage.getItem('myArrayToCart');
        return existingDataToCart ? JSON.parse(existingDataToCart) : [];
    });
    const [openSnackbar ,setOpenSnackbar] = useState(false);

    const handleOpenSnackbar = () => {
        setOpenSnackbar(true)
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleOpenCart = (e) => {
        setOpenCart(true);
    };

    const menuItems = [
        { text: 'Home', route: '/', icon: <HomeIcon /> },
        { text: 'History', route: '/history', icon: <HistoryIcon /> },
        { text: 'Your Cart', route: '/cart', icon: <ShoppingCartIcon /> },
    ];

    useEffect(() => {
        setCount(localStorage.getItem('itemsInCart'))
    }, [localStorage.getItem('itemsInCart')])

    return (
        <>
            {
                openCart ? <>
                    <Cart
                        iSopen={openCart}
                        isClose={() => setOpenCart(false)}
                    />
                </> : null
            }

            <div>
                <Snackbar
                    className="pt-[5%]"
                    open={openSnackbar}
                    autoHideDuration={2000}
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert onClose={() => setOpenSnackbar(false)} severity="warning" sx={{ width: "100%" }}>
                        Add something to cart!
                    </Alert>
                </Snackbar>
            </div>

            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar style={{ justifyContent: 'space-between' }}>
                        <Tooltip title="Menu">
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{ mr: 2, ...(open && { display: 'none' }) }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Tooltip>
                        <div style={{ display: 'flex' }}>
                            <div style={{ paddingRight: '5px' }}>
                                <PetsOutlinedIcon />
                            </div>
                            <Typography variant="h6" noWrap component="div">
                                Find Your Friend!!
                            </Typography>
                        </div>

                        <Tooltip title="View Cart">
                            {
                                dataToCart.length > 0 ? <>
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="menu"
                                        sx={{ mr: 2 }}
                                        onClick={handleOpenCart}
                                    >
                                        <ShoppingCartIcon /> <div style={{ fontSize: '15px' }}><sup>{count}</sup></div>
                                    </IconButton>
                                </> : <>
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="menu"
                                        sx={{ mr: 2 }}
                                    onClick={handleOpenSnackbar}
                                    >
                                        <ShoppingCartIcon /> <div style={{ fontSize: '15px' }}><sup>{count}</sup></div>
                                    </IconButton>
                                </>
                            }

                        </Tooltip>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <div style={{ display: 'flex' }}>
                            <div style={{ paddingTop: '8px', paddingRight: '10px' }}>
                                <Avatar sx={{ bgcolor: 'deepOrange[500]' }}>N</Avatar>
                            </div>
                            <p>Your Profile</p>
                        </div>

                        <div>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                        </div>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem
                                button
                                key={index}
                                component={Link}
                                to={item.route}
                                onClick={handleDrawerClose}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>

                </Drawer>
                <Main open={open} style={{ paddingTop: '50px' }}>
                </Main>
            </Box>
        </>
    )
}

export default Sidebar