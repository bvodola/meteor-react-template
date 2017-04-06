# meteor-react-meetup

## 1. Concepção das telas do app

### Wireframe das telas

### Resumindo: Duas telas
1. Login
2. Chat

## 2. Pré-requisitos
- git
- meteor

## Resumo sobre Meteor e React
- Explicação rápida sobre as ferramentas.
- Usaremos um template pronto para agilizar.
- Vou disponibilizar um tutorial sobre como chegar ao
template pronto a partir do zero.

## 3. Fazendo Login

### Criação do `Login Component`:
Crie um novo arquivo `Login.jsx` dentro de `imports/ui/components/` e insira o conteúdo abaixo.


```js
// imports/ui/compoents/Login.jsx

import React, { Component } from 'react';

class Login extends Component {
  render() {
    return(
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 col-lg-offset-2 col-sm-12'>
            <h1>Meteor+React Chat App</h1>

            {/* Nome de Usuário */}
            <div className="form-group">
              <input type="text" className="form-control" placeholder="User"/>
            </div>

            {/* Senha */}
            <div className="form-group">
              <input type="password" className="form-control" placeholder="Password"/>
            </div>

            {/* Botões de Login e Criação de Usuário */}
            <div className="btn-group">
              <button className="btn btn-success">
                  Login
              </button>
              <button className="btn btn-info">
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
```

Abra o arquivo `imports/ui/App.jsx` e modifique-o para que fique como abaixo:

```js
// imports/ui/App.jsx

import React , { Component } from 'react';
import Login from './components/Login'; // Linha adicionada

// =============
// App Component
// =============
class App extends Component {
	render() {
		return (
			<Login /> // Linha modificada
		);
	}
}

export default App;
```

Nesse ponto já podemos ver a tela de login que criamos no navegador.
Vamos agora cuidar da criação do usuário e do login:

Dentro com `Login Component`, vamos criar dois métodos:
- handleLogin()
- handleCreateUser()

Adicionaremos alguns `imports`, modificaremos ainda os botões e os inputs para que os
métodos acima possam interagir com eles. O resultado final deve ser:

```js
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
```

## 4. Verificando se o usuário está conectado

Primeiro vamos criar a publicação de usuários:

```js
// server/main.js

Meteor.publish('users', () => {
  return Meteor.users.find({});
})
```

Agora, vamos editar `imports/ui/containers/AppContainer.jsx`:

```js
//imports/ui/containers/AppContainer.jsx

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../App.jsx';

export default AppContainer = createContainer(() => {

  var handle = Meteor.subscribe("users");

  return {
    loading: !handle.ready(),
    currentUser: Meteor.user()
  };
}, App);

```

E finalmente `imports/ui/App.jsx`:

```js
//imports/ui/App.jsx

import React , { Component } from 'react';
import Login from './components/Login';

// =============
// App Component
// =============
class App extends Component {
	render() {

		let loading = this.props.loading;
		let currentUser = this.props.currentUser;

		if(loading) {
			return (<div className="loading">Loading...</div>);
		}

		else{
			if(currentUser) {
				return (<div>User <b>{currentUser.username}</b> Connected!</div>)
			}
			else {
				return (<Login />);
			}
		}

	}
}

export default App;
```

## 5. Criando e exibindo a tela do Chat

```js
import React, { Component } from 'react';

class Chat extends Component {
  render() {
    return(
      <div className="chat">

        <nav>
          <div className="row">
            <div className="col-xs-6 username">Username</div>
            <div className="col-xs-6 logout">Logout</div>

          </div>
        </nav>

        <div className="main container">

          <div className="messages row">
            <div className='col-lg-8 col-lg-offset-2 col-sm-12'>
              <ul className="list-group">

                <li className="list-group-item">
                  <h4 className="list-group-item-heading">Nome</h4>
                  <p className="list-group-item-text">Mensagem</p>
                  <p className="list-group-item-text">01/01/2017</p>
                </li>

                <li className="list-group-item">
                  <h4 className="list-group-item-heading">Nome</h4>
                  <p className="list-group-item-text">Mensagem</p>
                  <p className="list-group-item-text">01/01/2017</p>
                </li>

                <li className="list-group-item">
                  <h4 className="list-group-item-heading">Nome</h4>
                  <p className="list-group-item-text">Mensagem</p>
                  <p className="list-group-item-text">01/01/2017</p>
                </li>

              </ul>
            </div>
          </div>

          <div className="new-message row">
            <div className='col-lg-8 col-lg-offset-2 col-sm-12'>
              <div className="input-group">
               <input type="text" className="form-control" placeholder="New message..." />
               <span className="input-group-btn">
                 <button className="btn btn-default" type="button"><i className="fa fa-chevron-right"></i></button>
               </span>
             </div>
           </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Chat;

```

```js
import React , { Component } from 'react';
import Login from './components/Login.jsx';
import Chat from './components/Chat.jsx';

// =============
// App Component
// =============
class App extends Component {
	render() {

		let loading = this.props.loading;
		let currentUser = this.props.currentUser;

		if(loading) {
			return (<div className="loading">Loading...</div>);
		}

		else{
			if(currentUser) {
				return (<Chat />);
			}
			else {
				return (<Login />);
			}
		}

	}
}

export default App;

```

```css
nav
  color: #fff
  padding: 12px 5px
  background: #2196f3
  position: fixed
  z-index: 9999
  margin-bottom: 70px
  width: 100%
  font-weight: bold

  .logout
    text-align: right
    cursor: pointer

.main.container
  padding-top: 60px
```

## 6. Exibindo nome de usuário e no Chat e fazendo logout

```js
import React , { Component } from 'react';
import Login from './components/Login.jsx';
import Chat from './components/Chat.jsx';

// =============
// App Component
// =============
class App extends Component {
	render() {

		let loading = this.props.loading;
		let currentUser = this.props.currentUser;

		if(loading) {
			return (<div className="loading">Loading...</div>);
		}

		else{
			if(currentUser) {
				return (<Chat currentUser={currentUser} />);
			}
			else {
				return (<Login />);
			}
		}

	}
}

export default App;

```

```js
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

class Chat extends Component {

  handleLogout() {
    Meteor.logout((e) => {
      if(e) console.log(e);
      else console.log('Logged out');
    })
  }

  render() {

    let currentUser = this.props.currentUser;

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

                <li className="list-group-item">
                  <h4 className="list-group-item-heading">Nome</h4>
                  <p className="list-group-item-text">Mensagem</p>
                  <p className="list-group-item-text">01/01/2017</p>
                </li>

                <li className="list-group-item">
                  <h4 className="list-group-item-heading">Nome</h4>
                  <p className="list-group-item-text">Mensagem</p>
                  <p className="list-group-item-text">01/01/2017</p>
                </li>

                <li className="list-group-item">
                  <h4 className="list-group-item-heading">Nome</h4>
                  <p className="list-group-item-text">Mensagem</p>
                  <p className="list-group-item-text">01/01/2017</p>
                </li>

              </ul>
            </div>
          </div>

          <div className="new-message row">
            <div className='col-lg-8 col-lg-offset-2 col-sm-12'>
              <div className="input-group">
               <input type="text" className="form-control" placeholder="New message..." />
               <span className="input-group-btn">
                 <button className="btn btn-default" type="button"><i className="fa fa-chevron-right"></i></button>
               </span>
             </div>
           </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Chat;

```


## 7. Salvando mensagens enviadas no banco de dados

```js
import { Mongo } from 'meteor/mongo';
export const Messages = new Mongo.Collection('messages');
```

Criar `NewMessage Component`

```js
import React, { Component } from 'react';
import { Messages } from '../../api/models.js';

class NewMessage extends Component {

  handleSubmit(ev) {
    ev.preventDefault();

    Messages.insert({
      content: this.message.value,
      user_id: this.props.currentUser._id
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

```

Modificar o `Chat Component`
```js
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

                <li className="list-group-item">
                  <h4 className="list-group-item-heading">Nome</h4>
                  <p className="list-group-item-text">Mensagem</p>
                  <p className="list-group-item-text">01/01/2017</p>
                </li>

                <li className="list-group-item">
                  <h4 className="list-group-item-heading">Nome</h4>
                  <p className="list-group-item-text">Mensagem</p>
                  <p className="list-group-item-text">01/01/2017</p>
                </li>

                <li className="list-group-item">
                  <h4 className="list-group-item-heading">Nome</h4>
                  <p className="list-group-item-text">Mensagem</p>
                  <p className="list-group-item-text">01/01/2017</p>
                </li>

              </ul>
            </div>
          </div>

          <NewMessage currentUser={currentUser} />

        </div>
      </div>
    )
  }
}

export default Chat;
```

## 8. Mostrando as mensagens enviadas na tela

Primeiro, criamos a publicação de mensagens.
Adiciona o texto  abaixo no final do `server/main.js`:

```js
Meteor.publish('messages', () => {
  return Messages.find({});
});
```

Criar `ChatContainer`

```js
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Chat from '../components/Chat.jsx';
import { Messages } from '../../api/models.js';

export default ChatContainer = createContainer(() => {

  var handle = Meteor.subscribe("messages");

  return {
    loading: !handle.ready(),
    messages: Messages.find({}).fetch()
  };
}, Chat);


```

Modificar App.jsx

```js
import React , { Component } from 'react';

import Login from './components/Login.jsx';
import ChatContainer from './containers/ChatContainer.jsx';

// =============
// App Component
// =============
class App extends Component {
	render() {

		let loading = this.props.loading;
		let currentUser = this.props.currentUser;

		if(loading) {
			return (<div className="loading">Loading...</div>);
		}

		else{
			if(currentUser) {
				return (<ChatContainer currentUser={currentUser} />);
			}
			else {
				return (<Login />);
			}
		}

	}
}

export default App;

```

Exibir as mensagens

```js
```

```js
```
