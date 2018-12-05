import React, { Component } from 'react';
import ServiceMap from './ServiceMap.js';
import RentalObject from './RentalObject.js';
import {Container, 
  Col, 
  Form,
  FormGroup, 
  Label, 
  Input,
  Row
} from 'reactstrap';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import PrimarySearchBar from '../Shared/Home/PrimarySearchBar.js';
import './Postitem.css';
import  { Meteor }  from 'meteor/meteor';

class PostItemsPage extends Component {
  constructor(props){
    super(props);
    if (!localStorage.getItem('sessionToken')) {
      this.props.history.push('/');
    }
    this.state = {
      title: '',
      email: localStorage.getItem('correo'),
      price:0,
      description: '',
      imageurl: '',
      alttext: '',
      address:''
    };


  }


  handleChangeTitle(e){
  
    this.setState({title: e.target.value});
  }
  handleChangePrice(e){

    this.setState({price: e.target.value});
  }

  handleChangeDescription(e){

    this.setState({description: e.target.value});
  }
  handleChangeImageurl(e){

    this.setState({imageurl: e.target.value});
  }
  handleChangeAlttext(e){

    this.setState({alttext: e.target.value});
  }
  handleChangeAddress(e){

    this.setState({address: e.target.value});
  }

  clearInput(){
    this.setState({  title: '',
    price:'',
    description: '',
    imageurl: '',
    alttext: '',
    address:''})
  }
  handleSubmit(){
  	let este = this;
    Meteor.call(
      'objects.insert',
      {
        price: this.state.price,
        email: this.state.email,
        imageurl: this.state.imageurl,
        title: this.state.title,
        description: this.state.description
 
      },
      (err, res) => {
        if (err) 
          alert(err.error);
        this.clearInput();
        este.props.history.push('/results');
        
      }
    );
  }


  render() {
    return (
      <div>
        <PrimarySearchBar/>
        

       
        <Container className="App contained">
          <h1>Add your rental items</h1>
          <Row>
            <Col xs="12" sm="7">
              <FormGroup>
                <Label id="titleLabel" >Product name</Label>
                <Input
                  id="title"
                  aria-label="Input your product name"
                  name="title"
                  type="text"
                  value={this.state.title}
                  onChange={this.handleChangeTitle.bind(this)}
                  ref='inputa'
                />
              </FormGroup>
              <FormGroup>
                <Label id="priceLabel" for="examplePassword">Price</Label>
                <Input
                  id="price"
                  aria-label="Input your product price per day"
                  name="price"
                  type="number"
                  value={this.state.price}
                  onChange={this.handleChangePrice.bind(this)}
                  ref='inputb'
                />
              </FormGroup>
              <FormGroup>
                <Label id="descriptionLabel" for="examplePassword">Description of your product</Label>
                <Input
                  id="description"
                  aria-label="Input your product description"
                  name="description"
                  type="text"
                  value={this.state.description }
                  onChange={this.handleChangeDescription.bind(this)}
                  ref='inputc'
                />
              </FormGroup>
              <FormGroup>
                <Label id="imageurlLabel" for="examplePassword">Image url</Label>
                <Input
                  id="imageurl"
                  aria-label="Input your imageurl please"
                  name="imageurl"
                  type="text"
                  value={this.state.imageurl}
                  onChange={this.handleChangeImageurl.bind(this)}
                  ref='inputd'
                />
              </FormGroup>
              
              <FormGroup>
                <Label id="addressLabel" for="examplePassword">Address to make the pick up</Label>
                <Input
                  id="address"
                  aria-label="Input your address to pick up"
                  name="address"
                  type="text"
                  value={this.state.address}
                  onChange={this.handleChangeAddress.bind(this)}
                  ref='inputf'
                />
              </FormGroup>
              <Button onClick={this.handleSubmit.bind(this)} className="login-buttons"  variant="contained" color="primary" size="large">Let's go</Button>
            </Col>
            <Col xs="12" sm="5" style={{'justify-content': 'center'}} >
              <Container className="App contained" style={{'justify-content': 'center'}}>
              <Container className='conteRent' style={{'justify-content': 'center'}}>

                <RentalObject 
                  price={this.state.price} 
                  title={this.state.title} 
                  email={this.state.email} 
                  description={this.state.description} 
                  imageurl={this.state.imageurl}/>

                </Container>

               
              </Container>
            </Col>
          </Row>
			<Container>
          <Label id="serviceMap" for="examplePassword">Map of available service:</Label>
                <ServiceMap/>
         </Container>

         
        </Container>
         
       
      </div>
    );
  }
}

export default withRouter(PostItemsPage);
