import React,{Component} from 'react'
import { Text, View, TouchableOpacity,Image,TextInput,ActivityIndicator} from 'react-native'
import {Toast} from 'native-base'
import {AntDesign} from '@expo/vector-icons'
class Login extends Component{
    state={
        message:'',
        name:'',
        loader:false
    }
    componentDidMount(){
        // this.login()
    }
    login(){
        this.setState({loader:true})
        name = this.state.name;
        if(name!==''&&name!==' '){
            fetch("https://speedtyper2019.herokuapp.com/user/getUser",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({name})
            })
            .then((res)=>res.json())
            .then(data=>{
                if(data.result.length==0){
                    this.setState({loader:false})
                    Toast.show({
                        text:"No such username found",
                        type:"warning",
                        duration:3000
                    })
                }
                else{
                    Toast.show({
                        text:"logged In",
                        type:"success",
                        duration:3000,
                        position:"top"
                    })
                
                    // localStorage.setItem('userdata',data.result);
                    var result = data.result
                    this.props.navigation.navigate("Home",{data:result[0]})
                }
                // console.log(data.result.length,"data array");
            })
        }
        else{
            this.setState({loader:false})
            Toast.show({
                text:"please enter Username",
                type:"warning",
                duration:2000
            })
        }
    }
render(){
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View style={{flex:0.1,flexDirection:"row",justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:30,paddingHorizontal:10}}>
                Login
            </Text>
            <AntDesign name='login' size={30} color="#339FFF"/>
            </View>
            <View style={{flex:0.4,alignItems:'center'}}>
        <TextInput 
        value={this.state.name}
        onChangeText={(name)=>{this.setState({name})}}
        placeholder='Enter Username' style={{borderRadius:10,width:200,padding:12,marginTop:10,marginBottom:25,backgroundColor:'#E3E3E3'}}/>
        <Text>{this.state.message}</Text>
        <TextInput  placeholder='Enter Password' style={{borderRadius:10,width:200,padding:12,marginBottom:25,backgroundColor:'#E3E3E3'}}/>
           <TouchableOpacity
           onPress={this.login.bind(this)}
           style={{margin:10,padding:10,backgroundColor:"#339FFF",paddingHorizontal:30}}>
               <Text style={{fontSize:20,color:'white'}}>Login</Text>
           </TouchableOpacity>
           <TouchableOpacity 
           onPress={()=>{this.props.navigation.navigate("SignUp")}}
           style={{marginTop:10}}>
               <Text style={{fontSize:20,color:"#339FFF"}}>or create new user</Text>
           </TouchableOpacity>
           <ActivityIndicator style={this.state.loader?{margin:10}:{display:"none"}} color="#339FFF" size="small"/>
            </View>

        </View>
    )
}
}
export default Login