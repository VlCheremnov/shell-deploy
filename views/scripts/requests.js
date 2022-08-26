const sendRequests = (
	path,
	body = {},
	{
		headers = {},
		method = 'POST'
	} = {}
) => {
	return fetch(path, {
		method,
		headers: {
			'Content-Type': 'application/json',
			...headers
		},
		body: JSON.stringify(body)
	})
}