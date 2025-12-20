/**
 * Babel plugin to add data-lov-id attributes to JSX elements
 * Adds source file location information to DOM elements in development
 */
module.exports = function ({ types: t }) {
  return {
    name: 'add-source-location',
    visitor: {
      JSXOpeningElement(path, state) {
        // Only in development
        if (process.env.NODE_ENV === 'production') return;
        
        const { node } = path;
        const { file } = state;
        
        // Skip fragments
        if (t.isJSXIdentifier(node.name) && 
            (node.name.name === 'Fragment' || node.name.name === 'React.Fragment')) {
          return;
        }
        
        // Get file path relative to project root
        const filePath = file.opts.filename || file.path;
        const projectRoot = process.cwd();
        const relativePath = filePath.replace(projectRoot + '/', '');
        
        // Get line and column from source location
        const loc = node.loc;
        if (!loc) return;
        
        const lineNumber = loc.start.line;
        const columnNumber = loc.start.column + 1; // Babel uses 0-based, we want 1-based
        
        // Create the data-lov-id attribute
        const attrValue = `${relativePath}:${lineNumber}:${columnNumber}`;
        const attr = t.jsxAttribute(
          t.jsxIdentifier('data-lov-id'),
          t.stringLiteral(attrValue)
        );
        
        // Check if data-lov-id already exists
        const existingAttr = node.attributes.find(
          attr => t.isJSXAttribute(attr) && 
                  t.isJSXIdentifier(attr.name) && 
                  attr.name.name === 'data-lov-id'
        );
        
        if (!existingAttr) {
          node.attributes.push(attr);
        }
      }
    }
  };
};

