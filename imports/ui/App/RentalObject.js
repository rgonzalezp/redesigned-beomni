  import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './RentalObject.css';
import { Col, } from 'reactstrap';
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

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};


function renderAvailability(flag,props){
  console.log('available: ',props)
if(flag===true){
return (<Col sm='12'><h5 class='btnAvai'>Available</h5></Col>)
}else{
return (<Col sm='12'><h5 class='btnNoAvai'>Available until: {props.to}</h5></Col>)
}
}
function RentalObject(props) {
  const { classes } = props;

  console.log('rentalobjec props: ', props)

  rentBtn = (productoprops) => {
    console.log(productoprops)
    props.rentFunction(productoprops)
   }


  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.alttext}
          className={classes.media}
          height="140"
          image={props.imageurl}
          title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography component="p">
            {props.description}
          </Typography>
        </CardContent>
        <CardContent>
          {props.rented? renderAvailability(false,props):renderAvailability(true,props)}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Check out
        </Button>
        <Button onClick={()=>this.rentBtn(props)}size="small" color="primary">
          Rent for {props.price}$ a day
        </Button>
      </CardActions>
    </Card>
  );
}

RentalObject.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RentalObject);
