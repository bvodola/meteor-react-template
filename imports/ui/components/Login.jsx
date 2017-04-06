import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import React, { Component } from 'react';

class Login extends Component {

  handleCreateUser() {

    // https://docs.meteor.com/api/passwords.html#Accounts-createUser
    Accounts.createUser({
      // Puxando valores do formulário
      username: this.username.value,
      password: this.password.value

      // Verificando possíveis erros no callback
    }, (e) => {
      if(e) console.log(e);
      else {
        console.log('User Created');
      }
    });
  }

  // https://docs.meteor.com/api/accounts.html#Meteor-loginWithPassword
  handleLogin() {
    Meteor.loginWithPassword(this.username.value, this.password.value,

      // Verificando possíveis erros no callback
      (e) => {
      if(e) console.log(e);
      else {
        console.log('User Logged');
      }
    });
  }

  render() {
    return(
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 col-lg-offset-2 col-sm-12'>
            <h1>Meteor+React Chat App</h1>

            {/* Nome de Usuário */}
            <div className="form-group">
              <input type="text" className="form-control" ref={(el) => {this.username = el}} placeholder="Username"/>
            </div>

            {/* Senha */}
            <div className="form-group">
              <input type="password" ref={(el) => {this.password = el}} className="form-control" placeholder="Password"/>
            </div>

            {/* Botões de Login e Criação de Usuário */}
            <div className="btn-group">
              <button className="btn btn-success" onClick={(ev) => this.handleLogin()}>
                  Login
              </button>
              <button className="btn btn-info" onClick={(ev) => this.handleCreateUser()}>
                Create User
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Login;
