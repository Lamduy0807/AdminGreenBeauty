import React, {useState, useEffect} from 'react';
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
  Alert,
  RefreshControl
} from 'react-native';
import {scale} from 'react-native-size-matters'
import { AuthContext } from '../Components/context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Modal from "react-native-modal";
const MainBoard = ({navigation}) =>{
    const { signOut } = React.useContext(AuthContext);
    const [Pending, setPending] = useState(0)
    const [Wait, setWait] = useState(0)
    const [Delivery, setDelivery] = useState(0)
    const [Success, setSuccess] = useState(0)
    const [refreshing, setRefreshing] = React.useState(false);
    useEffect(() => {
   
        getData();


    }, [])
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getData().then(() => setRefreshing(false));
      }, []);
    const getData = async () => {
        try {
          getStatus( 1);

          getStatus( 2);

          getStatus( 3);
          
          getStatus( 4);
        } catch(e) {
            alert("no data")
        }
      }
    const getStatus = async(sta)=>
        {
            await fetch ('http://10.0.2.2:8000/order/?status='+sta,
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
                    if(sta==1)
                        setPending(Object.keys(d).length)
                    else if(sta==2)
                        setWait(Object.keys(d).length)
                    else if(sta==3)
                        setDelivery(Object.keys(d).length)
                    else {
                        setSuccess(Object.keys(d).length)
                    }

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
    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{flex:1}}
            refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }>
            <View style={styles.orderstatus}>
                <View style={{flexDirection: "row", margin: 10, justifyContent:"space-between"}}>
                    <View style={{flexDirection: "row"}}>
                        <Feather name='shopping-bag' size={25} color='#14A445'/>
                        <Text style={{fontSize: 20, fontWeight:"700", marginLeft: scale(5), color:'#14A445', alignContent:"center"}}>Order Status</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                        onPress={()=>{navigation.navigate('All')}}>
                            <Text>View All</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={styles.purchased}>
                <TouchableOpacity style={{alignItems: 'flex-end', justifyContent:"center",}}
                onPress={()=>{navigation.navigate('Pending')}}
                >
                    <View style={{alignItems: 'center', justifyContent:"center"}}>
                        <MaterialIcons name="receipt-long" size={scale(35)} color="#B2A7AA"/>
                        <Text style={{marginTop: scale(2), fontSize: scale(7), fontWeight: 'bold'}}>Chờ xác nhận</Text>
                    </View>
                    {Pending>0?
                    <View style={styles.circle}>
                        <Text style={{fontSize: scale(7), fontWeight: 'bold', color:"#FFF"}}>{Pending}</Text>
                    </View>
                    :
                    <View><Text> </Text></View>
                    }
                </TouchableOpacity>

                <TouchableOpacity style={{alignItems: 'flex-end', justifyContent:"center"}}
                onPress={()=>{navigation.navigate('Waiting')}}
                >
                    <View style={{alignItems: 'center', justifyContent:"center"}}>
                        <MaterialIcons name="storefront" size={scale(35)} color="#B2A7AA"/>
                        <Text style={{marginTop: scale(2), fontSize: scale(7), fontWeight: 'bold'}}>Chờ lấy hàng</Text>
                    </View>
                    {Wait>0?
                    <View style={styles.circle}>
                        <Text style={{fontSize: scale(7), fontWeight: 'bold', color:"#FFF"}}>{Wait}</Text>
                    </View>
                    :
                    <View><Text> </Text></View>
                    }
                </TouchableOpacity>

                <TouchableOpacity style={{alignItems: 'flex-end', justifyContent:"center", }}
                onPress={()=>{navigation.navigate('Delivery')}}
                >
                    <View style={{alignItems: 'center', justifyContent:"center"}}>
                        <MaterialCommunityIcons name="truck-outline" size={scale(35)} color="#B2A7AA"/>
                        <Text style={{marginTop: scale(2), fontSize: scale(7), fontWeight: 'bold'}}>Đang giao</Text>
                    </View>
                    {Delivery>0?
                    <View style={styles.circle}>
                        <Text style={{fontSize: scale(7), fontWeight: 'bold', color:"#FFF"}}>{Delivery}</Text>
                    </View>
                    :
                    <View><Text> </Text></View>
                    }
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems: 'flex-end', justifyContent:"center", }}
                onPress={()=>{navigation.navigate('Success')}}
                >
                    <View style={{alignItems: 'center', justifyContent:"center"}}>
                        <MaterialIcons name="star-outline" size={scale(35)} color="#B2A7AA"/>
                        <Text style={{marginTop: scale(2), fontSize: scale(7), fontWeight: 'bold'}}>Thành công</Text>
                    </View>
                    {Success>0?
                    <View style={styles.circle}>
                        <Text style={{fontSize: scale(7), fontWeight: 'bold', color:"#FFF"}}>{Success}</Text>
                    </View>
                    :
                    <View><Text> </Text></View>
                    }
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.orderstatus}>
                <View style={{flexDirection: "row", margin: 10, justifyContent:"space-between"}}>
                    <View style={{flexDirection: "row"}}>
                        <Entypo name='flower' size={25} color='#14A445'/>
                        <Text style={{fontSize: 20, fontWeight:"700", marginLeft: scale(5), color:'#14A445', alignContent:"center"}}>Product</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                        onPress={()=>{navigation.navigate('ProductManage')}}>
                            <Text>View All</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.purchased}>
                    <TouchableOpacity style={{alignItems: 'flex-end', justifyContent:"center",}}
                onPress={()=>{navigation.navigate('AddProduct')}}
                >
                    <View style={{alignItems: 'center', justifyContent:"center"}}>
                        <MaterialIcons name="add-box" size={scale(35)} color="#B2A7AA"/>
                        <Text style={{marginTop: scale(2), fontSize: scale(7), fontWeight: 'bold'}}>Thêm Sản phẩm</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{alignItems: 'flex-end', justifyContent:"center"}}
                onPress={()=>{navigation.navigate('ProductManage')}}
                >
                    <View style={{alignItems: 'center', justifyContent:"center"}}>
                        <Feather name="monitor" size={scale(35)} color="#B2A7AA"/>
                        <Text style={{marginTop: scale(2), fontSize: scale(7), fontWeight: 'bold'}}>Quản lý sản phẩm</Text>
                    </View>
                </TouchableOpacity>

                </View>
            </View>
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <View style={styles.orderstatus1}>
                <View style={{flexDirection: "row", margin: 10, justifyContent:"space-between"}}>
                    <View style={{flexDirection: "row"}}>
                        <AntDesign name='antdesign' size={25} color='#14A445'/>
                        <Text style={{fontSize: 20, fontWeight:"700", marginLeft: scale(5), color:'#14A445', alignContent:"center"}}>Banner</Text>
                    </View>
                    {/* <View>
                        <TouchableOpacity
                        onPress={()=>{navigation.navigate('All')}}>
                            <Text>View All</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>

                <View style={styles.purchased}>
                    <TouchableOpacity style={{alignItems: 'flex-end', justifyContent:"center",}}
                onPress={()=>{navigation.navigate('Banner Manage')}}
                >
                    <View style={{alignItems: 'center', justifyContent:"center"}}>
                        <AntDesign name="edit" size={scale(35)} color="#B2A7AA"/>
                        <Text style={{marginTop: scale(2), fontSize: scale(7), fontWeight: 'bold'}}>Edit Banner</Text>
                    </View>
                </TouchableOpacity>

                </View>
            </View>

            <View style={[styles.orderstatus1, {justifyContent:"center"}]}>
                    <TouchableOpacity style={{alignItems: 'center', justifyContent:"center", alignContent:"center"}}
                onPress={()=>{signOut()}}
                >
                    <View style={{alignItems: 'center', justifyContent:"center",alignContent:"center"}}>
                        <AntDesign name="logout" size={scale(35)} color="#B2A7AA"/>
                        <Text style={{marginTop: scale(2), fontSize: scale(7), fontWeight: 'bold'}}>Đăng xuất</Text>
                    </View>
                </TouchableOpacity>
            </View>
            </View>
            
            </ScrollView>    
        </SafeAreaView>
    )
}
const widthofscreen = Dimensions.get('window').width
const styles= StyleSheet.create({
    orderstatus:{
        flexDirection: "column", 
        width: widthofscreen -20, 
        margin: 10, 
        backgroundColor:"#FFFFFF",
        borderRadius: scale(2),
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 16,
    },
    purchased:{
        marginTop:scale(5),
        flexDirection:"row",
        justifyContent:"space-around",
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5
    },
    circle:{
        height: scale(15),
        width: scale(15),
        borderRadius: scale(10),
        justifyContent:"center",
        alignContent:"flex-end",
        backgroundColor:"#F28244",
        alignItems:"center",
        bottom: scale(40)
    },
    orderstatus1:{
        flexDirection: "column", 
        width: widthofscreen/2 -20, 
        margin: 10, 
        backgroundColor:"#FFFFFF",
        borderRadius: scale(2),
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 16,
    },
})
export default MainBoard;