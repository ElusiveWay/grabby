import React, { Component } from 'react'
import Collection from './collection'
import { findByLabelText } from '@testing-library/react'
import LANG from '../../lang'
class Collections extends Component {
    constructor(props){
      super(props)
      this.state = {
          show: [],
          flexColumns : 5
      }
    }
    minWidth = 280
    margin = 20
    styles = {
        container:{
          width: '100%',
          height: '100%',
          minHeight: '200px',
          padding: '0 20px',
          maxHeight: 'auto'
        },
        collectionsBox:{
            display: 'flex',
            flexWrap: 'wrap',
            minWidth: `${this.minWidth}px`,
            width: '21rem',
            margin: `0 ${this.margin}px`,
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
        },
        row:{
          display:'flex',
          flexWrap: 'no-wrap',
          justifyContent: 'space-around',
          alignItems: 'flex-start'
        }
      }
    drawFlexItem(){
      const columns =[]
      for (let k=0; k < this.state.flexColumns; k++){
          columns.push(
          <div className="__freeColumn_v1_" style={this.styles.collectionsBox}>
                 {this.state.show.map((v,i)=>{
                     if (i%this.state.flexColumns == k) return <Collection data={v} likes={v.likes} name={v.name} description={v.description} bg={v.img}/>
                 })}
          </div>
          )
      }
      return (
        <div className="__row_v1_"  style={this.styles.row}>
          {columns}
        </div>    
      )
    }

    componentDidMount(){
      this.interval = setInterval(()=>{
      this.setState({flexColumns : (parseFloat( window.getComputedStyle(global.document.querySelector('.__row_v1_')).width) < this.minWidth+this.margin*2) ? 1 : Math.floor(parseFloat( window.getComputedStyle(global.document.querySelector('.__row_v1_')).width)/(this.minWidth+this.margin*2))})
      global.document.querySelector('.__row_v1_').style.justifyContent = (this.state.flexColumns <= this.state.show.length)?'space-around':'flex-start'
      if(global.__mainData !== undefined) this.setState({show: global.__mainData.items.map(v=>v).reverse()})
      },300)
    }
    componentWillUnmount(){
      clearInterval(this.interval)
    }
    render() {
        return (
          <div className="container__collboxes">
              <style dangerouslySetInnerHTML={{__html:COMPONENT_STYLE}}/>
              <img src='' onError={()=>window.scrollTo(0,0)}/>
              {this.drawFlexItem()}
              {!global.__mainData && <h1 style={{position:'fixed',left:'50%',top:'50%',transform: 'translate(-50%,-50%)'}}>{LANG.loading[localStorage.getItem('lang')]}</h1>}
          </div>
      )
    }
}
const COMPONENT_STYLE=`
.collElemWrapper{
  min-height:200px;
}
.container__collboxes:{
      width: 100%;
      height: 100%;
      min-height: 200px;
      padding: 0 20px;
      max-height: auto;
    }
    @media screen and (max-width: 640px){
      .container__collboxes:{
        padding: 0;
      }
      .container__collboxes .__freeColumn_v1_{
        width:unset !important;
        max-width:450px;
      }
      
    }
`


export default Collections