import {colors} from '../../constants/Constants';
export const GlobalStyle: any = {
  container: {
    gap: 30,
    marginTop: 25,
    width: '95%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  gap: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },

  full: {
    flex: 1,
  },
  top: {
    marginTop: 10,
  },
};
export const reminderStyle: any = {
  renderMedicine: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    bottom: 0,
  },

  inputsContainer: {
    gap: 12,
    width: '100%',
  },

  multiInputs: {
    width: '100%',
    justifyContent: 'space-between',
    gap: 6,
    flexDirection: 'row',
  },

  width: {width: '100%'},

  pikerStyles: {width: '70%', alignSelf: 'center', gap: 20},
  colorPikerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  colorPreview: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },

  textBtn: {
    fontSize: 24,
    color: colors.white,
    fontWeight: '700',
    textAlign: 'center',
    alignSelf: 'center',
  },
};

