import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import  { Meteor }  from 'meteor/meteor';
import  PrimarySearchBar from '../../Shared/Home/PrimarySearchBar.js';
import RentalObject from '../RentalObject.js';
import {Objects} from '../../../api/objects.js'
import {Container,  Col, Row } from 'reactstrap';

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
    render() {
        return (
            <Container>
                 <PrimarySearchBar/>
                 <Container>
                     <Row>
                 {this.renderRentProducts()}
                 </Row>
                 </Container>

            </Container>
        );
    }
}



export default withTracker((props) => {
    Meteor.subscribe('object')
    const finding = Objects.find({}).fetch()  
    
    const filter = localStorage.getItem('filter')
    console.log('filter: ',filter)
    const new_finding = finding.filter( obj=>obj.title===filter)
    return {data:new_finding}
})(Results);