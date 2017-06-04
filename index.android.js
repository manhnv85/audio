import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight,PanResponder,
    Animated,
    Dimensions,Alert } from 'react-native';
import ListView from './src/ListView';

var RCTAudio = require('react-native-player');
var Sound = require('react-native-sound');
import Swiper from 'react-native-swiper';

class TodoApp extends Component {

  constructor(props){
    super(props);
    Sound.setCategory('Ambient', true); // true = mixWithOthers
    this.playSoundBundle = () => {
      
    };

    this.state = {
        showDraggable   : true,     //Step 1
        dropZoneValues  : null,
        pan     : new Animated.ValueXY()   //Step 1
    };

    this.panResponder = PanResponder.create({    //Step 2
        onStartShouldSetPanResponder : () => true,
        onPanResponderMove           : Animated.event([null,{ //Step 3
            dx : this.state.pan.x,
            dy : this.state.pan.y
        }]),
        onPanResponderRelease           : (e, gesture) => {
            if(this.isDropZone(gesture)){ //Step 1
                this.setState({
                    showDraggable : false //Step 3
                });
                Alert.alert(
                  'Thong Bao',
                  'Drop hoan thanh',
                  [
                    {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                );
            }else{
                Animated.spring(
                    this.state.pan,
                    {toValue:{x:0,y:0}}
                ).start();
            }
        }
    });
  }

  isDropZone(gesture){     //Step 2
    var dz = this.state.dropZoneValues;
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
}

  onPlay(){
    RCTAudio.prepare("https://noidung.tienganh123.com/file/baihoc/vocabulary/6000/bai2/famous-for-its-unique-culture.mp3", true);
    RCTAudio.start();
  }

  onPlay2(){
    const s = new Sound('for_ex3.mp3', Sound.MAIN_BUNDLE, (e) => {
        if (e) {
          console.log('error', e);
        } else {
          //s.setSpeed(1);
          console.log('duration', s.getDuration());
          s.play(() => s.release()); // Release when it's done so we're not using up resources
        }
      });

  }

  renderDraggable(){
        //if(this.state.showDraggable){ 
        return (
            <View style={styles.draggableContainer}>
                <Animated.View 
                {...this.panResponder.panHandlers}                       
                style={[this.state.pan.getLayout(), styles.circle]}>    
                    
                    <Text style={styles.text}>Drag me!</Text>
                </Animated.View>
            </View>
        );
        //}
    }

    setDropZoneValues(event){      //Step 1
      this.setState({
          dropZoneValues : event.nativeEvent.layout
      });
  }
  render() {
    const arr =[1,2,3];
    var str = [];
    for(let i = 0; i < 5; i++){
      str.push(<View key={i} style={styles.slide2}><Text>{i}</Text></View>);
    }
    return (
      <Swiper style={styles.wrapper} showsButtons={true}>
      {/*<View style={styles.slide1}>
        <TouchableHighlight onPress={() => this.onPlay()} style={{margin: 20}}>
          <Text>Play Audio</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this.onPlay2()}>
          <Text>Play Audio 2</Text>
        </TouchableHighlight>
      </View>*/}
          <View style={styles.mainContainer}>
            <View 
                onLayout={this.setDropZoneValues.bind(this)}     //Step 2
                style={styles.dropZone}>
                <Text style={styles.text}>Drop me here!</Text>
            </View>

            {this.renderDraggable()}
        </View>
      </Swiper>
    );
  }
}

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
var styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text1: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  mainContainer: {
        flex    : 1
    },
    dropZone    : {
        height         : 100,
        backgroundColor:'#2c3e50'
    },
    text        : {
        marginTop   : 25,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff'
    },
    draggableContainer: {
        position    : 'absolute',
        top         : Window.height/2 - CIRCLE_RADIUS,
        left        : Window.width/2 - CIRCLE_RADIUS,
    },
    circle      : {
        backgroundColor     : '#1abc9c',
        width               : CIRCLE_RADIUS*2,
        height              : CIRCLE_RADIUS*2,
        borderRadius        : CIRCLE_RADIUS
    }
});

import MainView from './main';

AppRegistry.registerComponent('audio', () => TodoApp);