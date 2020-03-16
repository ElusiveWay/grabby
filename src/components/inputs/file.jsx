import React from "react"
import ReactDOM from 'react-dom'
import * as $ from 'jquery'

class File extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            withFile : false
        }
    }
    componentDidMount(){
        this.int = setInterval(()=>{
            if(ReactDOM.findDOMNode(this).querySelector('.superpuperfile').files.length){
                this.setState({withFile : true})
            }
            
        },100)
    }
    componentWillUnmount(){
        clearInterval(this.int)
    }
    render(){
            return (
                <div style={this.props.style}className="input-group">
                            <div className="custom-file">
                            <input
                            type="file"
                            className="superpuperfile custom-file-input"
                            name = {this.props.name}
                            id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01"
                            />
                            <label className="custom-file-label" htmlFor="inputGroupFile01">
                            {(this.state.withFile == false)?'Select file':ReactDOM.findDOMNode(this).querySelector('.superpuperfile').files[0].name}
                            </label>
                        </div>
                    </div>
            )
        }
}

export default File;