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
import {scale} from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Status from '../Components/StatusComponent';
const AllOrder = ({navigation, route}) => {
    const [renderData,setRenderData] = useState([]) 

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        GetData();
    },[])
    const GetData = async()=>
          {
              await fetch ('http://10.0.2.2:8000/order/',
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
                      setLoading(false);
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
    const ItemSepatator = () => (
        <View
          style={{
            borderBottomWidth: 0.6,
            borderColor: '#E5E5E5',
          }}
        />
    );
    return(
        <FlatList
        data={renderData}
        ItemSeparatorComponent = {ItemSepatator}
        onRefresh={()=>GetData()}
        refreshing={loading}
        renderItem={({item})=>{
        return(
            <TouchableOpacity
            onPress={()=>navigation.navigate("DetailOrder",{order: item})}
            >
                <Status id={item.id} total={item.totalValue} status={item.status} date={item.dateCreate}/>
            </TouchableOpacity>
        )
        }}
        keyExtractor={(item) => item.id}/>
    )
}


const styles = StyleSheet.create({

});

export default AllOrder;