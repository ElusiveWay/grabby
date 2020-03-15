import React, { Component } from 'react'
import Collection from './collection'
import { findByLabelText } from '@testing-library/react'

class Collections extends Component {
    constructor(props){
      super(props)
      this.state = {

      }
    }
    styles = {
      container:{
        width: '100%',
        height: '100%',
        margin: '50px 0',
        minHeight: '200px',
        padding: '20px',
        maxHeight: 'auto',
        backgroundColor: 'white',
        boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)"
      },
      collectionsBox:{
          padding: '50px 0',
          display: 'flex',
          flexWrap: 'wrap',
          width: '21rem',
          margin: "20px",
          maxWidth: "25%",
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
    render() {
        return (
          <div style={this.styles.container}>
              <h1>Collections</h1>
              <div style={this.styles.row}>
                <div style={this.styles.collectionsBox}>
                <Collection bg="https://www.w3schools.com/w3images/underwater.jpg"/>
                <Collection bg="https://banana.by/uploads/posts/2012-04/1334405587_27285863624776_3.jpg"/>
                <Collection/>
                <Collection bg="https://biblio.by/media/catalog/product/cache/1/image/1200x1200/85e4522595efc69f496374d01ef2bf13/9/7/9785171217273-2020--.jpg"/>
                </div>
                <div style={this.styles.collectionsBox}>
                <Collection bg="https://biblio.by/media/catalog/product/cache/1/image/1200x1200/85e4522595efc69f496374d01ef2bf13/9/7/9785171217273-2020--.jpg"/>
                <Collection bg="https://www.w3schools.com/w3images/underwater.jpg"/>
                <Collection bg="https://banana.by/uploads/posts/2012-04/1334405587_27285863624776_3.jpg"/>
                <Collection bg="https://www.w3schools.com/w3images/underwater.jpg"/>
                </div>
                <div style={this.styles.collectionsBox}>
                <Collection/>
                <Collection bg="https://biblio.by/media/catalog/product/cache/1/image/1200x1200/85e4522595efc69f496374d01ef2bf13/9/7/9785171217273-2020--.jpg"/>
                <Collection bg="https://www.w3schools.com/w3images/underwater.jpg"/>
                <Collection bg="https://biblio.by/media/catalog/product/cache/1/image/1200x1200/85e4522595efc69f496374d01ef2bf13/9/7/9785171217273-2020--.jpg"/>
                </div>
                <div style={this.styles.collectionsBox}>
                <Collection bg="https://images.wallpaperscraft.ru/image/linii_temnyy_fon_polosy_gorizontalnye_67093_2555x1575.jpg"/>
                <Collection bg="https://www.w3schools.com/w3images/underwater.jpg"/>
                <Collection bg="https://biblio.by/media/catalog/product/cache/1/image/1200x1200/85e4522595efc69f496374d01ef2bf13/9/7/9785171217273-2020--.jpg"/>
                <Collection bg="https://www.w3schools.com/w3images/underwater.jpg"/>
                </div>
                <div style={this.styles.collectionsBox}>
                <Collection bg="https://biblio.by/media/catalog/product/cache/1/image/1200x1200/85e4522595efc69f496374d01ef2bf13/9/7/9785171217273-2020--.jpg"/>
                <Collection bg="https://www.w3schools.com/w3images/underwater.jpg"/>
                <Collection bg="https://images.wallpaperscraft.ru/image/linii_temnyy_fon_polosy_gorizontalnye_67093_2555x1575.jpg"/>
                <Collection bg="https://www.w3schools.com/w3images/underwater.jpg"/>
                </div>
       
              </div>
          </div>
      )
    }
}

export default Collections