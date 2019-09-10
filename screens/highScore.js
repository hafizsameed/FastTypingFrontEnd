import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator, ScrollView } from 'react-native'
import { Toast } from 'native-base'
import { FlatList } from 'react-native-gesture-handler'
class HighScore extends Component {
   state={
       scores:[],
       level:""
   }
   componentDidMount(){
       this.getScores("easy");
   }
    getScores(level){
        this.setState({scores:[]})
        var newarr=[]
        fetch(`https://speedtyper2019.herokuapp.com/user/getHighscores/${level}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data,"data")
            data.result.forEach((each)=>{
                console.log(each,"each");
                each.score.map(e=>{
                    if(e.level==level){
                    newarr.push({name:each.name,score:e});    
                    }
                })
            })
            // console.log(newarr,"new array");
            var finalArr=newarr.sort((a,b)=> (a.score.val>b.score.val?-1:1))
            // console.log(finalArr,"final array")
            this.setState({scores:finalArr,level});
        }
        );
    }
    render() {
        return (
            <View style={{ flex: 1, marginTop: 30 }}>
                <View style={{ flex: 0.1, backgroundColor: "#339FFF", justifyContent: "center", alignItems: "center", margin: 20, borderRadius: 20 }}>
                    <Text style={{ fontSize: 30, color: "white" }}>
                        HighScores
        </Text>
                </View>
                <View style={{ flex: 0.14 }}>
                    <View style={{ flex: 1,flexDirection:"row", backgroundColor: "white", margin: 10, borderRadius: 20,justifyContent:"space-evenly" }}>
                    <TouchableOpacity
                 onPress={this.getScores.bind(this,'easy')}
                style={{backgroundColor:"#7EE500",borderRadius:10,justifyContent:"center",alignItems:'center',padding:5,width:100}}>
                    <Text style={{fontSize:20,color:"white"}}>Easy</Text>
                </TouchableOpacity>
              
                <TouchableOpacity 
                 onPress={this.getScores.bind(this,'medium')}
                style={{backgroundColor:"#FFB700",borderRadius:10,justifyContent:"center",alignItems:'center',padding:5,width:100}}>
                    <Text style={{fontSize:20,color:"white"}}>Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={this.getScores.bind(this,'hard')}
                style={{backgroundColor:"#E50000",borderRadius:10,justifyContent:"center",alignItems:'center',padding:5,width:100}}>
                    <Text style={{fontSize:20,color:"white"}}>Hard</Text>
                </TouchableOpacity>
                
                    </View>

                </View>
                {!!this.state.scores.length?
                
                <View style={{flex:1,backgroundColor:'#339FFF',margin:20,borderRadius:20}}>
                     <View style={{flex:0.2,justifyContent:"center",alignItems:"center",}}>
                 <Text style={{fontSize:30,color:"white"}}>{this.state.level.toUpperCase()}</Text>
                 </View>
                    <FlatList style={{flex:0.8}}
                data={this.state.scores}
                renderItem={(e)=>{
                    console.log(e.item,"e");
                    console.log(e.index,"index")
                    return(
                        <View key={e.index} style={{flex:1,borderBottomWidth:1,padding:20,flexDirection:"row",justifyContent:"space-between"}}>
                            <Text style={{fontSize:20,color:"white"}}>{e.index+1} )</Text>
                            <Text style={{fontSize:20,color:"white"}}>{e.item.name}</Text>
                            <Text style={{fontSize:20,color:"white"}}>{e.item.score.val}</Text>
                            </View>
                    )
                }}
                    />
                </View>
                :<View style={{flex:1,justifyContent:'center',alignItems:'center',margin:20,borderRadius:20,backgroundColor:"#339FFF"}}>
                    <ActivityIndicator size='large' color='white' />
                    
                </View>}

            </View>
        )
    }
}
export default HighScore