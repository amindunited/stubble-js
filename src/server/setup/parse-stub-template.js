const parseStubTemplate = (template, context) => {
  let parsedResult = template.replace(/\${(\w*)}/g, (match, key) => {
    return context[key];
  });
  return parsedResult;
}

module.exports = parseStubTemplate;
