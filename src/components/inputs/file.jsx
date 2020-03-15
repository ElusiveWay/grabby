import React from "react"

class File extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
            return (
                <div style={this.props.style}className="input-group">
                            <div className="custom-file">
                            <input
                            type="file"
                            className="custom-file-input"
                            id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01"
                            />
                            <label className="custom-file-label" htmlFor="inputGroupFile01">
                            Choose image
                            </label>
                        </div>
                    </div>
            )
        }
}

export default File;