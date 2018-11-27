import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import AccountsUIWrapper from '../../AccountsUIWrapper.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import './PrimarySearchBar.css';
import { withRouter } from 'react-router-dom';

import  { Meteor }  from 'meteor/meteor';


const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#4851A9",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#F6F2E3',
      main: "#FFFEFA",
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
});


const styles = thistheme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [thistheme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: thistheme.shape.borderRadius,
    backgroundColor: fade(thistheme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(thistheme.palette.common.white, 0.25),
    },
    marginRight: thistheme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [thistheme.breakpoints.up('sm')]: {
      marginLeft: 10,
      width: '30%',
      padding: 2,
    },
  },
  avatar: {
    marginRight:15,
    display:'block',
    [thistheme.breakpoints.down('sm')]: {
      display:'none',
    }
  },
  searchIcon: {
    width: thistheme.spacing.unit * 9,
    height: '100%',
    color: thistheme.palette.common.white,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: thistheme.palette.secondary.contrastText,
    
    width: '100%',
  },
  inputInput: {
    paddingTop: thistheme.spacing.unit,
    paddingRight: thistheme.spacing.unit,
    paddingBottom: thistheme.spacing.unit,
    paddingLeft: thistheme.spacing.unit * 10,
    transition: thistheme.transitions.create('width'),
    color: thistheme.palette.common.white,
    width: 'auto',
    [thistheme.breakpoints.up('md')]: {
      width: 'auto',
    },
  },
  sectionDesktop: {
    display: 'none',
    [thistheme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [thistheme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  
});

class PrimarySearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    token: localStorage.getItem('sessionToken'),
    name: this.props.firstName,
    search:'',
    };
    this.handleThisSearch = this.handleThisSearch.bind(this);
  }
   state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  }

  logOut = () => {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('correo')
    localStorage.removeItem('filter')
    this.setState({
      token: null,
      name: null,
    });
    this.handleMenuClose();
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };


  handleThisSearch(evt){
  this.setState({search: evt.target.value}) 
  };

  handleKeySearch = evt=> {
    if(evt.key === 'Enter'){
      console.log('Keyserch: ', evt)
      try{
        console.log('keytry')
       const prev=  localStorage.getItem('filter')
       console.log(prev)
       if(prev!==this.state.search){
         console.log('hey')
         console.log(prev)
         console.log(this)
         localStorage.setItem('filter', this.state.search);
        this.context.router.history.push('/results');

       }
       else{
         console.log(this)
         this.context.router.history.push('/results');

       }
      }
      catch(e){
        console.log('exceptkeycatch: ',e)
        console.log(this)
        localStorage.setItem('filter', this.state.search);
        this.props.history.push('/results');
      }
   }
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      > 
      {this.state.token?
        <div>
          <Link to="/accountSettings" >
          <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
          </Link>
        </div>:
        <div>
          <Link to="/register" >
          <MenuItem onClick={this.handleMenuClose}>Register</MenuItem>
          </Link>
          <Link to="/login" >
           <MenuItem onClick={this.handleMenuClose}>Log In</MenuItem>
          </Link>
        </div>}
       
      </Menu>
    );


    return (
      <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            
               <Avatar alt="Rental Storage Lgoo" src="/img/minilogo.png" className={classes.avatar} />
            
            <div className={classes.search}>
              
            <FormControl className={classes.inputRoot}>
                <InputLabel id="InputLabel" htmlFor="input-with-icon-adornment"></InputLabel>
                <TextField
                  
                  id="standard-with-placeholder"
                  label="Search for an item to rent!"
                  InputProps={{
                  onChange:this.handleThisSearch,
                  onKeyPress:this.handleKeySearch,
                  startAdornment: (
                <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
          ),
        }}
      />

             
      </FormControl>
              
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
            {this.state.token?<div>
              <Link to="/postitems" >
              <Button name="post an item button" variant="contained" color="primary" href="/">
                        Post an item!
                    </Button>
                    </Link>
              <Button onClick={this.logOut.bind(this)}name="log out button" variant="contained" color="primary" href="/">
                        Logout!
                    </Button></div>:<div><Button name="register button" variant="contained" color="primary" href="/register">
                        Register!
                    </Button>
              <Button name="login button" variant="contained" color="primary" href="/login">
                        Log in!
              </Button></div>}
            
              
              
              <IconButton
                aria-label="profile menu" 
                aria-owns={isMenuOpen ? 'material-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-label="profile menu" aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
        </MuiThemeProvider>
      </div>
    );
  }
}

PrimarySearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PrimarySearchBar));