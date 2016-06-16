import React from 'react';
import Actions from '../../actions/Actions';
var ActionTypes = require("../../constants/ActionTypes");
import ChatsStore from '../../store/ChatsStore';
import moment from 'moment';

function getState() {
    return {
        chatsList: ChatsStore.getChatsList()
    }
}

class ChatListPage extends React.Component{
    constructor(props){
        super(props);
        this.state = getState();
    }
    componentDidMount() {
        Actions.send(ActionTypes.GET_HCATS_LIST);
        ChatsStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        ChatsStore.removeChangeListener(this._onChange.bind(this));
    }

    _onChange() {
        this.setState(getState());
    }
    
    handleClick(id){
        this.context.router.replace('/chat/' + id)
    }
    
    render(){
        if(!this.state.chatsList){
            return null;
        }

        return <div>
            <h1 style={{textAlign: 'center'}}>Masseges</h1>
            <div style={{padding: 10}}>
                {
                    this.state.chatsList.chats.map((i, index) => {
                        return <div onClick={this.handleClick.bind(this, i.id)} key={index} style={{borderBottom: '1px solid #E4E4E4', cursor: 'pointer'}}>
                            <div className="avatar" style={{width: 40, height: 40, float: 'left', margin: 10}}>
                                <img style={{width: 40, height: 40, borderRadius: '50%'}} src={i.avatar} alt=""/>
                            </div>
                            <div className="pull-left">
                                <h4 style={{marginBottom: 5}}>{i.name}</h4>
                                <p>Hi</p>
                            </div>
                            <h6 className="pull-right" style={{marginRight: 10}}>{moment().format('h:mm')}</h6>
                            <div style={{clear: 'both'}}></div>
                        </div>
                    })
                }
            </div>
        </div>
    }
}

ChatListPage.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default ChatListPage;