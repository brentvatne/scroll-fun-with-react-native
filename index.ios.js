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

var { ReactPage, JestPage, FlowPage, } = require('./examples');
var deviceWidth = require('Dimensions').get('window').width;
var tweenState = require('react-tween-state');

var ScrollableTabView = React.createClass({
  getInitialState() {
    return {offsetX: 0,}
  },

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // Claim responder if it's a horizontal pan
      onMoveShouldSetPanResponder: (e, gestureState) => {
        if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
          this.setState({beginOffsetX: this.state.offsetX});
          return true;
        }
      },

      // Touch is released, scroll to the one that you're closest to
      onPanResponderRelease: (e, gestureState) => {
        this.goToPage(this.gestureStateToPageNumber(gestureState));
      },

      // Dragging, move the view with the touch
      onPanResponderMove: (e, gestureState) => {
        this.setState({offsetX: this.state.beginOffsetX + gestureState.dx});
      },
    });
  },

  gestureStateToPageNumber(gestureState) {
    // A right->left drag means that you want to move the content towards
    // the left, and the resulting dx is negative, so let's invert it
    var dx = -1 * (this.state.beginOffsetX + gestureState.dx),
        approxPageNumber = dx / deviceWidth,
        lastTabId = this.props.children.length - 1;

    // Overscroll to the left
    if (approxPageNumber < 0) {
      return 0;
    } else if (approxPageNumber > lastTabId) {
      return lastTabId;
    } else {
      return Math.round(approxPageNumber);
    }
  },

  goToPage(pageNumber) {
    this.setState({offsetX: -1 * (pageNumber * deviceWidth)});
    this.props.onChangeTab &&
      this.props.onChangeTab({i: pageNumber, ref: this.props.children[pageNumber]});
  },

  renderTabOption(name, page) {
    return (
      <TouchableOpacity key={name} onPress={() => this.goToPage(page)}>
         <View style={styles.tab}>
          <Text>{name}</Text>
         </View>
      </TouchableOpacity>
    );
  },

  render() {
    var numberOfTabs = this.props.children.length;
    var tabUnderlineStyle = {
      position: 'absolute',
      width: deviceWidth / numberOfTabs,
      left: -1 * (this.state.offsetX / numberOfTabs),
      height: 10, backgroundColor: 'red', bottom: 0,
    }
    var sceneContainerStyle = {
      width: deviceWidth * this.props.children.length,
      flex: 1, flexDirection: 'row',
      transform: [{translateX: this.state.offsetX}]
    }

    return (
      <View style={{flex: 1}}>
        <View style={styles.tabs}>
          {this.props.children.map((child, i) => this.renderTabOption(child.key, i))}
          <View style={tabUnderlineStyle} />
        </View>

        <View style={sceneContainerStyle} {...this._panResponder.panHandlers}>
          {this.props.children}
        </View>
      </View>
    )
  }
});


var ScrollFun = React.createClass({
  render() {
    return (
      <ScrollableTabView>
        <ReactPage key="React" />
        <FlowPage key="Flow" />
        <JestPage key="Jest" />
      </ScrollableTabView>
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
});

AppRegistry.registerComponent('ScrollFun', () => ScrollFun);
