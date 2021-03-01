/**
 * Shows the technical status of an associate/group
 * Editable if provided with a setStatus function as a prop
*/
import React from 'react';
import { Icon } from 'react-native-elements';

interface TechnicalStatusProps {
    status: number;
}

/**
 * Component to display the correct icon for the technical status, passed in via props
 * Ie displays a question mark, sad face, neutral, smile, or star
 * @param props 
 */
export default function TechnicalStatus(props: TechnicalStatusProps) {

    // Default to 'unknown' status
    let iconName: string = 'question-circle';
    let iconColor: string = '#F26925';

    // Using if-else instead of switch, so this component can be reused for displaying the average
    if (props.status >= 1 && props.status < 2) {
        iconName = 'frown-o';
        iconColor = 'red';
    } else if (props.status >= 2 && props.status < 3) {
        iconName = 'meh-o';
        iconColor = '#F26925';
    } else if (props.status >= 3 && props.status < 4) {
        iconName = 'smile-o';
        iconColor = 'green';
    } else if (props.status === 4) {
        iconName = 'star';
        iconColor = 'blue';
    }

    return (
        <Icon
            name={iconName}
            type='font-awesome'
            color={iconColor}
            testID='statusIcon'/>
    )
}