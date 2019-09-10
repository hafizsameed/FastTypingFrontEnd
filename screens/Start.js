import React, { Component } from 'react'
import { Text, View, TouchableOpacity,Image } from 'react-native'
import { Header } from 'react-navigation-stack'
class Start extends Component {
    navigationOption = {
           Header:null
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:30,backgroundColor:'#339FFF',paddingHorizontal:70,paddingVertical:10,color:'white'}}>Type Fast |</Text>
                    <Image source={require('../assets/logo.png')}/>
                </View>
                <TouchableOpacity 
                onPress={()=>{this.props.navigation.navigate("Login")}}
                style={{padding:10}}>
                    <Text style={{fontSize:20}}>
                        Login
                </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>{this.props.navigation.navigate("SignUp")}}
                style={{padding:10}}>
                    <Text style={{fontSize:20}}>
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default Start