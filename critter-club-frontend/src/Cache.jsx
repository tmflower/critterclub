

export default function Cache({animals}) {

// Function to add our give data into cache
const addDataIntoCache = (cacheName, url, response) => {
	// Converting our response into Actual Response form
	const data = new Response(JSON.stringify(response));

	if ('caches' in window) {
	// Opening given cache and putting our data into it
	caches.open(cacheName).then((cache) => {
		cache.put(url, data);
		alert('Data Added into cache!')
	});
	}
};

const sampleData = animals

return (
	<div style={{ height: 500, width: '80%' }}>
	<h4>How to store data into cache in ReactJS?</h4>
	<button onClick={()=>addDataIntoCache('MyCache',
	'https://localhost:3000', sampleData)} >
		Add Data Into Cache</button>
	</div>
);
}
