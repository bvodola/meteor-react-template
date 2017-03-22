# meteor-react-template
This is a template for meteor+react apps I use frequently.

## Overview
Meteor Version:
- 1.3.5.1

Meteor Packages:
- materialize:materialize
- fourseven:scss
- fortawesome:fontawesome
- gadicc:ecmascript-hot@=2.0.0-beta.6
- accounts-password

NPM Packages:
- meteor-node-stubs: ~0.2.0
- react: ^15.2.1
- react-addons-pure-render-mixin: ^15.2.1
- react-dom: ^15.2.1
- react-router: ^2.6.0
- react-hot-loader: ^3.0.0-beta.6
- react-komposer: ^1.13.1
- babel-runtime: ^6.11.6
- redbox-react: ^1.3.1

## Installation

`git clone https://github.com/bvodola/meteor-react-bootstrap-skel.git proj-name`

`cd proj-name`

`meteor npm install`

`meteor`

## Obs

In case you run through any *Unable to Watch* problems, run
`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
