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
import moment from 'moment'

class Results extends Component {
  
    constructor(props){
        super(props);
        this.state = {
            rent :[],
            filter:'',
            open: false,
            product_4_rent: null,
            dateFrom: moment().format("YYYY-MM-DDTHH:mm"),
            dateTo: moment().format("YYYY-MM-DDTHH:mm") 

        };
        this.renderRentProducts = this.renderRentProducts.bind(this);
        this.rentObject = this.rentObject.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.renderCalendarPickerDialog = this.renderCalendarPickerDialog.bind(this);
        this.renderCalendarPickerTo = this.renderCalendarPickerTo.bind(this);
        this.renderCalendarPickerFrom = this.renderCalendarPickerFrom.bind(this);
        this.triggerChangeTo = this.triggerChangeTo.bind(this);
        this.triggerChangeFrom = this.triggerChangeFrom.bind(this);
        this.handleRent = this.handleRent.bind(this);
        this.changeProductoRent = this.changeProductoRent.bind(this);
        this.calculateDeltaDays = this.calculateDeltaDays.bind(this);
        this.calculateRentPrice = this.calculateRentPrice.bind(this);
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
    console.log('productis : ',product)
    if(product!==null){
        let diff = this.calculateDeltaDays()
        let price      = diff * product.price
        return price
    }
    else{
        return 0
    }
  }

  handleRent = () => {
    const user = this.props.user[0]
    let price      = this.calculateRentPrice()
    if (user.balance>=price){

        console.log('hellos')
       // this.setState({ open: false });
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
      >
      </RentalObject>
            </Col>)
        }))
    }
        triggerChangeFrom(e) {
            console.log('from: ',e.target.value)
        this.setState({dateFrom:e.target.value});
      }
      triggerChangeTo(e) {
          console.log('to: ',e.target.value)
          this.setState({dateTo:e.target.value})
      }
    renderCalendarPickerFrom(){
        console.log('entra a from picker')
        const date = moment().format("YYYY-MM-DDTHH:mm")

        return (    <form noValidate>
            <TextField
              id="datetime-local"
              label="Next appointment"
              type="datetime-local"
              defaultValue={date}
              InputLabelProps={{
                shrink: true
              }}
              onChange={this.triggerChangeFrom}
            />
          </form>)
    }
    renderCalendarPickerTo(){
        const date = moment().format("YYYY-MM-DDTHH:mm")

        console.log('entra a to picker ', date)
        return (    <form noValidate>
            <TextField
              id="datetime-local"
              label="Next appointment"
              type="datetime-local"
              defaultValue={date}
              InputLabelProps={{
                shrink: true
              }}
              onChange={this.triggerChangeTo}
            />
          </form>)
    }
    renderCalendarPickerDialog(){
        return (    <div>    
            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle class='headerRent' id="form-dialog-title">Calendar</DialogTitle>
            <DialogContent>
              <DialogContentText>
              What dates do you want to rent the item?
              </DialogContentText>
              <Row>
                  <Col sm='6'>
                  <Row>
                      <Col sm='12'>

                      <h5 class='lblDate'>
                        From:
                      </h5>
                      </Col>
                  </Row>
                  <Row>
                  {this.renderCalendarPickerFrom()}
                  </Row>
                  </Col>
                  <Col sm='6'>
                  <Row>
                      <Col sm='12'>
                  <h5 class='lblDate'>
                        To:
                      </h5>
                      </Col>
                  </Row>
                  <Row>
                  {this.renderCalendarPickerTo()}
                  </Row>
                  </Col>
              </Row>
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
                        {this.calculateRentPrice()}
                      </h5>
                      </Col>
                        </Row>
                </DialogContentText>

            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleRent} color="primary">
                Rent!
              </Button>
            </DialogActions>
          </Dialog>
        </div>)
    }
    renderRentDummy(){
        console.log('funcion: ',this)
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
            <Container>
                 <PrimarySearchBar/>
                 {this.renderBody()}
                 
            </Container>
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
    console.log('filter: ',filter)
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