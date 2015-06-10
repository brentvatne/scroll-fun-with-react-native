'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} = React;

var ReactPage = React.createClass({
  render() {
    return (
      <ScrollView>
        <Image source={{uri: "http://sc5.io/blog/wp-content/uploads/2014/06/react.png"}}
               style={{flex: 1, height: 320}} resizeMode="cover" />
        <Text>
          JUST THE UI Lots of people use React as the V in MVC. Since React makes no assumptions about the rest of your technology stack, it's easy to try it out on a small feature in an existing project. VIRTUAL DOM React abstracts away the DOM from you, giving a simpler programming model and better performance. React can also render on the server using Node, and it can power native apps using React Native. DATA FLOW React implements one-way reactive data flow which reduces boilerplate and is easier to reason about than traditional data binding.
        </Text>
        <Image source={{uri: "http://sc5.io/blog/wp-content/uploads/2014/06/react.png"}}
               style={{flex: 1, height: 320}} resizeMode="cover" />
      </ScrollView>
    )
  }
})

var FlowPage = React.createClass({
  render() {
    return (
      <ScrollView>
        <Image source={{uri: "http://www.adweek.com/socialtimes/files/2014/11/FlowLogo650.jpg"}}
               style={{flex: 1, height: 320}} resizeMode="contain" />

        <Image source={{uri: "http://www.adweek.com/socialtimes/files/2014/11/FlowLogo650.jpg"}}
               style={{flex: 1, height: 320}} resizeMode="contain" />

        <Image source={{uri: "http://www.adweek.com/socialtimes/files/2014/11/FlowLogo650.jpg"}}
               style={{flex: 1, height: 320}} resizeMode="contain" />
      </ScrollView>
    )
  }
})

var JestPage = React.createClass({
  render() {
    return (
      <ScrollView>
        <Image source={{uri: "http://facebook.github.io/jest/img/opengraph.png"}}
               style={{flex: 1, height: 320}} resizeMode="cover" />
        <Image source={{uri: "http://facebook.github.io/jest/img/opengraph.png"}}
               style={{flex: 1, height: 320}} resizeMode="cover" />
        <Image source={{uri: "http://facebook.github.io/jest/img/opengraph.png"}}
               style={{flex: 1, height: 320}} resizeMode="cover" />
      </ScrollView>
    )
  }
})

module.exports = {
  ReactPage: ReactPage,
  FlowPage: FlowPage,
  JestPage: JestPage,
}
