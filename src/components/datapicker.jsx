import React from 'react';
import * as $ from 'jquery'
import ModernDatepicker from 'react-modern-datepicker';
 
class DataPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(), 
        };
        this.handleChange = this.handleChange.bind(this);
    }
 
    handleChange(date) {
        this.setState({
            startDate: date,
        });
    }
    componentDidMount(){
        $('.sc-bwzfXH').css({
            backgroundColor : 'transparent',
            width:'10em',
            textAlign: 'center'
        })
    }
    render() {
        $('.cXcRCo').css({transition:'0.2s',zIndex : '10000',transform:'translateY(calc(-100% - 30px))'})
        return (
            <div style={{margin: '30px 5%'}}>
                <span>{this.props.text}</span>
                <div style={{display:'inline-block'}}> 
                    <ModernDatepicker
                        date={this.state.startDate}
                        format={'DD-MM-YYYY'}
                        onChange={date => this.handleChange(date)}
                        placeholder={'Select a date'}
                    />
                </div>
            </div>
        );
    }
}
export default DataPicker