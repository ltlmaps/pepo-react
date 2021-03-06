import DefaultStyleGenerator from '../../../theme/styles/DefaultStyleGenerator';
import Colors from '../../../theme/styles/Colors';
import { Dimensions } from 'react-native';
import {fontFamWeight} from "../../../theme/constants";

const isSmallPhone = Dimensions.get('window').width <= 360;

let stylesMap = {
  infoHeaderWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: Dimensions.get('window').width - 40,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 0},
    elevation: 5,
    paddingVertical: 8,
    paddingHorizontal: isSmallPhone ? 8 : 15,
    marginBottom: 20
  },
  balanceHeaderIcons: {
    width: 48,
    height: 48
  },
  dividerLine:{
    width: 1,
    height: 20,
    marginTop: 16.5,
    marginHorizontal: isSmallPhone ? 5 : 8
  },
  userProfileImageSkipFont: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: Colors.gainsboro
  },
  userName: {
    color: Colors.valhalla,
    marginRight: 8,
    fontFamily: 'AvenirNext-DemiBold'
  },
  bioSection: {
    color: Colors.valhalla,
    fontSize: 14
  },
  bioSectionWrapper: {
    marginTop: 20,
    marginHorizontal: 30,
    textAlign: 'center'
  },
  numericInfoWrapper: {
    marginTop: 20,
    flexDirection: 'row',
    width: Dimensions.get('window').width - 30
  },
  numericInnerWrapper:{
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.valhalla,
    flex: 1
  },
  numericInfoTextBold: {
    fontFamily: 'AvenirNext-DemiBold'
  },
  numericInfoText: {
    fontSize: 14,
    color: Colors.valhalla,
    fontFamily: 'AvenirNext-Regular'
  },
  hashTagTxt: {
    color: Colors.valhalla,
    ...fontFamWeight
  }
};

export default styles = DefaultStyleGenerator.generate(stylesMap);
