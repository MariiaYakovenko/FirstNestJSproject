import _ from 'lodash';

export const assignObjects = (source:Record<string, any>, data:Record<string, any>)
  :Record<string, any> => {
  _.forEach(data, (data, key) => {
    source[key] = data;
  });
  return source;
};
