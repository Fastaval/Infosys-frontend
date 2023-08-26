export const get = async (path) => {
  return await fetch(`${path}`);
};

export const post = async (path, data = {}) => {
  return await fetch(`${path}`, { method: 'POST', body: JSON.stringify(data) });
};
