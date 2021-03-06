import {Dimensions, Image, Text, TouchableWithoutFeedback, View} from "react-native";
import React, { PureComponent } from 'react';
import Colors from "../../../theme/styles/Colors";
import LinearGradient from "react-native-linear-gradient";
import pepoWhiteIcon from "../../../assets/pepo-white-icon.png";
import inlineStyles from "./style";
import multipleClickHandler from '../../../services/MultipleClickHandler'
import ProfilePicture from "../../ProfilePicture";
import PinnedLabel from "../PinnedLabel";


class Base extends PureComponent {

    constructor(props){
        super(props);
    }

    render(){
        return <TouchableWithoutFeedback onPress={multipleClickHandler(() => { this.props.onVideoClick && this.props.onVideoClick()} )}
    >
        <View style={{position:"relative"}}>
            <PinnedLabel isPinned={this.props.isPinned} />
            <Image style={{
                width: (Dimensions.get('window').width - 4) / 2,
                aspectRatio:9/16,
                margin: 1,
                backgroundColor: this.props.imageUrl ? Colors.white : Colors.gainsboro
            }}
                       source={{
                           uri: this.props.imageUrl
                       }}/>
            <LinearGradient
                colors={['transparent', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.3)']}
                locations={[0,0.4, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{width: (Dimensions.get('window').width - 6) / 2, margin: 1, position: 'absolute', bottom: 0, left: 0}}
            >
                <View style={inlineStyles.videoInfoContainer}> 
                     <Text style={inlineStyles.videoDescStyle} ellipsizeMode={'tail'} numberOfLines={3}>{this.props.videoDesc}</Text>
                     <View style={{flex:1, flexDirection: "row" , marginTop: 5}}>
                        <View style={{flex: 3, flexDirection: "row", alignItems: 'center'}}>
                            <ProfilePicture userId={this.props.userId} style={{height: 18, width: 18, borderWidth: 1, borderColor: 'white', borderRadius: 9}} />
                            <Text style={inlineStyles.videoUserNameStyle} ellipsizeMode={'tail'} numberOfLines={1}>@{this.props.userName}</Text>
                        </View>
                        <View style={[inlineStyles.videoStatsContainer]}>
                            <Image style={{height: 12, width: 12, marginTop: 2}} source={pepoWhiteIcon} />
                            {this.props.pepoAmount}
                        </View>
                     </View>        
                </View>
            </LinearGradient>

        </View>
    </TouchableWithoutFeedback>
    }

}

export default Base;
