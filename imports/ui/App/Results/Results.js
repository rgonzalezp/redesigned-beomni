import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import  { Meteor }  from 'meteor/meteor';
import  PrimarySearchBar from '../../Shared/Home/PrimarySearchBar.js';
import RentalObject from '../RentalObject.js';
import {Objects} from '../../../api/objects.js'
import {Users} from '../../../api/users.js'
import {Container,  Col, Row } from 'reactstrap';
import './Results.css'; 
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CalendarBeomni from './CalendarBeomni.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import moment from 'moment';


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


class Results extends Component {
  
    constructor(props){
        super(props);
        this.state = {
            rent :[],
            filter:'',
            open: false,
            product_4_rent: null,
            dateFrom: null ,
            dateTo:null,

        };
        this.renderRentProducts = this.renderRentProducts.bind(this);
        this.rentObject = this.rentObject.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.renderCalendarPickerDialog = this.renderCalendarPickerDialog.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);

        this.handleRent = this.handleRent.bind(this);
        this.changeProductoRent = this.changeProductoRent.bind(this);
        this.calculateDeltaDays = this.calculateDeltaDays.bind(this);
        this.calculateRentPrice = this.calculateRentPrice.bind(this);
        this.rentItem = this.rentItem.bind(this);
    }

    rentObject = (product) =>  {
        this.changeProductoRent(product)
        this.handleClickOpen()

    }

  changeProductoRent = (prd) => {
    this.setState({ product_4_rent: prd });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  calculateEmpty(num){
      if (num===0){
          return 1 
      }
      else{
          return num
      }
  }
  calculateDeltaDays(){
    const dateFrom = moment(this.state.dateFrom)
    const dateTo   = moment(this.state.dateTo)
    let diff_days     =  moment.duration(dateTo.diff(dateFrom))._data.days
    let diff_months    =  moment.duration(dateTo.diff(dateFrom))._data.months
    diff_days = this.calculateEmpty(diff_days)
    let total_dif = diff_months *30 + diff_days
    return total_dif
  }
  
  calculateRentPrice(){
    const product = this.state.product_4_rent
    if(product!==null){
        let diff = this.calculateDeltaDays()
        let price      = diff * product.price
        return price
    }
    else{
        return 0
    }
  }

  rentItem(price){
      let product = this.state.product_4_rent
      Meteor.call(
        'objects.updateRent',
        {
          id: product._id,
          from: this.state.dateFrom.toString(),
          to: this.state.dateTo.toString()
        },
        (err, res) => {
          if (err) 
            alert(err.error);
        Meteor.call('users.rentItem',{correo:localStorage.getItem('correo'),price:price})
        }
      );

  }

  handleRent = () => {
    const user = this.props.user[0]
    let price      = this.calculateRentPrice()
    if (user.balance>=price){

        this.rentItem(price)
        this.setState({ open: false });
    }
    else{   
        alert('You do not have enough funds to rent this item!')
    }
  };

    renderRentProducts(){

        const datos = this.props.data
        const este  = this

      return  (datos.map((product)=>{  
            return (<Col lg='4' key={product._id}>
            <RentalObject 
            rentFunction={this.rentObject}
        _id={product._id}   
        title={product.title}
        price={product.price}
        description={product.description}
        imageurl= {product.imageurl}
        alttext= {product.alttext}
        rented = {product.rented}
        from={product.from_date}
        to={product.to_date}
      >
      </RentalObject>
            </Col>)
        }))
    }
     

  handleDateChange(start,end) {
    this.setState({dateFrom:start});
    this.setState({dateTo:end})
  }
    renderCalendarPickerDialog(){
        return (    <div>    
            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle class='headerRent' id="form-dialog-title"></DialogTitle>
            <DialogContent>
              <CalendarBeomni dateChange={this.handleDateChange} class='calendarbeomni' ref={(calendar) => {this.calendar = calendar;}}/>
            </DialogContent>
            <DialogContent>
                <DialogContentText>
                    <Row>
                    <Col sm='6'>
                  <h5 class='headerRent'>
                        Total due:
                      </h5>
                      </Col> 
                      <Col sm='6'>
                  <h5 class='footerDue'>
                        {this.calculateRentPrice()+"$"}
                      </h5>
                      </Col>
                        </Row>
                </DialogContentText>

            </DialogContent>
            <DialogActions>
             <MuiThemeProvider theme={theme}>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleRent} color="primary">
                Rent!
              </Button>
            </MuiThemeProvider>
            </DialogActions>
          </Dialog>
        </div>)
    }
    renderRentDummy(){
        return this.props.data.map((prod)=>{
            return (<div key={prod._id}> hola</div>)
        })
    }

    renderBody(){
      return (<Container>
                <Row>
              <Col md="12">
              <h3 class="headerRent">Rent Pool</h3>

              </Col>  
                      </Row>
          <Row>
              <Col md="12">
              <p class="headerRent">Current elements for rent... while they last</p>

              </Col>  
                      </Row>
                     <Row>
                         {this.renderCalendarPickerDialog()}
                 {this.renderRentProducts()}
                 </Row>
                 </Container>
)
    }
    render() {
        return (
            <div>
                <PrimarySearchBar/>
                {this.renderBody()}
                 
            </div>
        );
    }
}



export default withTracker((props) => {
    const correo  = localStorage.getItem('correo')
    Meteor.subscribe('object')
    Meteor.subscribe('users')
    const finding = Objects.find({}).fetch()  
    const user   =  Users.find({'email':correo}).fetch()
    const filter = localStorage.getItem('filter')
    let new_finding=''
    if(filter===''){
        localStorage.setItem('filter', '');
         new_finding = finding
    }
    else{
         new_finding = finding.filter( obj=>obj.title===filter)
      
    }

    return {data:new_finding,
    user:user}
})(Results);