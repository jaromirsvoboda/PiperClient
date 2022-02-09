import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { TicTacToe } from './components/TicTacToe';
import { Piper } from './components/Piper';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/tic-tac-toe'>
            <TicTacToe dimension={3}/>
        </Route>
        <Route path='/piper'>
            <Piper/>
        </Route>
      </Layout>
    );
  }
}
