import * as service from '../services/tagviewer'
import { tagData } from '../utils/serializeData'

export default {
  namespace: 'tag',
  state : {
    data: [],
    tag: {},
    tagIsLBH: [],
    tagArrByLBH: []
  },
  effects: {
    *tag(_, { put, call }) {
      const response = yield call(service.tagData);
      if( response.tagsWithValues) {
        const tagdata = tagData(response.tagsWithValues);
        if ( tagData ) yield put({type:'updateData', payload: {data:tagdata}});
      } else if ( tagData ) yield put({type:'updateData', payload: {data:[[]]}});      
    },
    *getTagByPath({ payload }, { put , call }) {
      const res = yield call(service.getTagByPath, payload);
      yield put({ type: 'updateTag', payload: { tag: res }})
    },
    *getTagIsLBH(_, { put ,call }){
      const res = yield call(service.getTagIsLBH);
      yield put({ type: 'updateTagIsLBH', payload: {data: res}})
    },
    *clearTag(_, { put }){
      yield put({type: 'updateTag', payload: { tag: {} }})
    },
    *getTagArrByLBH(_, { put, call }){
      const res = yield call(service.getTagLBH);
      yield put({type: 'updateTagArrByLBH', payload: {data: res}})
    }
  },
  reducers: {
    updateData(state, { payload }) {
      return {
        ...state, data: payload.data
      }
    },
    updateTag(state, { payload }) {
      return {
        ...state, tag : payload.tag
      }
    },
    updateTagIsLBH(state, { payload }) {
      return {
        ...state, tagIsLBH : payload.data
      }
    },
    updateTagArrByLBH(state, { payload }) {
      return {
        ...state, tagArrByLBH: payload.data
      }
    }
  }
}