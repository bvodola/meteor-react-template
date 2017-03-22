import React, { Component } from 'react';
import { Messages } from '../../api/models.js';

class NewMessage extends Component {

  handleSubmit(ev) {
    ev.preventDefault();

    Messages.insert({
      content: this.message.value,
      username: this.props.currentUser.username
    }, (e,id) => {
      if(e) console.log(e);
      else {
        console.log(id);
        this.message.value = '';
      }
    });

  }

  render() {
    return(
      <div className="new-message row">
        <div className='col-lg-8 col-lg-offset-2 col-sm-12'>
          <form onSubmit={(ev) => this.handleSubmit(ev)}>
            <div className="input-group">
             <input type="text" className="form-control" placeholder="New message..." ref={(el) => {this.message = el}} />
             <span className="input-group-btn">
               <button className="btn btn-default" type="submit"><i className="fa fa-chevron-right"></i></button>
             </span>
           </div>
         </form>
       </div>
      </div>
    );
  }
}

export default NewMessage;
