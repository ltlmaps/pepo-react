import DefaultStyleGenerator from '../../theme/styles/DefaultStyleGenerator';
import Colors from '../../theme/styles/Colors';
import {ifIphoneX} from "react-native-iphone-x-helper";

let stylesMap = {
  topBg: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    zIndex: 1,
    position: 'absolute',
    ...ifIphoneX({
      top: 60,
    }, {
      top: 30,
    }),
    right: 10
  },
  innerTopBg:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topBgTxt: {
    color: Colors.wildWatermelon2,
    fontSize: 13,
    marginLeft: 4,
    fontFamily: 'AvenirNext-DemiBold'
  },
  crossIconClickSpace: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topUp: {
    color: Colors.wildWatermelon2,
    fontFamily: 'AvenirNext-DemiBold',
    fontSize: 14
  },
  crossIconSkipFont: {
    width: 13,
    height: 12.6
  }
};

export default styles = DefaultStyleGenerator.generate(stylesMap);
