/**
 * Returns - an array of objects with error.msg and error.param properties in it.
 */
const getErrors = (errors) => {
  return errors.map((item) => {
    const { msg, param } = item;
    return { msg, param };
  });
};

module.exports = { getErrors };
