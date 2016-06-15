require('./LoginPage.less');
import React from 'react';
import InputElement from 'react-input-mask';
import request from '../../utils/request';
import _ from 'lodash';
import Actions from '../../actions/Actions';
import AuthStore from '../../store/AuthStore';
var ActionTypes = require("../../constants/ActionTypes");
import moment from 'moment';
import DatePicker from 'react-datepicker';
require('react-datepicker/dist/react-datepicker.css');

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            code: '',
            dateOfBirth: moment(),
            firstName: '',
            lastName: '',
            phoneValid: false,
            step: 1
        }
    }
    handleChangeDate(date){
        this.setState({
            dateOfBirth: moment(date).format('DD.MM.YYYY')
        })
    }
    handleChange(e) {
        const dataUser = {};
        console.log(e);
        dataUser[e.target.name] = e.target.value;
        this.setState(_.merge(this.state, dataUser));
    }

    handleSubmit(e) {
        var self = this;
        // e.preventDefault();
        if (this.state.phoneNumber != '' && this.state.step == 1) {
            Actions.send(ActionTypes.LOGIN , {phoneNumber: this.state.phoneNumber}, function (res) {
                if (res.ok) {
                    self.setState({
                        step: 2
                    });
                }
            });
        }
        if (this.state.code != '' && this.state.step == 2) {
            Actions.send(ActionTypes.LOGIN_CODE , {phoneNumber: this.state.phoneNumber, code: this.state.code}, function (res) {
                if(res.hash){
                    localStorage.token = res.hash;
                    self.context.router.replace('/map');
                    return;
                }
                if (res.ok) {
                    self.setState({
                        step: 3
                    });
                }
            });
        }
        if (this.state.step == 3) {
            Actions.send(ActionTypes.REGISTRATION , {
                phoneNumber: this.state.phoneNumber,
                lastName: this.state.lastName,
                firstName: this.state.firstName,
                dateOfBirth: this.state.dateOfBirth,
                step: 3
            }, function (res) {
                if (res.ok) {
                    localStorage.token = res.hash;
                    self.context.router.replace('/map');
                }
            });
        }
        e.preventDefault();
    }

    render() {
        return <div className="col-md-3 col-sm-8" style={{marginTop: 100, margin: '100px auto', float: 'none'}}>
            {
                this.state.step == 1 && <div>
                    <h1 className="text-center">Hi</h1>
                    <h2 className="text-center">Who are you ?</h2>
                    <form style={{marginTop: 20}} onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="" className="control-label">Enter your phone number</label>
                            <InputElement name="phoneNumber" onChange={this.handleChange.bind(this)}
                                          value={this.state.phoneNumber} className="form-control" placeholder="+7"
                                          mask="+7 (999) 999-99-99" maskChar=" "/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary col-md-12 col-sm-12 col-xs-12">Sign in</button>
                        </div>
                    </form>
                </div>
            }
            {
                this.state.step == 2 && <div>
                    <h1 className="text-center">Code</h1>
                    <form style={{marginTop: 20}} onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="" className="control-label">Enter code for phone</label>
                            <input name="code" onChange={this.handleChange.bind(this)} value={this.state.code}
                                   className="form-control"/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary col-md-12 col-sm-12 ">Next</button>
                        </div>
                    </form>
                </div>
            }
            {
                this.state.step == 3 && <div>
                    <h2 className="text-center">Fill in the information about yourself</h2>
                    <form style={{marginTop: 20}} onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="" className="control-label">Your Last Name</label>
                            <input onChange={this.handleChange.bind(this)} name="lastName" value={this.state.lastName}
                                   className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="control-label">Your First Name</label>
                            <input onChange={this.handleChange.bind(this)} name="firstName" value={this.state.firstName}
                                   className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="control-label">Date of Birth</label>
                            <DatePicker
                                selected={moment(this.state.dateOfBirth, 'DD.MM.YYYY')}
                                onChange={this.handleChangeDate.bind(this)}
                                dateFormat="DD.MM.YYYY"
                                className="form-control"
                                name="dateOfBirth"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="control-label">Load Avatar</label>
                            <input type="file" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary col-md-12 col-sm-12 ">Next</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    }
}

LoginPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default LoginPage;