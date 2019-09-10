import React,{Component} from 'react'
import {Text,View} from 'react-native'
import {ListItem,Left,Right} from 'native-base'
import {AntDesign} from '@expo/vector-icons'
import {Toast} from 'native-base'
import { duration } from 'moment'
class Setting extends Component{

render(){
    return(
        <View style={{flex:1,marginTop:20}}>
            <View style={{flex:0.2,flexDirection:"row",backgroundColor:"#339FFF",padding:10,margin:20,justifyContent:"center",alignItems:"center",borderRadius:20}}>
        <AntDesign name="user" size={60} color='white'/>
        <Text></Text>
            </View>
            <ListItem 
            onPress={()=>{this.props.navigation.navigate('Start')
            Toast.show({
                text:"logged Out sucessfully",
                type:"success",
                duration:3000
            })
            }}
            style={{marginTop:10}}>
                <Text style={{fontSize:20}}>Logout</Text>
            </ListItem>
            <ListItem onPress={()=>{Toast.show({
                text:"hafizsameed42@gmail.com",
                type:"success",
            })}}>
                <Text style={{fontSize:20}}>About Us</Text>
            </ListItem>

        </View>
    )
}


}
export default Setting;
