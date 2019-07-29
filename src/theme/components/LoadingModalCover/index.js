import React from 'react';
import { connect } from 'react-redux';
import {View, Modal, Text, Image, Animated, Easing, Platform} from 'react-native';
import * as Progress from 'react-native-progress';

import inlineStyles from './styles';
import Loading_left from '../../../assets/Loading_left.png';
import Loading_right from '../../../assets/Loading_right.png';
import pepoTxIcon from "../../../assets/pepo-white-icon.png";
import Colors from '../../styles/Colors';
import Store from '../../../store';
import { showModalCover, hideModalCover } from '../../../actions';

const mapStateToProps = ({ modal_cover }) => ({
  show: modal_cover.show,
  message: modal_cover.message,
  footerText: modal_cover.footerText
});

class loadingModalCover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotate: new Animated.Value(0),
      scale: new Animated.Value(0.1)
    };
  }

  getAnimation(){
    return Animated.sequence([
      Animated.delay(800),
      Animated.timing(this.state.rotate, {
        toValue: 1,
        easing:Easing.elastic(1.5),
        useNativeDriver: true
      }),
      Animated.loop(
        Animated.timing(this.state.scale, {
          duration: 1200,
          easing:Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      )
    ])
  };

  render() {
    const rotateData = this.state.rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg','-135deg'],
    });
    const scaleData = this.state.scale.interpolate({
      inputRange: [0.11, 0.5, 1],
      outputRange: [1, Platform.OS == 'ios' ? 1.15 : 1.3, 1]
    });
    let animationStyle = {
      transform: [
        {scale: scaleData},
        {rotate: rotateData}
      ],
    };
    this.props.show ? this.getAnimation().start() : this.getAnimation().stop();
    return (
      <React.Fragment>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.props.show}
            coverScreen={false}
            hasBackdrop={false}
          >
            <View style={inlineStyles.backgroundStyle}>
                <Animated.Image
                  style={[ animationStyle, {width: 40, height: 40, marginBottom: 30} ]}
                  source={pepoTxIcon}/>
              <Text style={inlineStyles.loadingMessage}>{this.props.message}</Text>
              <Progress.Bar
                indeterminate={true}
                indeterminateAnimationDuration={500}
                width={200}
                unfilledColor={Colors.white}
                color={Colors.primary}
                borderWidth={0}
              />
              <Text style={inlineStyles.footerText}>{this.props.footerText}</Text>
            </View>
          </Modal>
      </React.Fragment>
    );
  }
}

export const LoadingModalCover = connect(mapStateToProps)(loadingModalCover);
export const LoadingModal = {
  show: (message, footerText) => {
    Store.dispatch(showModalCover(message, footerText));
  },
  hide: () => {
    Store.dispatch(hideModalCover());
  }
};
