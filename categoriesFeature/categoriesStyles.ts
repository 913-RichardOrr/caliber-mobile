import {StyleSheet} from 'react-native';

const catStyle = StyleSheet.create({
    //Instructions
    instructView: {
        backgroundColor: 'white',
    },
    instructText: {
        fontSize: 15,
        alignSelf: 'center',
        fontWeight: '700',
        color: '#474C55',
        fontStyle: 'italic',
        marginTop: -5,
        marginBottom:2

    },
    //Add categories button
    addBtnPicture: {
        alignSelf:'center',
        width: 50,
        height: 50,
        bottom: 15,
    }, 
    //Modal
    modal: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#E6E6E6',
        padding: 30,
        width: '90%',
        minHeight: 350,
        maxHeight:'60%' ,
        marginTop:'auto',
        marginBottom: 'auto',
        alignSelf: 'center',
        justifyContent:'center', 
    },    
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginLeft: '5%',
        marginTop: '5%',
        marginBottom: 50,
        color: '#474C55'
    },
    modalTextInput: {
        alignSelf:'center',
        width:'90%',
        height:40,
        marginTop: 'auto',
        marginBottom: 'auto',
        backgroundColor: '#B9B9BA',
        paddingLeft:10,
        paddingRight:10,
        fontSize: 16,
        borderColor: '#474C55',
        borderWidth:2,
        borderRadius: 4
    },
    //Modal Buttons
    closeBtn: {
        backgroundColor: '#72A4C2',
        margin: 10,
        borderRadius: 20,
        alignSelf: 'center',
        width:'90%'
    },
    modalActionBtn: {
        backgroundColor: '#F26925',
        margin: 10,
        borderRadius: 20,
        alignSelf: 'center',
        width:'90%'
    },
    //Category Name Component
    sectionHeaderLabel: {
        color: '#474C55',
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 15,
        padding: 2
    },
    skillText: {
        color:'black',
        fontSize: 20,
        justifyContent: 'center',
        marginTop: 7,
        marginLeft: 15
    },
    editBtn: {
        backgroundColor: '#72A4C2',
        margin: 2,
    },
    //Search Bar
    inputBar: {
        backgroundColor:'white',
        color: '#474C55',
        marginRight: '2.5%',
        borderRadius: 5,
        paddingLeft:10,
        paddingRight:10,
    },
    inputContainer: {
        backgroundColor: '#F26925',
        borderRadius: 25,
        color: 'white',
        alignItems: 'center',
    },
    searchContainer: {
        backgroundColor:'white',
        borderWidth: 0,
        borderBottomColor: 'white',
        borderTopColor: 'white',
    }, 
    sectionHeaderContainer: {
        backgroundColor: '#B9B9BA',
    },
    //General
    btnText: {
        color: '#FFFFFF',
        fontSize: 20,
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        alignSelf: 'center'
    },
})

export default catStyle;