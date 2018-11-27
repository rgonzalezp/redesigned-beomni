import React, { Component } from 'react';
import classNames from 'classnames';
import PrimarySearchBar from './PrimarySearchBar.js';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';


const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#4851A9',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#F6F2E3',
      main: '#FFFEFA',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
});

const footers = [
  {
    title: 'Company',
    description: ['Team', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];



const styles = thistheme => ({
  appBar: {
    position: 'relative',
  },
  paper: {
  	display:'none',
    [theme.breakpoints.down('sm')]: {
      display:'block',
      padding: theme.spacing.unit * 3,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.secondary.light,
      marginTop: 50,
      marginBottom: 100,
    }
  },
  avatar: {
    height:150,
    width:150,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom:20
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  icon: {
    marginRight: thistheme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundImage: `url(${'/img/hiking.jpg'})`,
    backgroundSize:'100% 100%',
    [theme.breakpoints.down('sm')]: {
      backgroundImage: `url(${'/img/hikingmobile.jpg'})`,
      backgroundSize:'100% 100%',
    },
  },
  heroContent: {
    maxWidth: 580,
    [theme.breakpoints.down('sm')]: {
      margin:'0 auto',
    },
    marginTop: '0',
    marginBottom: '0',
    marginLeft: 200,
    marginRight: 'auto',
    padding: `${thistheme.spacing.unit * 8}px 0 ${thistheme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: thistheme.spacing.unit * 4,
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
    backgroundColor: theme.palette.secondary.light,
  },
  colorHelper: {
    backgroundColor: theme.palette.secondary.light,
  },
  desktopContent: {
    [theme.breakpoints.down('sm')]: {
      display:'none',
    }
  },
});

class HomePage extends Component {

  constructor(props) {
    super(props);
      this.state = {
        sessionToken: localStorage.getItem('sessionToken')
      };

         if (this.state.sessionToken) {
      this.props.history.push('/results');
    }
}

  render() {
    const { classes } = this.props;
    const renderHero = (
      <MuiThemeProvider theme={theme}>
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
             
            <div className ={classes.desktopContent}>
              <Avatar alt="Rental Storage Lgoo" src="/img/biglogo.png" className={classes.avatar} />
              <Typography variant="title" align="center" style={{color:"#fff"}} paragraph>
                  Having trouble finding that hiking set to go on adventures? 
                  Maybe you want to play Monopoly for a night with some friends without buying the whole game?
                  Do you want to make some extra cash with your unused cool items?
                  <br/>
                  <br/>
                  Look no further, RS connects people with rental needs
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <Typography variant="title" align="center" style={{color:"#fff"}} paragraph>
                  First time around?
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button name="register button" variant="contained" color="primary" href="/register">
                        Register now!
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>

            <Paper className={classes.paper}>
              <Avatar alt="Rental Storage Lgoo" src="/img/biglogo.png" className={classes.avatar} />
              <Typography variant="title" align="center" color="textPrimary" paragraph>
                  Having trouble finding that hiking set to go on adventures? 
                  Maybe you want to play Monopoly for a night with some friends without buying the whole game?
                  Do you want to make some extra cash with your unused cool items?
                  Look no further, Omni-be connects people with rental needs
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <Typography variant="title" align="center" color="textPrimary" paragraph>
                  First time around?
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button name="register button" variant="contained" color="primary">
                        Register now!
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Paper>
            
          </div>
        </div>
      </MuiThemeProvider>
    );

    const renderFooter = (
      <footer className={classNames(classes.footer, classes.layout)}>
        <Grid container spacing={32} justify="space-evenly">
          {footers.map(footer => (
            <Grid item xs key={footer.title}>
              <Typography variant="title" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              {footer.description.map(item => (
                <Typography key={item} variant="subtitle" color="textPrimary">
                  {item}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
      </footer>
    );

    return (
      <div className={classes.colorHelper}>
        <PrimarySearchBar/>
        {renderHero}
        {renderFooter}
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
