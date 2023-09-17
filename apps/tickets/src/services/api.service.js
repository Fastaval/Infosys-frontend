class ApiError extends Error {
  constructor(json) {
    super('Error in API route');
    this.name = 'ApiError';
    this.json = json;
  }
}

const checkError = (json) => {
  if (json.status !== 'success') {
    throw new ApiError(json);
  }
};

export const get = async (path) => {
  const response = await fetch(`${path}`);
  if (response.headers.get('Location')) window.location.href = response.headers.get('Location');
  const json = await response.json();
  checkError(json);

  return json;
};

export const post = async (path, data) => {
  const response = await fetch(`${path}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.headers.get('Location')) window.location.href = response.headers.get('Location');
  const json = await response.json();
  checkError(json);

  return json;
};
