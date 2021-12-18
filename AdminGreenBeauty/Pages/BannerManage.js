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
  Modal, Alert
} from 'react-native';
import {scale} from 'react-native-size-matters'
import { AuthContext } from '../Components/context';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import ModalPicker from '../Components/ModalPicker';
import CheckBox from '@react-native-community/checkbox';
const BannerManage = () =>{
    const [extra, setextra] = useState(0)
    const [listBanner, setListBanner] = useState([]);
    const [listNew, setListNew] = useState([])
    const bs1 = React.createRef();
    const fall1 = new Animated.Value(1);
    useEffect(() => {
        GetData(); 
      }, [])
      const GetData = () =>{
        getBanner().then(re=>{
          setListBanner(re)
        })
      }
      async function getBanner() {
        const apiGetBanner =
          'http://10.0.2.2:8000/banner/';
        try {
          let response = await fetch(apiGetBanner, {
            method: 'GET',
          });
          let responseJson = await response.json();
          console.log("responseJson detail", responseJson)
          return responseJson;
        } catch (error) {
          console.error(`Error is: ${error}`);
        }
    }
    async function DeleteImageBanner(id) {
        const apiPostOrderDetail = 'http://10.0.2.2:8000/banner/'+id+"/";
        try {
          
        let response = await fetch(apiPostOrderDetail, {
            method: 'DELETE',
          });
      
          return true;
        } catch (error) {
          console.error(`Error is: ${error}`);
        }
      }
    const DeleteHandle1 = (index,id) =>{
        Alert.alert('Delete', 'Bạn có muốn xóa hình ảnh?',[
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'OK',
            onPress: () =>{
              setListBanner((prevstate) =>{
                DeleteImageBanner(id)
                console.log("pre", prevstate);
                const remove = prevstate.splice(index, 1)
                console.log("after", prevstate);
                return [...prevstate]
              })
            }
          }
        ])
      }
    const DeleteHandle = (index) =>{
        Alert.alert('Delete', 'Bạn có muốn xóa hình ảnh?',[
            {
              text: 'Cancel',
              style: 'cancel'
            },
            {
              text: 'OK',
              onPress: () =>{
                setListNew((prevstate) =>{
                  console.log("pre", prevstate);
                  const remove = prevstate.splice(index, 1)
                  console.log("after", prevstate);
                  return [...prevstate]
                })
              }
            }
          ])
    }
    const DeleteHandleRealData = (id, index) =>{
        DeleteHandle1(index, id);
    }
    const takePhotoFromCamera1 = async() => {
        ImagePicker.openCamera({
          width: WID,
          height: HEI*0.25,
          cropping: true,
          compressImageQuality: 0.7
        }).then(image => {
          bs1.current.snapTo(1);
          let temp = listNew;
          listNew.push({uri: image.path})
          //console.log(temp)
          
          setextra(extra+1)
          console.log("list",listNew)
          
          return [...listNew]
        });
        
      }
    const choosePhotoFromLibrary1 = async () => {
        ImagePicker.openPicker({
          width: WID,
          height: HEI*0.25,
          cropping: true,
          compressImageQuality: 1
        }).then(image => {
          bs1.current.snapTo(1);
            let temp = listNew;
            listNew.push({uri: image.path})
            
            setextra(extra+1)
            console.log("list",listNew)
            
            return [...listNew]
        });
    }
    const renderInner1 = () => (
        <View style={styles.panel}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.panelTitle}>Upload Photo</Text>
            <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
          </View>
          <TouchableOpacity style={styles.panelButton} 
          onPress={() =>{takePhotoFromCamera1()}}>
            <Text style={styles.panelButtonTitle}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panelButton} onPress={()=>{choosePhotoFromLibrary1()}}>
            <Text style={styles.panelButtonTitle}>Choose From Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => bs1.current.snapTo(1)}>
            <Text style={styles.panelButtonTitle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
      const renderHeader = () => (
        <View style={styles.header}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
          </View>
        </View>
      );
      const AddHadle = () =>{
        listNew.forEach(element=>{
            postImageBanner(element.uri).then(re=>
                {
                    alert("Add successfully!");
                    setListNew([])
                    GetData()
                }
            )
          })
      }
      async function postImageBanner(uri) {
        const apiPostOrderDetail = 'http://10.0.2.2:8000/banner/';
        try {
          var img =  {
            uri: uri,
            type: 'image/jpeg',
            name: 'banner.jpg',
            };
        var form = new FormData();
        form.append("image", img);
        let response = await fetch(apiPostOrderDetail, {
            body: form,
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          });
      
          let responseJson = await response.json();
          return responseJson;
        } catch (error) {
          console.error(`Error is: ${error}`);
        }
      }

    return(
        <SafeAreaView style={{flex:1}}>
            <BottomSheet
                ref={bs1}
                snapPoints={[400, 0]}
                renderContent={renderInner1}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall1}
                enabledGestureInteraction={true}
                />
            <ScrollView>
            <Text style={{fontWeight:"bold", marginLeft: 10, marginTop: 10, fontSize: 20, marginBottom: 5}}>Banner hiện tại</Text>
                {
                listBanner.map((e,index)=>
                <View >
                    <Image
                    key ={e.id}
                    resizeMode='stretch'
                    style={[styles.wrapper,]}
                    source={{uri : e.image.replace("127.0.0.1","10.0.2.2")}}
                    />
                    <TouchableOpacity style={{alignSelf:"flex-end", bottom: HEI *0.2 -3, marginLeft: 5, marginRight: 3}}
                          onPress={()=> DeleteHandleRealData(e.id,index)}
                          >
                          <AntDesign name='closecircle' size={30}/>
                    </TouchableOpacity>
                </View>
                
                )
                }
                <View style={{flexDirection:"row", justifyContent:"space-between"}}> 
                    <Text style={{fontWeight:"bold", marginLeft: 10,  fontSize: 20}}>Đăng tải Banner mới</Text> 
                    <TouchableOpacity style={{flexDirection:"row", alignItems:"center"}}
                    onPress={() => {
                        bs1.current.snapTo(0);
                    }}>
                        <Text style={{fontWeight:"bold", marginRight: 5, fontSize: 20}}>Chọn ảnh</Text>
                        <Feather name = "camera" size={20} style={{marginRight: 5}}/>
                    </TouchableOpacity>
                </View>
            <View style={{flexDirection:"column",marginTop: 5}}>
                        {/* <TouchableOpacity style={{marginLeft: scale(10)}}
                        onPress={() => {
                            bs1.current.snapTo(0);
                        }}
                        >
                            <View style={styles.AddImage}>
                                <Feather name = "camera" size={scale(30)}/>
                                <Text>Thêm ảnh</Text>
                            </View>
                        </TouchableOpacity> */}
                        <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={listNew}
                        extraData={listNew}
                        renderItem={({item, index})=>{
                          console.log("index",index);
                        return(
                            <View style={{alignItems:"flex-end"}}>
                              <Image style={styles.wrapper} source={{uri: item.uri}}/>
                              <TouchableOpacity style={{justifyContent:"flex-end", bottom: HEI *0.2 -3, marginLeft: 5, marginRight: 3}}
                              onPress={()=> DeleteHandle(index)}>
                              <AntDesign name='closecircle' size={30}/>
                              </TouchableOpacity>
                            </View>
                        )
                        }}
                        keyExtractor={(item) => item.index}/>
                    </View>
                
            </ScrollView>
            <TouchableOpacity style={styles.button}
                 onPress={()=>{AddHadle()}}
                >
                    <Text style={{color:"#FFF"}}>Thêm</Text>
                </TouchableOpacity>
        </SafeAreaView>
    )
}
const WID = Dimensions.get("window").width;
const HEI = Dimensions.get("window").height;
const styles = StyleSheet.create({
    wrapper:{
        width: WID ,
        height: HEI *0.2,
      },
      AddImage:{
        height: 90,
        width: 90,
        borderWidth:1,
        borderColor:"#000",
        borderRadius: 10,
        justifyContent:"center",
        alignItems : "center",
        marginTop: 5,
    },
    button:{
        alignItems: "center",
        padding:scale(10),
        backgroundColor:"#14A445",
        marginLeft:30,
        marginRight:30,
        borderRadius:60,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
            height: 2,
          },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 10,
        marginBottom: 10
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
      },
      header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      panelHeader: {
        alignItems: 'center',
      },
      panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
      },
      panelTitle: {
        fontSize: 27,
        height: 35,
      },
      panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
      },
      panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#93F48A',
        alignItems: 'center',
        marginVertical: 7,
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
      },
});
export default BannerManage;