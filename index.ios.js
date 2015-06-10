'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  PanResponder,
} = React;

var deviceWidth = require('Dimensions').get('window').width;

var ScrollFun = React.createClass({
  mixins: [],

  getInitialState: function() {
    return {offsetX: 0}
  },

  componentWillMount: function() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gestureState) => {
        if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
          this.setState({beginOffsetX: this.state.offsetX});
          return true;
        } else {
          return false;
        }
      },

      onPanResponderRelease: (e, gestureState) => {
        this.goToPage(this.gestureStateToPageNumber(gestureState));
      },

      /* Here I want to tween to the new state */
      onPanResponderMove: (e, gestureState) => {
        this.setState({offsetX: this.state.beginOffsetX + gestureState.dx});
      },
    });
  },

  gestureStateToPageNumber: function(gestureState) {
    // A right->left drag means that you want to move the content towards
    // the left, and the resulting dx is negative, so let's invert it
    var dx = -1 * (this.state.beginOffsetX + gestureState.dx),
        approxPageNumber = dx / deviceWidth;

    // Overscroll to the left
    if (approxPageNumber < 0) {
      return 0;
    } else if (approxPageNumber > 2) {
      return 2;
    } else {
      return Math.round(approxPageNumber);
    }
  },

  goToPage: function(pageNumber) {
    this.setState({offsetX: -1 * (pageNumber * deviceWidth)});
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.tabs}>
          <TouchableOpacity>
             <View style={styles.tab}>
              <Text>React</Text>
             </View>
          </TouchableOpacity>
          <TouchableOpacity>
             <View style={styles.tab}>
              <Text>Flow</Text>
             </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.tab}>
              <Text>Jest</Text>
            </View>
          </TouchableOpacity>
          <View style={{position: 'absolute', width: deviceWidth / 3, height: 10, backgroundColor: 'red', bottom: 0, left: -1 * (this.state.offsetX / 3)}} />
        </View>

        <View style={{width: deviceWidth * 3, flex: 1, flexDirection: 'row', transform: [{translateX: this.state.offsetX}]}}
              {...this._panResponder.panHandlers} >

          <ScrollView style={styles.react}>
            <Image source={{uri: "http://sc5.io/blog/wp-content/uploads/2014/06/react.png"}}
                   style={{flex: 1, height: 320}} resizeMode="cover" />
            <Text>
              JUST THE UI Lots of people use React as the V in MVC. Since React makes no assumptions about the rest of your technology stack, it's easy to try it out on a small feature in an existing project. VIRTUAL DOM React abstracts away the DOM from you, giving a simpler programming model and better performance. React can also render on the server using Node, and it can power native apps using React Native. DATA FLOW React implements one-way reactive data flow which reduces boilerplate and is easier to reason about than traditional data binding.
            </Text>
            <Image source={{uri: "http://sc5.io/blog/wp-content/uploads/2014/06/react.png"}}
                   style={{flex: 1, height: 320}} resizeMode="cover" />
          </ScrollView>

          <ScrollView>
            <Image source={{uri: "http://www.adweek.com/socialtimes/files/2014/11/FlowLogo650.jpg"}}
                   style={{flex: 1, height: 320}} resizeMode="contain" />

            <Image source={{uri: "http://www.adweek.com/socialtimes/files/2014/11/FlowLogo650.jpg"}}
                   style={{flex: 1, height: 320}} resizeMode="contain" />

            <Image source={{uri: "http://www.adweek.com/socialtimes/files/2014/11/FlowLogo650.jpg"}}
                   style={{flex: 1, height: 320}} resizeMode="contain" />
          </ScrollView>

          <ScrollView style={styles.jest}>
            <Image source={{uri: "http://facebook.github.io/jest/img/opengraph.png"}}
                   style={{flex: 1, height: 320}} resizeMode="cover" />
            <Image source={{uri: "http://facebook.github.io/jest/img/opengraph.png"}}
                   style={{flex: 1, height: 320}} resizeMode="cover" />
            <Image source={{uri: "http://facebook.github.io/jest/img/opengraph.png"}}
                   style={{flex: 1, height: 320}} resizeMode="cover" />
          </ScrollView>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },

  tabs: {
    height: 70,
    flexDirection: 'row',
    marginTop: 20,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#ccc',

  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

AppRegistry.registerComponent('ScrollFun', () => ScrollFun);
