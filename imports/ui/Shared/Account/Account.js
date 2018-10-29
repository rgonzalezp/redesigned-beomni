import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withTracker } from 'meteor/react-meteor-data';
import  { Meteor }  from 'meteor/meteor';
import PrimarySearchBar from '../Home/PrimarySearchBar.js';
import './Account.css'; 
import {Container, 
    Form,
    Col, 
    Row,
    Label, 
    InputGroup,
    InputGroupAddon,
    Input,
    FormGroup,
    Button
  } from 'reactstrap';
import {Users} from '../../../api/users.js'
//Get user information from some method or something
//Show name
//Show last name
//Change Avatar
//Change status



class Account extends Component {
    constructor(props) {

        super(props);
        this.state = {
            edit: false,
            name:'',
            last: '',
            username:'',
            avatar_url:''
            };
        this.renderProfile = this.renderProfile.bind(this);
        this.renderAvatar = this.renderAvatar.bind(this);
        this.renderInfo = this.renderInfo.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderNoEdit =this.renderNoEdit.bind(this);
        this.handleTriggerEdit = this.handleTriggerEdit.bind(this);
        this.renderEditButton_4real = this.renderEditButton_4real.bind(this)
        this.renderUpdateProfileBtn = this.renderUpdateProfileBtn.bind(this)
        this.updateName = this.updateName.bind(this)
        this.updateLastName = this.updateLastName.bind(this)

      }
    

      handleTriggerEdit = () => {
        this.setState({ edit: !this.state.edit });
      };

      updateName(nom){
        this.setState({name:nom})
      }
      updateLastName(nom){
        this.setState({last:nom})
      }

      updateUsername(nom){
        this.setState({username:nom})
      }

      updateAvatar(nom){
        this.setState({avatar_url:nom})
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
        console.log('NOEDIT: ', this)
        return ( <InputGroup>
            <Row>
              <InputGroupAddon addonType="prepend">Username --    e-mail: </InputGroupAddon>
              <Input value={this.state.username?this.state.username:'username'} readOnly />
            </Row>
            <Row>
              <InputGroupAddon addonType="prepend"> First Name: 
              </InputGroupAddon>
              <Input value={this.state.name?this.state.name:'First Name'} readOnly />
              </Row>
              <Row>
              <InputGroupAddon addonType="prepend"> Last Name: 
              </InputGroupAddon>
              <Input value={this.state.last?this.state.last:'Last Name'}readOnly />
              </Row>
            </InputGroup>)
    }
    renderInfo(){
        return (
            this.state.edit? this.renderEdit(): this.renderNoEdit()
         )
        
    }
    renderAvatarImage(){
        console.log('renderAvatarImage')
        console.log(this.state.avatar_url)
        let url_avatar = this.state.avatar_url
        if(typeof(url_avatar)==='undefined'){
            url_avatar = '/clear/fd.jpg'
        }
        return (
            <Avatar
              alt="Try again"
              src={url_avatar}
              class='avatar'
            />)
        
    }
    uploadAvatarImage(){
            return ( 
            <Form>
            <FormGroup row>
            <Label className="text-primary" for="exampleText" sm={2}></Label>
            <Col sm={10}>
            <Input type="textarea" name="text" id="exampleText" />
            </Col>
            </FormGroup>
            </Form>
            )
        
    }
    renderAvatar(){
        return  ( <Container>{this.renderAvatarImage()}{ this.state.edit? this.uploadAvatarImage():''} </Container>)
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
        {console.log('accountinfo: ',this)}
        {this.renderInfo()}
        </Col>
        </Row></Container>)
    }
    renderEditButton_4real(){
        return (            <Row>
            <Col lg='12'>
        <Button color="primary" size="lg" block>Edit Profile</Button>
        </Col>
        </Row>)
    }
    renderUpdateProfileBtn(){
        return (            <Row>
            <Col lg='12'>
        <Button color="success" size="lg" block>Accept Changes! :D </Button>
        </Col>
        </Row>)    
    }
    renderEditButton(){
        return (<Container>{this.state.edit?this.renderUpdateProfileBtn():this.renderEditButton_4real()}
        </Container>)
    }


    
    render() {
        return (
            <div>
                <PrimarySearchBar/>
                {console.log(localStorage.getItem('correo'))}
                {this.renderProfile()}
                {this.renderEditButton()}
                <h3>Hello</h3>
                {console.log('lassss: ', this)}
            </div>
        );
    }

    componentDidMount(){
        const este = this
        if(this.state.username===''){
            this.props.user.then(function(result){
                console.log('componendidmoiunt: ', this)
                console.log(result)
                este.updateName(result.firstName)
                este.updateLastName(result.lastName)
                este.updateUsername(result.email)
                try{
                    este.updateAvatar(result.avatar_url)
                }
                catch(e){
                    este.updateAvatar('null')
                }
            })
        }

    }
    

    
}

async function getUser(correo){
     return new Promise(function(resolve){ Meteor.call('users.find',correo,   (err, res) => {
        if (err) {
          alert(err.error);
        } else {
            console.log('primero : ', res)
        return resolve(res)
        }
      }
    )});
}

export default withTracker((props) => {
    
        const correo = localStorage.getItem('correo')
     let user =   getUser(correo)

     console.log('user_2: ', user)
             return {user:user}
  })(Account);

