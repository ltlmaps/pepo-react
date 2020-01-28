import DefaultStyleGenerator from '../../../theme/styles/DefaultStyleGenerator';
import Colors from '../../../theme/styles/Colors';

let stylesMap = {
  hList: {
    paddingRight: 50,
    backgroundColor: 'transparent'
  }
};

export default styles = DefaultStyleGenerator.generate(stylesMap);
