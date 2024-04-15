import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { MenuIcon } from 'lucide-react';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

const navItems = ['Destacados', 'Hombre', 'Mujer', 'Accesorios', 'Oportunidades', 'Jordan']

export default function DrawerNavb() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: "100vw", position:"relative" }} role="presentation" onClick={toggleDrawer(false)}>
        <div className='flex relative w-full justify-center p-6'>
            <img className='w-[70px] ' src="https://nikearprod.vtexassets.com/assets/vtex/assets-builder/nikearprod.store/2.0.63/icons/Assets_for_off%20platform/swoosh___33f7ffaf2fc124733c2c4a60a12a1160.svg"/>
        </div>
            <Button size='large' sx={{color:"black"}} className='absolute top-[-60px] right-[-310px]'>
                <CloseIcon fontSize='large'/>
            </Button>
            <List>
                {navItems.map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text} />
                          
                               <ArrowForwardIosIcon/>
                            
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Ayuda', 'Buscar tiendas'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <HelpOutlineIcon /> : <AddBusinessIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Button sx={{color:"black"}} onClick={toggleDrawer(true)}>
                <MenuIcon  />
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
