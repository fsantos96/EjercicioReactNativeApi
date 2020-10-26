import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Home from '../home/home';
import CocktailDetail from '../cocktailDetail/cocktailDetail'
export default function Routes() {
  return (
    <Router>
        <Scene key = "root">
            <Scene key = "home" component = {Home} title = "Coctail Home" initial = {true} />
            <Scene key = "detail" component = {CocktailDetail} title = "Coctail" />
        </Scene>
    </Router>
  )
}
