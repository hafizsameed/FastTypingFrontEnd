import React,{Component} from 'react'
import { Text, View, TouchableOpacity,Image,TextInput,ActivityIndicator} from 'react-native'
import {Toast} from 'native-base'
import {MaterialCommunityIcons} from '@expo/vector-icons'
class SignUp extends Component{
state={
    name:'',
    loader:false
}
    signUp(){
        this.setState({loader:true})
const {name} = this.state;
if(name!=='' && name!==" "){
    fetch("https://speedtyper2019.herokuapp.com/user/addUser",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({name})
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        this.setState({loader:false})
        if(data.message === "user added"){
            console.log("user name added")
            Toast.show({
                text:data.message,
                type:"success",
                duration:2000
            })
            this.props.navigation.navigate("Login");
        }
        else{
        Toast.show({
            text:"username already exist",
            type:'warning',
            duration:"3000"
        })
        }
    })
    .catch((e)=>{
        this.setState({loader:false})
        Toast.show({
            text:e.message,
            type:'danger',
            duration:3000
        })
        console.log(e.message);
    })
}
else{
    this.setState({loader:false})
    Toast.show({
        text:"Username cannot be left empty",
        position:"bottom",
        duration:3000
    })
}
}
render(){
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View style={{flex:0.1,flexDirection:"row",justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:30,paddingHorizontal:10}}>
                SignUp
            </Text>
            <MaterialCommunityIcons name='account-plus' size={30} color="#339FFF"/>
            </View>
            <View style={{flex:0.4,alignItems:'center'}}>
        <TextInput 
        onChangeText={(e)=>{this.setState({name:e})}}
        placeholder='Enter Username' style={{borderRadius:10,width:200,padding:12,marginTop:10,marginBottom:25,backgroundColor:'#E3E3E3'}}/>
        <TextInput  placeholder='Enter Password' style={{borderRadius:10,width:200,padding:12,marginBottom:25,backgroundColor:'#E3E3E3'}}/>
           <TouchableOpacity
           onPress={this.signUp.bind(this)}
           style={{margin:10,padding:10,backgroundColor:"#339FFF",paddingHorizontal:30}}>
               <Text style={{fontSize:20,color:'white'}}>SignUp</Text>
           </TouchableOpacity>
           <TouchableOpacity 
           onPress={()=>{this.props.navigation.navigate("Login")}}
           style={{marginTop:10}}>
               <Text style={{fontSize:20,color:"#339FFF"}}>or Login </Text>
           </TouchableOpacity>
        <ActivityIndicator style={this.state.loader?{margin:10}:{margin:10,display:'none'}} size="small" color="#339FFF"/>
            </View>

        </View>
    )
}
}
export default SignUp