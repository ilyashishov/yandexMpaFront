require('./LoginPage.less');
import React from 'react';
import InputElement from 'react-input-mask';

export default class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            phoneNumber: ''
        }
    }
    
    handleChange(e) {
        this.setState({ phoneNumber: e.target.value });
    }

    handleSubmit(){
        if(this.state.phoneNumber != ''){
            
        }
        return false;
    }

    render(){
        return <div className="col-md-3" style={{marginTop: 100, margin: '100px auto', float: 'none'}}>
            <h1 className="text-center">Hi</h1>
            <h2 className="text-center">Who are you ?</h2>
            <form style={{marginTop: 20}} onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="" className="control-label">Enter your phone number</label>
                    <InputElement onChange={this.handleChange.bind(this)} value={this.state.phoneNumber} className="form-control" placeholder="+7" mask="+7 (999) 999-99-99" maskChar=" "/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary col-md-12 ">Sign in</button>
                </div>
            </form>
        </div>
    }
}