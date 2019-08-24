import { combineReducers } from 'redux';
import searchFieldRecuder from './search/searchField';
import cityDistrictReducer from './search/cityDistrict';
import asyncStorageReducer from './asyncStorage';

export default combineReducers({
  searchField: searchFieldRecuder,
  cityDistrict: cityDistrictReducer,
  asyncData: asyncStorageReducer,
});
