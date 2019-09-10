import React,{Component} from 'react'
import { Text, View, TouchableOpacity,Image,TextInput,ActivityIndicator} from 'react-native'
import {Toast,Radio,ListItem,Left,Right} from 'native-base'
import moment from 'moment';
class Home extends Component{
    state={
        data:{},
        easy:true,
        medium:false,
        hard:false
    }
    componentDidMount(){
        const data =this.props.navigation.getParam("data") || [];
        console.log(data,"data in home")
        this.setState({data:data[0]});
    }
    start(){
        const data = this.props.navigation.getParam("data");
        console.log(data,"data in start->home")
        const {easy,medium,hard } = this.state;
        if(this.state.easy){
            this.props.navigation.navigate('Game',{level:'easy',data});
        }
        else if(this.state.medium){
            this.props.navigation.navigate('Game',{level:'medium',data});
        }
        else if(this.state.hard){
            this.props.navigation.navigate('Game',{level:'hard',data});
        }
        else{
            Toast.show({
                text:"Please select one level to start the game",
                type:"warning",
                duration:2000,
            position:"top"
                    })
        }
    }
render(){  
    // console.log(this.state.data,"data in render")
    const data = this.props.navigation.getParam("data") ;
    const len = data.score.length-1;
    console.log(data.score,"data ===>");
    return(
        <View style={{flex:1}}> 
            <View style={{padding:20,flex:0.4,justifyContent:"center",alignItems:'center',backgroundColor:'#339FFF',margin:20,borderRadius:20}}>
                <Text style={{fontSize:28}}>Hello</Text>
                <Text style={{fontSize:30,color:"white"}}> {data.name}</Text>
            </View>
            {data.score.length ?
            <View style={{flex:0.2,padding:10,margin:20,borderRadius:20,justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#FFB700"}}>
                <Text style={{padding:10,color:"white",fontSize:20}}>Your Last Score : {data.score[len].val}</Text>
                <Text style={{padding:10,color:"white",fontSize:20}}>Difficulty : {data.score[len].level} </Text>
                <Text style={{padding:10,color:"white",fontSize:20}}>Time : {moment(data.score[len].time).format('llll')} </Text>
            </View>:<View style={{flex:0.2,padding:10,margin:20,borderRadius:20,justifyContent:"center",alignItems:"center",marginTop:10,backgroundColor:"#FFB700"}}><Text style={{color:"white",fontSize:20}}> No Record Yet</Text></View>}
            <View style={{flex:0.3}}>
                <ListItem onPress={()=>{this.setState({easy:!this.state.easy,medium:false,hard:false})}}>
                    <Left><Text>Easy</Text></Left>
                    <Right><Radio selected={this.state.easy}/></Right>
                </ListItem>
                <ListItem onPress={()=>{this.setState({medium:!this.state.medium,easy:false,hard:false})}}>
                    <Left><Text>Normal</Text></Left>
                    <Right><Radio selected={this.state.medium}/></Right>
                </ListItem>
                <ListItem onPress={()=>{this.setState({hard:!this.state.hard,easy:false,medium:false})}}>
                    <Left><Text>Hard</Text></Left>
                    <Right><Radio selected={this.state.hard}/></Right>
                </ListItem>
            </View>
            <View style={{flex:0.1,justifyContent:"center",alignItems:"center",bottom:10}}>
                <TouchableOpacity 
                onPress={this.start.bind(this)}
                style={{backgroundColor:"#0084D8",paddingHorizontal:30,paddingVertical:10,borderRadius:20}}>
                    <Text style={{color:"white",fontSize:20}}>
                        Start Game
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
}
export default Home