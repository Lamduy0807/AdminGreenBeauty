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
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Product from '../Components/ProductComponent';
const ProductManage = ({navigation, route}) => {
    const [renderData,setRenderData] = useState([]) 
    const [loading, setLoading] = useState(true)
    const [isSearch, setIsSearch] = useState(false)
    const [searchData, setsearchData] = useState([])
    const [searchtext, setsearchtext] = useState("")
    useEffect(() => {
        GetData();
    },[])
    const GetData = async()=>
          {
              await fetch ('http://10.0.2.2:8000/product',
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
    const HandleSearchText = (val) =>{
        setsearchtext(val)
        getSearchProduct(val).then(re=>{
            setsearchData(re)
        })
    }
    async function getSearchProduct(query) {
        const apiSearchProduct =
          'http://10.0.2.2:8000/product/?search=' +
          query +
          '&ordering=price';
        if (query != '') {
          try {
            let response = await fetch(apiSearchProduct, {method: 'GET'});
            let responseJson = await response.json();
            return responseJson;
          } catch (error) {
            console.error(`Error is: ${error}`);
          }
        }
      }
    return(
        <SafeAreaView>
            <View>
                <View style={{justifyContent:"space-between", alignItems:"center",flexDirection:"row",margin: 10, width: Dimensions.get("window").width-30, borderWidth: 0.5, borderRadius: 20, backgroundColor:"white"}}>
                    <TextInput style={{color:"gray", marginLeft: 5}}
                    placeholder="Search Here..."
                    keyboardType={'default'}
                    onChangeText={(val)=>{HandleSearchText(val)}}></TextInput>
                    <TouchableOpacity>
                        <EvilIcons style={{ marginRight: 15}} name ='search' size={20}/>
                    </TouchableOpacity>
                </View>
            </View>
            {
                searchtext!=""?
                <FlatList
                data={searchData}
                extraData={searchData}
                ItemSeparatorComponent = {ItemSepatator}
                onRefresh={()=> GetData()}
                refreshing={loading}
                renderItem={({item})=>{
                return(
                    <TouchableOpacity
                onPress={()=>navigation.navigate("Detail Product",{product: item})}
                    >
                        <Product id={item.id} price={item.price} isActive={item.IsActive} name={item.name} img ={item.imagepresent} isFlashsale={item.IsFlashsale}/>
                    </TouchableOpacity>
                )
                }}
                keyExtractor={(item) => item.id}/>
                :
                <FlatList
                data={renderData}
                ItemSeparatorComponent = {ItemSepatator}
                onRefresh={()=> GetData()}
                refreshing={loading}
                renderItem={({item})=>{
                return(
                    <TouchableOpacity
                onPress={()=>navigation.navigate("Detail Product",{product: item})}
                    >
                        <Product id={item.id} price={item.price} isActive={item.IsActive} name={item.name} img ={item.imagepresent} isFlashsale={item.IsFlashsale}/>
                    </TouchableOpacity>
                )
                }}
                keyExtractor={(item) => item.id}/>
            }
        </SafeAreaView>
        
    )
}


const styles = StyleSheet.create({

});

export default ProductManage;