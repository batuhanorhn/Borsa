/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,StatusBar,RefreshControl,
  StyleSheet,Dimensions,TouchableOpacity,
  Text,TouchableNativeFeedback,
  View,ScrollView,Image
} from 'react-native';
import { SearchBar } from 'react-native-elements'

const { width, height } = Dimensions.get('window');


export default class App extends Component {

constructor(props){
  super(props);
  this.state = {
    tumVeriDoviz: [],
    tumVeriBorsa: [],
    tumVeriKripto: [],
    refreshing: false,

  }
  this.arrayholder = [];
}
  componentDidMount(){
    this.dovizJSON();
    this.borsaJSON();
    this.kriptoJSON();
  }
  dovizJSON() {
    return fetch('https://www.doviz.com/api/v1/currencies/all/latest')
      .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            tumVeriDoviz: responseJson,
            dolarToTL: responseJson[0].selling
          })
        }
      )
  }
  borsaJSON() {
    return fetch('https://www.doviz.com/api/v1/stocks/all/latest')
      .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            tumVeriBorsa: responseJson
          })
        }
      )
  }
  kriptoJSON() {
    return fetch('https://api.coinmarketcap.com/v1/ticker/')
      .then((responses) => responses.json())
        .then((responseJsons) => {
          this.setState({
            tumVeriKripto: responseJsons
          }, function() {

          // In this block you can do something with new state.
          this.arrayholder = responseJsons ;

        });
        }
      )
  }

  SearchFilterFunction(text){

     const newData = this.arrayholder.filter(function(item){
         const itemData = item.fruit_name.toUpperCase()
         const textData = text.toUpperCase()
         return itemData.indexOf(textData) > -1
     })
     this.setState({
         dataSource: this.state.dataSource.cloneWithRows(newData),
         text: text
     })
 }

  onRefresh = () => {
  this.setState({ refreshing: true });
  this.dovizJSON().then(() => {
    this.setState({ refreshing: false });
  });
  this.dovizJSON().then(() => {
    this.setState({ refreshing: false });
  });
  this.kriptoJSON().then(() => {
    this.setState({ refreshing: false });
  });
    }
  dovizView() {
    return(
      <ScrollView>
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.4, borderColor: '#a9a9a9', }}>
          <Text style={{ color: 'darkgray', fontSize: 18, marginLeft: 10, padding: 10}} >Para Birimi</Text>
          <Text style={{ color: 'darkgray', fontSize: 18, marginLeft: 100, padding: 10}} >Alış</Text>
          <Text style={{ color: 'darkgray', fontSize: 18, marginLeft: 35, padding: 10}} >Durum</Text>
        </View>

      {this.state.tumVeriDoviz.map(json =>
      <View key={json.currency} style={{ flexDirection: 'row', borderBottomWidth: 0.4, borderColor: '#a9a9a9', marginLeft: 7.5, marginRight: 7.5}}>

        <View style={{ flexDirection: 'column' }}>
          <Text key={json.currency} style={styles.welcome}> {json.code} </Text>
          <Text key={json.currency} style={styles.instructions}> {json.full_name} </Text>
        </View>

        <View style={{ flexDirection: 'row', marginLeft: 'auto',  }}>
          <Text key={json.currency} style={{ alignSelf:'center', fontSize: 18, color: '#000' }}> {json.selling.length >5 ? json.selling.toString().substring(0, 6) + '0dsa' :  json.selling.toString().substring(0, 6)} </Text>
          <Image source={ json.change_rate > 0 ? require('./img/sort-up.png') : require('./img/caret-down.png')} style={{ width: 15, height: 15, alignSelf:'center', marginLeft:10, marginRight: 10 }} />
          <Text key={json.currency} style={ json.change_rate > 0 ? { alignSelf:'center', fontSize: 18, color: 'green' } : { alignSelf:'center', fontSize: 18, color: 'red' } }> {json.change_rate.toString().substring(0, 6)}  </Text>
        </View>

      </View>
      )}
    </ScrollView>
    )
  }

  borsaView() {
    return(
      <ScrollView>
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.4, borderColor: '#a9a9a9', }}>
          <Text style={{ color: 'darkgray', fontSize: 18, marginLeft: 10, padding: 10}} >Para Birimi</Text>
          <Text style={{ color: 'darkgray', fontSize: 18, marginLeft: 100, padding: 10}} >Alış</Text>
          <Text style={{ color: 'darkgray', fontSize: 18, marginLeft: 35, padding: 10}} >Durum</Text>
        </View>

      {this.state.tumVeriBorsa.map(borsaj =>
      <View key={borsaj.supply} style={{ flexDirection: 'row', borderBottomWidth: 0.4, borderColor: '#a9a9a9', marginLeft: 7.5, marginRight: 7.5}}>

        <View style={{ flexDirection: 'column' }}>
          <Text key={borsaj.supply} style={styles.welcome}> {borsaj.name} </Text>
          <Text key={borsaj.supply} style={styles.instructions}> {borsaj.full_name} </Text>
        </View>

        <View style={{ flexDirection: 'row', marginLeft: 'auto',  }}>
          <Text key={borsaj.supply} style={{ alignSelf:'center', fontSize: 18, color: '#000' }}> {borsaj.previous_first_seance_closing.length >5 ? borsaj.previous_first_seance_closing.toString().substring(0, 6) + '0dsa' :  borsaj.previous_first_seance_closing.toString().substring(0, 6)} </Text>
          <Image source={ borsaj.change_rate > 0 ? require('./img/sort-up.png') : require('./img/caret-down.png')} style={{ width: 15, height: 15, alignSelf:'center', marginLeft:10, marginRight: 10 }} />
          <Text key={borsaj.currency} style={ borsaj.change_rate > 0 ? { alignSelf:'center', fontSize: 18, color: 'green' } : { alignSelf:'center', fontSize: 18, color: 'red' } }> {borsaj.change_rate.toString().substring(0, 6)}  </Text>
        </View>

      </View>
      )}
    </ScrollView>
    )
  }

// loadMore
// aramafiltreleme
// metarefresh

  kriptoView() {
    return(
      <ScrollView>
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.4, borderColor: '#a9a9a9', }}>
          <Text style={{ color: 'darkgray', fontSize: 18, marginLeft: 10, padding: 10}} >Para Birimi</Text>
          <Text style={{ color: 'darkgray', fontSize: 18, marginLeft: 100, padding: 10}} >Alış</Text>
          <Text style={{ color: 'darkgray', fontSize: 18, marginLeft: 35, padding: 10}} >Durum</Text>
        </View>

      {this.state.tumVeriKripto.map(kriptoj =>
      <View key={kriptoj.supply} style={{ flexDirection: 'row', borderBottomWidth: 0.4, borderColor: '#a9a9a9', marginLeft: 7.5, marginRight: 7.5}}>

        <View style={{ flexDirection: 'column' }}>
          <Text key={kriptoj.supply} style={styles.welcome}> {kriptoj.symbol} </Text>
          <Text key={kriptoj.supply} style={styles.instructions}> {kriptoj.name} </Text>
        </View>

        <View style={{ flexDirection: 'row', marginLeft: 'auto',  }}>
          <Text key={kriptoj.supply} style={{ alignSelf:'center', fontSize: 18, color: '#000' }}> {(kriptoj.price_usd * this.state.dolarToTL).toString().substring(0, 7)} </Text>
          <Image source={ kriptoj.percent_change_1h > 0 ? require('./img/sort-up.png') : require('./img/caret-down.png')} style={{ width: 15, height: 15, alignSelf:'center', marginLeft:10, marginRight: 10 }} />
          <Text key={kriptoj.currency} style={ kriptoj.percent_change_1h > 0 ? { alignSelf:'center', fontSize: 18, color: 'green' } : { alignSelf:'center', fontSize: 18, color: 'red' } }> {kriptoj.percent_change_1h.toString().substring(0, 6)}  </Text>
        </View>

      </View>
      )}
    </ScrollView>
    )
  }



  render() {
    // console.log(this.arrayholder);
    return (
    <View>
      <ScrollView style={{  backgroundColor: 'white',marginBottom: 60 }}
        refreshControl={
          <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    colors={['#ff0000', '#00ff00', '#0000ff']}
                    progressBackgroundColor="#fff"
                  />
          }
        >
        <StatusBar backgroundColor="#204513" barStyle="light-content" />
        <SearchBar  lightTheme clearIcon={{ color: 'darkgray' }} placeholder='Döviz kuru, borsalar, hisse senetleri' containerStyle={{ backgroundColor: '#204513', top: -1 }} inputStyle={{ backgroundColor: 'white' }} />

        {this.state.gorunum === 'doviz' ? this.dovizView() : this.state.gorunum === 'borsa' ? this.borsaView() : this.state.gorunum === 'kripto' ? this.kriptoView() : this.dovizView()}
      </ScrollView>

      <View style={{ flexDirection: 'row', position: 'absolute', width: width, height: 60, backgroundColor: '#204513', elevation: 10, bottom: 0, justifyContent: 'space-around', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => { this.setState({gorunum: 'doviz' }) }}>
          <View style={{ alignItems: 'center' }}>
            <Image source={require('./img/cash1.png')} style={{ width: 25, height: 25 }}/>
            <Text style={{ color: 'white', marginTop: 5 }}>DÖVİZ</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { this.setState({gorunum: 'borsa' }) }} >
          <View style={{ alignItems: 'center' }}>
            <Image source={require('./img/bar-chart1.png')} style={{ width: 25, height: 25 }}/>
            <Text style={{ marginTop: 5, color: 'white' }}>BORSA</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { this.setState({gorunum: 'kripto' }) }} >
          <View style={{ alignItems: 'center' }}>
            <Image source={require('./img/bar-chart1.png')} style={{ width: 25, height: 25 }}/>
            <Text style={{ marginTop: 5, color: 'white' }}>KRİPTO</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderBottomWidth: 10,
    borderColor: 'gray'

  },
  welcome: {
    fontSize: 20,
    // textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 5,
    color: '#000'
  },
  instructions: {
    // textAlign: 'center',
    margin:10,
    marginTop: 2.5,
    color: 'darkgray',
    // marginBottom: 5,
  },
});
