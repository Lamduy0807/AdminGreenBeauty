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
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scale} from 'react-native-size-matters';
import {AuthContext} from '../Components/context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
const MainBoard = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  const [Pending, setPending] = useState(0);
  const [Wait, setWait] = useState(0);
  const [Delivery, setDelivery] = useState(0);
  const [Success, setSuccess] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState({
    name: 'Loading...',
    id: '',
    avt: 'http://127.0.0.1:8000/media/logo-uit.png',
    phonenum: 'loading...',
    token: '',
  });
  useEffect(() => {
    getData();
    GetInformation();
  }, []);
  const GetInformation = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      const valueid = await AsyncStorage.getItem('id');

      getInfo(valueid, value);
    } catch (e) {
      alert('no data');
    }
  };
  const getInfo = async (id, token) => {
    console.log('token: ', 'Bearer ' + token);
    await fetch('http://10.0.2.2:8000/user/' + id + '/', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status == 200) {
          response.json().then(d => {
            console.log('name: ', Object.keys(d.name).length);
            setData({
              ...data,
              name: d.name,
              phonenum: d.phone,
              avt: d.avt,
            });
          });
        }
      })
      .then(res => {
        //console.log("reponse :", res);
      })
      .catch(error => {
        console.error('eroor', error);
        return {name: 'network error', description: ''};
      });
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData().then(() => setRefreshing(false));
  }, []);
  const getData = async () => {
    try {
      getStatus(1);

      getStatus(2);

      getStatus(3);

      getStatus(4);
    } catch (e) {
      alert('no data');
    }
  };
  const getStatus = async sta => {
    await fetch('http://10.0.2.2:8000/order/?status=' + sta, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status == 200) {
          response.json().then(d => {
            //console.log("status:"+sta+" ", Object.keys(d).length)
            if (sta == 1) setPending(Object.keys(d).length);
            else if (sta == 2) setWait(Object.keys(d).length);
            else if (sta == 3) setDelivery(Object.keys(d).length);
            else {
              setSuccess(Object.keys(d).length);
            }
          });
        }
      })
      .then(res => {
        //console.log("reponse :", res);
      })
      .catch(error => {
        console.error('eroor', error);
        return {name: 'network error', description: ''};
      });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}>
            <Image
              style={{height: 30, width: 30, borderRadius: 30, margin: 5}}
              source={{uri: data.avt.replace('127.0.0.1', '10.0.2.2')}}
            />
            <TouchableOpacity
              style={{margin: 5}}
              onPress={() => {
                signOut();
              }}>
              <AntDesign name="logout" size={30} color="gray" />
            </TouchableOpacity>
          </View>
          <View style={styles.container1}>
            <Image source={require('../img/logoadmin1.png')} />
          </View>
        </View>
        <View style={styles.orderstatus}>
          <View
            style={{
              flexDirection: 'row',
              margin: 10,
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Feather name="shopping-bag" size={25} color="#14A445" />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  marginLeft: scale(5),
                  color: '#14A445',
                  alignContent: 'center',
                }}>
                Order Status
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('All');
                }}>
                <Text>View All</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.purchased}>
            <TouchableOpacity
              style={{alignItems: 'flex-end', justifyContent: 'center'}}
              onPress={() => {
                navigation.navigate('Pending');
              }}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <MaterialIcons
                  name="receipt-long"
                  size={scale(35)}
                  color="#B2A7AA"
                />
                <Text
                  style={{
                    marginTop: scale(2),
                    fontSize: scale(7),
                    fontWeight: 'bold',
                  }}>
                  Chờ xác nhận
                </Text>
              </View>
              {Pending > 0 ? (
                <View style={styles.circle}>
                  <Text
                    style={{
                      fontSize: scale(7),
                      fontWeight: 'bold',
                      color: '#FFF',
                    }}>
                    {Pending}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text> </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={{alignItems: 'flex-end', justifyContent: 'center'}}
              onPress={() => {
                navigation.navigate('Waiting');
              }}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <MaterialIcons
                  name="storefront"
                  size={scale(35)}
                  color="#B2A7AA"
                />
                <Text
                  style={{
                    marginTop: scale(2),
                    fontSize: scale(7),
                    fontWeight: 'bold',
                  }}>
                  Chờ lấy hàng
                </Text>
              </View>
              {Wait > 0 ? (
                <View style={styles.circle}>
                  <Text
                    style={{
                      fontSize: scale(7),
                      fontWeight: 'bold',
                      color: '#FFF',
                    }}>
                    {Wait}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text> </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={{alignItems: 'flex-end', justifyContent: 'center'}}
              onPress={() => {
                navigation.navigate('Delivery');
              }}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <MaterialCommunityIcons
                  name="truck-outline"
                  size={scale(35)}
                  color="#B2A7AA"
                />
                <Text
                  style={{
                    marginTop: scale(2),
                    fontSize: scale(7),
                    fontWeight: 'bold',
                  }}>
                  Đang giao
                </Text>
              </View>
              {Delivery > 0 ? (
                <View style={styles.circle}>
                  <Text
                    style={{
                      fontSize: scale(7),
                      fontWeight: 'bold',
                      color: '#FFF',
                    }}>
                    {Delivery}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text> </Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'flex-end', justifyContent: 'center'}}
              onPress={() => {
                navigation.navigate('Success');
              }}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <MaterialIcons
                  name="star-outline"
                  size={scale(35)}
                  color="#B2A7AA"
                />
                <Text
                  style={{
                    marginTop: scale(2),
                    fontSize: scale(7),
                    fontWeight: 'bold',
                  }}>
                  Thành công
                </Text>
              </View>
              {Success > 0 ? (
                <View style={styles.circle}>
                  <Text
                    style={{
                      fontSize: scale(7),
                      fontWeight: 'bold',
                      color: '#FFF',
                    }}>
                    {Success}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text> </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.orderstatus}>
          <View
            style={{
              flexDirection: 'row',
              margin: 10,
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Entypo name="flower" size={25} color="#14A445" />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  marginLeft: scale(5),
                  color: '#14A445',
                  alignContent: 'center',
                }}>
                Product
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductManage');
                }}>
                <Text>View All</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.purchased}>
            <TouchableOpacity
              style={{alignItems: 'flex-end', justifyContent: 'center'}}
              onPress={() => {
                navigation.navigate('AddProduct');
              }}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <MaterialIcons
                  name="add-box"
                  size={scale(35)}
                  color="#B2A7AA"
                />
                <Text
                  style={{
                    marginTop: scale(2),
                    fontSize: scale(7),
                    fontWeight: 'bold',
                  }}>
                  Thêm Sản phẩm
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{alignItems: 'flex-end', justifyContent: 'center'}}
              onPress={() => {
                navigation.navigate('ProductManage');
              }}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Feather name="monitor" size={scale(35)} color="#B2A7AA" />
                <Text
                  style={{
                    marginTop: scale(2),
                    fontSize: scale(7),
                    fontWeight: 'bold',
                  }}>
                  Quản lý sản phẩm
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.orderstatus1}>
            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <AntDesign name="antdesign" size={25} color="#14A445" />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    marginLeft: scale(5),
                    color: '#14A445',
                    alignContent: 'center',
                  }}>
                  Banner
                </Text>
              </View>
              {/* <View>
                        <TouchableOpacity
                        onPress={()=>{navigation.navigate('All')}}>
                            <Text>View All</Text>
                        </TouchableOpacity>
                    </View> */}
            </View>

            <View style={styles.purchased}>
              <TouchableOpacity
                style={{alignItems: 'flex-end', justifyContent: 'center'}}
                onPress={() => {
                  navigation.navigate('Banner Manage');
                }}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <AntDesign name="edit" size={scale(35)} color="#B2A7AA" />
                  <Text
                    style={{
                      marginTop: scale(2),
                      fontSize: scale(7),
                      fontWeight: 'bold',
                    }}>
                    Edit Banner
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const widthofscreen = Dimensions.get('window').width;
const styles = StyleSheet.create({
  orderstatus: {
    flexDirection: 'column',
    width: widthofscreen - 20,
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: scale(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 16,
    bottom: 110,
  },
  purchased: {
    marginTop: scale(5),
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
  },
  circle: {
    height: scale(15),
    width: scale(15),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignContent: 'flex-end',
    backgroundColor: '#F28244',
    alignItems: 'center',
    bottom: scale(40),
  },
  orderstatus1: {
    flexDirection: 'column',
    width: widthofscreen / 2 - 20,
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: scale(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 16,
    bottom: 110,
  },
  container1: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 90,
  },
});
export default MainBoard;
