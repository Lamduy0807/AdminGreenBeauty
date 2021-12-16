import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    ImageBackground,
    Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Item,
  Label,
  TextInput,
  Touchable,
  TouchableOpacityBase,
  TouchableOpacity,
  Button,
  FlatList,
  VirtualizedList
} from 'react-native';

const ModalPicker = (props) =>{
    const [renderData, setRenderData] = useState([])
    useEffect(() => {
        GetData();
    },[])
    const GetData = async()=>
          {
              await fetch ('http://10.0.2.2:8000/category/',
          {
              method:'GET',
              headers:{
                  'Content-Type': 'application/json'
              },
          }).then(response=>{
              if(response.status==200)
              {
                  response.json().then(d=>{
                      //console.log("status:"+sta+" ", Object.keys(d).length)
                      setRenderData(d);
                  })
              }
          })
          .then(res => {
              //console.log("reponse :", res); 
             }).catch(error => {
              console.error("eroor",error);
              return { name: "network error", description: "" };
            });
    }
    const onPressItem = (data) =>{
        props.ChangeModalVisible(false),
        props.setData(data.name, data.id)
    }
    const render = renderData.map((item,index)=>{
        return(
            <TouchableOpacity
            style = {styles.option}
            key={item.id}
            onPress={()=>onPressItem(item)}>
                <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
        )
    })
    return(
        <TouchableOpacity
        onPress={()=> props.ChangeModalVisible(false)}
        style={styles.container}>
            <View style={[styles.modal, {width: Width-20, height: heigth/2}]}>
                <ScrollView>
                    {render}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
    },
    modal:{
        backgroundColor:"#A4F5B1",
        borderRadius: 10
    },
    option:{
        alignItems:"flex-start"
    },
    text:{
        margin: 15,
        fontSize: 20,
        fontWeight: "bold"
    }

})
const Width = Dimensions.get('window').width;
const heigth = Dimensions.get('window').height
export default ModalPicker