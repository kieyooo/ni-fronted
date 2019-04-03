import * as service from '../services/tagviewer'
import { tagData } from '../utils/serializeData'

export default {
  namespace: 'tag',
  state : {
    totalCount: 0,
    data: [],
    tag: {}
  },
  effects: {
    *tag(_, { put, call }) {
      const response = yield call(service.tagData);
      if( response.tagsWithValues) {
        const tagdata = tagData(response.tagsWithValues);
        const totalCount = response.totalCount;
        if ( tagData ) yield put({type:'updateData', payload: {data:tagdata}});
        yield put({ type:'updateTotalCount', payload: {totalCount}})
      } else if ( tagData ) yield put({type:'updateData', payload: {data:[[]]}});      
    },
    *getTagByPath({ payload }, { put , call }) {
      const res = yield call(service.getTagByPath, payload);
      yield put({ type: 'updateTag', payload: { tag: res }})
    },
    *clearTag(_, { put }){
      yield put({type: 'updateTag', payload: { tag: {} }})
    }
  },
  reducers: {
    updateData(state, { payload }) {
      return {
        ...state, data: payload.data
      }
    },
    updateTotalCount(state, { payload }) {
      return {
        ...state, totalCount : payload.totalCount
      }
    },
    updateTag(state, { payload }) {
      return {
        ...state, tag : payload.tag
      }
    }
  }
}