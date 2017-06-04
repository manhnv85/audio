/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,TouchableHighlight
} from 'react-native';

var RCTAudio = require('react-native-player');
var Sound = require('react-native-sound');

export default class audio extends Component {

  onPlay(){
    RCTAudio.prepare("https://noidung.tienganh123.com/file/baihoc/vocabulary/6000/bai2/famous-for-its-unique-culture.mp3", true);
    RCTAudio.start();
  }

  onPlay2(){
    let name = 'for_ex3.mp3';
    Sound.setCategory('Ambient', true); // true = mixWithOthers
    var whoosh = new Sound("advertising.mp3", null, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      } 
      // loaded successfully
      console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
    });

    // Play the sound with an onEnd callback
    whoosh.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });

  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native! hahah
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <TouchableHighlight onPress={() => this.onPlay()}>
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
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('audio', () => audio);
