import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import  { Meteor }  from 'meteor/meteor';
import  PrimarySearchBar from '../../Shared/Home/PrimarySearchBar.js';
import RentalObject from '../RentalObject.js';
import {Objects} from '../../../api/objects.js'
import {Users} from '../../../api/users.js'
import {Container,  Col, Row } from 'reactstrap';
import './Results.css'; 

class Results extends Component {
  
    constructor(props){
        super(props);
        this.state = {
            rent :[],
            filter:'',
        };
        this.renderRentProducts = this.renderRentProducts.bind(this);
    }

    renderRentProducts(){

        const datos = this.props.data
        const este  = this

      return  (datos.map((product)=>{  
          console.log('hellomap: ',product)
            return (<Col lg='4' key={product._id}>
            <RentalObject       
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
    Meteor.subscribe('object')
    const finding = Objects.find({}).fetch()  
    const user   =  Users.find({}).fetch()
    console.log('wiwthtrackeruser: ',user)
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

    return {data:new_finding}
})(Results);