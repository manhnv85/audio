import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import ListView from './src/ListView';

var RCTAudio = require('react-native-player');
var Sound = require('react-native-sound');

class TodoApp extends Component {

  constructor(props){
    super(props);
    Sound.setCategory('Ambient', true); // true = mixWithOthers
    this.playSoundBundle = () => {
      
    };
  }

  onPlay(){
    RCTAudio.prepare("https://noidung.tienganh123.com/file/baihoc/vocabulary/6000/bai2/famous-for-its-unique-culture.mp3", true);
    RCTAudio.start();
  }

  onPlay2(){
    const s = new Sound('advertising.mp3', Sound.MAIN_BUNDLE, (e) => {
        if (e) {
          console.log('error', e);
        } else {
          //s.setSpeed(1);
          console.log('duration', s.getDuration());
          s.play(() => s.release()); // Release when it's done so we're not using up resources
        }
      });

  }
  render() {
    return (
      <View style={styles.container}>
        

        <TouchableHighlight onPress={() => this.onPlay()} style={{margin: 20}}>
          <Text>Play Audio</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => this.onPlay2()}>
          <Text>Play Audio 2</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: '#F8F8F8',
  }
});

import MainView from './main';

AppRegistry.registerComponent('audio', () => TodoApp);