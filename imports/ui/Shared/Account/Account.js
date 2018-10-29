import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withTracker } from 'meteor/react-meteor-data';
import  { Meteor }  from 'meteor/meteor';
import PrimarySearchBar from '../Home/PrimarySearchBar.js';
import './Account.css'; 
import {Container, 
    Col, 
    Row,
    Label, 
    InputGroup,
    InputGroupAddon,
    Input,
    InputGroupText,
    FormText
  } from 'reactstrap';
import {Users} from '../../../api/users.js'
//Get user information from some method or something
//Show name
//Show last name
//Change Avatar
//Change status



class Profile extends Component {
    constructor(props) {

        super(props);
        this.state = {
            edit: false
            };
        this.renderProfile = this.renderProfile.bind(this);
        this.renderAvatar = this.renderAvatar.bind(this);
        this.renderInfo = this.renderInfo.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderNoEdit =this.renderNoEdit.bind(this);


      }

    renderEdit(){
        return ( <InputGroup>
            <Row>
              <InputGroupAddon addonType="prepend">Username --    e-mail</InputGroupAddon>
              <Input placeholder="username" />
            </Row>
            <Row>
              <InputGroupAddon addonType="prepend"> First Name
              </InputGroupAddon>
              <Input placeholder="First Name!" />
              </Row>
              <Row>
              <InputGroupAddon addonType="prepend"> Last Name
              </InputGroupAddon>
              <Input placeholder="Last Name!" />
              </Row>
            </InputGroup>)
    }
    renderNoEdit(){
        return ( <InputGroup>
            <Row>
              <InputGroupAddon addonType="prepend">Username --    e-mail: </InputGroupAddon>
              <Input placeholder="username" readOnly />
            </Row>
            <Row>
              <InputGroupAddon addonType="prepend"> First Name: 
              </InputGroupAddon>
              <Input placeholder="First Name" readOnly />
              </Row>
              <Row>
              <InputGroupAddon addonType="prepend"> Last Name: 
              </InputGroupAddon>
              <Input placeholder="Last Name" readOnly />
              </Row>
            </InputGroup>)
    }
    renderInfo(){
        return (
            this.state.edit? this.renderEdit(): this.renderNoEdit()
         )
        
    }
    renderAvatarImage(){
        return (
            <Avatar
              alt="Try again"
              src="/img/hiking.jpg"
              class='avatar'
            />)
        
    }
    uploadAvatarImage(){
        const nombre = localStorage.getItem('correo')
        try{
            return ( 
            <Avatar
              alt="Adelle Charles"
              src="/img/hiking.jpg"
              className='avatar'
            />)
        }
        catch(e){

        }
    }
    renderAvatar(){
        return(    this.renderAvatarImage()
    )
    }
    renderProfile(){
        return(<Container>
        <Row>
        <Col lg="6">
        <h3>Avatar</h3>
        {this.renderAvatar()}
        </Col>
        <Col lg="6">
        <h3>Account Information</h3>
        {this.renderInfo()}
        </Col>
        </Row></Container>)
    }
    
    render() {
        return (
            <div>
                <PrimarySearchBar/>
                {console.log(localStorage.getItem('correo'))}
                {this.renderProfile()}
                <h3>Hello</h3>
            </div>
        );
    }
    

    
}

export default withTracker((props) => {
    Meteor.call('users.find')
    return {
      task:'ola'
    };
  })(Profile);

