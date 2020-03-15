import React, {Component} from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';


class Collection extends Component {
    constructor(props){
      super(props)
      this.state = {

      }
    }
    width = "100%"
    style = {
        container :{
             width: this.width,
             margin: '20px 0px'
        },
        image :{
            minHeight: (this.props.bg===undefined)?'200px':'unset',
            width: (this.props.bg===undefined)?'unset':'100%'
        }
    }
    render(){
        return (
            <div style={{display:'flex'}}>
            <MDBCard style={this.style.container}>
                <div style={{position:'relative'}}>
                    <span style={{display:(this.props.bg===undefined)?'unset':'none',color:'#747373',textAlign:'center',top: '50%', left: '50%',transform: 'translate(-50%,-50%)',fontSize:'30px',position:'absolute'}}>There is no image</span>
                    <MDBCardImage style={this.style.image} src={this.props.bg} className="img-fluid" waves />
                </div>
                <MDBCardBody>
                <MDBCardTitle>Card title</MDBCardTitle>
                <MDBCardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                </MDBCardText>
                <MDBBtn href="#">Open</MDBBtn>
                </MDBCardBody>
            </MDBCard> 
            </div>
        )
    }
}

export default Collection