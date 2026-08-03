export async function retryCall(url: string) {
  const retries = 2;
  let delay: number = 1000;
  for (let retryAttempt: number = 1; retryAttempt <= retries; retryAttempt++) {

    const response = await fetch(url);

    if (response.ok) {
      return response;
    }

    if (response.status !== 429) {
      return Response.json({
        message: `The API at endpoint ${url} ran into a new error.`
      },
      {
        status: response.status,
      });
    }

    await new Promise((resolve) => setTimeout(resolve, delay));
    delay *= 2;
  }

  return Response.json({
    message: `The API at endpoint ${url} is still experiencing too many requests.`
  },
  {
    status: 429,
  });
}