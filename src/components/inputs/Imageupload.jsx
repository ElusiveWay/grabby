import React from 'react'

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  componentDidMount(){
    this.setState({imagePreviewUrl : (this.props.default)?(this.props.default):''})
  }
  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();
    console.log(e.target.files[0])
    let reader = new FileReader();
    let file = e.target.files[0];
    this.props.func(file)
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    try{reader.readAsDataURL(file)}catch(e){}
  }
  styleInput ={
      height: '100%',
      width: '100%',
      position: 'absolute',
      color: 'transparent'
  }
  prew = {
    height: '100%',
    width: '100%',
    top:'100%',
    left:'0',
    position: 'absolute',
  }
  text = {
    width : '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: '38px',
    position: 'absolute',
    zIndex: 1,
    textAlign: 'center',
    display: 'inline',
  }
  render() {
    let {imagePreviewUrl} = this.state;

    return (
      <div  className="previewComponent upploadImageCont">
          <style dangerouslySetInnerHTML={{__html:`
          .upploadImageCont{
            height:300px;
            width: calc(50% - 50px);
            margin-left:30px;
            background-image : transparent;
            position: relative;
            background: white;
            border: 1px solid #ced4da;
            border-radius: .25rem;
            display: inline-block;
        }
        @media screen and (max-width: 1000px){
            .upploadImageCont{
                height:200px;
                width: calc(100% - 20px);
                margin-left:0px;
                margin: auto;
                display: block;
            }
        }
          `}}></style>
          <div className="input-group-prepend">
                <span style={this.text} class="input-group-text" id="basic-addon">Click or drop an image to the area to add one</span>
          </div>
          <input className="fileInput" 
            type="file" 
            name={this.props.name}
            style={{height: '100%',
            width: '100%',
            position: 'absolute',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'transparent',
            backgroundImage: `url(${imagePreviewUrl})`}}
            onChange={(e)=>this._handleImageChange(e)} />
      </div>
    )
  }
}

export default ImageUpload