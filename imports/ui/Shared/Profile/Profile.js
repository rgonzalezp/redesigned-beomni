import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withTracker } from 'meteor/react-meteor-data';
import  { Meteor }  from 'meteor/meteor';
import PrimarySearchBar from '../Home/PrimarySearchBar.js';
import {Container, 
    Col, 
    Row,
    Label, 
    Input,
    FormText
  } from 'reactstrap';
import Users from '../../../api/users.js'
//Get user information from some method or something
//Show name
//Show last name
//Change Avatar
//Change status



class Profile extends Component {
    constructor(props) {

        super(props);

        this.renderProfile = this.renderProfile.bind(this);
        this.renderAvatar = this.renderAvatar.bind(this);
        this.renderInfo = this.renderInfo.bind(this);


      }

  
    renderInfo(){
        return (<h3>Info!</h3>)
    }
    renderAvatar(){
        return(<h3>Avatar</h3>)
    }
    renderProfile(){
        return(<Container>
        <Row>
        <Col lg="6">
        {this.renderAvatar()}
        </Col>
        <Col lg="6">
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
