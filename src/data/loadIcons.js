const requireContext = require.context('../assets/nav_ico', false, /\.(png)$/);
const icons = requireContext.keys().reduce((acc, file) => {
  const key = file.replace('./', '').replace('.png', '');
  acc[key] = requireContext(file);
  return acc;
}, {});

export default icons;