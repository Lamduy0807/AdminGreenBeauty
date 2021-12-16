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
  VirtualizedList,
  Modal
} from 'react-native';
import {scale} from 'react-native-size-matters'
import Entypo from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Product =(props)=>{

    return(
        <View style={{backgroundColor:"white"}}>
            <View style={{flexDirection:"row"}}>
                <Text style={{fontSize: 20, fontWeight:"bold", marginTop: 10, marginLeft: 10, marginBottom: 5, color:'black'}}>#{props.id}</Text>
                {
                    props.isFlashsale?
                    <View style={{flexDirection:"row", marginTop: 10, marginLeft: 40}}>
                        <Entypo name ="flash" color="orange" size={25}/>
                        <Text style={{fontSize: 20,marginLeft:3, fontWeight:"bold", color:"orange"}}>FlashSale</Text>
                    </View>
                    :
                    null
                }
            </View>
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between",}}>
            <Image style = {styles.Image} source={{uri : props.img.replace("127.0.0.1","10.0.2.2")}}/>
            <View style={{flexDirection:"column"}}>
                <Text style={{marginLeft: 10, marginBottom: 5 , width: widthofscreen/3}}
                ellipsizeMode="tail"
                numberOfLines= {1}>{props.name}</Text>
                <Text style={{marginLeft: 10, marginBottom: 10 }}>Giá: {props.price} VNĐ</Text>
            </View>

            {GetStyle(props.isActive)}
        </View>
        </View>
    )
}
const GetStyle = (val) =>{
    if(val)
        return(
            <View style={styles.container1}>
                <Text style={{ fontWeight:"bold", color:"white", fontSize: 20 }}>Active</Text>
            </View>
        )
    else 
        return(
            <View style={styles.container2}>
                <Text style={{ fontWeight:"bold", color:"white", fontSize: 20 }}>Non Active</Text>
            </View>
        )
}
const widthofscreen = Dimensions.get('window').width
const styles = StyleSheet.create({
    container1:{
        padding: 10,
        marginRight: 15,
        borderRadius: 5,
        backgroundColor: "red",
        alignItems:"center",
        justifyContent:"center",
        alignContent:"center",
        width: widthofscreen/3.5
    },
    container2:{
        padding: 10,
        marginRight: 15,
        borderRadius: 5,
        backgroundColor: "#C7CB14",
        alignItems:"center",
        justifyContent:"center",
        alignContent:"center",
        width: widthofscreen/3.5
    },
    container3:{
        padding: 10,
        marginRight: 15,
        borderRadius: 5,
        backgroundColor: "blue",
        alignItems:"center",
        justifyContent:"center",
        alignContent:"center",
        width: widthofscreen/3.5
    },
    container4:{
        padding: 10,
        marginRight: 15,
        borderRadius: 5,
        backgroundColor: "green",
        alignItems:"center",
        justifyContent:"center",
        alignContent:"center",
        width: widthofscreen/3.5
    },
    container5:{
        padding: 10,
        marginRight: 15,
        borderRadius: 5,
        backgroundColor: "#8553D8",
        alignItems:"center",
        justifyContent:"center",
        alignContent:"center",
        width: widthofscreen/3.5
    },
    Image:{
        width: scale(70),
        height: scale(70),
        margin: 10,
      }
})
export default Product;