const ENDPOINT = 'https://opentdb.com/api';

export async function getToken() {
  const requestResponse = await fetch(
    `${ENDPOINT}_token.php?command=request`,
  );
  return requestResponse.json();
}

export async function getQuestions(quantity, token) {
  const requestResponse = await fetch(
    `${ENDPOINT}.php?amount=${quantity}&token=${token}`,
  );
  return requestResponse.json();
}
