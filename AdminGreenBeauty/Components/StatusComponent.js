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
const Status =(props)=>{

    return(
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", backgroundColor:"white"}}>
            <View style={{flexDirection:"column"}}>
                <Text style={{fontSize: 20, fontWeight:"bold", marginTop: 10, marginLeft: 10, marginBottom: 5, color:'black'}}>#{props.id}</Text>
                <Text style={{marginLeft: 10, marginBottom: 5 }}>Ngày đặt: {props.date}</Text>
                <Text style={{marginLeft: 10, marginBottom: 10 }}>Tổng tiền: {props.total} VNĐ</Text>
            </View>

            {GetStyle(props.status)}
        </View>
    )
}
const GetStyle = (val) =>{
    if(val==1)
        return(
            <View style={styles.container1}>
                <Text style={{ fontWeight:"bold", color:"white", fontSize: 20 }}>Pending</Text>
            </View>
        )
    else if(val==2)
        return(
            <View style={styles.container2}>
                <Text style={{ fontWeight:"bold", color:"white", fontSize: 20 }}>Ready</Text>
            </View>
        )
    else if(val==3)
        return(
            <View style={styles.container3}>
                <Text style={{ fontWeight:"bold", color:"white", fontSize: 20 }}>Delivering</Text>
            </View>
        )
    else if(val==4)
        return(
            <View style={styles.container4}>
                <Text style={{ fontWeight:"bold", color:"white", fontSize: 20 }}>Success</Text>
            </View>
        )
    else if(val==5)
        return(
            <View style={styles.container5}>
                <Text style={{ fontWeight:"bold", color:"white", fontSize: 20 }}>Cancel</Text>
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
    }
})
export default Status;