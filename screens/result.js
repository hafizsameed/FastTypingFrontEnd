import React, { Component } from 'react'
import { Text, View,TouchableOpacity } from 'react-native'
import {moment} from 'moment'
class Result extends Component {
  componentDidMount(){
      this.storeResult();
  }
    storeResult(){
        const correct = this.props.navigation.getParam("correct");
        const wrong = this.props.navigation.getParam("wrong") ;
        const data = this.props.navigation.getParam("data");
        console.log(data,"prev data")
        const level = this.props.navigation.getParam("level")
        const newObj={level,time:Date.now(),val:correct};
        console.log(data,"new data");
        fetch("https://speedtyper2019.herokuapp.com/user/updateUser",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({id:data._id,score:newObj})
        }
        )
        .then(res=>res.json())
        .then(data=>console.log(data.message))
        .catch((e)=>{console.log(e.message)})
    }
    render() {
        const correct = this.props.navigation.getParam("correct");
        const wrong = this.props.navigation.getParam("wrong") ;
        const data = this.props.navigation.getParam("data");
        const level = this.props.navigation.getParam("level")
        data.score.push({level,val:correct,time:Date.now()});
        console.log(data,"data in result");
        console.log(correct, wrong, "correct/wrong");
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flex: 0.3, paddingHorizontal: 150, borderRadius: 20, margin: 30, backgroundColor: '#339FFF', justifyContent: "center", alignItems: "center", marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 30, color: 'white' }}>
                        Result
                    </Text>
                </View>
                <View style={{ flex: 0.1, width: "95%", justifyContent: "center", elevation: 1, borderWidth: 1, borderRadius: 10, alignItems: "center", backgroundColor: "" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Total : 10</Text>
                </View>
                <View style={{ flex: 0.1, flexDirection: 'row', width: "100%", justifyContent: "center" }}>
                    <View style={{ flex: 0.5,justifyContent:'center',alignItems:'center', backgroundColor: '#E3E3E3', margin: 10, borderRadius: 10 }}>
                        <Text style={{fontSize:20}}>
                            correct : {correct}
                        </Text>
                    </View>
                    <View style={{ flex: 0.5,justifyContent:"center",alignItems:"center", backgroundColor: '#FFB700', margin: 10, borderRadius: 10 }}>
                        <Text style={{fontSize:20,color:"white"}}>
                            Wrong : {wrong}
                        </Text>
                    </View>

                </View>
                <View style={{flex:0.5,alignItems:"flex-end",flexDirection:"row",margin:30}}>
            <TouchableOpacity
            onPress={()=>{this.props.navigation.navigate('Home',{data})}}
            >
                <Text style={{fontSize:20,color:'black'}}>
                    Go to Home
                </Text>
            </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default Result