import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  list: {
    flexDirection: 'column',
  },
  rowJustifyStart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listSpaceTop: {
    marginTop: 15,
  },
  listSpaceBottom: {
    marginBottom: 15,
  },
  rowMarginLeft: {
    marginLeft: 15,
  },
});
