import React, { Component } from 'react';
import ServiceMap from './ServiceMap.js';
import RentalObject from './RentalObject.js';
import { withRouter } from 'react-router-dom';
import PrimarySearchBar from '../Shared/Home/PrimarySearchBar.js';

class MyAccountPage extends Component {
  constructor(props){
    super(props);
    if (!localStorage.getItem('sessionToken')) {
      this.props.history.push('/');
    }
    this.state = {
      title: '',
      email: localStorage.getItem('correo'),
      description: '',
      imageurl: '',
      alttext: ''
    };


  }


  handleChangeTitle(e){
    var title = this.refs.inputa.value;
    this.setState({title: title});
  }
  handleChangePrice(e){
    var price = this.refs.inputb.value;
    this.setState({price: price});
  }

  handleChangeDescription(e){
    var description = this.refs.inputc.value;
    this.setState({description: description});
  }
  handleChangeImageurl(e){
    var imageurl = this.refs.inputd.value;
    this.setState({imageurl: imageurl});
  }
  handleChangeAlttext(e){
    var alttext = this.refs.inpute.value;
    this.setState({alttext: alttext});
  }


  render() {
    return (
      <div>
        <PrimarySearchBar/>
        

        <div>
          <input onChange={this.handleChangeTitle.bind(this)} ref='inputa'/>
          <input onChange={this.handleChangePrice.bind(this)} ref='inputb'/>
          <input onChange={this.handleChangeDescription.bind(this)} ref='inputc'/>
          <input onChange={this.handleChangeImageurl.bind(this)} ref='inputd'/>
          <input onChange={this.handleChangeAlttext.bind(this)} ref='inpute'/>
          <RentalObject 
            price={this.state.price} 
            title={this.state.title} 
            email={this.state.email} 
            description={this.state.description} 
            imageurl={this.state.imageurl}/>
        </div>
      </div>
    );
  }
}

export default withRouter(MyAccountPage);
