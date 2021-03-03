import { StyleSheet } from 'react-native';

// Importing using require because there is no @types
const { create, PREDEF_RES } = require('react-native-pixel-perfect');

const REVATURE_ORANGE = '#F26925';

const designResolution = {
  width: 360,
  height: 640,
}; // what we're designing for
const perfectSize = create(designResolution);

export const style = StyleSheet.create({
  overallText: {
    width: perfectSize(360),
    height: perfectSize(150),
    backgroundColor: 'white',
    borderWidth: perfectSize(1),
    borderColor: REVATURE_ORANGE,
    marginBottom: perfectSize(15),
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caliber: {
    color: '#474C55',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  login: {
    backgroundColor: '#fff',
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    alignItems: 'center',
    padding: 8,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  logoutBackground: {
    backgroundColor: '#F26925',
    height: 40,
    width: 133,
    borderRadius: 40,
    alignItems: 'center',
    marginBottom: 40,
  },

  loginInput: {
    marginBottom: 40,
    borderBottomColor: '#fff',
  },
  input: {
    borderColor: '#474C55',
    color: '#474C55',
    backgroundColor: '#B9B9BA',
    borderRadius: 20,
    height: perfectSize(50),
    width: 250,
    padding: 15,
    borderWidth: 2,
    fontSize: 18,
    fontWeight: 'bold',
  },
  notesCard: {
    backgroundColor: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    borderBottomWidth: 2,
    borderColor: REVATURE_ORANGE,
    position: 'relative',
    width: perfectSize(345),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: perfectSize(5),
  },
  noteName: {
    borderStyle: 'dashed',
    borderColor: 'black',
    top: perfectSize(10),
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative',
    width: perfectSize(300),
    height: perfectSize(30),
    fontSize: perfectSize(18),
    color: 'black',
    left: perfectSize(5),
  },
  techStatus: {
    position: 'relative',
    top: perfectSize(-20),
    right: perfectSize(-120),
  },
  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: perfectSize(5),
    width: perfectSize(290),
    borderColor: REVATURE_ORANGE,
    borderWidth: perfectSize(2),
    borderRadius: perfectSize(5),
    color: REVATURE_ORANGE,
  },
  saveButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: perfectSize(15),
    width: perfectSize(290),
    borderColor: REVATURE_ORANGE,
    borderWidth: perfectSize(2),
    borderRadius: perfectSize(5),
    color: REVATURE_ORANGE,
  },
  /**
   * Styling for touchable opacity
   * for sorting first name
   */
  tOSF: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: perfectSize(120),
    height: perfectSize(50),
    left: perfectSize(50),
  },
  /**
   * touchable opacity for sorting
   * last name
   */
  tOSL: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: perfectSize(120),
    height: perfectSize(50),
    top: perfectSize(-50),
    left: perfectSize(-80),
  },
  sortHeader: {
    fontSize: perfectSize(12),
    fontWeight: 'bold',
    color: REVATURE_ORANGE,
    position: 'relative',
    width: perfectSize(120),
    height: perfectSize(30),
  },
  title: {
    color: REVATURE_ORANGE,
  },
  iconSort: {
    position: 'relative',
    top: perfectSize(-10),
    width: 'auto',
    height: 'auto',
  },
  flatListAssociates: {
    position: 'relative',
    top: perfectSize(-35),
  },
  associatesViewComponent: {
    width: 'auto',
    height: 'auto',
    backgroundColor: 'white',
    marginBottom: perfectSize(10),
  },
  underDevelopmentText: {
    color: REVATURE_ORANGE,
    textAlign: 'center',
    fontSize: 36,
  },
});

export default style;
