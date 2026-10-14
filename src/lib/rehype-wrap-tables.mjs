// Wraps every markdown <table> in a scrollable container so wide tables never break mobile layouts.
export default function rehypeWrapTables() {
  return (tree) => {
    const visit = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        if (child.type === 'element' && child.tagName === 'table') {
          return { type: 'element', tagName: 'div', properties: { className: ['table-wrap'] }, children: [child] };
        }
        visit(child);
        return child;
      });
    };
    visit(tree);
  };
}
