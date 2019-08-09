import DefaultStyleGenerator from '../../theme/styles/DefaultStyleGenerator';
import Colors from '../../theme/styles/Colors';

let stylesMap = {
  item: {
    // fontSize: 15,
    // flex: 1,
    // fontWeight: '300',
    //color: Colors.midNightblue,
    marginLeft: 10,
    marginRight: 4,
    flexDirection: 'row'
  },

  txtWrapper: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageStyleSkipFont: {
    marginRight: 10,
    borderRadius: 20,
    height: 40,
    width: 40
  },

  numericInnerWrapper: {
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    marginLeft: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 6,
    color: Colors.white,
    borderColor: Colors.pinkRed,
    flexDirection: 'row'
  },
  numericInfoText: {
    color: Colors.pinkRed,
    fontFamily: 'AvenirNext-DemiBold',
    marginLeft: 5
  },
  imageIconSkipFont: {
    width: 15,
    height: 15
  },
  timeStamp: {
    color: '#b1b1b1',
    fontFamily: 'AvenirNext-Regular',
    fontSize: 14,
    letterSpacing: -0.68
  },

  posterImageSkipFont: {
    aspectRatio: 3 / 4,
    width: 40,
    marginLeft: 'auto',
    justifyContent: 'center'
  },
  playIconSkipFont: {
    height: 14,
    width: 14,
    alignSelf: 'center'
  },
  sayThanksButton: {
    width: 120,
    height: 35,
    borderRadius: 20,
    borderWidth: 2,
    marginLeft: 40,
    marginTop: -4,
    borderColor: '#34445b',
    justifyContent: 'center'
  },
  sayThanksText: { alignSelf: 'center', color:  '#34445b', fontWeight: "400" }
};

export default styles = DefaultStyleGenerator.generate(stylesMap);
