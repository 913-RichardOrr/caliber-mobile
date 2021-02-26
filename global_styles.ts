import { OpaqueColorValue, StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// Importing using require because there is no @types
const { create, PREDEF_RES } = require('react-native-pixel-perfect');

const REVATUREORANGE = "#F26925"

const designResolution = {
    width: 360,
    height: 640
} // what we're designing for
const perfectSize = create(designResolution);

const style = StyleSheet.create({
    notesCard: {
        backgroundColor: "white",
        justifyContent: "center",
        textAlign: "center",
        borderBottomWidth: 2,
        borderColor: REVATUREORANGE,
        position: "relative",
        width: perfectSize(345),
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: perfectSize(5),
    },
    noteName: {
        borderStyle: "dashed",
        borderColor: "black",
        top: perfectSize(10),
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        width: perfectSize(300),
        height: perfectSize(30),
        fontSize: perfectSize(18),
        color: "black",
        left: perfectSize(5),

    },
    techstatus: {
        position: "relative",
        top: perfectSize(-20),
        right: perfectSize(-120),
    },
    button: {
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: perfectSize(5),
        width: perfectSize(290),
        borderColor: REVATUREORANGE,
        borderWidth: perfectSize(2),
        borderRadius: perfectSize(5),
        color: REVATUREORANGE,
    },
    savebutton: {
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: perfectSize(15),
        width: perfectSize(290),
        borderColor: REVATUREORANGE,
        borderWidth: perfectSize(2),
        borderRadius: perfectSize(5),
        color: REVATUREORANGE,
    },
    tOSF: {
        width: perfectSize(120),
        height: perfectSize(50),
        left: perfectSize(30),
    },
    tOSL: {
        width: perfectSize(120),
        height: perfectSize(50),
        top: perfectSize(-50),
        left: perfectSize(180),
    },
    fNameSortH: {
        fontSize: perfectSize(12),
        textAlign: "center",
        fontWeight: "bold",
        color: REVATUREORANGE,
        position: 'relative',
        width: perfectSize(120),
        height: perfectSize(30),
    },
    title: {
        color: REVATUREORANGE
    },
    iconsf: {
        position: "relative",
        top: perfectSize(-10),
        width: perfectSize(15),
        height: perfectSize(15),
    },
    iconsl: {
        position: "relative",
        top: perfectSize(-10),
        width: perfectSize(15),
        height: perfectSize(15),
    },
    lNameSortH: {
        fontSize: perfectSize(12),
        textAlign: "center",
        fontWeight: "bold",
        color: REVATUREORANGE,
        position: 'relative',
        width: perfectSize(120),
        height: perfectSize(30),
    },
    flatListAssociates: {
        position: "relative",
        top: perfectSize(-35),
    },
    associatesViewComponent: {
        width: "auto",
        height: "auto",
        backgroundColor: 'white',
        marginBottom:perfectSize(10),
    }, container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    caliber: {
        color: '#474C55',
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 40
    },
    login: {
        backgroundColor: '#fff',
        marginBottom: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logininput: {
        marginBottom: 40
    },
    input: {
        borderColor: '#474C55',
        color: '#474C55',
        backgroundColor: '#B9B9BA',
        borderRadius: 20,
        height: 46,
        width: 250,
        padding: 15,
        borderWidth: 2,
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default style;
