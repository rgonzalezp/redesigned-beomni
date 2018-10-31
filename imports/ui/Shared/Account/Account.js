import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PrimarySearchBar from '../Home/PrimarySearchBar.js';
import './Account.css';
import {
  Container,
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
import { Users } from '../../../api/users.js'


class Account extends Component {
  constructor(props) {

    super(props);
    this.state = {
      edit: false,
      name: '',
      last: '',
      username: localStorage.getItem('correo'),
      avatar_url: ''
    };
    this.renderProfile = this.renderProfile.bind(this);
    this.renderAvatar = this.renderAvatar.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderNoEdit = this.renderNoEdit.bind(this);
    this.handleTriggerEdit = this.handleTriggerEdit.bind(this);
    this.renderEditButton_4real = this.renderEditButton_4real.bind(this);
    this.renderUpdateProfileBtn = this.renderUpdateProfileBtn.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateLastName = this.updateLastName.bind(this);
    this.handleInputUrl = this.handleInputUrl.bind(this);
    this.updateAvatar = this.updateAvatar.bind(this);
    this.handleInputName = this.handleInputName.bind(this);
    this.handleInputLast = this.handleInputLast.bind(this);

  }


  handleTriggerEdit = () => {

    console.log('typeofurl: ', this.state.avatar_url)
    console.log('nombre:', this.state)
    Meteor.call('users.updateUser', { firstName: this.state.name, lastName: this.state.last, email: this.state.username, url: this.state.avatar_url }, function (err, res) {
      if (err) {
        console.log(error.reason);
        return;
      }
      return true
    })

    this.setState({ edit: !this.state.edit });






  };

  updateName(nom) {
    this.setState({ name: nom })
  }
  updateLastName(nom) {
    this.setState({ last: nom })
  }

  updateUsername(nom) {
    this.setState({ username: nom })
  }

  updateAvatar(nom) {
    this.setState({ avatar_url: nom })
  }



  renderEdit() {
    return (<InputGroup>
      <Row>
        <InputGroupAddon addonType="prepend"><Button color="info" >Username:</Button></InputGroupAddon>
        <Input value={this.state.username ? this.state.username : 'username'} readOnly />
      </Row>
      <Row>
        <InputGroupAddon addonType="prepend">  <Button color="info" > First Name:</Button>
        </InputGroupAddon>
        <Input onChange={this.handleInputName} placeholder="First Name!" valid />
      </Row>
      <Row>
        <InputGroupAddon addonType="prepend"> <Button color="info" > Last Name:</Button>
        </InputGroupAddon>
        <Input onChange={this.handleInputLast} placeholder="Last Name!" valid />
      </Row>
    </InputGroup>)
  }
  renderNoEdit() {
    console.log('NOEDIT: ', this)
    return (<InputGroup>
      <Row>
        <InputGroupAddon addonType="prepend" block> <Button color="info" > Username:</Button> </InputGroupAddon>
        <Input value={this.state.username ? this.state.username : 'username'} readOnly />
      </Row>
      <Row>
        <InputGroupAddon addonType="prepend"> <Button color="info" >  First Name :</Button>
        </InputGroupAddon>
        <Input value={this.state.name ? this.state.name : 'First Name'} readOnly />
      </Row>
      <Row>
        <InputGroupAddon addonType="prepend"> <Button color="info" >  Last Name: :</Button>
        </InputGroupAddon>
        <Input value={this.state.last ? this.state.last : 'Last Name'} readOnly />
      </Row>
    </InputGroup>)
  }
  renderInfo() {
    return (
      this.state.edit ? this.renderEdit() : this.renderNoEdit()
    )

  }
  renderAvatarImage() {
    console.log('renderAvatarImage')
    console.log(this.state.avatar_url)
    let url_avatar = this.state.avatar_url
    console.log(url_avatar)
    if (url_avatar === '') {
      console.log('url_avatar: ', url_avatar)
      url_avatar = '/clear/fd.jpg'
    }
    return (
      <Avatar
        alt="Looks like you don't have an avatar, please upload!"
        src={url_avatar}
        class='avatar'
      />)

  }
  handleInputUrl(ev) {
    console.log('handleinputURL: ', ev.target.value)
    this.updateAvatar(ev.target.value)
  }
  handleInputName(ev) {
    console.log('handleinputName: ', ev.target.value)
    this.updateName(ev.target.value)
  }
  handleInputLast(ev) {
    console.log('handleinputLast: ', ev.target.value)
    this.updateLastName(ev.target.value)
  }
  uploadAvatarImage() {
    return (
      <Row>
        <Form>
          <FormGroup row>
            <Label className="text-primary" for="exampleText" sm={2}>IMG URL:</Label>
            <Col sm={10}>
              <Input type="textarea" name="text" id="exampleText" onChange={this.handleInputUrl} />
            </Col>
          </FormGroup>
        </Form>
      </Row>
    )

  }
  renderAvatar() {
    return (<Container>{this.renderAvatarImage()}{this.state.edit ? this.uploadAvatarImage() : ''} </Container>)
  }
  renderProfile() {
    return (<Container>
      <Row>
        <Col lg="6">
          <h3>Avatar</h3>
          {this.renderAvatar()}
        </Col>
        <Col lg="6">
          <h3>Account Information</h3>
          {console.log('accountinfo: ', this)}
          {this.renderInfo()}
        </Col>
      </Row></Container>)
  }
  renderEditButton_4real() {
    return (<Row>
      <Col lg='12'>
        <Button color="primary" size="lg" onClick={this.handleTriggerEdit} block>Edit Profile</Button>
      </Col>
    </Row>)
  }
  renderUpdateProfileBtn() {
    return (<Row>
      <Col lg='12'>
        <Button color="success" size="lg" onClick={this.handleTriggerEdit} block>Accept Changes! :D </Button>
      </Col>
    </Row>)
  }
  renderEditButton() {
    return (<Container>{this.state.edit ? this.renderUpdateProfileBtn() : this.renderEditButton_4real()}
    </Container>)
  }



  render() {
    return (
      <div>
        <PrimarySearchBar />
        {console.log(localStorage.getItem('correo'))}
        {this.renderProfile()}
        {this.renderEditButton()}
      </div>
    );
  }


  componentDidMount() {
    const este = this
    console.log('compoenntDidmount')
    if (this.state.name === '') {
      this.props.user.then(function (result) {
        console.log('componendidmoiunt: ', this)
        console.log(result)
        este.updateName(result.firstName)
        este.updateLastName(result.lastName)
        este.updateUsername(result.email)
        if (typeof (result.avatar_url) !== 'undefined') {
          console.log('Try: ', result.avatar_url)
          este.updateAvatar(result.avatar_url)
        }
        else {
          console.log('Catch: ', result)
        }
      })
    }

  }



}

async function getUser(correo) {
  return new Promise(function (resolve) {
    console.log('dentro de la promesa)')
    console.log(correo)
    Meteor.call('users.findUser', { 'email': correo }, (err, res) => {
      if (err) {
        alert(err.error);
      } else {
        console.log('primero : ', res)
        return resolve(res)
      }
    }
    )
  });
}

export default withTracker((props) => {

  let user = getUser(localStorage.getItem('correo'))

  console.log('user_2: ', user)
  return { user }
})(Account);

