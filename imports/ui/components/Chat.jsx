import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import NewMessage from './NewMessage.jsx';

class Chat extends Component {

  handleLogout() {
    Meteor.logout((e) => {
      if(e) console.log(e);
      else console.log('Logged out');
    })
  }

  render() {

    let currentUser = this.props.currentUser;
    let loading = this.props.loading;
    let messages = this.props.messages;

    if(loading) {
      return (<div className="loading">Loading...</div>);
    }

    else {

      return(
        <div className="chat">

          <nav>
            <div className="row">
              <div className="col-xs-6 username">{currentUser.username}</div>
              <div className="col-xs-6 logout" onClick={() => this.handleLogout()}>Logout</div>

            </div>
          </nav>

          <div className="main container">

            <div className="messages row">
              <div className='col-lg-8 col-lg-offset-2 col-sm-12'>
                <ul className="list-group">

                  {messages.map((message,i) => (
                    <li className="list-group-item" key={i}>
                      <h4 className="list-group-item-heading">{message.username}</h4>
                      <p className="list-group-item-text">{message.content}</p>
                    </li>
                  ))}


                </ul>
              </div>
            </div>

            <NewMessage currentUser={currentUser} />

          </div>
        </div>
      );
    }
  }
}

export default Chat;
