import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
// import ErrorBoundry from '../components/ErrorBoundry';

function App() {

	const [robots, setRobots] = useState([]);
	const [searchfield, setSearchfield] = useState('');

	useEffect(() => {
		 fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => setRobots(users));
		}, [])
		
	const onSearchChange = (event) => {
		setSearchfield(event.target.value)
	}

	const filteredRobots =robots.filter(robot =>  robot.name.toLowerCase().includes(searchfield.toLowerCase()));
	return !robots.length ?
	<h1>Loading...</h1> : 
	(
		<div className='tc'>
			<h1 className='f1'>RoboFriends</h1>
			<SearchBox searchChange={onSearchChange} />
			{
				filteredRobots.length ? 
				(
					<Scroll>
						<CardList robots={filteredRobots} />
					</Scroll>
				) :
				(
					<h2 className="empty">No robots with name {searchfield}</h2>
				)
			}
		</div>
	)
}

export default App;