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
  Modal,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductOrder from '../Components/ProductOrder';
const DetailOrder = ({navigation, route}) => {
  const [delivery, setDelivery] = useState({
    receiveName: 'loading',
    phone: 'loading',
    fullAddress: 'Loading',
  });
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const getData = () => {
      getDeliveryInformation(route.params.order.delivery).then(result => {
        setDelivery(result);
      });
      getDetailById(route.params.order.id).then(result => {
        setProduct(result);
      });
    };
    // console.log(route.params.order.totalValue)

    getData();
  }, []);
  async function getDeliveryInformation(id) {
    const apigetDeliveryInformation =
      'http://10.0.2.2:8000/delivery/' + id + '/';
    try {
      let response = await fetch(apigetDeliveryInformation, {
        method: 'GET',
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(`Error is: ${error}`);
    }
  }
  //console.log("detail", product)
  async function getDetailById(id) {
    const apiGetDetailById = 'http://10.0.2.2:8000/detailorder/?order=' + id;
    try {
      let response = await fetch(apiGetDetailById, {
        method: 'GET',
      });
      let responseJson = await response.json();
      console.log('responseJson detail', responseJson);
      return responseJson;
    } catch (error) {
      console.error(`Error is: ${error}`);
    }
  }
  async function Confirm(id, sta) {
    const apiAddAddress = 'http://10.0.2.2:8000/order/' + id + '/';
    try {
      let response = await fetch(apiAddAddress, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          status: sta,
        }),
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(`Error is: ${error}`);
    }
  }
  async function ConfirmDelivery(id) {
    const apiAddAddress = 'http://10.0.2.2:8000/order/' + id + '/';
    try {
      var today = new Date();
      var date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
      let response = await fetch(apiAddAddress, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          status: 4,
          dateReceive: date,
        }),
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(`Error is: ${error}`);
    }
  }
  return (
    <View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'column',
            marginTop: 5,
            backgroundColor: 'white',
          }}>
          <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 5}}>
            <MaterialCommunityIcons
              name="truck-fast-outline"
              size={scale(15)}
            />
            <Text style={{fontWeight: '700', marginLeft: 5}}>
              Th??ng tin v???n chuy???n
            </Text>
          </View>
          <Text style={{marginTop: 10, marginLeft: 5, marginBottom: 5}}>
            COD Nhanh
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginTop: 5,
            backgroundColor: 'white',
          }}>
          <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 5}}>
            <Ionicons name="md-location-outline" size={scale(15)} />
            <Text style={{fontWeight: '700', marginLeft: 5}}>
              ?????a ch??? nh???n h??ng
            </Text>
          </View>
          <View style={{marginTop: 10, marginLeft: 20, marginBottom: 5}}>
            <Text>{delivery.receiveName}</Text>
            <Text>{delivery.phone}</Text>
            <Text>{delivery.fullAddress}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginTop: 5,
            backgroundColor: 'white',
          }}>
          {product.map(item => {
            //console.log("id",item.id)
            return (
              <ProductOrder
                key={item.id}
                quanlity={item.quantities}
                id={item.product}
              />
            );
          })}
          <View
            style={{
              marginTop: 5,
              marginLeft: 5,
              marginBottom: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: 'bold', marginLeft: 5}}>Th??nh ti???n</Text>
            <Text style={{marginRight: 5}}>
              ??{route.params.order.totalValue}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginTop: 5,
            backgroundColor: 'white',
          }}>
          <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 5}}>
            <MaterialIcons
              name="attach-money"
              size={scale(15)}
              color="#F28244"
            />
            <Text style={{fontWeight: '700', marginLeft: 5}}>
              Ph????ng th???c thanh to??n
            </Text>
          </View>
          <Text style={{marginTop: 10, marginLeft: 10, marginBottom: 5}}>
            Thanh to??n khi nh???n h??ng
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginTop: 5,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              marginLeft: 5,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '700', marginLeft: 5}}>M?? ????n h??ng</Text>
            <Text style={{marginRight: 5}}>#{route.params.order.id}</Text>
          </View>

          <View
            style={
              route.params.order.status == 4
                ? {
                    flexDirection: 'row',
                    marginTop: 5,
                    marginLeft: 5,
                    justifyContent: 'space-between',
                  }
                : {
                    flexDirection: 'row',
                    marginTop: 5,
                    marginLeft: 5,
                    justifyContent: 'space-between',
                    marginBottom: 5,
                  }
            }>
            <Text style={{marginLeft: 5}}>Th???i gian ?????t</Text>
            <Text style={{marginRight: 5}}>
              {route.params.order.dateCreate}
            </Text>
          </View>

          {route.params.order.status == 4 ? (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                marginLeft: 5,
                justifyContent: 'space-between',
                marginBottom: 5,
              }}>
              <Text style={{marginLeft: 5}}>Th???i gian nh???n h??ng</Text>
              <Text style={{marginRight: 5}}>
                {route.params.order.dateReceive}
              </Text>
            </View>
          ) : null}
          {route.params.order.status == 5 ? (
            <View
              style={{
                flexDirection: 'column',
                marginTop: 5,
                backgroundColor: 'white',
              }}>
              <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 5}}>
                <MaterialIcons
                  name="eject"
                  size={scale(15)}
                  color="#F28244"
                />
                <Text style={{fontWeight: '700', marginLeft: 5}}>
                  L?? do h???y ????n
                </Text>
              </View>
              <Text style={{marginTop: 10, marginLeft: 10, marginBottom: 5}}>
                {route.params.order.cancellationReason}
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
      <View style={{width: '100%', alignItems: 'center'}}>
        {route.params.order.status == 1 ? (
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              Confirm(route.params.order.id, 2).then(re => {
                alert('Confirm order sucessfully');
              });
            }}>
            <Text>X??c nh???n ????n h??ng</Text>
          </TouchableOpacity>
        ) : null}
        {route.params.order.status == 2 ? (
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              Confirm(route.params.order.id, 3).then(re => {
                alert('Confirm to Delivery successfully');
              });
            }}>
            <Text>???? ????ng g??i</Text>
          </TouchableOpacity>
        ) : null}
        {route.params.order.status == 3 ? (
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              ConfirmDelivery(route.params.order.id).then(re => {
                alert('Confirm Successfully');
              });
            }}>
            <Text>???? giao h??ng</Text>
          </TouchableOpacity>
        ) : null}
        {/* {
                    route.params.order.status==4?
                    <TouchableOpacity style={styles.Button}
                    //nPress={()=>{navigation.navigate('Rating',{detail: product})}}
                    >
                        <Text></Text>
                    </TouchableOpacity>
                    :
                    null
                } */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Button: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: scale(10),
    backgroundColor: '#FFF',
    borderRadius: scale(3),
    margin: scale(10),
    borderColor: '#14A445',
    borderWidth: 1,
    width: '40%',
  },
});
export default DetailOrder;
