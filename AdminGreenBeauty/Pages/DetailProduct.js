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
const DetailProduct = ({navigation, route}) =>{

    const [extra, setextra] = useState(0)
    const [isChange, setisChange] = useState(false)
    const [Img, setImg] = useState(null)
    const [listImg, setListImg] = useState([])
    const [listalready, setListAlready] = useState([])
    const [chooseData, setChooseData] = useState('Select category...')
    const [categoriID, setCategoriID] = useState()
    const [isModalVisible, setisModalVisible] = useState(false)
    const bs = React.createRef();
    const fall = new Animated.Value(1);
    const bs1 = React.createRef();
    const fall1 = new Animated.Value(1);
    const [product, setProduct] = useState({
      name: "",
      des:"",
      price:"",
      quantity:"",
      instruction:"",
      Ingredient:"",
      origin:"",
      sold:"0",
      isActive: false,
      isFlashsale: false,
      priceSale: ""
    })

    useEffect(() => {
        GetData()
    }, [])
    const GetData = ()=>{
        setProduct({
            ...product,
            name: route.params.product.name,
            des:route.params.product.description,
            price:route.params.product.price,
            quantity:route.params.product.quantity,
            instruction:route.params.product.instruction,
            Ingredient:route.params.product.Ingredient,
            origin:route.params.product.origin,
            isActive: route.params.product.IsActive,
            isFlashsale: route.params.product.IsFlashsale,
            priceSale: route.params.product.priceSale,
        });
        setImg(route.params.product.imagepresent.replace("127.0.0.1","10.0.2.2"))
        setCategoriID(route.params.product.category)
        getCategoryId(route.params.product.category).then(re=>{
            setChooseData(re.name)
        })
        getListImgbyId(route.params.product.id).then(re=>{
            setListAlready(re)
        })

    }
    async function getCategoryId(id) {
        const apiGetDetailById =
          'http://10.0.2.2:8000/category/' + id ;
        try {
          let response = await fetch(apiGetDetailById, {
            method: 'GET',
          });
          let responseJson = await response.json();
          console.log("responseJson detail", responseJson)
          return responseJson;
        } catch (error) {
          console.error(`Error is: ${error}`);
        }
      }
      async function getListImgbyId(id) {
        const apiGetDetailById =
          'http://10.0.2.2:8000/img/?product=' + id ;
        try {
          let response = await fetch(apiGetDetailById, {
            method: 'GET',
          });
          let responseJson = await response.json();
          console.log("responseJson detail", responseJson)
          return responseJson;
        } catch (error) {
          console.error(`Error is: ${error}`);
        }
      }
    const ChangeModalVisible = (bool) =>{
      setisModalVisible(bool)
    }
    const takePhotoFromCamera = async() => {
        ImagePicker.openCamera({
          compressImageMaxWidth: 300,
          compressImageMaxHeight: 300,
          cropping: true,
          compressImageQuality: 0.7
        }).then(image => {
          bs.current.snapTo(1);
          setImg(image.path)
          setisChange(true)
        });
        
      }
    const takePhotoFromCamera1 = async() => {
        ImagePicker.openCamera({
          compressImageMaxWidth: 300,
          compressImageMaxHeight: 300,
          cropping: true,
          compressImageQuality: 0.7
        }).then(image => {
          bs1.current.snapTo(1);
          let temp = listImg;
          listImg.push({uri: image.path})
          //console.log(temp)
          
          setextra(extra+1)
          console.log("list",listImg)
          
          return [...listImg]
        });
        
      }
    const choosePhotoFromLibrary = async () => {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          compressImageQuality: 0.7
        }).then(image => {
          setImg(image.path);
          bs.current.snapTo(1);
          setisChange(true)
        });
    }
    const choosePhotoFromLibrary1 = async () => {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        compressImageQuality: 0.7
      }).then(image => {
        bs1.current.snapTo(1);
          let temp = listImg;
          listImg.push({uri: image.path})
          
          setextra(extra+1)
          console.log("list",listImg)
          
          return [...listImg]
      });
  }
    const renderInner = () => (
        <View style={styles.panel}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.panelTitle}>Upload Photo</Text>
            <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
          </View>
          <TouchableOpacity style={styles.panelButton} 
          onPress={() =>{takePhotoFromCamera()}}>
            <Text style={styles.panelButtonTitle}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panelButton} onPress={()=>{choosePhotoFromLibrary()}}>
            <Text style={styles.panelButtonTitle}>Choose From Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => bs.current.snapTo(1)}>
            <Text style={styles.panelButtonTitle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
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
    const DeleteHandle = (index) =>{
      Alert.alert('Delete', 'Bạn có muốn xóa hình ảnh?',[
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () =>{
            setListImg((prevstate) =>{
              console.log("pre", prevstate);
              const remove = prevstate.splice(index, 1)
              console.log("after", prevstate);
              return [...prevstate]
            })
          }
        }
      ])
    }
    const DeleteHandle1 = (index) =>{
        Alert.alert('Delete', 'Bạn có muốn xóa hình ảnh?',[
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'OK',
            onPress: () =>{
              setListAlready((prevstate) =>{
                console.log("pre", prevstate);
                const remove = prevstate.splice(index, 1)
                console.log("after", prevstate);
                return [...prevstate]
              })
            }
          }
        ])
      }
    const setData = (name, id) =>{
      setChooseData(name);
      setCategoriID(id)
    }
    const HandleProductName = (val) =>{
      setProduct({
        ...product,
        name: val
      })
    }
    const HandleProductDescription = (val) =>{
      setProduct({
        ...product,
        des: val
      })
    }
    const HandleProductPrice = (val) =>{
      setProduct({
        ...product,
        price: val
      })
    }
    const HandleProductQuantity = (val) =>{
      setProduct({
        ...product,
        quantity: val
      })
    }
    const HandleProductIntruction = (val) =>{
      setProduct({
        ...product,
        instruction: val
      })
    }
    const HandleProductOrigin = (val) =>{
      setProduct({
        ...product,
        origin: val
      })
    }
    const HandleProductIngredients = (val) =>{
      setProduct({
        ...product,
        Ingredient: val
      })
    }
    const HandlePriceSale = (val)=>{
        setProduct({
            ...product,
            priceSale: val
        })
    }
    const AddHadle = () =>{
        console.log("product", product);
        postProduct(route.params.product.id).then(re=>{
          console.log("list ", listImg)

          listImg.forEach(element=>{
            console.log("chạy vô hàm này");
            console.log("element ",element.uri);
            console.log("id ", re.id);
            postImageProduct(element.uri, re.id)
          })
          
          alert("add success")
  
        })

    }
    const DeleteHandleRealData = (val,index) =>{
        DeleteImageProduct(val);
        DeleteHandle1(index)
    }
    async function postProduct(id) {
      const apiPostOrderDetail = 'http://10.0.2.2:8000/product/'+ id+"/";
      try {
        var form = new FormData();
        if(isChange)
           {
                var img =  {
                uri: Img,
                type: 'image/jpeg',
                name: 'photo.jpg',
                };
                console.log("chạy vô hàm này",Img.replace("10.0.2.2","127.0.0.1"));
                form.append("imagepresent", img);
                form.append("name", product.name)
                form.append("description", product.des)
                form.append("price", product.price)
                form.append("sold", product.sold)
                form.append("quantity", product.quantity)
                form.append("instruction", product.instruction)
                form.append("Ingredient", product.Ingredient)
                form.append("origin", product.origin)
                form.append("category", categoriID)
                form.append("IsActive", product.isActive)
                form.append("IsFlashsale", product.isFlashsale)
                form.append("priceSale", product.priceSale)
            }
        else
            {
                form.append("name", product.name)
                form.append("description", product.des)
                form.append("price", product.price)
                form.append("sold", product.sold)
                form.append("quantity", product.quantity)
                form.append("instruction", product.instruction)
                form.append("Ingredient", product.Ingredient)
                form.append("origin", product.origin)
                form.append("category", categoriID)
                form.append("IsActive", product.isActive)
                form.append("IsFlashsale", product.isFlashsale)
                form.append("priceSale", product.priceSale)
            }
      
      
      let response = await fetch(apiPostOrderDetail, {
          body: form,
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data',
            //Authorization: 'Bearer ' + user.userToken,
          },
        });
    
        let responseJson = await response.json();
        return responseJson;
      } catch (error) {
        console.error(`Error is: ${error}`);
      }
    }
    async function postImageProduct(uri,id) {
      const apiPostOrderDetail = 'http://10.0.2.2:8000/img/';
      try {
        var img =  {
          uri: uri,
          type: 'image/jpeg',
          name: 'photo.jpg',
          };
      var form = new FormData();
      form.append("img", img);
      form.append("product", id);
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
    async function DeleteImageProduct(id) {
        const apiPostOrderDetail = 'http://10.0.2.2:8000/img/'+id+"/";
        try {
          
        let response = await fetch(apiPostOrderDetail, {
            method: 'DELETE',
          });
      
          return true;
        } catch (error) {
          console.error(`Error is: ${error}`);
        }
      }
    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{flex: 1}}>
                <BottomSheet
                ref={bs}
                snapPoints={[400, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
                />
                <BottomSheet
                ref={bs1}
                snapPoints={[400, 0]}
                renderContent={renderInner1}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall1}
                enabledGestureInteraction={true}
                />
                <View style={{flexDirection:"row", alignItems:"center",marginTop: 10}}>
                            <Text style={{marginLeft: 10,marginRight:scale(5),fontWeight:"bold" }}>Active</Text>
                            <CheckBox disabled={false} 
                                value={product.isActive}
                                onValueChange={()=> {setProduct({
                                    ...product,
                                    isActive: !product.isActive
                                })}}
                                />             
                </View>
                
                <View style={{flexDirection:"column"}}>
                    <Text style={{fontWeight:"bold", marginLeft: 10, marginTop: 10,}}>Tên sản phẩm</Text>
                    <TextInput style={styles.wrapper}
                    placeholder='Enter the Product name'
                    defaultValue={product.name}
                    onChangeText={(val)=>HandleProductName(val)}/>
                </View>
                <View style={{flexDirection:"column",}}>
                    <Text style={{fontWeight:"bold", marginLeft: 10, marginTop: 10,}}>Mô tả sản phẩm</Text>
                    <TextInput style={styles.longwrapper}
                    multiline={true}
                    placeholder="Enter Product's descriptions"
                    defaultValue={product.des}
                    onChangeText={(val)=>HandleProductDescription(val)}/>
                </View>
                <View style={{flexDirection:"row"}}>
                <View style={{flexDirection:"column"}}>
                    <Text style={{fontWeight:"bold", marginLeft: 10, marginTop: 10,}}>Giá sản phẩm</Text>
                    <TextInput style={styles.shortwrapper}
                    placeholder='Product price'
                    keyboardType='numeric'
                    defaultValue={product.price.toString()}
                    onChangeText={(val)=>HandleProductPrice(val)}/>
                </View>
                <View style={{flexDirection:"column"}}>
                    <Text style={{fontWeight:"bold", marginLeft: 10, marginTop: 10,}}>Số lượng sản phẩm</Text>
                    <TextInput style={styles.shortwrapper}
                    placeholder='Qualities'
                    keyboardType='numeric'
                    defaultValue={product.quantity.toString()}
                    onChangeText={(val)=>HandleProductQuantity(val)}
                />
                </View>
                </View>
                
                <View style={{flexDirection:"row",alignItems:"center"}}>
                <View style={{flexDirection:"row", alignItems:"center",marginTop: 10}}>
                            <Text style={{marginLeft: 10,marginRight:scale(5),fontWeight:"bold" }}>FlashSale</Text>
                            <CheckBox disabled={false} 
                                value={product.isFlashsale}
                                onValueChange={()=> {setProduct({
                                    ...product,
                                    isFlashsale: !product.isFlashsale
                                })}}
                                />             
                </View>
                <View style={{flexDirection:"column"}}>
                    <Text style={{fontWeight:"bold", marginLeft: 10, marginTop: 10,}}>Giá Flashsale</Text>
                    <TextInput style={styles.shortwrapper}
                    placeholder='Price flashsale'
                    keyboardType='numeric'
                    defaultValue={product.priceSale.toString()}
                    onChangeText={(val)=>HandlePriceSale(val)}
                />
                </View>
                </View>

                <View style={{flexDirection:"column",}}>
                    <Text style={{fontWeight:"bold", marginLeft: 10, marginTop: 10,}}>Hướng dẫn sử dụng</Text>
                    <TextInput style={styles.longwrapper}
                    multiline={true}
                    placeholder="Enter Product's instruction"
                    defaultValue={product.instruction}
                    onChangeText={(val)=>HandleProductIntruction(val)}
                    />
                </View>
                <View style={{flexDirection:"row"}}>
                  <View style={{flexDirection:"column"}}>
                      <Text style={{fontWeight:"bold", marginLeft: 10, marginTop: 10,}}>Xuất xứ</Text>
                      <TextInput style={styles.shortwrapper}
                      placeholder='Origin'
                      defaultValue={product.origin}
                      onChangeText={(val)=>HandleProductOrigin(val)}
                      />
                  </View>
                  <View style={{flexDirection:"column"}}>
                      <Text style={{fontWeight:"bold", marginLeft: 10, marginTop: 10,}}>Loại sản phẩm</Text>
                      <TouchableOpacity style={styles.shortwrapper}
                      onPress={()=> ChangeModalVisible(true)}
                      >
                      <Text>{chooseData}</Text>
                      </TouchableOpacity>
                      <Modal
                      transparent={true}
                      animationType='fade'
                      visible={isModalVisible}
                      nRequestClose = {() => ChangeModalVisible(false)}
                      >
                        <ModalPicker ChangeModalVisible = {ChangeModalVisible}
                         setData ={setData}/>
                      </Modal>
                  </View>
                </View>
                
                <View style={{flexDirection:"column",}}>
                    <Text style={{fontWeight:"bold", marginLeft: 10, marginTop: 10,}}>Thành phần hóa học</Text>
                    <TextInput style={styles.longwrapper}
                    multiline={true}
                    placeholder="Enter Product's ingredients"
                    defaultValue={product.Ingredient}
                    onChangeText={(val)=>HandleProductIngredients(val)}/>
                </View>
                <View style={{flexDirection:"column",}}>
                    <Text style={{fontWeight:"bold", marginLeft: 10, marginTop: 10,}}>Hình ảnh đại diện</Text>
                    <View style={{flexDirection: "row"}}>
                        <TouchableOpacity style={{marginLeft: scale(10)}}
                        onPress={() => {
                            bs.current.snapTo(0);
                        }}
                        >
                            <View style={styles.AddImage}>
                                <Feather name = "camera" size={scale(30)}/>
                                <Text>Thêm ảnh</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.image}>
                            <Image style={styles.Img} source={{uri: Img}}/>
                        </View>
                    </View>
                    
                </View>
                <View style={{flexDirection:"column",}}>
                    <Text style={{fontWeight:"bold", marginLeft: 10, marginTop: 10,}}>Hình ảnh chi tiết</Text>
                    <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={listalready}
                    extraData={listalready}
                    renderItem={({item, index})=>{
                      console.log("index",index);
                    return(
                        <View style={{alignItems:"flex-end"}}>
                          <Image style={styles.Img1} source={{uri: item.img.replace("127.0.0.1","10.0.2.2")}}/>
                          <TouchableOpacity style={{justifyContent:"flex-end", bottom: 87, marginLeft: 5, marginRight: 3}}
                          onPress={()=> DeleteHandleRealData(item.id,index)}
                          >
                          <AntDesign name='closecircle' size={30}/>
                          </TouchableOpacity>
                        </View>
                    )
                    }}
                    keyExtractor={(item) => item.index}/>
                </View>
                <View style={{flexDirection:"row", bottom: 5}}>
                        <TouchableOpacity style={{marginLeft: scale(10)}}
                        onPress={() => {
                            bs1.current.snapTo(0);
                        }}
                        >
                            <View style={styles.AddImage}>
                                <Feather name = "camera" size={scale(30)}/>
                                <Text>Thêm ảnh</Text>
                            </View>
                        </TouchableOpacity>
                        <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={listImg}
                        extraData={listImg}
                        renderItem={({item, index})=>{
                          console.log("index",index);
                        return(
                            <View style={{alignItems:"flex-end"}}>
                              <Image style={styles.Img1} source={{uri: item.uri}}/>
                              <TouchableOpacity style={{justifyContent:"flex-end", bottom: 87, marginLeft: 5, marginRight: 3}}
                              onPress={()=> DeleteHandle(index)}>
                              <AntDesign name='closecircle' size={30}/>
                              </TouchableOpacity>
                            </View>
                        )
                        }}
                        keyExtractor={(item) => item.index}/>
                    </View>
                <TouchableOpacity style={styles.button}
                 onPress={()=>{AddHadle()}}
                >
                    <Text style={{color:"#FFF"}}>Sửa</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}
const widthofscreen = Dimensions.get('window').width
const styles = StyleSheet.create({
    wrapper:{
        borderColor:"gray",
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginTop: 5,
        marginLeft: 10,
        alignItems: "center", 
        marginBottom: 10,
        width: widthofscreen -20,
    },
    longwrapper:{
        borderColor:"gray",
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginTop: 5,
        marginLeft: 10,
        marginBottom: 10,
        width: widthofscreen -20,
        paddingHorizontal: 5,
        height: scale(60)
    },
    shortwrapper:{
        borderColor:"gray",
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginTop: 5,
        marginLeft: 10,
        alignItems: "center", 
        marginBottom: 10,
        width: widthofscreen/3,
    },
    image:{
        width: 90,
        height: 90,
        borderWidth: 1,
        marginTop: 5,
        marginLeft: 10,
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
      Img:{
        width:90,
        height:90,
        resizeMode: "cover",
      },
      Img1:{
        width:90,
        height:90,
        resizeMode: "cover",
        marginTop: 5,
        marginLeft: 5,
    },
})


export default DetailProduct;