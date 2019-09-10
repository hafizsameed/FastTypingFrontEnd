import React,{Component} from 'react'
import {Text,View,TextInput,TouchableOpacity} from 'react-native'
import { Toast , Left,Right } from 'native-base';

class Game extends Component{
state={
    questions:[],
    index:0,
    count:10,
    text:'',
    correct:0,
    wrong:0,
}
navigationOption={
    Header:{
        title:"SpeedTyping"
    }
}
componentWillUnmount(){
    clearInterval(this.state.interval);
}
componentDidUpdate(){
    if(this.state.index == 10){
        const data = this.props.navigation.getParam("data");
        const level = this.props.navigation.getParam("level");
        const {correct,wrong} = this.state;
        this.props.navigation.navigate('Result',{correct,wrong,data,level});
    }
}
componentDidMount(){
    const level = this.props.navigation.getParam('level');
    console.log(level,"level");
    this.setState({level})
    fetch(`https://speedtyper2019.herokuapp.com/question/${level}`)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data.result,"data")
        this.setState({questions:data.result})})
    .catch(e=>{
        Toast.show({
            text:e.message,
            type:"warning",
            position:"top"
        })
    })
    const interval = setInterval(()=>{
        if(this.state.count==0){   
            this.checker();
            this.setState({text:""})
           this.setState({count:10,index:this.state.index+1});
        }
        else{
            this.setState({count:this.state.count-1})
        }
    
    },1000)

    this.setState({interval})
}
checker(){
 if(this.state.text === this.state.questions[this.state.index].question){
     this.setState({correct:this.state.correct+1})
 }
 else{
     this.setState({wrong:this.state.wrong+1})
 }


}
next(){
    this.checker();
    this.setState({text:''})
    this.setState({index:this.state.index+1,count:10});
}


render(){
   
   
    const {questions,index} = this.state;
    return(
        <View style={{flex:1}}>
            <View style={{flex:0.1,backgroundColor:"#FFB700",margin:20,marginBottom:10,borderRadius:20,justifyContent:'center',alignItems:"center"}}>
                <Text style={{fontSize:30,color:'white',fontWeight:"bold"}}>{this.state.count}</Text>
            </View>
            <View style={{flex:0.35,paddingHorizontal:20,backgroundColor:"#339FFF",margin:20,borderRadius:20,justifyContent:'space-evenly'}}>
                <View style={{flex:0.2,flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontSize:25,color:"white",fontWeight:"bold",}} >Question {index+1}</Text>
                    <Text style={{fontSize:16,color:"white"}}>Difficulty : {this.state.level}</Text>
                </View>
                <Text style={{fontSize:30,padding:10,backgroundColor:"white"}}>
                    {!!questions.length && questions[index].question}
                </Text>
            </View>
            <View style={{flex:0.1,backgroundColor:"#D5D5D5",margin:20,borderRadius:20,justifyContent:"center"}}>
                    <TextInput 

                    value={this.state.text}
                    onChangeText={(e)=>{this.setState({text:e})}}
                    style={{width:'100%',height:"100%",paddingHorizontal:20}} placeholder="Type here"/>
            </View>
            <View style={{flex:0.1,flexDirection:"row"}}>
                <TouchableOpacity 
                onPress={this.next.bind(this)}
                style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:'#339FFF',marginHorizontal:20}}>
                    <Text style={{fontSize:20,color:"white"}}>
                        Next
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>{this.props.navigation.navigate('Home')}}
                style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:'#E3E3E3',marginHorizontal:20}}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
}
export default Game