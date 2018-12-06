import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withTracker } from 'meteor/react-meteor-data';
import  { Meteor }  from 'meteor/meteor';
import PrimarySearchBar from '../Home/PrimarySearchBar.js';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import grey from '@material-ui/core/colors/grey';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
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


const styles = theme => ({
  card: {
    maxWidth: 1000,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: grey[800],
  },
});

class Account extends Component {
    constructor(props) {

        super(props);
        this.state = {
            edit: false,
            name:'',
            last: '',
            username:localStorage.getItem('correo'),
            avatar_url:'',
            balance:0
            };
        this.renderProfile = this.renderProfile.bind(this);
        this.renderAvatar = this.renderAvatar.bind(this);
        this.renderInfo = this.renderInfo.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderNoEdit =this.renderNoEdit.bind(this);
        this.handleTriggerEdit = this.handleTriggerEdit.bind(this);
        this.renderEditButton_4real = this.renderEditButton_4real.bind(this);
        this.renderUpdateProfileBtn = this.renderUpdateProfileBtn.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updateLastName = this.updateLastName.bind(this);
        this.handleInputUrl = this.handleInputUrl.bind(this);
        this.updateAvatar = this.updateAvatar.bind(this);
        this.handleInputName = this.handleInputName.bind(this);
        this.handleInputLast = this.handleInputLast.bind(this);
        this.updateBalance = this.updateBalance.bind(this);
        this.renderAddMoreTokensBtn = this.renderAddMoreTokensBtn.bind(this);
        this.handleAddToken = this.handleAddToken.bind(this);

      }
    

      handleTriggerEdit = () => {
        
   
              Meteor.call('users.updateUser',{firstName:this.state.name,lastName:this.state.last,email:this.state.username,url:this.state.avatar_url},function(err,res){
                        if(err){
                            console.log(error.reason);
                            return;
                          }
                          return true
                    })
           
              this.setState({ edit: !this.state.edit });
              
                
                  
                    
            

      };

      handleAddToken = () => {
        
        const este =this
          Meteor.call('users.updateUserBalance',{email:this.state.username},function(err,res){
                    if(err){
                        console.log(error.reason);
                        return;
                      }
                      console.log(este)
                      este.setState({balance: este.state.balance+100})
                })

  };

      updateName(nom){
        this.setState({name:nom})
      }
      updateBalance(nom){
        this.setState({balance:nom})
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
        return ( <InputGroup style={{'justify-content': 'center'}}>
            <Row>
              <Typography variant="h4">Username</Typography>
              <Input value={this.state.username?this.state.username:'username'}readOnly/>
            </Row>
            <Row>
              <Typography variant="h4">     First Name:</Typography>
              <Input id="newname" onChange={this.handleInputName} placeholder="First Name!" valid />
              </Row>
              <Row>
              <Typography variant="h4"> Last Name:</Typography>
              <Input onChange={this.handleInputLast} placeholder="Last Name!" valid />
              </Row>
              <Row>
              <Typography variant="h4">  Image url:</Typography>
                 { this.state.edit? this.uploadAvatarImage():''}   
              </Row>

              {this.renderEditButton()}
              {this.renderBalance()}
                {this.renderAddMoreTokensBtn()}
            </InputGroup>)
    }
    renderNoEdit(){
        console.log('NOEDIT: ', this)
        return ( <InputGroup style={{'justify-content': 'center'}}>
            
            <Col sm="12">

              <Typography variant="h4"> Username:</Typography>
              
              
              <Typography variant="h6">
                {this.state.username?this.state.username:'username'} 
              </Typography>
            </Col>
            
           
            <Col sm="12">
            <Typography variant="h4"> First Name:</Typography>
              
              
              <Typography id="actualname" variant="h6">
                 {this.state.name?this.state.name:'First Name'}
              </Typography>
            
              </Col>
           
           
              <Col sm="12">
               <Typography variant="h4"> Last Name:</Typography>
              
              
              <Typography variant="h6">
                      {this.state.last?this.state.last:'Last Name'}
              </Typography>
           
         </Col>
             
              {this.renderEditButton()}
              {this.renderBalance()}
                {this.renderAddMoreTokensBtn()}
            </InputGroup>)
    }
    renderInfo(){
        return (
            this.state.edit? this.renderEdit(): this.renderNoEdit()
         )
        
    }
    renderAvatarImage(){
        const { classes } = this.props;
       let currentdate = new Date();
       let stringDate = currentdate.toString();
        const shareUrl = 'https://Fixthis@profilepage.js';
        let url_avatar = this.state.avatar_url
        console.log(url_avatar)
        if(url_avatar===''){
            console.log('url_avatar: ', url_avatar)
            url_avatar = '/clear/fd.jpg'
        }
        return (
            <Card className={classes.card}>
                      <CardHeader
                         avatar={
                           <Avatar aria-label="Recipe" className={classes.avatar}>
                             {this.state.name.charAt(0)}
                           </Avatar>
                         }
                         title={this.state.name}
                         subheader={stringDate}
                       />
                
                       <CardMedia className={classes.media} image={url_avatar} alt="Card image cap" />       
                       <CardContent>
                         <Typography component="p">
                           Welcome to a demo of your profile page, for now the functionalities here are not implemented. Still, you can see how the information will be displayed and make suggestions on what you would like to see....
                         </Typography>
                       </CardContent>
                       </Card>)
        
    }
    handleInputUrl(ev){
        console.log('handleinputURL: ',ev.target.value)
        this.updateAvatar(ev.target.value)
    }
    handleInputName(ev){
        console.log('handleinputName: ',ev.target.value)
        this.updateName(ev.target.value)
    }
    handleInputLast(ev){
        console.log('handleinputLast: ',ev.target.value)
        this.updateLastName(ev.target.value)
    }
    uploadAvatarImage(){
            return ( 
           
    
            
            
         
            <Input onChange={this.handleInputUrl} placeholder="Last Name!" valid />
         
     


  
            )
        
    }
    renderAvatar(){
        return  ( <Container>{this.renderAvatarImage()}</Container>)
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
    renderAddMoreTokensBtn(){
        return (<Container ><Col md='12'><div class='balance'><Button color="success" onClick={this.handleAddToken}>Add More Tokens!</Button></div></Col></Container>)
    }
    renderEditButton_4real(){
        return (            <Row>
            <Col lg='12'>
        <Button id="startchange" color="primary" size="lg" onClick={this.handleTriggerEdit} block>Edit Profile</Button>
        </Col>
        </Row>)
    }
    renderUpdateProfileBtn(){
        return (            <Row>
            <Col lg='12'>
        <Button id="submitchange" color="success" size="lg" onClick={this.handleTriggerEdit} block>Accept Changes! :D </Button>
        </Col>
        </Row>)    
    }
    renderEditButton(){
        return (<Container>{this.state.edit?this.renderUpdateProfileBtn():this.renderEditButton_4real()}
        </Container>)
    }


    renderBalance(){
        return ( <Container>    
            <Row>
            <Col sm="12">
          <h4 class='balancehed'>Balance:</h4>
            </Col>
            </Row>
            <Row>
            <Col sm="12">
          <h4 class='balance'>{this.state.balance} <p class='balancehed'>tokens</p></h4>
            </Col>
            </Row></Container> )
    }
    render() {
      
        return (
            <div>
                <PrimarySearchBar/>
                {this.renderProfile()}   
                
            </div>
        );
    }

 
    componentDidMount(){
        const este = this
        console.log('compoenntDidmount')
        if(this.state.name===''){
            this.props.user.then(function(result){
              
                este.updateName(result.firstName)
                este.updateLastName(result.lastName)
                este.updateUsername(result.email)
                este.updateBalance(result.balance)
                if(typeof(result.avatar_url)!=='undefined'){
                    este.updateAvatar(result.avatar_url)
                }
                else{
                    console.log('Catch: ', result)
                }
            })
        }

    }


    
}

Account.propTypes = {
  classes: PropTypes.object.isRequired,
};

async function getUser(correo){
     return new Promise(function(resolve){ 
     
        console.log(correo)
         Meteor.call('users.findUser',{'email':correo},   (err, res) => {
        if (err) {
          alert(err.error);
        } else {
            console.log('primero : ', res)  
        return resolve(res)
        }
      }
    )});
}

export default withStyles(styles)(withTracker((props) => {
    
     let user =   getUser(localStorage.getItem('correo'))

     console.log('user_2: ', user)
             return {user:user}
  })(Account));

