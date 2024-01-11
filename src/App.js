import React, { useEffect, useState } from 'react';
import './App.css'


const useJsonFetch = url => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			 try {

					setError(null)
					setLoading(true) 
					 
					
					const response = await fetch(url)
					const jsonData = await response.json()

					setData(jsonData)
					setLoading(false)

				} catch (error) {
					setError(error)
					setLoading(false)
				}
		}

		fetchData()
	}, [url])

	return [data, loading, error]
}


const App = () => {
	const [type, setType] = useState('data')
	const [data, loading, error] = useJsonFetch(`http://localhost:7070/${type}`)


	return (
		<>
			<div>
				<h2>{type}</h2>
				<button onClick={() => setType('data')}>data</button>
				<button onClick={() => setType('loading')}>loading</button>
				<button onClick={() => setType('error')}>error</button>
				{loading ? <p>loading...</p> : ''}
				{error ? console.log(error) : ''}
				{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : ''}
			</div>
		</>
	)
}

export default App;


