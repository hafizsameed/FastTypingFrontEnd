import { createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'
import * as Routes from '../screens/index'
const Auth = createStackNavigator({
    Start:Routes.Start,
    Login:Routes.Login,
    SignUp:Routes.SignUp,
    
})
const App = createStackNavigator({
    Home:Routes.Home,
    Game:Routes.Game,
})
const Drawer = createDrawerNavigator({
    Home:App,
    highScore:Routes.HighScore,
    Setting:Routes.Setting,
})
const main = createSwitchNavigator({
    Auth:{
        screen:Auth
    },
    App:{
        screen:Drawer
    },
    Result:{
        screen:Routes.Result
    },

    
})

export default createAppContainer(main);